import { pgTable, text, serial, integer, boolean, jsonb, timestamp, numeric } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phoneNumber: text("phone_number"),
  stripeCustomerId: text("stripe_customer_id"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
});

export const flightBookings = pgTable("flight_bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  flightNumber: text("flight_number"),
  airline: text("airline"),
  departureCity: text("departure_city").notNull(),
  departureAirport: text("departure_airport").notNull(),
  departureTime: timestamp("departure_time").notNull(),
  arrivalCity: text("arrival_city").notNull(),
  arrivalAirport: text("arrival_airport").notNull(),
  arrivalTime: timestamp("arrival_time").notNull(),
  passengers: integer("passengers").notNull(),
  cabinClass: text("cabin_class").notNull(),
  price: numeric("price").notNull(),
  status: text("status").notNull(),
  paymentId: text("payment_id"),
  bookingReference: text("booking_reference"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFlightBookingSchema = createInsertSchema(flightBookings).omit({
  id: true,
  createdAt: true,
});

export const hotelBookings = pgTable("hotel_bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  hotelName: text("hotel_name").notNull(),
  city: text("city").notNull(),
  checkInDate: timestamp("check_in_date").notNull(),
  checkOutDate: timestamp("check_out_date").notNull(),
  rooms: integer("rooms").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children"),
  price: numeric("price").notNull(),
  status: text("status").notNull(),
  paymentId: text("payment_id"),
  bookingReference: text("booking_reference"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHotelBookingSchema = createInsertSchema(hotelBookings).omit({
  id: true,
  createdAt: true,
});

export const carRentals = pgTable("car_rentals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  pickupLocation: text("pickup_location").notNull(),
  dropoffLocation: text("dropoff_location").notNull(),
  pickupDate: timestamp("pickup_date").notNull(),
  pickupTime: text("pickup_time").notNull(),
  dropoffDate: timestamp("dropoff_date").notNull(),
  dropoffTime: text("dropoff_time").notNull(),
  carType: text("car_type").notNull(),
  price: numeric("price").notNull(),
  status: text("status").notNull(),
  paymentId: text("payment_id"),
  bookingReference: text("booking_reference"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCarRentalSchema = createInsertSchema(carRentals).omit({
  id: true,
  createdAt: true,
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  bookingType: text("booking_type").notNull(), // 'flight', 'hotel', or 'car'
  bookingId: integer("booking_id").notNull(),
  amount: numeric("amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull(),
  stripePaymentId: text("stripe_payment_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type FlightBooking = typeof flightBookings.$inferSelect;
export type InsertFlightBooking = z.infer<typeof insertFlightBookingSchema>;

export type HotelBooking = typeof hotelBookings.$inferSelect;
export type InsertHotelBooking = z.infer<typeof insertHotelBookingSchema>;

export type CarRental = typeof carRentals.$inferSelect;
export type InsertCarRental = z.infer<typeof insertCarRentalSchema>;

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

// Define relations between tables
export const usersRelations = relations(users, ({ many }) => ({
  flightBookings: many(flightBookings),
  hotelBookings: many(hotelBookings),
  carRentals: many(carRentals),
  payments: many(payments)
}));

export const flightBookingsRelations = relations(flightBookings, ({ one }) => ({
  user: one(users, {
    fields: [flightBookings.userId],
    references: [users.id]
  })
}));

export const hotelBookingsRelations = relations(hotelBookings, ({ one }) => ({
  user: one(users, {
    fields: [hotelBookings.userId],
    references: [users.id]
  })
}));

export const carRentalsRelations = relations(carRentals, ({ one }) => ({
  user: one(users, {
    fields: [carRentals.userId],
    references: [users.id]
  })
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id]
  })
}));
