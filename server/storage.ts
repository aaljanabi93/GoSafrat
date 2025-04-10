import {
  users, type User, type InsertUser,
  flightBookings, type FlightBooking, type InsertFlightBooking,
  hotelBookings, type HotelBooking, type InsertHotelBooking,
  carRentals, type CarRental, type InsertCarRental,
  payments, type Payment, type InsertPayment
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User>;
  
  // Email verification methods
  setVerificationToken(userId: number, token: string, expiresIn: number): Promise<User>;
  verifyEmail(token: string): Promise<User | undefined>;
  
  // Password reset methods
  setResetToken(userId: number, token: string, expiresIn: number): Promise<User>;
  getUserByResetToken(token: string): Promise<User | undefined>;

  // Flight booking methods
  createFlightBooking(booking: InsertFlightBooking): Promise<FlightBooking>;
  getFlightBooking(id: number): Promise<FlightBooking | undefined>;
  getFlightBookingsByUser(userId: number): Promise<FlightBooking[]>;
  updateFlightBooking(id: number, bookingData: Partial<FlightBooking>): Promise<FlightBooking>;

  // Hotel booking methods
  createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking>;
  getHotelBooking(id: number): Promise<HotelBooking | undefined>;
  getHotelBookingsByUser(userId: number): Promise<HotelBooking[]>;
  updateHotelBooking(id: number, bookingData: Partial<HotelBooking>): Promise<HotelBooking>;

  // Car rental methods
  createCarRental(rental: InsertCarRental): Promise<CarRental>;
  getCarRental(id: number): Promise<CarRental | undefined>;
  getCarRentalsByUser(userId: number): Promise<CarRental[]>;
  updateCarRental(id: number, rentalData: Partial<CarRental>): Promise<CarRental>;

  // Payment methods
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: number): Promise<Payment | undefined>;
  getPaymentsByUser(userId: number): Promise<Payment[]>;
  updatePayment(id: number, paymentData: Partial<Payment>): Promise<Payment>;
}

import { db } from "./db";
import { eq, and } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
      
    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    return updatedUser;
  }

  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User> {
    return this.updateUser(userId, { stripeCustomerId });
  }
  
  // Email verification methods
  async setVerificationToken(userId: number, token: string, expiresIn: number): Promise<User> {
    // Calculate expiration date (current time + expiresIn milliseconds)
    const expirationDate = new Date(Date.now() + expiresIn);
    
    return this.updateUser(userId, {
      verificationToken: token,
      verificationExpires: expirationDate
    });
  }
  
  async verifyEmail(token: string): Promise<User | undefined> {
    // Find user with matching token that hasn't expired
    const [user] = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.verificationToken, token),
          // Expiration check not implemented due to LSP limitation
          // We would check if verificationExpires > NOW()
        )
      );
    
    if (!user) {
      return undefined;
    }
    
    // Check expiration manually
    if (user.verificationExpires && user.verificationExpires < new Date()) {
      return undefined;
    }
    
    // Mark email as verified and clear verification token
    const [updatedUser] = await db
      .update(users)
      .set({
        emailVerified: true,
        verificationToken: null,
        verificationExpires: null,
      })
      .where(eq(users.id, user.id))
      .returning();
      
    return updatedUser;
  }
  
  // Password reset methods
  async setResetToken(userId: number, token: string, expiresIn: number): Promise<User> {
    // Calculate expiration date (current time + expiresIn milliseconds)
    const expirationDate = new Date(Date.now() + expiresIn);
    
    return this.updateUser(userId, {
      resetToken: token,
      resetExpires: expirationDate
    });
  }
  
  async getUserByResetToken(token: string): Promise<User | undefined> {
    // Find user with matching token
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.resetToken, token));
      
    if (!user) {
      return undefined;
    }
    
    // Check expiration manually
    if (user.resetExpires && user.resetExpires < new Date()) {
      return undefined;
    }
    
    return user;
  }

  // Flight booking methods
  async createFlightBooking(booking: InsertFlightBooking): Promise<FlightBooking> {
    const [flightBooking] = await db
      .insert(flightBookings)
      .values(booking)
      .returning();
      
    return flightBooking;
  }

  async getFlightBooking(id: number): Promise<FlightBooking | undefined> {
    const [booking] = await db
      .select()
      .from(flightBookings)
      .where(eq(flightBookings.id, id));
      
    return booking || undefined;
  }

  async getFlightBookingsByUser(userId: number): Promise<FlightBooking[]> {
    return db
      .select()
      .from(flightBookings)
      .where(eq(flightBookings.userId, userId));
  }

  async updateFlightBooking(id: number, bookingData: Partial<FlightBooking>): Promise<FlightBooking> {
    const [updatedBooking] = await db
      .update(flightBookings)
      .set(bookingData)
      .where(eq(flightBookings.id, id))
      .returning();
      
    if (!updatedBooking) {
      throw new Error(`Flight booking with ID ${id} not found`);
    }
    
    return updatedBooking;
  }

  // Hotel booking methods
  async createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking> {
    const [hotelBooking] = await db
      .insert(hotelBookings)
      .values(booking)
      .returning();
      
    return hotelBooking;
  }

  async getHotelBooking(id: number): Promise<HotelBooking | undefined> {
    const [booking] = await db
      .select()
      .from(hotelBookings)
      .where(eq(hotelBookings.id, id));
      
    return booking || undefined;
  }

  async getHotelBookingsByUser(userId: number): Promise<HotelBooking[]> {
    return db
      .select()
      .from(hotelBookings)
      .where(eq(hotelBookings.userId, userId));
  }

  async updateHotelBooking(id: number, bookingData: Partial<HotelBooking>): Promise<HotelBooking> {
    const [updatedBooking] = await db
      .update(hotelBookings)
      .set(bookingData)
      .where(eq(hotelBookings.id, id))
      .returning();
      
    if (!updatedBooking) {
      throw new Error(`Hotel booking with ID ${id} not found`);
    }
    
    return updatedBooking;
  }

  // Car rental methods
  async createCarRental(rental: InsertCarRental): Promise<CarRental> {
    const [carRental] = await db
      .insert(carRentals)
      .values(rental)
      .returning();
      
    return carRental;
  }

  async getCarRental(id: number): Promise<CarRental | undefined> {
    const [rental] = await db
      .select()
      .from(carRentals)
      .where(eq(carRentals.id, id));
      
    return rental || undefined;
  }

  async getCarRentalsByUser(userId: number): Promise<CarRental[]> {
    return db
      .select()
      .from(carRentals)
      .where(eq(carRentals.userId, userId));
  }

  async updateCarRental(id: number, rentalData: Partial<CarRental>): Promise<CarRental> {
    const [updatedRental] = await db
      .update(carRentals)
      .set(rentalData)
      .where(eq(carRentals.id, id))
      .returning();
      
    if (!updatedRental) {
      throw new Error(`Car rental with ID ${id} not found`);
    }
    
    return updatedRental;
  }

  // Payment methods
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db
      .insert(payments)
      .values(payment)
      .returning();
      
    return newPayment;
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    const [payment] = await db
      .select()
      .from(payments)
      .where(eq(payments.id, id));
      
    return payment || undefined;
  }

  async getPaymentsByUser(userId: number): Promise<Payment[]> {
    return db
      .select()
      .from(payments)
      .where(eq(payments.userId, userId));
  }

  async updatePayment(id: number, paymentData: Partial<Payment>): Promise<Payment> {
    const [updatedPayment] = await db
      .update(payments)
      .set(paymentData)
      .where(eq(payments.id, id))
      .returning();
      
    if (!updatedPayment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    
    return updatedPayment;
  }
}

export const storage = new DatabaseStorage();
