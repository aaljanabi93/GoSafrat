import axios from "axios";

// Travelpayouts API Constants
const MARKER = import.meta.env.TRAVELPAYOUTS_MARKER || "621885";
const API_TOKEN = import.meta.env.TRAVELPAYOUTS_API_TOKEN || "1c24e617a235100cf967ad3ec6e8444f"; // Updated token

// Flight search interface
interface FlightSearchParams {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  adults?: number;
  children?: number;
  infants?: number;
  tripClass?: string;
  currency?: string;
}

// Hotel search interface
interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults?: number;
  children?: number;
  rooms?: number;
  currency?: string;
}

// Car rental search interface
interface CarSearchParams {
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime?: string;
  dropoffTime?: string;
}

// Payment intent interface
interface PaymentIntentParams {
  amount: number;
  currency?: string;
  bookingType: 'flight' | 'hotel' | 'car';
  bookingId: number;
}

// API wrapper functions
export const api = {
  // Flight search
  searchFlights: async (params: FlightSearchParams) => {
    try {
      const response = await axios.get("/api/flights/search", { params });
      return response.data;
    } catch (error) {
      console.error("Error searching flights:", error);
      throw error;
    }
  },

  // Hotel search
  searchHotels: async (params: HotelSearchParams) => {
    try {
      const response = await axios.get("/api/hotels/search", { params });
      return response.data;
    } catch (error) {
      console.error("Error searching hotels:", error);
      throw error;
    }
  },

  // Car rental search
  searchCars: async (params: CarSearchParams) => {
    try {
      const response = await axios.get("/api/cars/search", { params });
      return response.data;
    } catch (error) {
      console.error("Error searching cars:", error);
      throw error;
    }
  },

  // Create flight booking
  createFlightBooking: async (bookingData: any) => {
    try {
      const response = await axios.post("/api/flights/book", bookingData);
      return response.data;
    } catch (error) {
      console.error("Error creating flight booking:", error);
      throw error;
    }
  },

  // Create hotel booking
  createHotelBooking: async (bookingData: any) => {
    try {
      const response = await axios.post("/api/hotels/book", bookingData);
      return response.data;
    } catch (error) {
      console.error("Error creating hotel booking:", error);
      throw error;
    }
  },

  // Create car rental
  createCarRental: async (rentalData: any) => {
    try {
      const response = await axios.post("/api/cars/book", rentalData);
      return response.data;
    } catch (error) {
      console.error("Error creating car rental:", error);
      throw error;
    }
  },

  // Create payment intent
  createPaymentIntent: async (paymentData: PaymentIntentParams) => {
    try {
      const response = await axios.post("/api/create-payment-intent", paymentData);
      return response.data;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  },

  // Complete payment
  completePayment: async (paymentData: any) => {
    try {
      const response = await axios.post("/api/payment-success", paymentData);
      return response.data;
    } catch (error) {
      console.error("Error completing payment:", error);
      throw error;
    }
  },

  // Airport search
  searchAirports: async (query: string) => {
    try {
      const response = await axios.get("/api/airports", { params: { query } });
      return response.data;
    } catch (error) {
      console.error("Error searching airports:", error);
      throw error;
    }
  },

  // City search
  searchCities: async (query: string) => {
    try {
      const response = await axios.get("/api/cities", { params: { query } });
      return response.data;
    } catch (error) {
      console.error("Error searching cities:", error);
      throw error;
    }
  }
};