import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking, AirlineInfo } from "@/context/booking-context";
import { useCurrency } from "@/context/currency-context";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
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
import { 
  nationalities, 
  checkVisaRequirement, 
  getCountryCodeFromAirport,
  type Nationality
} from "@/lib/nationalities-data";

// Initialize Stripe with the public key
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.warn('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51RBpcTChOypw3eWimIjK4ZAZgwo8rbKYYWn7FvWvm0exirOfepmqbVAk8ZBFZpln0lhLvvF1UnsBv5noI88mbO0u00zKkMcf1S');

// Checkout form component for passenger/customer details
const BookingDetailsForm = ({ onContinue }: { onContinue: () => void }) => {
  const { t, language } = useLanguage();
  const { currentBooking, setFlightBooking } = useBooking();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    passportNumber: ""
  });
  
  const [visaRequired, setVisaRequired] = useState<boolean | null>(null);
  const [checkingVisa, setCheckingVisa] = useState<boolean>(false);
  
  // Check visa requirements when nationality changes
  useEffect(() => {
    // Only check visa requirements for flight bookings
    if (currentBooking?.type !== 'flight' || !formData.nationality) {
      return;
    }
    
    const checkVisaRequirements = async () => {
      setCheckingVisa(true);
      try {
        if (currentBooking?.type !== 'flight') {
          return;
        }
        
        // Get the destination country code from the arrival airport
        const destinationCode = getCountryCodeFromAirport(currentBooking.arrivalAirport);
        
        // Check visa requirement using our nationality database
        const visaCheck = checkVisaRequirement(formData.nationality, destinationCode);
        
        // The visa is required if visaCheck.required is true and not on arrival
        const needsVisa = visaCheck ? visaCheck.required : true;
        
        // Update visa required state
        setVisaRequired(needsVisa);
        
        // Update booking data with visa requirement
        setFlightBooking({
          ...currentBooking,
          visaRequired: needsVisa
        });
      } catch (error) {
        console.error("Error checking visa requirements:", error);
        setVisaRequired(null);
      } finally {
        setCheckingVisa(false);
      }
    };
    
    // If nationality is provided (country code is 2 chars), check visa requirements
    if (formData.nationality.length === 2) {
      checkVisaRequirements();
    }
  }, [formData.nationality, currentBooking, setFlightBooking]);
  
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
                {t("Nationality", "الجنسية")} *
              </Label>
              <div className="relative">
                <Select 
                  name="nationality" 
                  value={formData.nationality}
                  onValueChange={(value: string) => {
                    setFormData(prev => ({ ...prev, nationality: value }));
                  }}
                  required
                >
                  <SelectTrigger 
                    className={visaRequired !== null ? (visaRequired ? "border-yellow-400" : "border-green-400") : ""}
                  >
                    <SelectValue placeholder={t("Select Nationality", "اختر الجنسية")} />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="max-h-80 overflow-y-auto">
                      {/* Middle East */}
                      <SelectGroup>
                        <SelectLabel>{t("Middle East", "الشرق الأوسط")}</SelectLabel>
                        {nationalities
                          .filter((n: Nationality) => n.region === "Middle East")
                          .map((nationality: Nationality) => (
                            <SelectItem 
                              key={nationality.code} 
                              value={nationality.code}
                            >
                              {language === 'en' ? nationality.name : nationality.nameAr}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                      
                      {/* Europe */}
                      <SelectGroup>
                        <SelectLabel>{t("Europe", "أوروبا")}</SelectLabel>
                        {nationalities
                          .filter((n: Nationality) => n.region === "Europe")
                          .map((nationality: Nationality) => (
                            <SelectItem 
                              key={nationality.code} 
                              value={nationality.code}
                            >
                              {language === 'en' ? nationality.name : nationality.nameAr}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                      
                      {/* North America */}
                      <SelectGroup>
                        <SelectLabel>{t("North America", "أمريكا الشمالية")}</SelectLabel>
                        {nationalities
                          .filter((n: Nationality) => n.region === "North America")
                          .map((nationality: Nationality) => (
                            <SelectItem 
                              key={nationality.code} 
                              value={nationality.code}
                            >
                              {language === 'en' ? nationality.name : nationality.nameAr}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                      
                      {/* Asia */}
                      <SelectGroup>
                        <SelectLabel>{t("Asia", "آسيا")}</SelectLabel>
                        {nationalities
                          .filter((n: Nationality) => n.region === "Asia")
                          .map((nationality: Nationality) => (
                            <SelectItem 
                              key={nationality.code} 
                              value={nationality.code}
                            >
                              {language === 'en' ? nationality.name : nationality.nameAr}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                      
                      {/* Africa */}
                      <SelectGroup>
                        <SelectLabel>{t("Africa", "أفريقيا")}</SelectLabel>
                        {nationalities
                          .filter((n: Nationality) => n.region === "Africa")
                          .map((nationality: Nationality) => (
                            <SelectItem 
                              key={nationality.code} 
                              value={nationality.code}
                            >
                              {language === 'en' ? nationality.name : nationality.nameAr}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                      
                      {/* South America */}
                      <SelectGroup>
                        <SelectLabel>{t("South America", "أمريكا الجنوبية")}</SelectLabel>
                        {nationalities
                          .filter((n: Nationality) => n.region === "South America")
                          .map((nationality: Nationality) => (
                            <SelectItem 
                              key={nationality.code} 
                              value={nationality.code}
                            >
                              {language === 'en' ? nationality.name : nationality.nameAr}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                      
                      {/* Oceania */}
                      <SelectGroup>
                        <SelectLabel>{t("Oceania", "أوقيانوسيا")}</SelectLabel>
                        {nationalities
                          .filter((n: Nationality) => n.region === "Oceania")
                          .map((nationality: Nationality) => (
                            <SelectItem 
                              key={nationality.code} 
                              value={nationality.code}
                            >
                              {language === 'en' ? nationality.name : nationality.nameAr}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </div>
                  </SelectContent>
                </Select>
                {checkingVisa && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </div>
              {visaRequired === true && formData.nationality && (
                <div className="mt-2 p-3 rounded-md bg-amber-50 border border-amber-200">
                  <p className="text-amber-600 text-sm flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>
                      {t("Visa required for", "تأشيرة مطلوبة لـ")} {currentBooking?.type === "flight" ? currentBooking.arrivalCity : "destination"}
                      <br/>
                      <span className="text-xs opacity-80">
                        {t("Please check visa requirements before travel", "يرجى التحقق من متطلبات التأشيرة قبل السفر")}
                      </span>
                    </span>
                  </p>
                </div>
              )}
              {visaRequired === false && formData.nationality && (
                <div className="mt-2 p-3 rounded-md bg-green-50 border border-green-200">
                  <p className="text-green-600 text-sm flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      {t("No visa required for", "لا تحتاج إلى تأشيرة لـ")} {currentBooking?.type === "flight" ? currentBooking.arrivalCity : "destination"}
                      <br/>
                      <span className="text-xs opacity-80">
                        {t("Travel is possible without visa", "يمكن السفر بدون تأشيرة")}
                      </span>
                    </span>
                  </p>
                </div>
              )}
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
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
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
            ? format(new Date(currentBooking.departureTime), "PPP") 
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
            value: format(new Date(currentBooking.checkInDate), "PPP")
          },
          {
            label: t("Check-out", "تسجيل المغادرة"),
            value: format(new Date(currentBooking.checkOutDate), "PPP")
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
            value: `${format(new Date(currentBooking.pickupDate), "PPP")} ${currentBooking.pickupTime}`
          },
          {
            label: t("Drop-off Location", "موقع التسليم"),
            value: currentBooking.dropoffLocation
          },
          {
            label: t("Drop-off Date", "تاريخ التسليم"),
            value: `${format(new Date(currentBooking.dropoffDate), "PPP")} ${currentBooking.dropoffTime}`
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
  
  // Stripe payment options
  // Options for Stripe Elements when setting up the payment form
  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("Checkout - Safrat Travel", "الدفع - سفرات")}</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Flight Booking Process Header - Rehlat Style */}
        <div className="bg-gradient-to-r from-[#051C2C] to-[#0A3A5C] py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="hidden md:flex items-center">
                <div className={`text-white font-bold ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {currentBooking?.type === 'flight' ? (
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">{currentBooking.departureCity}</span>
                      <svg className="h-5 w-5 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="ml-2 text-lg">{currentBooking.arrivalCity}</span>
                    </div>
                  ) : (
                    <span>{t("Complete Your Booking", "أكمل حجزك")}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-center w-full md:w-auto">
                <div className="flex items-center">
                  <div className={`flex flex-col items-center ${step === 1 ? 'text-white' : 'text-white/50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-[#FF6B6B]' : 'bg-white/20'} mb-1`}>
                      1
                    </div>
                    <span className="text-xs">{t("Traveller Details", "بيانات المسافر")}</span>
                  </div>
                  
                  <div className={`w-10 h-[2px] ${step >= 2 ? 'bg-[#FF6B6B]' : 'bg-white/20'} mx-1`}></div>
                  
                  <div className={`flex flex-col items-center ${step >= 2 ? 'text-white' : 'text-white/50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#FF6B6B]' : 'bg-white/20'} mb-1`}>
                      2
                    </div>
                    <span className="text-xs">{t("Payment", "الدفع")}</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block text-white text-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {t("Booking will be confirmed immediately", "سيتم تأكيد الحجز فورًا")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <main className="flex-grow bg-[#F8F9FA] py-6">
          <div className="container mx-auto px-4">            
            {/* Main content with sidebar layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left content - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {step === 1 && (
                  <>
                    <div className="bg-white rounded-md shadow-sm overflow-hidden">
                      <div className="bg-[#051C2C] text-white px-4 py-3">
                        <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {t("Traveller Details", "بيانات المسافر")}
                        </h3>
                      </div>
                      <div className="p-4">
                        <BookingDetailsForm onContinue={() => setStep(2)} />
                      </div>
                    </div>
                    
                    {/* Booking Policies Card */}
                    <div className="bg-white rounded-md shadow-sm overflow-hidden">
                      <div className="bg-[#051C2C] text-white px-4 py-3">
                        <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {t("Booking Policies", "سياسات الحجز")}
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#051C2C] mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <div className="text-sm text-gray-700">
                              <p className="font-medium">{t("No Hidden Charges", "لا رسوم خفية")}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {t("The price shown includes all taxes and fees. No hidden charges.", "السعر المعروض يشمل جميع الضرائب والرسوم. لا توجد رسوم خفية.")}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#051C2C] mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <div className="text-sm text-gray-700">
                              <p className="font-medium">{t("Safe & Secure", "آمن ومضمون")}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {t("We use secure transmission and encrypted storage to protect your personal information.", "نستخدم نقلًا آمنًا وتخزينًا مشفرًا لحماية معلوماتك الشخصية.")}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#051C2C] mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <div className="text-sm text-gray-700">
                              <p className="font-medium">{t("24/7 Support", "دعم على مدار الساعة")}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {t("Travel worry-free knowing that our support team is available 24/7 to help you.", "سافر بدون قلق مع العلم أن فريق الدعم لدينا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك.")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {step === 2 && (
                  <div className="bg-white rounded-md shadow-sm overflow-hidden">
                    <div className="bg-[#051C2C] text-white px-4 py-3">
                      <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Payment Details", "تفاصيل الدفع")}
                      </h3>
                    </div>
                    <div className="p-4">
                      {clientSecret && (
                        <Elements stripe={stripePromise} options={stripeOptions}>
                          <PaymentForm clientSecret={clientSecret} />
                        </Elements>
                      )}
                      
                      {isLoading && (
                        <div className="flex justify-center items-center min-h-[300px]">
                          <div className="flex flex-col items-center">
                            <svg className="animate-spin h-10 w-10 text-[#FF6B6B] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Setting up payment...", "جارٍ إعداد الدفع...")}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Payment security note */}
                      <div className="mt-6 border-t border-gray-200 pt-4">
                        <div className="flex items-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">
                            {t("Secure Payment", "دفع آمن")}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {t("Your payment information is securely processed and encrypted. We do not store your full card details.", "تتم معالجة معلومات الدفع الخاصة بك وتشفيرها بشكل آمن. نحن لا نخزن تفاصيل بطاقتك الكاملة.")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right sidebar - Price Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-md shadow-sm overflow-hidden sticky top-6">
                  <div className="bg-[#051C2C] text-white px-4 py-3">
                    <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Price Summary", "ملخص السعر")}
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    {bookingDetails && (
                      <>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-2">
                            {currentBooking.type === 'flight' && (
                              <div className="w-8 h-8 rounded-full bg-gray-100 p-1 flex items-center justify-center">
                                {bookingDetails.airlineLogo ? (
                                  <img 
                                    src={bookingDetails.airlineLogo} 
                                    alt="Airline Logo" 
                                    className="h-6 w-auto object-contain"
                                  />
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                  </svg>
                                )}
                              </div>
                            )}
                            <div>
                              <div className={`text-sm font-medium text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>
                                {bookingDetails.title}
                              </div>
                              {currentBooking.type === 'flight' && (
                                <div className="text-xs text-gray-500">
                                  {currentBooking.departureCity} - {currentBooking.arrivalCity}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4 text-sm">
                          {/* Display only key details */}
                          {bookingDetails.details.slice(0, 4).map((detail, index) => (
                            <div key={index} className="flex justify-between">
                              <span className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                                {detail.label}:
                              </span>
                              <span className={`font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                                {typeof detail.value === 'object' ? 
                                  ('name' in detail.value ? detail.value.name : JSON.stringify(detail.value)) 
                                  : detail.value}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-b border-gray-200 py-4 my-4">
                          <div className="flex justify-between mb-2">
                            <span className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                              {t("Base Fare", "السعر الأساسي")}:
                            </span>
                            <span className="text-sm font-medium">
                              {formatPrice(currentBooking.price * 0.85)}
                            </span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                              {t("Taxes & Fees", "الضرائب والرسوم")}:
                            </span>
                            <span className="text-sm font-medium">
                              {formatPrice(currentBooking.price * 0.15)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-semibold text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {t("Total Amount", "المبلغ الإجمالي")}:
                          </span>
                          <span className="text-xl font-bold text-[#FF6B6B]">
                            {formatPrice(currentBooking.price)}
                          </span>
                        </div>
                        
                        <p className={`text-xs text-gray-500 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {t("Including all taxes and fees", "شامل جميع الضرائب والرسوم")}
                        </p>
                        
                        {step === 1 && (
                          <Button 
                            className="w-full bg-[#FF6B6B] hover:bg-[#FF5A5A] text-white py-2"
                            onClick={() => setStep(2)}
                          >
                            {t("Proceed to Payment", "المتابعة إلى الدفع")}
                          </Button>
                        )}
                        
                        {/* Price guarantee banner */}
                        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-md p-3">
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <p className={`text-sm font-medium text-blue-800 ${language === 'ar' ? 'font-cairo' : ''}`}>
                                {t("Price Guarantee", "ضمان السعر")}
                              </p>
                              <p className={`text-xs text-blue-600 mt-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                                {t("The price you see is the price you pay. No hidden charges.", "السعر الذي تراه هو السعر الذي تدفعه. لا رسوم خفية.")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
