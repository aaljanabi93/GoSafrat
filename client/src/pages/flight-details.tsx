import { useState, useEffect } from "react";
import { useLocation, useRoute, useParams, Link } from "wouter";
import { useLanguage } from "@/context/language-context";
import { useBooking } from "@/context/booking-context";
import { FlightBookingData } from "@/context/booking-context";
import { useCurrency } from "@/context/currency-context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner, LoadingSpinnerWithText } from "@/components/ui/loading-spinners";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Info, 
  Shield, 
  CreditCard, 
  Briefcase, 
  MapPin, 
  Plane,
  Users,
  Calendar,
  Luggage,
  TicketCheck
} from "lucide-react";
import { getAirlineByCode } from "@/lib/airlines-data";
import { getAirportByCode } from "@/lib/airports-data";

export default function FlightDetails() {
  const { t, language } = useLanguage();
  const { currentBooking, setFlightBooking } = useBooking();
  const { formatPrice, currency } = useCurrency();
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // For the route parameters
  const [match, params] = useRoute("/flight-details/:id");
  const flightId = params?.id;
  
  // State for flight data
  const [flight, setFlight] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get the flight data - in a real implementation, this would fetch from the API
  // Here we're assuming it's passed via state in navigation
  useEffect(() => {
    // Get state from location if available
    const state = window.history.state;
    const flightData = state?.flight;
    
    if (flightData) {
      setFlight(flightData);
      setIsLoading(false);
    } else if (currentBooking?.type === "flight" && flightId) {
      // If there's no state but we have an ID and currentBooking, try to reconstruct
      // In a real application, you would fetch the flight details from the API here
      setFlight({
        id: flightId,
        airline: {
          name: currentBooking.airline,
          code: typeof currentBooking.airline === 'string' ? currentBooking.airline.substring(0, 2) : 'XX',
          // This is a placeholder - you'd get the real logo from your airline data
          logo: "/assets/airline-logos/default.png"
        },
        price: currentBooking.price,
        departure: {
          time: new Date(currentBooking.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          airport: currentBooking.departureAirport,
          city: currentBooking.departureCity,
          date: new Date(currentBooking.departureTime).toLocaleDateString()
        },
        arrival: {
          time: new Date(currentBooking.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          airport: currentBooking.arrivalAirport,
          city: currentBooking.arrivalCity,
          date: new Date(currentBooking.arrivalTime).toLocaleDateString()
        },
        duration: currentBooking.duration || "Unknown",
        direct: currentBooking.stops?.length === 0,
        baggage: currentBooking.baggage,
        stops: currentBooking.stops || [],
        visaRequired: currentBooking.visaRequired || false,
        refundable: true
      });
      setIsLoading(false);
    } else {
      // If we can't get the data, show an error
      setError(t("Flight details not found", "تفاصيل الرحلة غير موجودة"));
      setIsLoading(false);
    }
  }, [flightId, currentBooking, t]);
  
  const handleBookNow = () => {
    if (!flight) return;
    
    // Create flight booking data from the flight
    const bookingData: FlightBookingData = {
      type: "flight",
      departureCity: flight.departure.city,
      departureAirport: flight.departure.airport,
      departureTime: `${flight.departure.date}T${flight.departure.time}:00`,
      arrivalCity: flight.arrival.city,
      arrivalAirport: flight.arrival.airport,
      arrivalTime: `${flight.arrival.date}T${flight.arrival.time}:00`,
      passengers: currentBooking?.type === "flight" ? currentBooking.passengers : 1,
      cabinClass: currentBooking?.type === "flight" ? currentBooking.cabinClass : "economy",
      price: flight.price,
      airline: flight.airline.name,
      flightNumber: flight.airline.flightNumber || `${flight.airline.code}123`,
      returnFlight: currentBooking?.type === "flight" ? currentBooking.returnFlight : false,
      baggage: flight.baggage || { cabin: "7kg", checked: "20kg" },
      stops: flight.stops || [],
      visaRequired: flight.visaRequired,
      duration: flight.duration
    };
    
    setFlightBooking(bookingData);
    navigate("/checkout");
  };
  
  // Helper function to format duration
  const formatDuration = (duration: string) => {
    // If duration is already formatted, return it
    if (duration.includes("h")) return duration;
    
    // Otherwise, assume it's in minutes and format it
    const minutes = parseInt(duration);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{t("Flight Details - Safrat Travel", "تفاصيل الرحلة - سفرات")}</title>
        </Helmet>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow flex justify-center items-center">
            <LoadingSpinnerWithText 
              text={t("Loading flight details...", "جارٍ تحميل تفاصيل الرحلة...")}
              spinnerProps={{ variant: "plane", size: "lg" }}
            />
          </main>
          <Footer />
        </div>
      </>
    );
  }
  
  if (error || !flight) {
    return (
      <>
        <Helmet>
          <title>{t("Flight Details - Safrat Travel", "تفاصيل الرحلة - سفرات")}</title>
        </Helmet>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow flex justify-center items-center">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-red-500 mb-2">
                    {t("Error", "خطأ")}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {error || t("Flight details not found", "تفاصيل الرحلة غير موجودة")}
                  </p>
                  <Button onClick={() => navigate("/flights")}>
                    {t("Back to Flight Search", "العودة إلى بحث الرحلات")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
          <Footer />
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{t("Flight Details - Safrat Travel", "تفاصيل الرحلة - سفرات")}</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-[#F8F9FA] py-6">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <div className="mb-4 text-sm">
              <Link to="/">
                <span className="text-[#051C2C] hover:underline cursor-pointer">
                  {t("Home", "الرئيسية")}
                </span>
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <Link to="/flights">
                <span className="text-[#051C2C] hover:underline cursor-pointer">
                  {t("Flights", "الرحلات")}
                </span>
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-500">
                {t("Flight Details", "تفاصيل الرحلة")}
              </span>
            </div>
            
            {/* Flight Details Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              {/* Top Header with Airline Info */}
              <div className="bg-gradient-to-r from-[#051C2C] to-[#0A3A5C] p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center mr-3">
                      <img 
                        src={flight.airline.logo} 
                        alt={language === 'en' ? flight.airline.name : flight.airline.nameAr} 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">
                        {flight.airline.name} {flight.airline.flightNumber || `${flight.airline.code}123`}
                      </h1>
                      <div className="flex items-center text-sm opacity-80">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDuration(flight.duration)}
                        <span className="mx-3">•</span>
                        {flight.direct ? 
                          t("Non-stop", "رحلة مباشرة") : 
                          t("With Stops", "مع توقفات")}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm opacity-80">
                      {t("Price per person", "السعر للشخص الواحد")}
                    </div>
                    <div className="text-2xl font-bold">
                      {formatPrice(flight.price)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Flight Route Visualization */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                  {/* Departure & Arrival Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-6 relative">
                      {/* Departure */}
                      <div className="flex flex-col items-start">
                        <div className="text-2xl font-bold text-[#051C2C]">{flight.departure.time}</div>
                        <div className="text-md text-gray-600">
                          {flight.departure.city}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.departure.airport}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {new Date(flight.departure.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : undefined, { 
                            weekday: 'short', 
                            day: 'numeric', 
                            month: 'short'
                          })}
                        </div>
                      </div>
                      
                      {/* Flight Path Visualization */}
                      <div className="flex-1 mx-6 relative px-4">
                        <div className="h-0.5 bg-gray-300 w-full absolute top-6"></div>
                        
                        {flight.direct ? (
                          // Direct flight
                          <div className="flex justify-between absolute w-full px-2">
                            <div className="w-3 h-3 rounded-full bg-[#051C2C] mt-[1.125rem]"></div>
                            <Plane className="text-[#051C2C] w-5 h-5 absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            <div className="w-3 h-3 rounded-full bg-[#051C2C] mt-[1.125rem]"></div>
                          </div>
                        ) : (
                          // Flight with stops
                          <div className="flex justify-between absolute w-full">
                            <div className="w-3 h-3 rounded-full bg-[#051C2C] mt-[1.125rem]"></div>
                            {flight.stops.map((stop: any, index: number) => (
                              <div key={index} className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-[#FF6B6B] mt-[1.125rem]"></div>
                                <div className="text-xs text-gray-500 mt-2 whitespace-nowrap">
                                  {stop.airport}
                                </div>
                              </div>
                            ))}
                            <div className="w-3 h-3 rounded-full bg-[#051C2C] mt-[1.125rem]"></div>
                          </div>
                        )}
                        
                        <div className="absolute top-9 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap mt-2">
                          {formatDuration(flight.duration)}
                        </div>
                      </div>
                      
                      {/* Arrival */}
                      <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-[#051C2C]">{flight.arrival.time}</div>
                        <div className="text-md text-gray-600">
                          {flight.arrival.city}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.arrival.airport}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {new Date(flight.arrival.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : undefined, { 
                            weekday: 'short', 
                            day: 'numeric', 
                            month: 'short'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Booking CTA */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-gray-500">
                        {t("Total Price", "السعر الإجمالي")}
                      </div>
                      <div className="text-2xl font-bold text-[#FF6B6B]">
                        {formatPrice(flight.price)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t("per person", "للشخص الواحد")}
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-[#FF6B6B] hover:bg-[#FF5A5A] w-full sm:w-auto min-w-[160px] text-white shadow-md transition-all hover:shadow-lg"
                      onClick={handleBookNow}
                    >
                      {t("Book Now", "احجز الآن")}
                    </Button>
                  </div>
                </div>
                
                {/* Detailed Flight Info Tabs */}
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="w-full mb-4 grid grid-cols-3">
                    <TabsTrigger value="details">{t("Flight Details", "تفاصيل الرحلة")}</TabsTrigger>
                    <TabsTrigger value="baggage">{t("Baggage", "الأمتعة")}</TabsTrigger>
                    <TabsTrigger value="policy">{t("Fare Policy", "سياسة الأسعار")}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="mt-0">
                    <div className="bg-white rounded-md border p-4">
                      <h3 className="font-semibold text-lg mb-4">
                        {t("Flight Information", "معلومات الرحلة")}
                      </h3>
                      
                      <div className="space-y-4">
                        {/* Flight Route */}
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <Plane className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <div className="font-medium">
                              {t("Route", "المسار")}
                            </div>
                            <div className="text-gray-600">
                              {flight.departure.city} ({flight.departure.airport}) → {flight.arrival.city} ({flight.arrival.airport})
                            </div>
                          </div>
                        </div>
                        
                        {/* Flight Date */}
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <div className="font-medium">
                              {t("Flight Date", "تاريخ الرحلة")}
                            </div>
                            <div className="text-gray-600">
                              {new Date(flight.departure.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : undefined, { 
                                weekday: 'long', 
                                day: 'numeric', 
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        
                        {/* Flight Duration */}
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <Clock className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <div className="font-medium">
                              {t("Flight Duration", "مدة الرحلة")}
                            </div>
                            <div className="text-gray-600">
                              {formatDuration(flight.duration)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Aircraft */}
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <Plane className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <div className="font-medium">
                              {t("Aircraft", "الطائرة")}
                            </div>
                            <div className="text-gray-600">
                              {flight.aircraft || "Boeing 737"}
                            </div>
                          </div>
                        </div>
                        
                        {/* Passengers */}
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <Users className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <div className="font-medium">
                              {t("Passenger Class", "درجة المسافر")}
                            </div>
                            <div className="text-gray-600">
                              {currentBooking?.type === "flight" && currentBooking.cabinClass === "business" 
                                ? t("Business Class", "درجة رجال الأعمال") 
                                : t("Economy Class", "الدرجة السياحية")}
                            </div>
                          </div>
                        </div>
                        
                        {/* If the flight has stops */}
                        {!flight.direct && flight.stops && flight.stops.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-semibold mb-2">
                              {t("Stops", "التوقفات")}
                            </h4>
                            <div className="space-y-4">
                              {flight.stops.map((stop: any, index: number) => (
                                <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse border-l-2 border-[#FF6B6B] pl-4">
                                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                                  <div>
                                    <div className="font-medium">
                                      {stop.city} ({stop.airport})
                                    </div>
                                    <div className="text-gray-600">
                                      {t("Layover", "مدة التوقف")}: {stop.duration}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Visa Information */}
                        {flight.visaRequired && (
                          <div className="mt-6 bg-amber-50 p-4 rounded-md">
                            <div className="flex items-start space-x-4 rtl:space-x-reverse">
                              <Info className="w-5 h-5 text-amber-500 mt-1" />
                              <div>
                                <div className="font-medium text-amber-700">
                                  {t("Visa Information", "معلومات التأشيرة")}
                                </div>
                                <div className="text-amber-600">
                                  {t("Visa is required for this destination. Please check visa requirements.", "مطلوب تأشيرة لهذه الوجهة. يرجى التحقق من متطلبات التأشيرة.")}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="baggage" className="mt-0">
                    <div className="bg-white rounded-md border p-4">
                      <h3 className="font-semibold text-lg mb-4">
                        {t("Baggage Allowance", "السماح بالأمتعة")}
                      </h3>
                      
                      <div className="space-y-6">
                        {/* Cabin Baggage */}
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <Briefcase className="w-5 h-5 text-gray-500 mt-1" />
                          <div className="flex-1">
                            <div className="font-medium">
                              {t("Cabin Baggage", "أمتعة المقصورة")}
                            </div>
                            <div className="text-gray-600 mb-2">
                              {flight.baggage?.cabin || "7kg"}
                            </div>
                            <p className="text-sm text-gray-500">
                              {t("One carry-on bag and one personal item", "حقيبة محمولة واحدة وعنصر شخصي واحد")}
                            </p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Checked Baggage */}
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <Luggage className="w-5 h-5 text-gray-500 mt-1" />
                          <div className="flex-1">
                            <div className="font-medium">
                              {t("Checked Baggage", "الأمتعة المسجلة")}
                            </div>
                            <div className="text-gray-600 mb-2">
                              {flight.baggage?.checked || "20kg"}
                            </div>
                            <p className="text-sm text-gray-500">
                              {t("Up to 2 checked bags, maximum dimensions: 158cm (length + width + height)", "ما يصل إلى حقيبتين مسجلتين، الأبعاد القصوى: 158 سم (الطول + العرض + الارتفاع)")}
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-md">
                          <div className="flex items-start space-x-4 rtl:space-x-reverse">
                            <Info className="w-5 h-5 text-blue-500 mt-1" />
                            <div>
                              <div className="font-medium text-blue-700">
                                {t("Additional Baggage", "أمتعة إضافية")}
                              </div>
                              <div className="text-blue-600">
                                {t("Additional baggage can be purchased during the booking process.", "يمكن شراء الأمتعة الإضافية أثناء عملية الحجز.")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="policy" className="mt-0">
                    <div className="bg-white rounded-md border p-4">
                      <h3 className="font-semibold text-lg mb-4">
                        {t("Fare Rules & Policies", "قواعد وسياسات الأسعار")}
                      </h3>
                      
                      <div className="space-y-6">
                        {/* Refundable */}
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <CreditCard className="w-5 h-5 text-gray-500 mt-1" />
                          <div className="flex-1">
                            <div className="font-medium">
                              {t("Refundable", "قابل للاسترداد")}
                            </div>
                            <div className="text-gray-600">
                              {flight.refundable ? t("Yes", "نعم") : t("No", "لا")}
                            </div>
                            {flight.refundable && (
                              <p className="text-sm text-gray-500 mt-1">
                                {t("Cancellation fee may apply", "قد تطبق رسوم الإلغاء")}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Changes */}
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <TicketCheck className="w-5 h-5 text-gray-500 mt-1" />
                          <div className="flex-1">
                            <div className="font-medium">
                              {t("Changes", "التغييرات")}
                            </div>
                            <div className="text-gray-600">
                              {t("Allowed with fee", "مسموح بها مع رسوم")}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {t("Change fees and fare difference may apply", "قد تطبق رسوم التغيير وفرق السعر")}
                            </p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* No Show */}
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <Shield className="w-5 h-5 text-gray-500 mt-1" />
                          <div className="flex-1">
                            <div className="font-medium">
                              {t("No Show", "عدم الحضور")}
                            </div>
                            <div className="text-gray-600">
                              {t("Ticket forfeiture", "مصادرة التذكرة")}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {t("Failure to check in for your flight may result in ticket forfeiture", "قد يؤدي عدم تسجيل الوصول لرحلتك إلى مصادرة التذكرة")}
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md mt-4">
                          <p className="text-sm text-gray-500">
                            {t("These fare rules are for general guidance only. Actual rules may vary depending on fare type and airline policy. Please review the complete fare rules during booking.", "قواعد الأسعار هذه هي للإرشاد العام فقط. قد تختلف القواعد الفعلية حسب نوع السعر وسياسة شركة الطيران. يرجى مراجعة قواعد الأسعار الكاملة أثناء الحجز.")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Similar Flights Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">
                {t("Similar Flights", "رحلات مشابهة")}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* This would be dynamically populated in a real application */}
                {[1, 2, 3].map(index => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 p-1 flex items-center justify-center mr-2">
                            <img 
                              src={flight.airline.logo} 
                              alt={flight.airline.name} 
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                          <div className="text-sm font-medium">
                            {flight.airline.name}
                          </div>
                        </div>
                        <div className="text-[#FF6B6B] font-bold">
                          {formatPrice(Math.round(flight.price * (0.9 + index * 0.1)))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-center">
                          <div className="text-lg font-semibold">
                            {flight.departure.time}
                          </div>
                          <div className="text-xs text-gray-500">
                            {flight.departure.airport}
                          </div>
                        </div>
                        
                        <div className="flex-1 mx-2 relative px-4">
                          <div className="h-px bg-gray-300 w-full absolute top-3"></div>
                          <div className="text-xs text-gray-500 text-center mt-5">
                            {formatDuration(flight.duration)}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-semibold">
                            {flight.arrival.time}
                          </div>
                          <div className="text-xs text-gray-500">
                            {flight.arrival.airport}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button variant="outline" size="sm" className="w-full">
                          {t("View Details", "عرض التفاصيل")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}