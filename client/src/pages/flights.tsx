import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking } from "@/context/booking-context";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

// Mock flight data for demonstration
const flightResults = [
  {
    id: 1,
    airline: {
      name: "Emirates",
      nameAr: "طيران الإمارات",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
      flightNumber: "EK506",
      aircraft: "Boeing 777"
    },
    departure: {
      time: "07:45",
      airport: "DXB",
      city: "Dubai",
      date: "2023-09-25"
    },
    arrival: {
      time: "11:35",
      airport: "AMM",
      city: "Amman",
      date: "2023-09-25"
    },
    duration: "7h 50m",
    direct: true,
    price: 645,
    baggage: {
      cabin: "7kg",
      checked: "30kg"
    },
    stops: [],
    visaRequired: true
  },
  {
    id: 2,
    airline: {
      name: "British Airways",
      nameAr: "الخطوط البريطانية",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/British_Airways_Logo.svg/250px-British_Airways_Logo.svg.png",
      flightNumber: "BA108",
      aircraft: "Airbus A380"
    },
    departure: {
      time: "09:25",
      airport: "DXB",
      date: "2023-09-25"
    },
    arrival: {
      time: "13:40",
      airport: "LHR",
      date: "2023-09-25"
    },
    duration: "8h 15m",
    direct: true,
    price: 598
  },
  {
    id: 3,
    airline: {
      name: "Qatar Airways",
      nameAr: "القطرية",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png",
      flightNumber: "QR8",
      aircraft: "Boeing 787"
    },
    departure: {
      time: "08:15",
      airport: "DXB",
      date: "2023-09-25"
    },
    arrival: {
      time: "12:45",
      airport: "LHR",
      date: "2023-09-25"
    },
    duration: "8h 30m",
    direct: true,
    price: 612
  }
];

export default function Flights() {
  const { t, language } = useLanguage();
  const { currentBooking, setFlightBooking } = useBooking();
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  const [flights, setFlights] = useState(flightResults);
  const [sortOption, setSortOption] = useState("price-asc");
  
  // Set document title
  useEffect(() => {
    document.title = t("Flight Search Results - Safrat Travel", "نتائج البحث عن الرحلات - سفرات");
  }, [language, t]);

  // Sort flights when option changes
  useEffect(() => {
    let sortedFlights = [...flightResults];
    
    if (sortOption === "price-asc") {
      sortedFlights.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      sortedFlights.sort((a, b) => b.price - a.price);
    } else if (sortOption === "duration-asc") {
      sortedFlights.sort((a, b) => {
        const durationA = parseInt(a.duration.split('h')[0]);
        const durationB = parseInt(b.duration.split('h')[0]);
        return durationA - durationB;
      });
    }
    
    setFlights(sortedFlights);
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
                            {currentBooking?.type === "flight" ? currentBooking.arrivalCity : "London"} ({currentBooking?.type === "flight" ? currentBooking.arrivalAirport : "LHR"})
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
                            {currentBooking?.type === "flight" ? currentBooking.arrivalCity : "لندن"} ({currentBooking?.type === "flight" ? currentBooking.arrivalAirport : "LHR"})
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
              {flights.map((flight) => (
                <Card 
                  key={flight.id}
                  className="border border-gray-200 hover:shadow-md transition"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
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
                        </div>
                      </div>
                      
                      {/* Price & Book */}
                      <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col items-end">
                        <div className="text-lg font-semibold text-primary">${flight.price}</div>
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
