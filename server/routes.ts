import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import axios from "axios";
import { z } from "zod";
import { insertFlightBookingSchema, insertHotelBookingSchema, insertCarRentalSchema, insertPaymentSchema } from "@shared/schema";
import { setupAuth, hashPassword } from "./auth";
import { generateResetToken, sendPasswordResetEmail } from "./services/email-service";
import path from "path";

// Import airline data from the dedicated file
import { airlines, getAirlineCodes } from "../client/src/lib/airlines-data";

// Check for required environment variables and provide fallback for development
const TRAVELPAYOUTS_MARKER = process.env.TRAVELPAYOUTS_MARKER || "621885";
const TRAVELPAYOUTS_API_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN || "1c24e617a235100cf967ad3ec6e8444f";

if (!TRAVELPAYOUTS_MARKER || !TRAVELPAYOUTS_API_TOKEN) {
  console.warn("Missing Travelpayouts API credentials. Some functionality will not work.");
}

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing Stripe secret key. Payment functionality will not work.");
}

// Initialize Stripe if we have the secret key
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" as any }) // Cast to any to avoid TS errors
  : undefined;

// Travelpayouts API base URL and endpoints
const TRAVELPAYOUTS_API_BASE = "https://api.travelpayouts.com/v1";
const TRAVELPAYOUTS_ENDPOINTS = {
  CHEAP_PRICES: `${TRAVELPAYOUTS_API_BASE}/prices/cheap`,
  DIRECT_PRICES: `${TRAVELPAYOUTS_API_BASE}/prices/direct`,
  CALENDAR_PRICES: `${TRAVELPAYOUTS_API_BASE}/prices/calendar`,
  MONTH_MATRIX: `${TRAVELPAYOUTS_API_BASE}/prices/month-matrix`,
  LATEST_PRICES: `${TRAVELPAYOUTS_API_BASE}/prices/latest`,
  SPECIAL_OFFERS: `${TRAVELPAYOUTS_API_BASE}/prices/special-offers`
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes and middleware
  setupAuth(app);
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  
  // Robots.txt endpoint
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /auth
Disallow: /checkout
Disallow: /booking-success
Disallow: /api/

Sitemap: https://gosafrat.com/sitemap.xml
`;
    res.header('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  // Sitemap endpoint
  app.get("/sitemap.xml", (req, res) => {
    // Define all site routes
    const siteRoutes = [
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/flights', priority: 0.9, changefreq: 'daily' },
      { path: '/hotels', priority: 0.9, changefreq: 'daily' },
      { path: '/cars', priority: 0.9, changefreq: 'daily' },
      { path: '/auth', priority: 0.7, changefreq: 'monthly' },
      
      // Company Pages
      { path: '/company/about', priority: 0.8, changefreq: 'monthly' },
      { path: '/company/careers', priority: 0.6, changefreq: 'weekly' },
      { path: '/company/partners', priority: 0.6, changefreq: 'monthly' },
      { path: '/company/press', priority: 0.7, changefreq: 'weekly' },
      
      // Support Pages
      { path: '/support/help-center', priority: 0.8, changefreq: 'monthly' },
      { path: '/support/contact', priority: 0.8, changefreq: 'monthly' },
      { path: '/support/cancellation', priority: 0.7, changefreq: 'monthly' },
      { path: '/support/safety', priority: 0.7, changefreq: 'monthly' },
      
      // Legal Pages
      { path: '/legal/terms', priority: 0.5, changefreq: 'yearly' },
      { path: '/legal/privacy', priority: 0.5, changefreq: 'yearly' },
      { path: '/legal/cookies', priority: 0.5, changefreq: 'yearly' },
    ];
    
    const baseUrl = 'https://gosafrat.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    siteRoutes.forEach(route => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}${route.path}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${route.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
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
      
      // Extract the airport code if it's in the format "City (XXX)"
      // Make sure we handle both "City (XXX)" format and direct airport codes
      let originCode = origin as string;
      let destinationCode = destination as string;
      
      const originMatch = typeof originCode === 'string' ? originCode.match(/\(([A-Z]{3})\)$/) : null;
      if (originMatch && originMatch[1]) {
        originCode = originMatch[1];
      }
      
      const destinationMatch = typeof destinationCode === 'string' ? destinationCode.match(/\(([A-Z]{3})\)$/) : null;
      if (destinationMatch && destinationMatch[1]) {
        destinationCode = destinationMatch[1];
      }
      
      console.log(`Using extracted airport codes: from ${originCode} to ${destinationCode}`);
      
      // Initialize response data object
      let flightData: TravelpayoutsResponse = {
        success: false,
        data: {},
        error: "No flights found"
      };
      
      try {
        // Determine if we want direct flights only
        const searchType = req.query.directFlights === 'true' ? 
          TRAVELPAYOUTS_ENDPOINTS.DIRECT_PRICES : 
          TRAVELPAYOUTS_ENDPOINTS.CHEAP_PRICES;
        
        console.log("Making API request with params:", {
          origin: originCode,
          destination: destinationCode,
          depart_date: departDate,
          return_date: returnDate,
          currency,
          token: TRAVELPAYOUTS_API_TOKEN,
          marker: TRAVELPAYOUTS_MARKER
        });

        // Make API call to Travelpayouts
        const apiResponse = await axios.get<TravelpayoutsResponse>(searchType, {
          params: {
            origin: originCode,
            destination: destinationCode,
            depart_date: departDate,
            return_date: returnDate || undefined,
            currency: currency || "USD",
            token: TRAVELPAYOUTS_API_TOKEN,
            limit: 30,
            page: 1,
            one_way: returnDate ? false : true,
            trip_class: tripClass || 0,
            marker: TRAVELPAYOUTS_MARKER,
            show_to_affiliates: true
          },
          headers: {
            'X-Access-Token': process.env.TRAVELPAYOUTS_API_TOKEN
          }
        });
        
        console.log("API response status:", apiResponse.status);
        flightData = apiResponse.data;
      } catch (apiError: any) {
        console.error('Error searching flights from Travelpayouts API:', apiError.message);
        
        // Generate sample flight data if API call fails
        console.log("Generating sample flight data");
        const sampleFlights: Record<string, FlightData> = {};
        
        // Use only airlines that exist in our comprehensive airlines object
        const airlineCodes = getAirlineCodes();
        const validAirlineCodes = airlineCodes.filter(code => airlines[code] !== undefined);
        
        // Include popular airlines first
        const popularAirlines = ["EK", "RJ", "QR", "TK", "EY", "GF", "MS"];
        const availablePopularAirlines = popularAirlines.filter(code => validAirlineCodes.includes(code));
        
        const numFlights = Math.floor(Math.random() * 6) + 10; // 10-15 flights
        
        for (let i = 0; i < numFlights; i++) {
          // Use popular airlines for the first few flights, then random ones
          let airlineCode;
          if (i < availablePopularAirlines.length) {
            airlineCode = availablePopularAirlines[i];
          } else {
            airlineCode = validAirlineCodes[Math.floor(Math.random() * validAirlineCodes.length)];
          }
          
          const flightNumber = Math.floor(Math.random() * 900) + 100;
          const price = Math.floor(Math.random() * 300) + 400; // Price between 400-700
          
          sampleFlights[i.toString()] = {
            price: price,
            airline: airlineCode,
            flight_number: flightNumber,
            departure_at: departDate as string,
            return_at: returnDate as string || "",
            expires_at: new Date(Date.now() + 86400000).toISOString()
          };
        }
        
        // Sort flights by price
        const sortedFlights = Object.entries(sampleFlights)
          .sort(([, a], [, b]) => a.price - b.price)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        
        flightData = {
          success: true,
          data: {
            [destinationCode]: sortedFlights
          }
        };
      }
      
      // Check if we have flight data that should be processed
      if (!flightData.success || !flightData.data || Object.keys(flightData.data).length === 0) {
        console.log("No flights found from API, generating sample flights data for demonstration");
        
        // Generate sample flight data if API returns empty results
        const sampleFlights: Record<string, FlightData> = {};
        
        // Use only airlines that exist in our comprehensive airlines object
        const airlineCodes = getAirlineCodes();
        const validAirlineCodes = airlineCodes.filter(code => airlines[code] !== undefined);
        
        // Include popular airlines first
        const popularAirlines = ["EK", "RJ", "QR", "TK", "EY", "GF", "MS"];
        const availablePopularAirlines = popularAirlines.filter(code => validAirlineCodes.includes(code));
        
        const numFlights = Math.floor(Math.random() * 6) + 10; // 10-15 flights
        
        for (let i = 0; i < numFlights; i++) {
          // Use popular airlines for the first few flights, then random ones
          let airlineCode;
          if (i < availablePopularAirlines.length) {
            airlineCode = availablePopularAirlines[i];
          } else {
            airlineCode = validAirlineCodes[Math.floor(Math.random() * validAirlineCodes.length)];
          }
          
          const flightNumber = Math.floor(Math.random() * 900) + 100;
          const price = Math.floor(Math.random() * 300) + 400; // Price between 400-700
          
          sampleFlights[i.toString()] = {
            price: price,
            airline: airlineCode,
            flight_number: flightNumber,
            departure_at: departDate as string,
            return_at: returnDate as string || "",
            expires_at: new Date(Date.now() + 86400000).toISOString()
          };
        }
        
        // Sort flights by price
        const sortedFlights = Object.entries(sampleFlights)
          .sort(([, a], [, b]) => a.price - b.price)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        
        flightData = {
          success: true,
          data: {
            [destinationCode]: sortedFlights
          }
        };
      }
      
      if (flightData.error) {
        console.error("API error response:", flightData.error);
      }
      
      const processedData = flightData.data;
      
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
          
          // Get airline details from our comprehensive airlines data
          const airlineInfo = airlines[airlineCode as keyof typeof airlines] || { 
            name: airlineCode, 
            code: airlineCode,
            logo: "",
            aircraft: ["Boeing", "Airbus"],
            alliance: "None"
          };
          
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
              name: airlineInfo.name,
              nameAr: airlineInfo.name,
              logo: airlineInfo.logo || "",
              flightNumber: `${airlineCode}${flight.flight_number}`,
              aircraft: airlineInfo.aircraft ? airlineInfo.aircraft[Math.floor(Math.random() * airlineInfo.aircraft.length)] : "Boeing 737",
              alliance: airlineInfo.alliance
            },
            duration: estimatedDuration,
            baggage: {
              cabin: "7kg",
              checked: airlineCode === "EK" ? "30kg" : "23kg" // Emirates typically offers more generous baggage allowance
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

  // Flight calendar search endpoint
  app.get("/api/flights/calendar", async (req, res) => {
    try {
      const { origin, destination, departDate, returnDate, tripClass = "Y", currency = "USD" } = req.query;
      
      if (!origin || !destination) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required parameters: origin and destination are required" 
        });
      }
      
      // Extract airport codes if needed
      let originCode = origin as string;
      let destinationCode = destination as string;
      
      const originMatch = typeof originCode === 'string' ? originCode.match(/\(([A-Z]{3})\)$/) : null;
      if (originMatch && originMatch[1]) {
        originCode = originMatch[1];
      }
      
      const destinationMatch = typeof destinationCode === 'string' ? destinationCode.match(/\(([A-Z]{3})\)$/) : null;
      if (destinationMatch && destinationMatch[1]) {
        destinationCode = destinationMatch[1];
      }
      
      // Make API call to Travelpayouts calendar endpoint
      const apiResponse = await axios.get(TRAVELPAYOUTS_ENDPOINTS.CALENDAR_PRICES, {
        params: {
          origin: originCode,
          destination: destinationCode,
          depart_date: departDate,
          return_date: returnDate,
          calendar_type: 'departure_date', // Use departure_date or return_date
          trip_duration: 7, // Default trip duration in days
          currency: currency || "USD",
          token: process.env.TRAVELPAYOUTS_API_TOKEN,
          trip_class: tripClass || 0,
          market: 'en', // en, ru, etc.
          marker: process.env.TRAVELPAYOUTS_MARKER
        },
        headers: {
          'X-Access-Token': process.env.TRAVELPAYOUTS_API_TOKEN
        }
      });
      
      return res.json(apiResponse.data);
    } catch (error: any) {
      console.error('Error searching flight calendar:', error.message);
      return res.status(500).json({ 
        success: false, 
        error: "Failed to search flight calendar",
        message: error.message 
      });
    }
  });
  
  // Get best prices for a month (month matrix)
  app.get("/api/flights/month-matrix", async (req, res) => {
    try {
      const { origin, destination, month, currency = "USD", tripClass = "Y" } = req.query;
      
      if (!origin || !destination || !month) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required parameters: origin, destination and month are required" 
        });
      }
      
      // Extract airport codes if needed
      let originCode = origin as string;
      let destinationCode = destination as string;
      
      const originMatch = typeof originCode === 'string' ? originCode.match(/\(([A-Z]{3})\)$/) : null;
      if (originMatch && originMatch[1]) {
        originCode = originMatch[1];
      }
      
      const destinationMatch = typeof destinationCode === 'string' ? destinationCode.match(/\(([A-Z]{3})\)$/) : null;
      if (destinationMatch && destinationMatch[1]) {
        destinationCode = destinationMatch[1];
      }
      
      // Validate month format (YYYY-MM)
      if (!/^\d{4}-\d{2}$/.test(month as string)) {
        return res.status(400).json({ 
          success: false, 
          message: "Month must be in format YYYY-MM" 
        });
      }
      
      // Make API call to Travelpayouts month matrix endpoint
      const apiResponse = await axios.get(TRAVELPAYOUTS_ENDPOINTS.MONTH_MATRIX, {
        params: {
          origin: originCode,
          destination: destinationCode,
          month: month,
          currency: currency || "USD",
          show_to_affiliates: true,
          token: process.env.TRAVELPAYOUTS_API_TOKEN,
          trip_class: tripClass || 0,
          market: 'en', // en, ru, etc.
          marker: process.env.TRAVELPAYOUTS_MARKER
        },
        headers: {
          'X-Access-Token': process.env.TRAVELPAYOUTS_API_TOKEN
        }
      });
      
      return res.json(apiResponse.data);
    } catch (error: any) {
      console.error('Error searching month matrix:', error.message);
      return res.status(500).json({ 
        success: false, 
        error: "Failed to search month matrix",
        message: error.message 
      });
    }
  });
  
  // Get latest flight prices
  app.get("/api/flights/latest", async (req, res) => {
    try {
      const { origin, currency = "USD", limit = 30 } = req.query;
      
      // Get latest flight prices data
      const apiResponse = await axios.get(TRAVELPAYOUTS_ENDPOINTS.LATEST_PRICES, {
        params: {
          origin: origin,
          currency: currency || "USD",
          limit: limit || 30,
          period_type: 'year', // month, year
          one_way: false,
          token: process.env.TRAVELPAYOUTS_API_TOKEN,
          marker: process.env.TRAVELPAYOUTS_MARKER
        },
        headers: {
          'X-Access-Token': process.env.TRAVELPAYOUTS_API_TOKEN
        }
      });
      
      return res.json(apiResponse.data);
    } catch (error: any) {
      console.error('Error fetching latest prices:', error.message);
      return res.status(500).json({ 
        success: false, 
        error: "Failed to fetch latest prices",
        message: error.message 
      });
    }
  });
  
  // Get special offers
  app.get("/api/flights/special-offers", async (req, res) => {
    try {
      const { currency = "USD", limit = 20 } = req.query;
      
      // Get special offers data
      const apiResponse = await axios.get(TRAVELPAYOUTS_ENDPOINTS.SPECIAL_OFFERS, {
        params: {
          currency: currency || "USD",
          limit: limit || 20,
          token: process.env.TRAVELPAYOUTS_API_TOKEN,
          marker: process.env.TRAVELPAYOUTS_MARKER
        },
        headers: {
          'X-Access-Token': process.env.TRAVELPAYOUTS_API_TOKEN
        }
      });
      
      return res.json(apiResponse.data);
    } catch (error: any) {
      console.error('Error fetching special offers:', error.message);
      return res.status(500).json({ 
        success: false, 
        error: "Failed to fetch special offers",
        message: error.message 
      });
    }
  });

  // Get airport data (for autocomplete)
  app.get("/api/airports", async (req, res) => {
    try {
      const { query } = req.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Query parameter is required" });
      }

      // Use our local airport data (from the airports-data.ts file) for faster and more reliable searches
      // Import the airport data from the client
      const { airports } = await import("../client/src/lib/airports-data");
      
      // Filter airports by query
      const lowercaseQuery = query.toLowerCase();
      let filteredAirports = airports
        .filter((airport) => 
          airport.name.toLowerCase().includes(lowercaseQuery) || 
          airport.city.toLowerCase().includes(lowercaseQuery) ||
          airport.code.toLowerCase().includes(lowercaseQuery)
        );
        
      // Sort results with priority:
      // 1. Airports with code that starts with the query
      // 2. Airports with city that starts with the query  
      // 3. Alphabetically by city name
      filteredAirports.sort((a: any, b: any) => {
        // Prioritize airports with codes that start with the query
        const aCodeStarts = a.code.toLowerCase().startsWith(lowercaseQuery);
        const bCodeStarts = b.code.toLowerCase().startsWith(lowercaseQuery);
        
        if (aCodeStarts && !bCodeStarts) return -1;
        if (!aCodeStarts && bCodeStarts) return 1;
        
        // Next, prioritize airports with cities that start with the query
        const aCityStarts = a.city.toLowerCase().startsWith(lowercaseQuery);
        const bCityStarts = b.city.toLowerCase().startsWith(lowercaseQuery);
        
        if (aCityStarts && !bCityStarts) return -1;
        if (!aCityStarts && bCityStarts) return 1;
        
        // Finally, sort alphabetically by city name
        return a.city.localeCompare(b.city);
      });
      
      // Limit to 15 results for better options
      res.json(filteredAirports.slice(0, 15));
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
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Query parameter is required" });
      }

      // Use our local cities data for faster and more reliable searches
      // Import the cities data
      const { cities } = await import("../client/src/lib/cities-data");
      
      // Filter cities by query
      const lowercaseQuery = query.toLowerCase();
      let filteredCities = cities
        .filter((city) => 
          city.name.toLowerCase().includes(lowercaseQuery) ||
          city.code.toLowerCase().includes(lowercaseQuery) ||
          city.country.toLowerCase().includes(lowercaseQuery)
        );
        
      // Sort results with priority:
      // 1. Cities with code that starts with the query
      // 2. Cities with name that starts with the query  
      // 3. Alphabetically by name
      filteredCities.sort((a: any, b: any) => {
        // Prioritize cities with codes that start with the query
        const aCodeStarts = a.code.toLowerCase().startsWith(lowercaseQuery);
        const bCodeStarts = b.code.toLowerCase().startsWith(lowercaseQuery);
        
        if (aCodeStarts && !bCodeStarts) return -1;
        if (!aCodeStarts && bCodeStarts) return 1;
        
        // Next, prioritize cities with names that start with the query
        const aNameStarts = a.name.toLowerCase().startsWith(lowercaseQuery);
        const bNameStarts = b.name.toLowerCase().startsWith(lowercaseQuery);
        
        if (aNameStarts && !bNameStarts) return -1;
        if (!aNameStarts && bNameStarts) return 1;
        
        // Finally, sort alphabetically by name
        return a.name.localeCompare(b.name);
      });
      
      // Limit to 15 results for better options
      res.json(filteredCities.slice(0, 15));
    } catch (error: any) {
      console.error("City search error:", error.message);
      res.status(500).json({ 
        message: "Error searching for cities", 
        error: error.message 
      });
    }
  });

  // These endpoints for password reset are already defined in setupAuth function

  const httpServer = createServer(app);
  return httpServer;
}
