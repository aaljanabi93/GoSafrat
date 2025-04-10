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
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft, Edit, Filter, SortDesc } from "lucide-react";
import SearchFilters, { SearchFilters as SearchFiltersType } from "@/components/search/search-filters";
import SearchSort, { SortOption } from "@/components/search/search-sort";
import FlightSearch from "@/components/search/flight-search";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getAirlineByCode } from "@/lib/airlines-data";
import { getAirportByCode } from "@/lib/airports-data";

// We'll use real flight data from the API instead of mocks

export default function Flights() {
  const { t, language } = useLanguage();
  const { currentBooking, setFlightBooking } = useBooking();
  const { formatPrice, currency } = useCurrency();
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  const [flights, setFlights] = useState<any[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("price_asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Default filter values
  const [filters, setFilters] = useState<SearchFiltersType>({
    priceRange: {
      min: 0,
      max: 3000,
      current: [0, 3000],
    },
    airlines: [],
    stops: [],
    departureTime: [0, 24],
    arrivalTime: [0, 24],
    duration: 1440, // 24 hours in minutes
    onlyRefundable: false,
  });
  
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

        // Sort and set the flights
        const sortedFlights = sortFlights(processedFlights, sortOption);
        setFlights(sortedFlights);
        setFilteredFlights(sortedFlights);
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

  // Apply filters to flights
  const applyFilters = (flightsToFilter: any[], currentFilters: SearchFiltersType) => {
    return flightsToFilter.filter(flight => {
      // Price filter
      if (flight.price < currentFilters.priceRange.current[0] || 
          flight.price > currentFilters.priceRange.current[1]) {
        return false;
      }
      
      // Airline filter
      if (currentFilters.airlines.length > 0 && 
          !currentFilters.airlines.includes(flight.airline?.code)) {
        return false;
      }
      
      // Stops filter
      if (currentFilters.stops.length > 0) {
        const stopCount = flight.stops?.length || 0;
        const matchesFilter = currentFilters.stops.some(s => {
          if (s === 0) return stopCount === 0;
          if (s === 1) return stopCount === 1;
          if (s === 2) return stopCount >= 2;
          return false;
        });
        if (!matchesFilter) return false;
      }
      
      // Departure time filter
      const departureHour = parseInt(flight.departure?.time?.split(':')[0] || '0');
      if (departureHour < currentFilters.departureTime[0] || 
          departureHour > currentFilters.departureTime[1]) {
        return false;
      }
      
      // Arrival time filter
      const arrivalHour = parseInt(flight.arrival?.time?.split(':')[0] || '0');
      if (arrivalHour < currentFilters.arrivalTime[0] || 
          arrivalHour > currentFilters.arrivalTime[1]) {
        return false;
      }
      
      // Duration filter
      let flightDuration = 0;
      if (flight.duration) {
        const durationMatch = flight.duration.match(/(\d+)h\s*(\d*)m?/);
        if (durationMatch) {
          const hours = parseInt(durationMatch[1]) || 0;
          const mins = parseInt(durationMatch[2]) || 0;
          flightDuration = hours * 60 + mins;
        }
      }
      if (flightDuration > currentFilters.duration) {
        return false;
      }
      
      // Refundable filter
      if (currentFilters.onlyRefundable && !flight.refundable) {
        return false;
      }
      
      return true;
    });
  };

  // Sort flights when option changes
  const sortFlights = (flightsToSort: any[], option: SortOption) => {
    let sortedFlights = [...flightsToSort];
    
    switch (option) {
      case "price_asc":
        sortedFlights.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sortedFlights.sort((a, b) => b.price - a.price);
        break;
      case "duration_asc":
        sortedFlights.sort((a, b) => {
          const durationA = parseDuration(a.duration);
          const durationB = parseDuration(b.duration);
          return durationA - durationB;
        });
        break;
      case "departure_asc":
        sortedFlights.sort((a, b) => {
          const timeA = a.departure?.time || "00:00";
          const timeB = b.departure?.time || "00:00";
          return timeA.localeCompare(timeB);
        });
        break;
      case "departure_desc":
        sortedFlights.sort((a, b) => {
          const timeA = a.departure?.time || "00:00";
          const timeB = b.departure?.time || "00:00";
          return timeB.localeCompare(timeA);
        });
        break;
      case "arrival_asc":
        sortedFlights.sort((a, b) => {
          const timeA = a.arrival?.time || "00:00";
          const timeB = b.arrival?.time || "00:00";
          return timeA.localeCompare(timeB);
        });
        break;
      case "arrival_desc":
        sortedFlights.sort((a, b) => {
          const timeA = a.arrival?.time || "00:00";
          const timeB = b.arrival?.time || "00:00";
          return timeB.localeCompare(timeA);
        });
        break;
      case "recommended":
        // Recommended is a composite score of price and duration
        sortedFlights.sort((a, b) => {
          const scoreA = a.price * 0.7 + parseDuration(a.duration) * 0.3;
          const scoreB = b.price * 0.7 + parseDuration(b.duration) * 0.3;
          return scoreA - scoreB;
        });
        break;
    }
    
    return sortedFlights;
  };
  
  // Helper function to parse duration string like "2h 30m" to minutes
  const parseDuration = (duration: string): number => {
    if (!duration) return 0;
    
    const durationMatch = duration.match(/(\d+)h\s*(\d*)m?/);
    if (durationMatch) {
      const hours = parseInt(durationMatch[1]) || 0;
      const mins = parseInt(durationMatch[2]) || 0;
      return hours * 60 + mins;
    }
    return 0;
  };
  
  // Apply filters and sorting
  useEffect(() => {
    if (flights.length > 0) {
      const filtered = applyFilters(flights, filters);
      const sorted = sortFlights(filtered, sortOption);
      setFilteredFlights(sorted);
    }
  }, [flights, filters, sortOption]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  };
  
  // Reset filters to default
  const handleClearFilters = () => {
    setFilters({
      priceRange: {
        min: 0,
        max: 3000,
        current: [0, 3000],
      },
      airlines: [],
      stops: [],
      departureTime: [0, 24],
      arrivalTime: [0, 24],
      duration: 1440,
      onlyRefundable: false,
    });
  };

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
        
        <main className="flex-grow bg-[#F8F9FA] py-6">
          <div className="container mx-auto px-4">
            {/* Top flight info header */}
            <div className="bg-[#051C2C] text-white p-4 rounded-t-lg mb-1">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="rounded-full bg-white p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#051C2C]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`text-base font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {currentBooking?.type === "flight" ? currentBooking.departureCity : "Dubai"} ({currentBooking?.type === "flight" ? currentBooking.departureAirport : "DXB"})
                    </div>
                    <div className="text-xs opacity-80">
                      {new Date(currentBooking?.type === "flight" ? currentBooking.departureTime : new Date().toISOString()).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center my-2 md:my-0">
                  <div className="h-[1px] w-8 md:w-16 bg-white/40"></div>
                  <div className="mx-2 text-sm px-3 py-1 rounded-full bg-white/20 whitespace-nowrap">
                    {currentBooking?.type === "flight" && currentBooking.returnFlight ? t("Round Trip", "ذهاب وعودة") : t("One Way", "ذهاب فقط")}
                  </div>
                  <div className="h-[1px] w-8 md:w-16 bg-white/40"></div>
                </div>

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="rounded-full bg-white p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#051C2C]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className={`text-base font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {currentBooking?.type === "flight" ? currentBooking.arrivalCity : "Amman"} ({currentBooking?.type === "flight" ? currentBooking.arrivalAirport : "AMM"})
                    </div>
                    <div className="text-xs opacity-80">
                      {new Date(currentBooking?.type === "flight" ? currentBooking.arrivalTime : new Date().toISOString()).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <Button
                  className="bg-[#FF6B6B] hover:bg-[#FF5A5A] text-white mt-2 md:mt-0 text-sm"
                  onClick={() => navigate("/")}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  <span className={language === 'ar' ? 'font-cairo' : ''}>
                    {t("Modify Search", "تعديل البحث")}
                  </span>
                </Button>
              </div>
            </div>

            {/* Filters and sorting bar */}
            <div className="bg-white p-4 flex flex-wrap justify-between items-center shadow-sm mb-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className={`text-lg font-bold text-[#051C2C] ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {filteredFlights.length} {t("Flight Options", "خيارات الرحلات")}
                  {filteredFlights.length !== flights.length && (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({t("filtered from", "تمت تصفيتها من")} {flights.length})
                    </span>
                  )}
                </div>
                <div className="flex text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-[#051C2C] text-white px-3 py-1.5">
                    {t("Cheapest", "الأرخص")}
                  </div>
                  <div className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 cursor-pointer">
                    {t("Fastest", "الأسرع")}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2 md:mt-0">
                <SearchSort
                  currentSort={sortOption}
                  onSortChange={setSortOption}
                  type="flight"
                />
              </div>
            </div>
            
            {/* Main content with sidebar */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Sidebar with filters - Desktop */}
              <div className="lg:w-1/4 hidden lg:block">
                <SearchFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  resultsCount={filteredFlights.length}
                  type="flight"
                  currency={currency.code}
                />
              </div>
              
              {/* Mobile Filters */}
              <div className="lg:hidden w-full mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Filter className="h-4 w-4" />
                      {t("Filter Results", "تصفية النتائج")}
                      {Object.keys(filters).some(key => {
                        if (key === 'priceRange') {
                          return filters.priceRange.current[0] !== filters.priceRange.min || 
                                  filters.priceRange.current[1] !== filters.priceRange.max;
                        }
                        if (Array.isArray(filters[key as keyof typeof filters])) {
                          return (filters[key as keyof typeof filters] as any[]).length > 0;
                        }
                        if (key === 'onlyRefundable') {
                          return filters.onlyRefundable;
                        }
                        return false;
                      }) && (
                        <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          •
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[85vw] sm:w-[400px]">
                    <SearchFilters
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onClearFilters={handleClearFilters}
                      resultsCount={filteredFlights.length}
                      type="flight"
                      currency={currency.code}
                    />
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Flight Results */}
              <div className="lg:w-3/4 space-y-4">
                {isLoading ? (
                  <div className="flex justify-center items-center py-12 bg-white rounded-md shadow-sm">
                    <LoadingSpinnerWithText 
                      text={t("Searching for the best flight deals...", "جارٍ البحث عن أفضل عروض الرحلات...")}
                      spinnerProps={{ variant: "plane", size: "lg" }}
                    />
                  </div>
                ) : error ? (
                  <div className="text-center py-8 bg-white rounded-md shadow-sm">
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
                  <div className="text-center py-8 bg-white rounded-md shadow-sm">
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
                ) : (
                  <>
                    {filteredFlights.map((flight) => (
                      <div 
                        key={flight.id || Math.random().toString()}
                        className="bg-white rounded-md shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        {/* Branded Header */}
                        <div className="bg-gradient-to-r from-[#051C2C] to-[#0A3A5C] px-4 py-1.5 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-7 h-7 rounded-full bg-white p-1 flex items-center justify-center mr-2">
                              <img 
                                src={flight.airline.logo} 
                                alt={language === 'en' ? flight.airline.name : flight.airline.nameAr} 
                                className="w-5 h-5 object-contain"
                              />
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">
                                {language === 'en' ? flight.airline.name : flight.airline.nameAr}
                              </div>
                              <div className="text-white/70 text-xs">
                                {flight.airline.flightNumber}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="text-white/80 text-xs flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {flight.duration}
                            </div>
                            <div className="bg-white/20 text-white text-xs px-2 py-0.5 rounded">
                              {flight.direct ? t("Direct Flight", "رحلة مباشرة") : t("With Stops", "مع توقفات")}
                            </div>
                          </div>
                        </div>
                        
                        {/* Flight Details Section */}
                        <div className="p-4">
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
                            {/* Departure & Arrival Info - Left Side */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-5 relative">
                                {/* Departure */}
                                <div className="flex flex-col mr-4">
                                  <div className="text-xl font-bold text-[#051C2C]">{flight.departure.time}</div>
                                  <div className="text-sm text-gray-600">
                                    {flight.departure.city || "Dubai"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {flight.departure.airport}
                                  </div>
                                </div>
                                
                                {/* Flight Path Visualization */}
                                <div className="flex-1 mx-3 relative">
                                  <div className="h-0.5 bg-gray-300 w-full absolute top-3"></div>
                                  <div className="flex justify-between absolute w-full">
                                    <div className="w-3 h-3 rounded-full bg-[#051C2C] -mt-1"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#051C2C] -mt-1"></div>
                                  </div>
                                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                                    {flight.direct ? t("Non-stop", "بدون توقف") : t("With stops", "مع توقفات")}
                                  </div>
                                </div>
                                
                                {/* Arrival */}
                                <div className="flex flex-col ml-4">
                                  <div className="text-xl font-bold text-[#051C2C]">{flight.arrival.time}</div>
                                  <div className="text-sm text-gray-600">
                                    {flight.arrival.city || "Amman"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {flight.arrival.airport}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Additional Info */}
                              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-600">
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                  </svg>
                                  <span className="font-medium">{t("Cabin", "مقصورة")}: </span>
                                  {flight.baggage?.cabin || "7kg"}
                                </div>
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  <span className="font-medium">{t("Checked", "مسجلة")}: </span>
                                  {flight.baggage?.checked || "20kg"}
                                </div>
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  <span className="font-medium">{t("Refundable", "قابل للاسترداد")}: </span>
                                  {t("Yes", "نعم")}
                                </div>
                                {flight.visaRequired && (
                                  <div className="flex items-center text-amber-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    {t("Visa required", "تأشيرة مطلوبة")}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Price & Booking - Right Side */}
                            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center border-l-0 md:border-l border-gray-200 md:pl-6">
                              <div className="flex flex-col items-center">
                                <div className="text-xs text-gray-500 mb-1">
                                  {t("Total Price", "السعر الإجمالي")}
                                </div>
                                <div className="text-2xl font-bold text-[#FF6B6B]">
                                  {formatPrice(flight.price)}
                                </div>
                                <div className="text-xs text-gray-500 mb-3">
                                  {t("per person", "للشخص الواحد")}
                                </div>
                                
                                <Button 
                                  className="bg-[#FF6B6B] hover:bg-[#FF5A5A] w-full text-white shadow-md transition-all hover:shadow-lg"
                                  onClick={() => handleSelectFlight(flight)}
                                >
                                  {t("Book Now", "احجز الآن")}
                                </Button>
                                
                                <button 
                                  className="mt-2 text-xs text-[#051C2C] font-medium hover:underline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Save the flight data in history state for the details page
                                    window.history.pushState({ flight }, "", `/flight-details/${flight.id || Math.random().toString(36).substring(2, 10)}`);
                                    navigate(`/flight-details/${flight.id || Math.random().toString(36).substring(2, 10)}`);
                                  }}
                                >
                                  {t("View Details", "عرض التفاصيل")}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Information Bar */}
                        {!flight.direct && flight.stops && flight.stops.length > 0 && (
                          <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 text-xs">
                            <div className="font-medium text-gray-700 mb-1">
                              {t("Flight Stops", "توقفات الرحلة")}
                            </div>
                            <div className="text-gray-600">
                              {flight.stops.map((stop: any, index: number) => (
                                <div key={index} className="flex items-center">
                                  <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                                  {stop.airport} ({stop.city}) - {stop.duration}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {filteredFlights.length === 0 && flights.length > 0 && (
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
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
