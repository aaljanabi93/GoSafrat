import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { 
  generateVerificationToken, 
  generateResetToken, 
  sendVerificationEmail,
  sendPasswordResetEmail 
} from "./services/email-service";
import { config, buildUrl } from "./config";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Generate a random session secret if none is provided
  if (!process.env.SESSION_SECRET) {
    process.env.SESSION_SECRET = randomBytes(32).toString("hex");
    console.warn("No SESSION_SECRET provided, using a randomly generated one");
  }

  const sessionSettings: session.SessionOptions = {
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.isProduction,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
      domain: config.isProduction ? config.domain : undefined
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Create the user with hashed password
      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });
      
      // Generate verification token
      const token = generateVerificationToken();
      
      // Set verification token with 24 hour expiration
      const verificationExpiresIn = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      await storage.setVerificationToken(user.id, token, verificationExpiresIn);
      
      // Get base URL for link construction from config
      const baseUrl = config.appUrl;
      
      // Send verification email asynchronously
      sendVerificationEmail(user, token, baseUrl)
        .then(sent => {
          if (!sent) {
            console.error('Failed to send verification email to:', user.email);
          }
        })
        .catch(err => {
          console.error('Error sending verification email:', err);
        });

      // Log the user in
      req.login(user, (err: Error | null) => {
        if (err) return next(err);
        // Send back user object without the password
        const { password, ...userWithoutPassword } = user;
        res.status(201).json({
          ...userWithoutPassword,
          message: "Registration successful. Please check your email to verify your account."
        });
      });
    } catch (error: unknown) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
      } else {
        res.status(500).json({ message: "Registration failed", error: "Unknown error" });
      }
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error | null, user: Express.User | false, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      req.login(user, (err: Error | null) => {
        if (err) return next(err);
        // Send back user object without the password
        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err: Error | null) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    // Send back user object without the password
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  });

  // User profile endpoint
  app.get("/api/user/profile", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    // Send back user object without the password
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  });

  // Update user profile endpoint
  app.put("/api/user/profile", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      // Don't allow updating username or password through this endpoint
      const { username, password, ...updateData } = req.body;
      
      // Update the user
      const updatedUser = await storage.updateUser(req.user.id, updateData);
      
      // Send back user object without the password
      const { password: pwd, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error: unknown) {
      console.error("Profile update error:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Profile update failed", error: error.message });
      } else {
        res.status(500).json({ message: "Profile update failed", error: "Unknown error" });
      }
    }
  });

  // Change password endpoint
  app.post("/api/user/change-password", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const { currentPassword, newPassword } = req.body;
      
      // Verify current password
      if (!(await comparePasswords(currentPassword, req.user.password))) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      
      // Update to new password
      const hashedNewPassword = await hashPassword(newPassword);
      await storage.updateUser(req.user.id, { password: hashedNewPassword });
      
      res.json({ message: "Password updated successfully" });
    } catch (error: unknown) {
      console.error("Password change error:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Password change failed", error: error.message });
      } else {
        res.status(500).json({ message: "Password change failed", error: "Unknown error" });
      }
    }
  });

  // Email verification endpoint
  app.get("/api/verify-email", async (req, res) => {
    try {
      const { token } = req.query;
      
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ message: "Invalid verification token" });
      }
      
      const user = await storage.verifyEmail(token);
      
      if (!user) {
        return res.status(400).json({ 
          message: "Invalid or expired verification token",
          error: "TOKEN_INVALID"
        });
      }
      
      // If user is already logged in, update their session
      if (req.isAuthenticated() && req.user.id === user.id) {
        req.user.emailVerified = true;
      }
      
      res.json({ 
        message: "Email verified successfully",
        success: true 
      });
    } catch (error: unknown) {
      console.error("Email verification error:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Email verification failed", error: error.message });
      } else {
        res.status(500).json({ message: "Email verification failed", error: "Unknown error" });
      }
    }
  });
  
  // Resend verification email endpoint
  app.post("/api/resend-verification", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      // Check if email is already verified
      if (req.user.emailVerified) {
        return res.status(400).json({ message: "Email is already verified" });
      }
      
      // Generate new verification token
      const token = generateVerificationToken();
      
      // Set verification token with 24 hour expiration
      const verificationExpiresIn = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      await storage.setVerificationToken(req.user.id, token, verificationExpiresIn);
      
      // Get base URL for link construction from config
      const baseUrl = config.appUrl;
      
      // Send verification email
      const sent = await sendVerificationEmail(req.user, token, baseUrl);
      
      if (!sent) {
        return res.status(500).json({ message: "Failed to send verification email" });
      }
      
      res.json({ message: "Verification email sent successfully" });
    } catch (error: unknown) {
      console.error("Resend verification error:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to resend verification email", error: error.message });
      } else {
        res.status(500).json({ message: "Failed to resend verification email", error: "Unknown error" });
      }
    }
  });

  // Password reset request endpoint
  app.post("/api/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      
      // Don't reveal if user exists or not
      if (!user) {
        return res.json({ message: "If an account with that email exists, a password reset link has been sent" });
      }
      
      // Generate reset token
      const token = generateResetToken();
      
      // Set reset token with 1 hour expiration
      const resetExpiresIn = 60 * 60 * 1000; // 1 hour in milliseconds
      await storage.setResetToken(user.id, token, resetExpiresIn);
      
      // Get base URL for link construction from config
      const baseUrl = config.appUrl;
      
      // Send password reset email
      sendPasswordResetEmail(user, token, baseUrl)
        .then(sent => {
          if (!sent) {
            console.error('Failed to send password reset email to:', user.email);
          }
        })
        .catch(err => {
          console.error('Error sending password reset email:', err);
        });
      
      res.json({ message: "If an account with that email exists, a password reset link has been sent" });
    } catch (error: unknown) {
      console.error("Password reset request error:", error);
      // Don't reveal if user exists or not
      res.json({ message: "If an account with that email exists, a password reset link has been sent" });
    }
  });
  
  // Reset password endpoint
  app.post("/api/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      
      if (!token || !newPassword) {
        return res.status(400).json({ message: "Token and new password are required" });
      }
      
      // Find user by reset token
      const user = await storage.getUserByResetToken(token);
      
      if (!user) {
        return res.status(400).json({ 
          message: "Invalid or expired reset token",
          error: "TOKEN_INVALID"
        });
      }
      
      // Update password and clear reset token
      const hashedNewPassword = await hashPassword(newPassword);
      await storage.updateUser(user.id, { 
        password: hashedNewPassword,
        resetToken: null,
        resetExpires: null
      });
      
      res.json({ message: "Password has been reset successfully" });
    } catch (error: unknown) {
      console.error("Password reset error:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Password reset failed", error: error.message });
      } else {
        res.status(500).json({ message: "Password reset failed", error: "Unknown error" });
      }
    }
  });
  
  // User bookings history endpoint
  app.get("/api/user/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const userId = req.user.id;
      
      // Get all bookings for the user
      const flightBookings = await storage.getFlightBookingsByUser(userId);
      const hotelBookings = await storage.getHotelBookingsByUser(userId);
      const carRentals = await storage.getCarRentalsByUser(userId);
      
      res.json({
        flights: flightBookings,
        hotels: hotelBookings,
        cars: carRentals
      });
    } catch (error: unknown) {
      console.error("Bookings retrieval error:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to retrieve bookings", error: error.message });
      } else {
        res.status(500).json({ message: "Failed to retrieve bookings", error: "Unknown error" });
      }
    }
  });
}