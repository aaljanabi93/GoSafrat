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
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User>;

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private flightBookings: Map<number, FlightBooking>;
  private hotelBookings: Map<number, HotelBooking>;
  private carRentals: Map<number, CarRental>;
  private payments: Map<number, Payment>;
  
  private userCurrentId: number;
  private flightBookingCurrentId: number;
  private hotelBookingCurrentId: number;
  private carRentalCurrentId: number;
  private paymentCurrentId: number;

  constructor() {
    this.users = new Map();
    this.flightBookings = new Map();
    this.hotelBookings = new Map();
    this.carRentals = new Map();
    this.payments = new Map();
    
    this.userCurrentId = 1;
    this.flightBookingCurrentId = 1;
    this.hotelBookingCurrentId = 1;
    this.carRentalCurrentId = 1;
    this.paymentCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User> {
    return this.updateUser(userId, { stripeCustomerId });
  }

  // Flight booking methods
  async createFlightBooking(booking: InsertFlightBooking): Promise<FlightBooking> {
    const id = this.flightBookingCurrentId++;
    const now = new Date();
    const flightBooking: FlightBooking = { ...booking, id, createdAt: now };
    this.flightBookings.set(id, flightBooking);
    return flightBooking;
  }

  async getFlightBooking(id: number): Promise<FlightBooking | undefined> {
    return this.flightBookings.get(id);
  }

  async getFlightBookingsByUser(userId: number): Promise<FlightBooking[]> {
    return Array.from(this.flightBookings.values()).filter(
      (booking) => booking.userId === userId,
    );
  }

  async updateFlightBooking(id: number, bookingData: Partial<FlightBooking>): Promise<FlightBooking> {
    const booking = await this.getFlightBooking(id);
    if (!booking) {
      throw new Error(`Flight booking with ID ${id} not found`);
    }
    
    const updatedBooking = { ...booking, ...bookingData };
    this.flightBookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Hotel booking methods
  async createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking> {
    const id = this.hotelBookingCurrentId++;
    const now = new Date();
    const hotelBooking: HotelBooking = { ...booking, id, createdAt: now };
    this.hotelBookings.set(id, hotelBooking);
    return hotelBooking;
  }

  async getHotelBooking(id: number): Promise<HotelBooking | undefined> {
    return this.hotelBookings.get(id);
  }

  async getHotelBookingsByUser(userId: number): Promise<HotelBooking[]> {
    return Array.from(this.hotelBookings.values()).filter(
      (booking) => booking.userId === userId,
    );
  }

  async updateHotelBooking(id: number, bookingData: Partial<HotelBooking>): Promise<HotelBooking> {
    const booking = await this.getHotelBooking(id);
    if (!booking) {
      throw new Error(`Hotel booking with ID ${id} not found`);
    }
    
    const updatedBooking = { ...booking, ...bookingData };
    this.hotelBookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Car rental methods
  async createCarRental(rental: InsertCarRental): Promise<CarRental> {
    const id = this.carRentalCurrentId++;
    const now = new Date();
    const carRental: CarRental = { ...rental, id, createdAt: now };
    this.carRentals.set(id, carRental);
    return carRental;
  }

  async getCarRental(id: number): Promise<CarRental | undefined> {
    return this.carRentals.get(id);
  }

  async getCarRentalsByUser(userId: number): Promise<CarRental[]> {
    return Array.from(this.carRentals.values()).filter(
      (rental) => rental.userId === userId,
    );
  }

  async updateCarRental(id: number, rentalData: Partial<CarRental>): Promise<CarRental> {
    const rental = await this.getCarRental(id);
    if (!rental) {
      throw new Error(`Car rental with ID ${id} not found`);
    }
    
    const updatedRental = { ...rental, ...rentalData };
    this.carRentals.set(id, updatedRental);
    return updatedRental;
  }

  // Payment methods
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const id = this.paymentCurrentId++;
    const now = new Date();
    const newPayment: Payment = { ...payment, id, createdAt: now };
    this.payments.set(id, newPayment);
    return newPayment;
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getPaymentsByUser(userId: number): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(
      (payment) => payment.userId === userId,
    );
  }

  async updatePayment(id: number, paymentData: Partial<Payment>): Promise<Payment> {
    const payment = await this.getPayment(id);
    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    
    const updatedPayment = { ...payment, ...paymentData };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }
}

export const storage = new MemStorage();
