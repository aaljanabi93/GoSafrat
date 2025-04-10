import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking, AirlineInfo } from "@/context/booking-context";
import { useCurrency } from "@/context/currency-context";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { LoadingSpinner, LoadingSpinnerWithText } from "@/components/ui/loading-spinners";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { 
  Elements, 
  PaymentElement, 
  useStripe, 
  useElements 
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { api } from "@/lib/api";

// Initialize Stripe with the public key
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.warn('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51RBpcTChOypw3eWimIjK4ZAZgwo8rbKYYWn7FvWvm0exirOfepmqbVAk8ZBFZpln0lhLvvF1UnsBv5noI88mbO0u00zKkMcf1S');

// Checkout form component for passenger/customer details
const BookingDetailsForm = ({ onContinue }: { onContinue: () => void }) => {
  const { t, language } = useLanguage();
  const { currentBooking } = useBooking();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    passportNumber: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: t("Missing Information", "معلومات ناقصة"),
        description: t("Please fill in all required fields", "يرجى ملء جميع الحقول المطلوبة"),
        variant: "destructive"
      });
      return;
    }
    
    // Continue to payment
    onContinue();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="p-6">
          <h3 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Passenger Details", "بيانات المسافر")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className={language === 'ar' ? 'font-cairo' : ''}>
                {t("First Name", "الاسم الأول")} *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="lastName" className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Last Name", "اسم العائلة")} *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Email", "البريد الإلكتروني")} *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Phone Number", "رقم الهاتف")} *
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="nationality" className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Nationality", "الجنسية")}
              </Label>
              <Input
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <Label htmlFor="passportNumber" className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Passport Number", "رقم جواز السفر")}
              </Label>
              <Input
                id="passportNumber"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              type="submit"
              className="bg-primary"
            >
              <span className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Continue to Payment", "متابعة إلى الدفع")}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

// Payment form component using Stripe
const PaymentForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { t, language } = useLanguage();
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/booking-success",
        },
        redirect: "if_required",
      });
      
      if (error) {
        toast({
          title: t("Payment Failed", "فشل الدفع"),
          description: error.message || t("An error occurred with your payment", "حدث خطأ في عملية الدفع"),
          variant: "destructive"
        });
        setIsProcessing(false);
      } else {
        // Payment succeeded, navigate to success page
        navigate("/booking-success");
      }
    } catch (err: any) {
      toast({
        title: t("Payment Error", "خطأ في الدفع"),
        description: err.message || t("An unexpected error occurred", "حدث خطأ غير متوقع"),
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="p-6">
          <h3 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Payment Details", "تفاصيل الدفع")}
          </h3>
          
          <PaymentElement />
          
          <div className="mt-6 flex justify-end">
            <Button 
              type="submit"
              className="bg-primary"
              disabled={!stripe || isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <LoadingSpinner variant="luggage" size="sm" className="mr-2" />
                  {t("Processing...", "جارٍ المعالجة...")}
                </div>
              ) : (
                <span className={language === 'ar' ? 'font-cairo' : ''}>
                  {t("Complete Booking", "إتمام الحجز")}
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

// Main Checkout page component
export default function Checkout() {
  const { t, language } = useLanguage();
  const { currentBooking } = useBooking();
  const { formatPrice } = useCurrency();
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1); // 1 = Details, 2 = Payment
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect to home if no booking is present
  useEffect(() => {
    if (!currentBooking) {
      navigate("/");
      toast({
        title: t("No Booking Selected", "لم يتم تحديد حجز"),
        description: t("Please search and select a booking first", "يرجى البحث وتحديد حجز أولاً"),
        variant: "destructive"
      });
    }
  }, [currentBooking, navigate, toast, t]);
  
  // Set document title
  useEffect(() => {
    document.title = t("Checkout - Safrat Travel", "الدفع - سفرات");
  }, [language, t]);
  
  // Create payment intent when moving to payment step
  useEffect(() => {
    if (step === 2 && currentBooking && !clientSecret) {
      createPaymentIntent();
    }
  }, [step, currentBooking, clientSecret]);
  
  // Function to create payment intent
  const createPaymentIntent = async () => {
    if (!currentBooking) return;
    
    setIsLoading(true);
    try {
      let bookingType: 'flight' | 'hotel' | 'car';
      let bookingId = 1; // Mock ID since we're using memory storage
      
      if (currentBooking.type === "flight") {
        bookingType = "flight";
      } else if (currentBooking.type === "hotel") {
        bookingType = "hotel";
      } else if (currentBooking.type === "car") {
        bookingType = "car";
      } else {
        throw new Error("Invalid booking type");
      }
      
      // Create payment intent
      const response = await api.createPaymentIntent({
        amount: currentBooking.price,
        currency: "USD",
        bookingType,
        bookingId
      });
      
      setClientSecret(response.clientSecret);
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      toast({
        title: t("Payment Setup Error", "خطأ في إعداد الدفع"),
        description: error.message || t("Failed to setup payment", "فشل في إعداد الدفع"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper functions to format booking details
  const formatBookingDetails = () => {
    if (!currentBooking) return null;
    
    if (currentBooking.type === "flight") {
      // Base details that are always needed
      const details = [
        {
          label: t("Flight", "الرحلة"),
          value: typeof currentBooking.airline === 'object' && currentBooking.airline && 'name' in (currentBooking.airline as object) 
            ? (currentBooking.airline as any).name 
            : currentBooking.airline || t("Selected Flight", "الرحلة المحددة")
        },
        {
          label: t("Flight Number", "رقم الرحلة"),
          value: currentBooking.flightNumber || "-"
        },
        {
          label: t("From", "من"),
          value: `${currentBooking.departureCity} (${currentBooking.departureAirport})`
        },
        {
          label: t("To", "إلى"),
          value: `${currentBooking.arrivalCity} (${currentBooking.arrivalAirport})`
        },
        {
          label: t("Departure", "المغادرة"),
          value: currentBooking.departureTime && !isNaN(new Date(currentBooking.departureTime).getTime()) 
            ? format(new Date(currentBooking.departureTime), "EEE, MMM d, yyyy") + " at " + 
              new Date(currentBooking.departureTime).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit', hour12: true})
            : (typeof currentBooking.departureTime === 'string' ? currentBooking.departureTime : "-")
        },
        {
          label: t("Duration", "المدة"),
          value: currentBooking.duration || "-"
        },
        {
          label: t("Passengers", "المسافرين"),
          value: currentBooking.passengers
        },
        {
          label: t("Class", "الدرجة"),
          value: currentBooking.cabinClass === "economy" 
            ? t("Economy", "اقتصادي") 
            : currentBooking.cabinClass === "business" 
              ? t("Business", "رجال الأعمال")
              : t("First Class", "الدرجة الأولى")
        }
      ];

      // Add baggage information if available
      if (currentBooking.baggage) {
        details.push({
          label: t("Baggage Allowance", "السماح بالأمتعة"),
          value: `${t("Cabin", "مقصورة")}: ${currentBooking.baggage.cabin}, ${t("Checked", "مسجلة")}: ${currentBooking.baggage.checked}`
        });
      }

      // Add stops information if available
      if (currentBooking.stops && currentBooking.stops.length > 0) {
        details.push({
          label: t("Stops", "التوقفات"),
          value: currentBooking.stops.map(stop => `${stop.airport} (${stop.city}) - ${stop.duration}`).join(", ")
        });
      } else {
        details.push({
          label: t("Flight Type", "نوع الرحلة"),
          value: t("Direct", "مباشر")
        });
      }

      // Visa requirements will be shown only when user provides their nationality in the booking form
      // This will be handled in the BookingDetailsForm component
      // We don't show visa requirements automatically anymore since it depends on user's nationality
      
      return {
        title: t("Flight Booking", "حجز رحلة طيران"),
        details: details,
        // Use the logo from the airline object if available
        airlineLogo: currentBooking.airline && 
          typeof currentBooking.airline === 'object' && 
          'logo' in (currentBooking.airline as object)
          ? (currentBooking.airline as AirlineInfo).logo
          : currentBooking.airline === "Emirates" || currentBooking.airline === "EK"
          ? "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg"
          : currentBooking.airline === "British Airways" || currentBooking.airline === "BA"
          ? "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/British_Airways_Logo.svg/250px-British_Airways_Logo.svg.png"
          : currentBooking.airline === "Qatar Airways" || currentBooking.airline === "QR"
          ? "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png"
          : currentBooking.airline === "Royal Jordanian" || currentBooking.airline === "RJ"
          ? "https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Royal_Jordanian_Airlines_logo.svg/1200px-Royal_Jordanian_Airlines_logo.svg.png"
          : null
      };
    } else if (currentBooking.type === "hotel") {
      return {
        title: t("Hotel Booking", "حجز فندق"),
        details: [
          {
            label: t("Hotel", "الفندق"),
            value: currentBooking.hotelName
          },
          {
            label: t("Location", "الموقع"),
            value: currentBooking.city
          },
          {
            label: t("Check-in", "تسجيل الوصول"),
            value: currentBooking.checkInDate && !isNaN(new Date(currentBooking.checkInDate).getTime()) 
              ? format(new Date(currentBooking.checkInDate), "EEE, MMM d, yyyy")
              : (typeof currentBooking.checkInDate === 'string' ? currentBooking.checkInDate : "-")
          },
          {
            label: t("Check-out", "تسجيل المغادرة"),
            value: currentBooking.checkOutDate && !isNaN(new Date(currentBooking.checkOutDate).getTime()) 
              ? format(new Date(currentBooking.checkOutDate), "EEE, MMM d, yyyy")
              : (typeof currentBooking.checkOutDate === 'string' ? currentBooking.checkOutDate : "-")
          },
          {
            label: t("Rooms", "الغرف"),
            value: currentBooking.rooms
          },
          {
            label: t("Guests", "الضيوف"),
            value: `${currentBooking.adults} ${t("adults", "بالغين")}${currentBooking.children > 0 ? `, ${currentBooking.children} ${t("children", "أطفال")}` : ''}`
          }
        ]
      };
    } else if (currentBooking.type === "car") {
      return {
        title: t("Car Rental", "تأجير سيارة"),
        details: [
          {
            label: t("Car Type", "نوع السيارة"),
            value: currentBooking.carType
          },
          {
            label: t("Pickup Location", "موقع الاستلام"),
            value: currentBooking.pickupLocation
          },
          {
            label: t("Pickup Date", "تاريخ الاستلام"),
            value: currentBooking.pickupDate && !isNaN(new Date(currentBooking.pickupDate).getTime()) 
              ? `${format(new Date(currentBooking.pickupDate), "EEE, MMM d, yyyy")}${currentBooking.pickupTime ? ` at ${currentBooking.pickupTime}` : ""}` 
              : (typeof currentBooking.pickupDate === 'string' ? `${currentBooking.pickupDate}${currentBooking.pickupTime ? ` at ${currentBooking.pickupTime}` : ""}` : "-")
          },
          {
            label: t("Drop-off Location", "موقع التسليم"),
            value: currentBooking.dropoffLocation
          },
          {
            label: t("Drop-off Date", "تاريخ التسليم"),
            value: currentBooking.dropoffDate && !isNaN(new Date(currentBooking.dropoffDate).getTime()) 
              ? `${format(new Date(currentBooking.dropoffDate), "EEE, MMM d, yyyy")}${currentBooking.dropoffTime ? ` at ${currentBooking.dropoffTime}` : ""}` 
              : (typeof currentBooking.dropoffDate === 'string' ? `${currentBooking.dropoffDate}${currentBooking.dropoffTime ? ` at ${currentBooking.dropoffTime}` : ""}` : "-")
          }
        ]
      };
    }
    
    return null;
  };
  
  const bookingDetails = formatBookingDetails();
  
  if (!currentBooking) {
    return null; // This will redirect through the useEffect
  }
  
  // Options for Stripe Elements when setting up the payment form
  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const // Type assertion to make 'stripe' a literal type
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("Checkout - Safrat Travel", "الدفع - سفرات")}</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className={`text-3xl font-bold text-gray-900 mb-8 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
              {t("Checkout", "الدفع")}
            </h1>
            
            {/* Booking Summary Card - At the top */}
            <div className="mb-8">
              <Card className="overflow-hidden border-2 border-[#051C2C] shadow-lg">
                <div className="bg-gradient-to-r from-[#051C2C] to-[#0A3A5C] p-4">
                  <h3 className={`text-xl font-bold text-white ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Booking Summary", "ملخص الحجز")}
                  </h3>
                </div>
                
                <CardContent className="p-6 bg-white">
                  {bookingDetails && (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className={`text-lg font-bold text-[#051C2C] ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {bookingDetails.title}
                          </p>
                          {currentBooking.type === "flight" && currentBooking.flightNumber && (
                            <p className="text-sm text-gray-600 mt-1">
                              {t("Flight", "رحلة")}: {currentBooking.flightNumber}
                            </p>
                          )}
                        </div>
                        {bookingDetails.airlineLogo && (
                          <img 
                            src={bookingDetails.airlineLogo} 
                            alt="Airline Logo" 
                            className="h-12 w-auto object-contain"
                          />
                        )}
                      </div>
                      
                      {/* Flight-specific visual summary - Simplified */}
                      {currentBooking.type === "flight" && (
                        <div className="mb-6 bg-[#F8F9FA] p-4 rounded-lg border border-gray-200">
                          <div className="flex flex-col space-y-4">
                            {/* Duration and Stops */}
                            <div className="bg-white p-3 rounded-md border border-gray-100 text-center">
                              <span className="text-lg font-bold text-[#051C2C]">
                                {currentBooking.duration || t("Flight Duration", "مدة الرحلة")}
                              </span>
                              <div className="text-sm text-gray-600 mt-1">
                                {currentBooking.stops && currentBooking.stops.length > 0 
                                  ? t(`${currentBooking.stops.length} Stop(s)`, `${currentBooking.stops.length} توقف`) 
                                  : t("Direct Flight", "رحلة مباشرة")}
                              </div>
                            </div>
                            
                            {/* Departure & Arrival */}
                            <div className="grid grid-cols-2 gap-4">
                              {/* Departure */}
                              <div className="bg-white p-3 rounded-md border border-gray-100">
                                <div className="text-sm font-medium text-gray-500 mb-1">
                                  {t("Departure", "المغادرة")}
                                </div>
                                <div className="text-lg font-bold text-[#051C2C]">
                                  {currentBooking.departureTime 
                                    ? (isNaN(new Date(currentBooking.departureTime).getTime())
                                      ? t("Time TBD", "الوقت لاحقاً")
                                      : new Date(currentBooking.departureTime).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit', hour12: true}))
                                    : t("Time TBD", "الوقت لاحقاً")
                                  }
                                </div>
                                <div className="text-sm text-gray-700 mt-1">
                                  {currentBooking.departureCity && currentBooking.departureAirport
                                    ? `${currentBooking.departureCity} (${currentBooking.departureAirport})`
                                    : currentBooking.departureAirport || currentBooking.departureCity || t("Departure Airport", "مطار المغادرة")
                                  }
                                </div>
                              </div>
                              
                              {/* Arrival */}
                              <div className="bg-white p-3 rounded-md border border-gray-100">
                                <div className="text-sm font-medium text-gray-500 mb-1">
                                  {t("Arrival", "الوصول")}
                                </div>
                                <div className="text-lg font-bold text-[#051C2C]">
                                  {currentBooking.arrivalTime 
                                    ? (isNaN(new Date(currentBooking.arrivalTime).getTime())
                                      ? t("Time TBD", "الوقت لاحقاً")
                                      : new Date(currentBooking.arrivalTime).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit', hour12: true}))
                                    : t("Time TBD", "الوقت لاحقاً")
                                  }
                                </div>
                                <div className="text-sm text-gray-700 mt-1">
                                  {currentBooking.arrivalCity && currentBooking.arrivalAirport
                                    ? `${currentBooking.arrivalCity} (${currentBooking.arrivalAirport})`
                                    : currentBooking.arrivalAirport || currentBooking.arrivalCity || t("Arrival Airport", "مطار الوصول")
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-3 mb-6">
                        {bookingDetails.details.map((detail, index) => (
                          <div key={index} className="grid grid-cols-2 gap-2 pb-2 border-b border-gray-100 last:border-0">
                            <span className={`text-sm font-semibold text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                              {detail.label}
                            </span>
                            <span className={`text-sm font-medium text-[#051C2C] ${language === 'ar' ? 'font-cairo text-right' : 'text-right'}`}>
                              {typeof detail.value === 'object' ? 
                                ('name' in detail.value ? detail.value.name : JSON.stringify(detail.value)) 
                                : detail.value}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-[#F8F9FA] p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className={`text-lg font-bold text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {t("Total Price", "السعر الإجمالي")}
                          </span>
                          <span className={`text-2xl font-extrabold text-[#FF6B6B] ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {formatPrice(currentBooking.price)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          {t("Including all taxes and fees", "شامل جميع الضرائب والرسوم")}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Forms section - Below the booking summary */}
            <div className="space-y-6">
              {step === 1 && (
                <BookingDetailsForm onContinue={() => setStep(2)} />
              )}
              
              {step === 2 && clientSecret && (
                <Elements stripe={stripePromise} options={stripeOptions}>
                  <PaymentForm clientSecret={clientSecret} />
                </Elements>
              )}
              
              {step === 2 && isLoading && (
                <Card>
                  <CardContent className="p-6 flex justify-center items-center min-h-[300px]">
                    <LoadingSpinnerWithText 
                      text={t("Setting up payment...", "جارٍ إعداد الدفع...")}
                      spinnerProps={{ variant: "luggage", size: "lg" }}
                      textClassName={language === 'ar' ? 'font-cairo' : ''}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}