import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import axios from "axios";
import { z } from "zod";
import { insertFlightBookingSchema, insertHotelBookingSchema, insertCarRentalSchema, insertPaymentSchema } from "@shared/schema";

// Check for required environment variables
if (!process.env.TRAVELPAYOUTS_MARKER || !process.env.TRAVELPAYOUTS_API_TOKEN) {
  console.warn("Missing Travelpayouts API credentials. Some functionality will not work.");
}

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing Stripe secret key. Payment functionality will not work.");
}

// Initialize Stripe if we have the secret key
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
  : undefined;

// Travelpayouts API base URL
const TRAVELPAYOUTS_API_BASE = "https://api.travelpayouts.com/v1";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Flight search endpoint
  app.get("/api/flights/search", async (req, res) => {
    try {
      const { origin, destination, departDate, returnDate, currency = "USD", adults = 1, tripClass = "Y" } = req.query;
      
      if (!origin || !destination || !departDate) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      // For now, return a sample response instead of calling the actual API
      // This helps avoid API rate limits during development
      const sampleData = {
        success: true,
        data: {
          [destination as string]: {
            "0": {
              price: 549,
              airline: "EK",
              flight_number: 123,
              departure_at: departDate,
              return_at: returnDate,
              expires_at: new Date(Date.now() + 86400000).toISOString()
            },
            "1": {
              price: 649,
              airline: "QR",
              flight_number: 456,
              departure_at: departDate,
              return_at: returnDate,
              expires_at: new Date(Date.now() + 86400000).toISOString()
            }
          }
        },
        currency: currency
      };

      // Simulation of API delay
      setTimeout(() => {
        res.json(sampleData);
      }, 500);
    } catch (error: any) {
      console.error("Flight search error:", error.message);
      res.status(500).json({ 
        message: "Error searching for flights", 
        error: error.message 
      });
    }
  });

  // Hotel search endpoint
  app.get("/api/hotels/search", async (req, res) => {
    try {
      const { destination, checkIn, checkOut, adults = 2, children = 0, rooms = 1 } = req.query;
      
      if (!destination || !checkIn || !checkOut) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      // Call Travelpayouts API for hotel search
      const response = await axios.get(`${TRAVELPAYOUTS_API_BASE}/hotels/search`, {
        params: {
          query: destination,
          check_in: checkIn,
          check_out: checkOut,
          adults,
          children,
          rooms,
          token: process.env.TRAVELPAYOUTS_API_TOKEN,
        },
        headers: {
          'X-Access-Token': process.env.TRAVELPAYOUTS_API_TOKEN
        }
      });

      res.json(response.data);
    } catch (error: any) {
      console.error("Hotel search error:", error.message);
      res.status(500).json({ 
        message: "Error searching for hotels", 
        error: error.message 
      });
    }
  });

  // Car rental search endpoint (using Travelpayouts API)
  app.get("/api/cars/search", async (req, res) => {
    try {
      const { pickupLocation, dropoffLocation, pickupDate, dropoffDate } = req.query;
      
      if (!pickupLocation || !pickupDate || !dropoffDate) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      // This is a placeholder as Travelpayouts might not have a direct car rental API
      // We'd need to integrate with their appropriate endpoint or a different provider
      
      // For now, return a mock response with a clear error message
      res.status(501).json({ 
        message: "Car rental search API not implemented",
        info: "This would integrate with Travelpayouts car rental API when available"
      });
    } catch (error: any) {
      console.error("Car search error:", error.message);
      res.status(500).json({ 
        message: "Error searching for car rentals", 
        error: error.message 
      });
    }
  });

  // Flight booking endpoint
  app.post("/api/flights/book", async (req, res) => {
    try {
      // Validate the request body against our schema
      const validatedData = insertFlightBookingSchema.parse(req.body);
      
      // Create the booking record
      const booking = await storage.createFlightBooking({
        ...validatedData,
        status: "pending" // Initial status
      });
      
      res.status(201).json(booking);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        console.error("Flight booking error:", error.message);
        res.status(500).json({ message: "Error creating flight booking" });
      }
    }
  });

  // Hotel booking endpoint
  app.post("/api/hotels/book", async (req, res) => {
    try {
      // Validate the request body against our schema
      const validatedData = insertHotelBookingSchema.parse(req.body);
      
      // Create the booking record
      const booking = await storage.createHotelBooking({
        ...validatedData,
        status: "pending" // Initial status
      });
      
      res.status(201).json(booking);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        console.error("Hotel booking error:", error.message);
        res.status(500).json({ message: "Error creating hotel booking" });
      }
    }
  });

  // Car rental booking endpoint
  app.post("/api/cars/book", async (req, res) => {
    try {
      // Validate the request body against our schema
      const validatedData = insertCarRentalSchema.parse(req.body);
      
      // Create the rental record
      const rental = await storage.createCarRental({
        ...validatedData,
        status: "pending" // Initial status
      });
      
      res.status(201).json(rental);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid car rental data", errors: error.errors });
      } else {
        console.error("Car rental error:", error.message);
        res.status(500).json({ message: "Error creating car rental" });
      }
    }
  });

  // Create Stripe payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe is not configured" });
      }

      const { amount, bookingType, bookingId, currency = "USD" } = req.body;
      
      if (!amount || !bookingType || !bookingId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      // Create payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
      });

      // Record the payment in our database
      const payment = await storage.createPayment({
        userId: req.body.userId || 1, // Default to user 1 if not provided
        bookingType,
        bookingId,
        amount,
        currency,
        status: "pending",
        stripePaymentId: paymentIntent.id
      });

      // Update the booking status
      if (bookingType === 'flight') {
        await storage.updateFlightBooking(bookingId, { 
          status: "payment_pending",
          paymentId: payment.id.toString()
        });
      } else if (bookingType === 'hotel') {
        await storage.updateHotelBooking(bookingId, { 
          status: "payment_pending",
          paymentId: payment.id.toString()
        });
      } else if (bookingType === 'car') {
        await storage.updateCarRental(bookingId, { 
          status: "payment_pending",
          paymentId: payment.id.toString()
        });
      }

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentId: payment.id
      });
    } catch (error: any) {
      console.error("Payment intent error:", error.message);
      res.status(500).json({ 
        message: "Error creating payment intent", 
        error: error.message 
      });
    }
  });

  // Payment success webhook handler
  app.post("/api/payment-success", async (req, res) => {
    try {
      const { paymentId, stripePaymentId } = req.body;
      
      if (!paymentId) {
        return res.status(400).json({ message: "Missing payment ID" });
      }

      // Update payment status
      const payment = await storage.updatePayment(parseInt(paymentId), {
        status: "completed"
      });

      // Update the associated booking status
      if (payment.bookingType === 'flight') {
        await storage.updateFlightBooking(payment.bookingId, { 
          status: "confirmed",
          bookingReference: `FLT-${payment.bookingId}-${Date.now().toString().substring(7)}`
        });
      } else if (payment.bookingType === 'hotel') {
        await storage.updateHotelBooking(payment.bookingId, { 
          status: "confirmed",
          bookingReference: `HTL-${payment.bookingId}-${Date.now().toString().substring(7)}`
        });
      } else if (payment.bookingType === 'car') {
        await storage.updateCarRental(payment.bookingId, { 
          status: "confirmed",
          bookingReference: `CAR-${payment.bookingId}-${Date.now().toString().substring(7)}`
        });
      }

      res.json({ 
        success: true,
        message: "Payment processed successfully"
      });
    } catch (error: any) {
      console.error("Payment success error:", error.message);
      res.status(500).json({ 
        message: "Error processing payment success", 
        error: error.message 
      });
    }
  });

  // Get airport data (for autocomplete)
  app.get("/api/airports", async (req, res) => {
    try {
      const { query } = req.query;
      
      if (!query || typeof query !== 'string' || query.length < 2) {
        return res.status(400).json({ message: "Query must be at least 2 characters" });
      }

      // Call Travelpayouts API for airport search
      const response = await axios.get(`${TRAVELPAYOUTS_API_BASE}/data/en/airports.json`, {
        headers: {
          'X-Access-Token': process.env.TRAVELPAYOUTS_API_TOKEN
        }
      });

      // Filter airports by query
      const filteredAirports = response.data
        .filter((airport: any) => 
          airport.name.toLowerCase().includes(query.toLowerCase()) || 
          airport.city.toLowerCase().includes(query.toLowerCase()) ||
          airport.code.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 10); // Limit to 10 results

      res.json(filteredAirports);
    } catch (error: any) {
      console.error("Airport search error:", error.message);
      res.status(500).json({ 
        message: "Error searching for airports", 
        error: error.message 
      });
    }
  });

  // Get city data (for hotel search)
  app.get("/api/cities", async (req, res) => {
    try {
      const { query } = req.query;
      
      if (!query || typeof query !== 'string' || query.length < 2) {
        return res.status(400).json({ message: "Query must be at least 2 characters" });
      }

      // Call Travelpayouts API for city search
      const response = await axios.get(`${TRAVELPAYOUTS_API_BASE}/data/en/cities.json`, {
        headers: {
          'X-Access-Token': process.env.TRAVELPAYOUTS_API_TOKEN
        }
      });

      // Filter cities by query
      const filteredCities = response.data
        .filter((city: any) => 
          city.name.toLowerCase().includes(query.toLowerCase()) ||
          city.code.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 10); // Limit to 10 results

      res.json(filteredCities);
    } catch (error: any) {
      console.error("City search error:", error.message);
      res.status(500).json({ 
        message: "Error searching for cities", 
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
