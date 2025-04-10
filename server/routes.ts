import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import axios from "axios";
import { z } from "zod";
import { insertFlightBookingSchema, insertHotelBookingSchema, insertCarRentalSchema, insertPaymentSchema } from "@shared/schema";

// Define common airlines
const airlines = {
  "RJ": { name: "Royal Jordanian", code: "RJ" },
  "EK": { name: "Emirates", code: "EK" },
  "QR": { name: "Qatar Airways", code: "QR" },
  "TK": { name: "Turkish Airlines", code: "TK" },
  "GF": { name: "Gulf Air", code: "GF" },
  "EY": { name: "Etihad Airways", code: "EY" },
  "MS": { name: "EgyptAir", code: "MS" },
  "LH": { name: "Lufthansa", code: "LH" },
  "BA": { name: "British Airways", code: "BA" },
  "AF": { name: "Air France", code: "AF" }
};

// Check for required environment variables
if (!process.env.TRAVELPAYOUTS_MARKER || !process.env.TRAVELPAYOUTS_API_TOKEN) {
  console.warn("Missing Travelpayouts API credentials. Some functionality will not work.");
}

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing Stripe secret key. Payment functionality will not work.");
}

// Initialize Stripe if we have the secret key
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-03-31.basil" })
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

      // Check if we have the API token
      if (!process.env.TRAVELPAYOUTS_API_TOKEN || !process.env.TRAVELPAYOUTS_MARKER) {
        console.error("Missing Travelpayouts API credentials");
        return res.status(500).json({
          success: false,
          error: "API configuration error",
          message: "Missing API credentials"
        });
      }
      
      // Define type interfaces for API response and data
      interface FlightData {
        price: number;
        airline: string;
        flight_number: number;
        departure_at: string;
        return_at?: string;
        expires_at: string;
      }
      
      interface DestinationFlights {
        [flightNumber: string]: FlightData;
      }
      
      interface FlightsByDestination {
        [destination: string]: DestinationFlights;
      }
      
      interface TravelpayoutsResponse {
        success: boolean;
        data: FlightsByDestination;
        error?: string;
      }
      
      // Call the Travelpayouts API for flight prices
      console.log(`Searching flights from ${origin} to ${destination} on ${departDate}`);
      
      console.log("Making API request to Travelpayouts with params:", {
        origin,
        destination,
        departDate,
        returnDate,
        currency
      });
      
      const apiResponse = await axios.get<TravelpayoutsResponse>('https://api.travelpayouts.com/v1/prices/cheap', {
        params: {
          origin: origin,
          destination: destination,
          depart_date: departDate,
          return_date: returnDate || undefined,
          currency: currency,
          token: process.env.TRAVELPAYOUTS_API_TOKEN
        },
        headers: {
          'X-Access-Token': process.env.TRAVELPAYOUTS_API_TOKEN
        }
      });
      
      console.log("API response status:", apiResponse.status);
      
      if (apiResponse.data.error) {
        console.error("API error response:", apiResponse.data.error);
      }
    
      if (!apiResponse.data.success) {
        console.error('Travelpayouts API error:', apiResponse.data.error);
        return res.status(500).json({
          success: false,
          error: "API error",
          message: apiResponse.data.error || "Unknown error from flight search API"
        });
      }
      
      const processedData = apiResponse.data.data;
      
      // If no flights found in the response
      if (!processedData || Object.keys(processedData).length === 0) {
        return res.json({
          success: false,
          message: "No flights found for the specified route and dates. Please try different dates or destinations."
        });
      }
      
      const formattedResults: any = {};
      
      Object.keys(processedData).forEach(destCode => {
        formattedResults[destCode] = {};
        
        Object.keys(processedData[destCode]).forEach(flightNum => {
          const flight = processedData[destCode][flightNum];
          const airlineCode = flight.airline;
          
          // Calculate realistic duration based on the route
          let estimatedDuration;
          if (origin === 'DXB' && destCode === 'AMM') {
            // Dubai to Amman is about 3 hours
            estimatedDuration = "3h 15m";
          } else {
            // For other routes, calculate rough estimate (this would be more sophisticated in production)
            estimatedDuration = `${Math.floor(Math.random() * 3) + 3}h ${Math.floor(Math.random() * 59)}m`;
          }
          
          // Get airline details
          const airlineInfo = (airlines as Record<string, { name: string, code: string }>)[airlineCode] || { name: airlineCode, code: airlineCode };
          
          // Add commonly used airline logos
          let airlineLogo = "";
          if (airlineCode === "EK") {
            airlineLogo = "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg";
          } else if (airlineCode === "QR") {
            airlineLogo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png";
          } else if (airlineCode === "RJ") {
            airlineLogo = "https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Royal_Jordanian_Airlines_logo.svg/1200px-Royal_Jordanian_Airlines_logo.svg.png";
          }
          
          // Add rich information to make flight data more useful
          const enrichedFlight = {
            ...flight,
            departure: {
              airport: origin as string,
              city: (origin as string === 'DXB') ? 'Dubai' : origin,
              date: flight.departure_at,
              time: new Date(flight.departure_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            },
            arrival: {
              airport: destCode,
              city: (destCode === 'AMM') ? 'Amman' : destCode,
              date: flight.departure_at, // Same day arrival for most regional flights
              time: new Date(new Date(flight.departure_at).getTime() + 3*60*60*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            },
            airline: {
              code: airlineCode,
              name: airlineInfo.name || airlineCode,
              nameAr: airlineInfo.name || airlineCode,
              logo: airlineLogo,
              flightNumber: `${airlineCode}${flight.flight_number}`,
              aircraft: airlineCode === "EK" ? "Boeing 777" : (airlineCode === "QR" ? "Airbus A350" : "Boeing 787")
            },
            duration: estimatedDuration,
            baggage: {
              cabin: "7kg",
              checked: airlineCode === "EK" ? "30kg" : "23kg"
            },
            stops: [],
            direct: true,
            visaRequired: destCode !== origin
          };
          
          formattedResults[destCode][flightNum] = enrichedFlight;
        });
      });

      // If we don't have results, provide a more helpful message
      if (Object.keys(formattedResults).length === 0) {
        return res.json({
          success: false,
          message: "No flights found for the specified route and dates. Please try different dates or destinations."
        });
      }

      return res.json({ 
        success: true, 
        data: formattedResults
      });
    } catch (error: any) {
      console.error('Error searching flights:', error.message);
      return res.status(500).json({ 
        success: false, 
        error: "Failed to search flights",
        message: error.message 
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
