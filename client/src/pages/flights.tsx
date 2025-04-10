import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking } from "@/context/booking-context";
import { FlightBookingData } from "@/context/booking-context";
import { useCurrency } from "@/context/currency-context";
import { useLocation } from "wouter";
import { api } from "@/lib/api";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner, LoadingSpinnerWithText } from "@/components/ui/loading-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft, Edit } from "lucide-react";

// We'll use real flight data from the API instead of mocks

export default function Flights() {
  const { t, language } = useLanguage();
  const { currentBooking, setFlightBooking } = useBooking();
  const { formatPrice } = useCurrency();
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  const [flights, setFlights] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState("price-asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Set document title
  useEffect(() => {
    document.title = t("Flight Search Results - Safrat Travel", "نتائج البحث عن الرحلات - سفرات");
  }, [language, t]);

  // Fetch flights data from API
  useEffect(() => {
    async function fetchFlights() {
      setIsLoading(true);
      setError(null);
      
      try {
        // Default search params if no booking context exists
        const departDate = currentBooking?.type === "flight" 
          ? new Date(currentBooking.departureTime).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];
        
        const returnDate = currentBooking?.type === "flight" && currentBooking.returnFlight && currentBooking.returnDepartureTime
          ? new Date(currentBooking.returnDepartureTime).toISOString().split('T')[0]
          : '';
        
        const origin = currentBooking?.type === "flight" 
          ? currentBooking.departureAirport
          : "DXB";
          
        const destination = currentBooking?.type === "flight" 
          ? currentBooking.arrivalAirport
          : "AMM";
  
        // API call
        const response = await api.searchFlights({
          origin,
          destination,
          departDate,
          returnDate,
          adults: currentBooking?.type === "flight" ? currentBooking.passengers : 1,
          currency: "USD"
        });

        if (!response.success) {
          throw new Error(response.message || "Failed to fetch flights");
        }

        // Process API response to our required format
        const processedFlights: any[] = [];
        const data = response.data || {};
        
        // Loop through destination airports
        Object.keys(data).forEach(destCode => {
          // Loop through flights to that destination
          Object.keys(data[destCode]).forEach(flightNum => {
            const apiFlightData = data[destCode][flightNum];
            
            // Create a flight object with our required structure
            // Preserve the original airport information from currentBooking
            const departureCity = currentBooking?.type === "flight" ? currentBooking.departureCity : "Dubai";
            const departureAirport = currentBooking?.type === "flight" ? currentBooking.departureAirport : origin;
            const arrivalCity = currentBooking?.type === "flight" ? currentBooking.arrivalCity : "Amman";
            const arrivalAirport = currentBooking?.type === "flight" ? currentBooking.arrivalAirport : destCode;
            
            processedFlights.push({
              id: `${apiFlightData.airline}${apiFlightData.flight_number}`,
              price: apiFlightData.price,
              airline: apiFlightData.airline || {},
              departure: {
                time: apiFlightData.departure?.time || "00:00",
                airport: departureAirport,
                city: departureCity,
                date: departDate
              },
              arrival: {
                time: apiFlightData.arrival?.time || "00:00",
                airport: arrivalAirport,
                city: arrivalCity,
                date: departDate
              },
              duration: apiFlightData.duration || "Unknown",
              direct: apiFlightData.direct !== undefined ? apiFlightData.direct : true,
              baggage: apiFlightData.baggage || { cabin: "7kg", checked: "20kg" },
              stops: apiFlightData.stops || [],
              visaRequired: apiFlightData.visaRequired !== undefined ? apiFlightData.visaRequired : false
            });
          });
        });

        // Sort the flights
        sortFlights(processedFlights, sortOption);
      } catch (err: any) {
        console.error("Error fetching flights:", err);
        setError(err.message || "Failed to fetch flights");
        toast({
          title: t("Error", "خطأ"),
          description: t("Failed to fetch flights. Please try again.", "فشل في جلب الرحلات. يرجى المحاولة مرة أخرى."),
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchFlights();
  }, [currentBooking]);

  // Sort flights when option changes
  const sortFlights = (flightsToSort: any[], option: string) => {
    let sortedFlights = [...flightsToSort];
    
    if (option === "price-asc") {
      sortedFlights.sort((a, b) => a.price - b.price);
    } else if (option === "price-desc") {
      sortedFlights.sort((a, b) => b.price - a.price);
    } else if (option === "duration-asc") {
      sortedFlights.sort((a, b) => {
        const durationA = a.duration?.split('h')[0] ? parseInt(a.duration.split('h')[0]) : 0;
        const durationB = b.duration?.split('h')[0] ? parseInt(b.duration.split('h')[0]) : 0;
        return durationA - durationB;
      });
    }
    
    setFlights(sortedFlights);
  };
  
  // Handle sort option change
  useEffect(() => {
    if (flights.length > 0) {
      sortFlights(flights, sortOption);
    }
  }, [sortOption]);

  const handleSelectFlight = (flight: any) => {
    // Create flight booking data from selected flight
    const bookingData: FlightBookingData = {
      type: "flight",
      departureCity: flight.departure.city || (currentBooking?.type === "flight" ? currentBooking.departureCity : "Dubai"),
      departureAirport: flight.departure.airport,
      departureTime: `${flight.departure.date}T${flight.departure.time}:00`,
      arrivalCity: flight.arrival.city || (currentBooking?.type === "flight" ? currentBooking.arrivalCity : "Amman"),
      arrivalAirport: flight.arrival.airport,
      arrivalTime: `${flight.arrival.date}T${flight.arrival.time}:00`,
      passengers: currentBooking?.type === "flight" ? currentBooking.passengers : 1,
      cabinClass: currentBooking?.type === "flight" ? currentBooking.cabinClass : "economy",
      price: flight.price,
      airline: flight.airline.name,
      flightNumber: flight.airline.flightNumber,
      returnFlight: currentBooking?.type === "flight" ? currentBooking.returnFlight : false,
      baggage: flight.baggage || { cabin: "7kg", checked: "20kg" },
      stops: flight.stops || [],
      visaRequired: flight.visaRequired,
      duration: flight.duration
    };
    
    setFlightBooking(bookingData);
    navigate("/checkout");
  };

  return (
    <>
      <Helmet>
        <title>{t("Flight Search Results - Safrat Travel", "نتائج البحث عن الرحلات - سفرات")}</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <h2 className={`text-2xl font-bold text-gray-900 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
                  {t("Flight Search Results", "نتائج البحث عن الرحلات")}
                </h2>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Filter:", "تصفية:")}
                  </span>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t("Sort by", "ترتيب حسب")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">
                        {t("Price: Low to High", "السعر: من الأقل إلى الأعلى")}
                      </SelectItem>
                      <SelectItem value="price-desc">
                        {t("Price: High to Low", "السعر: من الأعلى إلى الأقل")}
                      </SelectItem>
                      <SelectItem value="duration-asc">
                        {t("Duration: Shortest", "المدة: الأقصر")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Card className="mt-4 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center">
                      {language === 'en' ? (
                        <>
                          <ArrowRight className="h-4 w-4 text-primary mr-2" />
                          <span className="font-medium">
                            {currentBooking?.type === "flight" ? currentBooking.departureCity : "Dubai"} ({currentBooking?.type === "flight" ? currentBooking.departureAirport : "DXB"})
                          </span>
                          <ChevronRight className="mx-3 text-gray-400" />
                          <span className="font-medium">
                            {currentBooking?.type === "flight" ? currentBooking.arrivalCity : "Amman"} ({currentBooking?.type === "flight" ? currentBooking.arrivalAirport : "AMM"})
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowLeft className="h-4 w-4 text-primary ml-2" />
                          <span className="font-medium font-cairo">
                            {currentBooking?.type === "flight" ? currentBooking.departureCity : "دبي"} ({currentBooking?.type === "flight" ? currentBooking.departureAirport : "DXB"})
                          </span>
                          <ChevronLeft className="mx-3 text-gray-400" />
                          <span className="font-medium font-cairo">
                            {currentBooking?.type === "flight" ? currentBooking.arrivalCity : "عمان"} ({currentBooking?.type === "flight" ? currentBooking.arrivalAirport : "AMM"})
                          </span>
                        </>
                      )}
                    </div>
                    
                    <Button
                      variant="link"
                      className="text-primary text-sm"
                      onClick={() => navigate("/")}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      <span className={language === 'ar' ? 'font-cairo' : ''}>
                        {t("Modify Search", "تعديل البحث")}
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <LoadingSpinnerWithText 
                    text={t("Searching for the best flight deals...", "جارٍ البحث عن أفضل عروض الرحلات...")}
                    spinnerProps={{ variant: "plane", size: "lg" }}
                  />
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <div className="text-lg text-red-500 mb-2">
                    {t("Error loading flights", "خطأ في تحميل الرحلات")}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">{error}</div>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/")}
                    className={language === 'ar' ? 'font-cairo' : ''}
                  >
                    {t("Back to search", "العودة إلى البحث")}
                  </Button>
                </div>
              ) : flights.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-lg text-gray-500 mb-2">
                    {t("No flights found for this route and date", "لم يتم العثور على رحلات لهذا المسار والتاريخ")}
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/")}
                    className={language === 'ar' ? 'font-cairo' : ''}
                  >
                    {t("Modify your search", "تعديل البحث")}
                  </Button>
                </div>
              ) : flights.map((flight) => (
                <Card 
                  key={flight.id || Math.random().toString()}
                  className="border border-gray-200 hover:shadow-md transition"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-start justify-between">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-4">
                        {/* Airline Info */}
                        <div className="flex items-center mb-4 md:mb-0">
                          <img 
                            src={flight.airline.logo} 
                            alt={language === 'en' ? flight.airline.name : flight.airline.nameAr} 
                            className="w-10 h-10 rounded object-contain mr-3"
                          />
                          <div>
                            <div className={`font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                              {language === 'en' ? flight.airline.name : flight.airline.nameAr}
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.airline.flightNumber} • {flight.airline.aircraft}
                            </div>
                          </div>
                        </div>
                        
                        {/* Flight Details */}
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-8 rtl:space-x-reverse">
                          {/* Departure */}
                          <div className="text-center">
                            <div className="text-lg font-semibold">{flight.departure.time}</div>
                            <div className={`text-xs text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                              {flight.departure.airport} • {language === 'en' ? flight.departure.date : flight.departure.date}
                            </div>
                            <div className="text-xs text-gray-600">
                              {flight.departure.city || "Dubai"}
                            </div>
                          </div>
                          
                          {/* Duration */}
                          <div className="text-center flex flex-col items-center">
                            <div className="text-xs text-gray-500">{flight.duration}</div>
                            <div className="relative w-20 h-px bg-gray-300 my-1">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                            </div>
                            <div className={`text-xs text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                              {flight.direct ? t("Direct", "مباشر") : t("1 Stop", "توقف واحد")}
                            </div>
                          </div>
                          
                          {/* Arrival */}
                          <div className="text-center">
                            <div className="text-lg font-semibold">{flight.arrival.time}</div>
                            <div className={`text-xs text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                              {flight.arrival.airport} • {language === 'en' ? flight.arrival.date : flight.arrival.date}
                            </div>
                            <div className="text-xs text-gray-600">
                              {flight.arrival.city || "Amman"}
                            </div>
                          </div>
                        </div>
                        
                        {/* Price & Book */}
                        <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col items-end">
                          <div className="text-lg font-semibold text-primary">{formatPrice(flight.price)}</div>
                          <div className={`text-xs text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {t("per person", "للشخص الواحد")}
                          </div>
                          <Button 
                            className="mt-2 bg-[#FF6B6B] hover:bg-opacity-90 text-white w-full md:w-auto"
                            onClick={() => handleSelectFlight(flight)}
                          >
                            <span className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Select", "اختيار")}
                            </span>
                          </Button>
                        </div>
                      </div>
                      
                      {/* Additional Flight Details */}
                      <div className="w-full border-t border-gray-200 pt-3 mt-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Baggage Info */}
                          <div>
                            <div className={`text-sm font-medium mb-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                              {t("Baggage Allowance", "السماح بالأمتعة")}
                            </div>
                            <div className="flex space-x-4 rtl:space-x-reverse text-xs text-gray-600">
                              <div>
                                <span className="font-medium">{t("Cabin", "مقصورة")}: </span>
                                {flight.baggage?.cabin || "7kg"}
                              </div>
                              <div>
                                <span className="font-medium">{t("Checked", "مسجلة")}: </span>
                                {flight.baggage?.checked || "20kg"}
                              </div>
                            </div>
                          </div>
                          
                          {/* Stops Info (if any) */}
                          {!flight.direct && flight.stops && flight.stops.length > 0 && (
                            <div>
                              <div className={`text-sm font-medium mb-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                                {t("Stops", "التوقفات")}
                              </div>
                              <div className="text-xs text-gray-600">
                                {flight.stops.map((stop: any, index: number) => (
                                  <div key={index}>
                                    {stop.airport} ({stop.city}) - {stop.duration}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Visa Requirements */}
                          {flight.visaRequired && (
                            <div>
                              <div className={`text-sm font-medium mb-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                                {t("Visa Requirements", "متطلبات التأشيرة")}
                              </div>
                              <div className="text-xs text-amber-600 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                {t("Visa required for", "تأشيرة مطلوبة لـ")} {flight.arrival.city || "Amman"}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {flights.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-lg text-gray-500 mb-2">
                    {t("No flights found", "لم يتم العثور على رحلات")}
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/")}
                    className={language === 'ar' ? 'font-cairo' : ''}
                  >
                    {t("Modify your search", "تعديل البحث")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
