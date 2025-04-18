import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking } from "@/context/booking-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingSpinner } from "@/components/ui/loading-spinners";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plane, PlaneLanding, User, ChevronDown, Search, X } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { airports, searchAirports, getPopularAirports, Airport } from "@/lib/airports-data";

export default function FlightSearch() {
  const { t, language } = useLanguage();
  const { setFlightBooking } = useBooking();
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  // Flight search state
  const [tripType, setTripType] = useState<string>("roundtrip");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [infantCount, setInfantCount] = useState<number>(0);
  const [cabinClass, setCabinClass] = useState<string>("economy");
  const [isPassengerOpen, setIsPassengerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Airport search
  const [showOriginOptions, setShowOriginOptions] = useState<boolean>(false);
  const [showDestinationOptions, setShowDestinationOptions] = useState<boolean>(false);
  
  // Legacy airport list - will be removed after fully migrating to the new system
  const legacyAirportOptions = [
    "New York (JFK)",
    "New York (LGA)",
    "London (LHR)",
    "London (LGW)",
    "London (STN)",
    "Paris (CDG)",
    "Paris (ORY)",
    "Dubai (DXB)",
    "Tokyo (HND)",
    "Tokyo (NRT)",
    "Singapore (SIN)",
    "Los Angeles (LAX)",
    "Chicago (ORD)",
    "Istanbul (IST),",
    "Hong Kong (HKG)",
    "Bangkok (BKK)",
    "Sydney (SYD)",
    "Delhi (DEL)",
    "Madrid (MAD)",
    "Cairo (CAI)",
    "Berlin (BER)",
    "Berlin (TXL)",
    "Rome (FCO)",
    "Beijing (PEK)",
    "Beijing (PKX)",
    "Amsterdam (AMS)",
    "Frankfurt (FRA)",
    "Toronto (YYZ)",
    "Sao Paulo (GRU)",
    "Mexico City (MEX)",
    "Johannesburg (JNB)",
    "Cape Town (CPT)",
    "Mumbai (BOM)",
    "Seoul (ICN)",
    "Shanghai (PVG)",
    "Melbourne (MEL)",
    "San Francisco (SFO)",
    "Miami (MIA)",
    "Atlanta (ATL)",
    "Dallas (DFW)",
    "Munich (MUC)",
    "Barcelona (BCN)",
    "Zurich (ZRH)",
    "Brussels (BRU)",
    "Moscow (SVO)",
    "Moscow (DME)",
    "Vienna (VIE)",
    "Copenhagen (CPH)",
    "Stockholm (ARN)",
    "Oslo (OSL)",
    "Helsinki (HEL)",
    "Athens (ATH)",
    "Lisbon (LIS)",
    "Dublin (DUB)",
    "Warsaw (WAW)",
    "Prague (PRG)",
    "Budapest (BUD)",
    "Abu Dhabi (AUH)",
    "Doha (DOH)",
    "Riyadh (RUH)",
    "Jeddah (JED)",
    "Kuwait (KWI)",
    "Muscat (MCT)",
    "Bahrain (BAH)",
    "Tel Aviv (TLV)",
    "Amman (AMM)",
    "Beirut (BEY)",
    "Cairo (CAI)",
    "Casablanca (CMN)",
    "Tunis (TUN)",
    "Algiers (ALG)",
    "Nairobi (NBO)",
    "Lagos (LOS)",
    "Addis Ababa (ADD)",
    "Mauritius (MRU)",
    "Seychelles (SEZ)",
    "Manila (MNL)",
    "Jakarta (CGK)",
    "Kuala Lumpur (KUL)",
    "Ho Chi Minh (SGN)",
    "Hanoi (HAN)",
    "Bali (DPS)",
    "Taipei (TPE)",
    "Auckland (AKL)",
    "Wellington (WLG)",
    "Fiji (NAN)",
    "Tahiti (PPT)",
    "Honolulu (HNL)",
    "Vancouver (YVR)",
    "Montreal (YUL)",
    "Calgary (YYC)",
    "Rio de Janeiro (GIG)",
    "Buenos Aires (EZE)",
    "Lima (LIM)",
    "Santiago (SCL)",
    "Bogota (BOG)",
    "Panama City (PTY)",
    "San Jose (SJO)",
    "Cancun (CUN)",
    "Havana (HAV)"
  ];

  // Dropdown options
  const cabinOptions = [
    { value: "economy", label: t("Economy", "اقتصادي") },
    { value: "business", label: t("Business", "رجال الأعمال") },
    { value: "first", label: t("First Class", "الدرجة الأولى") }
  ];

  // Format airport for display
  const formatAirport = (airport: Airport): string => {
    return `${airport.city} (${airport.code})`;
  };

  // Initialize airport data
  const [originAirports, setOriginAirports] = useState<Airport[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<Airport[]>([]);

  // Load popular airports on component mount
  useEffect(() => {
    const popular = getPopularAirports();
    setOriginAirports(popular);
    setDestinationAirports(popular);
  }, []);

  // Handle airport search
  const handleSearchOrigin = (value: string) => {
    setOrigin(value);
    if (value.length > 1) {
      const results = searchAirports(value);
      setOriginAirports(results.slice(0, 10)); // Limit to 10 results for better UX
      setShowOriginOptions(results.length > 0);
    } else {
      const popular = getPopularAirports();
      setOriginAirports(popular);
      setShowOriginOptions(value.length > 0);
    }
  };

  const handleSearchDestination = (value: string) => {
    setDestination(value);
    if (value.length > 1) {
      const results = searchAirports(value);
      setDestinationAirports(results.slice(0, 10)); // Limit to 10 results for better UX
      setShowDestinationOptions(results.length > 0);
    } else {
      const popular = getPopularAirports();
      setDestinationAirports(popular);
      setShowDestinationOptions(value.length > 0);
    }
  };

  const selectOrigin = (airport: Airport) => {
    const formattedAirport = formatAirport(airport);
    setOrigin(formattedAirport);
    setShowOriginOptions(false);
  };

  const selectDestination = (airport: Airport) => {
    const formattedAirport = formatAirport(airport);
    setDestination(formattedAirport);
    setShowDestinationOptions(false);
  };

  // Handle search submission
  const handleSearchFlights = async () => {
    if (!origin || !destination || !departureDate) {
      toast({
        title: t("Missing Information", "معلومات ناقصة"),
        description: t("Please fill in all required fields", "يرجى ملء جميع الحقول المطلوبة"),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Format dates for API
      const formattedDepartDate = format(departureDate, "yyyy-MM-dd");
      const formattedReturnDate = returnDate ? format(returnDate, "yyyy-MM-dd") : "";

      // Call API
      const response = await api.searchFlights({
        origin: origin,
        destination: destination,
        departDate: formattedDepartDate,
        returnDate: formattedReturnDate,
        adults: adultCount,
        children: childCount,
        infants: infantCount
      });

      // Calculate total passengers
      const totalPassengers = adultCount + childCount + infantCount;

      // Set mock booking data for demonstration
      setFlightBooking({
        type: "flight",
        departureCity: origin,
        departureAirport: origin,
        departureTime: formattedDepartDate,
        arrivalCity: destination,
        arrivalAirport: destination,
        arrivalTime: formattedReturnDate || formattedDepartDate,
        passengers: totalPassengers,
        cabinClass: cabinClass,
        price: 549,
        returnFlight: tripType === "roundtrip",
      });

      // Navigate to results page
      navigate("/flights");
    } catch (error: any) {
      console.error("Error searching flights:", error);
      toast({
        title: t("Search Error", "خطأ في البحث"),
        description: error.message || t("Failed to search flights", "فشل في البحث عن الرحلات"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSearchFlights(); }}>
      <div className="space-y-4">
        {/* Trip Type */}
        <div className="bg-white rounded-lg p-1 inline-flex border mb-4">
          <RadioGroup
            value={tripType}
            onValueChange={setTripType}
            className="flex"
          >
            <div className={`px-4 py-2 rounded-lg ${tripType === "roundtrip" ? "bg-gray-100" : ""}`}>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="roundtrip" id="roundtrip" className="mr-1" />
                <Label htmlFor="roundtrip" className={`text-black ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {t("Round Trip", "ذهاب وعودة")}
                </Label>
              </div>
            </div>
            
            <div className={`px-4 py-2 rounded-lg ${tripType === "oneway" ? "bg-gray-100" : ""}`}>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="oneway" id="oneway" className="mr-1" />
                <Label htmlFor="oneway" className={`text-black ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {t("One Way", "ذهاب فقط")}
                </Label>
              </div>
            </div>
            
            <div className={`px-4 py-2 rounded-lg ${tripType === "multicity" ? "bg-gray-100" : ""}`}>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="multicity" id="multicity" className="mr-1" />
                <Label htmlFor="multicity" className={`text-black ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {t("Multi-City", "وجهات متعددة")}
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* From */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Plane className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              className="pl-10 pr-16 text-black"
              placeholder={t("From: City or Airport", "من: المدينة أو المطار")}
              value={origin}
              onChange={(e) => handleSearchOrigin(e.target.value)}
              onFocus={() => origin.length > 1 && setShowOriginOptions(true)}
              onBlur={() => setTimeout(() => setShowOriginOptions(false), 200)}
            />
            {origin && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
                <span className="text-xs font-medium">
                  {origin.match(/\([A-Z]{3}\)$/) 
                    ? origin.match(/\(([A-Z]{3})\)$/)?.[1] 
                    : origin.substring(0, 3).toUpperCase()}
                </span>
              </div>
            )}
            
            {/* Origin Airport Search Results */}
            {showOriginOptions && (
              <div className="absolute z-10 w-full bg-white mt-1 rounded-md border border-gray-200 shadow-lg max-h-60 overflow-y-auto text-black">
                {originAirports.map((airport, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={() => selectOrigin(airport)}
                  >
                    <div className={`text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {airport.city}
                    </div>
                    <div className="text-gray-600 text-xs font-medium">
                      {airport.code} - {airport.country}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* To */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PlaneLanding className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              className="pl-10 pr-16 text-black"
              placeholder={t("To: City or Airport", "إلى: المدينة أو المطار")}
              value={destination}
              onChange={(e) => handleSearchDestination(e.target.value)}
              onFocus={() => destination.length > 1 && setShowDestinationOptions(true)}
              onBlur={() => setTimeout(() => setShowDestinationOptions(false), 200)}
            />
            {destination && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
                <span className="text-xs font-medium">
                  {destination.match(/\([A-Z]{3}\)$/) 
                    ? destination.match(/\(([A-Z]{3})\)$/)?.[1] 
                    : destination.substring(0, 3).toUpperCase()}
                </span>
              </div>
            )}
            
            {/* Destination Airport Search Results */}
            {showDestinationOptions && (
              <div className="absolute z-10 w-full bg-white mt-1 rounded-md border border-gray-200 shadow-lg max-h-60 overflow-y-auto text-black">
                {destinationAirports.map((airport, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={() => selectDestination(airport)}
                  >
                    <div className={`text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {airport.city}
                    </div>
                    <div className="text-gray-600 text-xs font-medium">
                      {airport.code} - {airport.country}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Departure Date */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-10 justify-start text-left font-normal",
                    !departureDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="h-4 w-4 absolute left-3 text-gray-400" />
                  {departureDate ? (
                    <span className="text-black">{format(departureDate, "PPP")}</span>
                  ) : (
                    <span className={`text-black ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Departure Date", "تاريخ المغادرة")}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={setDepartureDate}
                  initialFocus
                  disabled={(date: Date): boolean => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Return Date - only shown for round trip */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-10 justify-start text-left font-normal",
                    !returnDate && "text-muted-foreground",
                    tripType !== "roundtrip" && "opacity-50"
                  )}
                  disabled={tripType !== "roundtrip"}
                >
                  <CalendarIcon className="h-4 w-4 absolute left-3 text-gray-400" />
                  {returnDate ? (
                    <span className="text-black">{format(returnDate, "PPP")}</span>
                  ) : (
                    <span className={`text-black ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Return Date", "تاريخ العودة")}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                  disabled={(date: Date): boolean => {
                    if (!date) return true;
                    return date < new Date() || (departureDate ? date < departureDate : false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Passengers & Class */}
        <div className="relative">
          <Popover open={isPassengerOpen} onOpenChange={setIsPassengerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full pl-10 justify-start text-left font-normal"
              >
                <User className="h-4 w-4 absolute left-3 text-gray-400" />
                <span className={`text-black ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {adultCount} {t("Adult", "بالغ")}
                  {childCount > 0 && `, ${childCount} ${t("Child", "طفل")}`}
                  {infantCount > 0 && `, ${infantCount} ${t("Infant", "رضيع")}`}
                  {`, ${cabinOptions.find(o => o.value === cabinClass)?.label}`}
                </span>
                <ChevronDown className="h-4 w-4 absolute right-3 text-gray-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                {/* Adults */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <Label className={`text-black font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Adults", "البالغين")}
                      </Label>
                      <p className="text-xs text-gray-500">{t("12+ years", "+12 سنة")}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                        disabled={adultCount <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-black font-medium">{adultCount}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setAdultCount(Math.min(9, adultCount + 1))}
                        disabled={adultCount + childCount + infantCount >= 9}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Children */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <Label className={`text-black font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Children", "الأطفال")}
                      </Label>
                      <p className="text-xs text-gray-500">{t("2-11 years", "2-11 سنة")}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setChildCount(Math.max(0, childCount - 1))}
                        disabled={childCount <= 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-black font-medium">{childCount}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setChildCount(Math.min(8, childCount + 1))}
                        disabled={adultCount + childCount + infantCount >= 9}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Infants */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <Label className={`text-black font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Infants", "الرضع")}
                      </Label>
                      <p className="text-xs text-gray-500">{t("Under 2 years", "أقل من 2 سنة")}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setInfantCount(Math.max(0, infantCount - 1))}
                        disabled={infantCount <= 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-black font-medium">{infantCount}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setInfantCount(Math.min(adultCount, infantCount + 1))}
                        disabled={infantCount >= adultCount || adultCount + childCount + infantCount >= 9}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  {infantCount > 0 && (
                    <p className="text-xs text-amber-600 mt-1">
                      {t("Each infant must be accompanied by an adult", "يجب أن يكون كل رضيع مصحوبًا بشخص بالغ")}
                    </p>
                  )}
                </div>
                
                {/* Cabin Class */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <Label className={`text-black font-medium ${language === 'ar' ? 'font-cairo' : ''} mb-2 block`}>
                    {t("Cabin Class", "درجة المقصورة")}
                  </Label>
                  <RadioGroup value={cabinClass} onValueChange={setCabinClass} className="space-y-2">
                    {cabinOptions.map((option) => (
                      <div className="flex items-center space-x-2 rtl:space-x-reverse" key={option.value}>
                        <RadioGroupItem value={option.value} id={`cabin-${option.value}`} />
                        <Label htmlFor={`cabin-${option.value}`} className={`text-black ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Button 
                  className="w-full bg-[#FF6B6B] hover:bg-[#FF5A5A] text-white"
                  onClick={() => setIsPassengerOpen(false)}
                >
                  {t("Apply", "تطبيق")}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full mt-4 bg-[#FF6B6B] hover:bg-opacity-90 text-white font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <LoadingSpinner variant="plane" size="sm" className="mr-2" />
            {t("Searching...", "جاري البحث...")}
          </div>
        ) : (
          <span className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Search Flights", "بحث عن رحلات")}
          </span>
        )}
      </Button>
    </form>
  );
}
