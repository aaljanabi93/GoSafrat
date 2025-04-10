import React, { createContext, useState, useContext, ReactNode } from "react";

// Define booking types
export interface BaggageInfo {
  cabin: string;
  checked: string;
}

export interface FlightStop {
  airport: string;
  city: string;
  duration: string;
}

export interface FlightBookingData {
  type: "flight";
  departureCity: string;
  departureAirport: string;
  departureTime: string;
  arrivalCity: string;
  arrivalAirport: string;
  arrivalTime: string;
  passengers: number;
  cabinClass: string;
  price: number;
  airline?: string;
  flightNumber?: string;
  returnFlight?: boolean;
  returnDepartureTime?: string;
  returnArrivalTime?: string;
  baggage?: BaggageInfo;
  stops?: FlightStop[];
  visaRequired?: boolean;
  duration?: string;
}

interface HotelBookingData {
  type: "hotel";
  hotelName: string;
  city: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  adults: number;
  children: number;
  price: number;
}

interface CarRentalData {
  type: "car";
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  carType: string;
  price: number;
}

export type BookingData = FlightBookingData | HotelBookingData | CarRentalData;

interface BookingContextType {
  currentBooking: BookingData | null;
  setFlightBooking: (data: FlightBookingData) => void;
  setHotelBooking: (data: HotelBookingData) => void;
  setCarRental: (data: CarRentalData) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState<BookingData | null>(null);

  const setFlightBooking = (data: FlightBookingData) => {
    setCurrentBooking(data);
  };

  const setHotelBooking = (data: HotelBookingData) => {
    setCurrentBooking(data);
  };

  const setCarRental = (data: CarRentalData) => {
    setCurrentBooking(data);
  };

  const clearBooking = () => {
    setCurrentBooking(null);
  };

  return (
    <BookingContext.Provider value={{ 
      currentBooking, 
      setFlightBooking, 
      setHotelBooking, 
      setCarRental, 
      clearBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
