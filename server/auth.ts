import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
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

      // Create the user with hashed password
      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      // Log the user in
      req.login(user, (err: Error | null) => {
        if (err) return next(err);
        // Send back user object without the password
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
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