import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking } from "@/context/booking-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinners";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Building2, User, ChevronDown, Search, X, MapPin } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { cities, searchCities, getPopularCities } from "@/lib/cities-data";

export default function HotelSearch() {
  const { t, language } = useLanguage();
  const { setHotelBooking } = useBooking();
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  // Hotel search state
  const [city, setCity] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [infantCount, setInfantCount] = useState<number>(0);
  const [isGuestDetailsOpen, setIsGuestDetailsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // City search
  const [showCityOptions, setShowCityOptions] = useState<boolean>(false);
  const [citySearchResults, setCitySearchResults] = useState<any[]>([]);
  
  const guestPopoverRef = useRef<HTMLDivElement>(null);
  const citySearchRef = useRef<HTMLDivElement>(null);

  // Close poppers when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guestPopoverRef.current && !guestPopoverRef.current.contains(event.target as Node)) {
        setIsGuestDetailsOpen(false);
      }
      if (citySearchRef.current && !citySearchRef.current.contains(event.target as Node)) {
        setShowCityOptions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [guestPopoverRef, citySearchRef]);

  // Handle city search
  const handleCitySearch = (input: string) => {
    setCity(input);
    if (input.length > 0) {
      const results = searchCities(input);
      setCitySearchResults(results);
      setShowCityOptions(true);
    } else {
      setCitySearchResults(getPopularCities());
      setShowCityOptions(true);
    }
  };

  // Select city from dropdown
  const selectCity = (city: string) => {
    setCity(city);
    setShowCityOptions(false);
  };

  // Handle hotel search
  const handleSearch = async () => {
    if (!city) {
      toast({
        title: t("Destination Required", "الوجهة مطلوبة"),
        description: t("Please enter a destination city", "الرجاء إدخال مدينة الوجهة"),
        variant: "destructive",
      });
      return;
    }

    if (!checkInDate) {
      toast({
        title: t("Check-in Date Required", "تاريخ الوصول مطلوب"),
        description: t("Please select a check-in date", "الرجاء اختيار تاريخ الوصول"),
        variant: "destructive",
      });
      return;
    }

    if (!checkOutDate) {
      toast({
        title: t("Check-out Date Required", "تاريخ المغادرة مطلوب"),
        description: t("Please select a check-out date", "الرجاء اختيار تاريخ المغادرة"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Format city name to extract city code if in format "City (CODE)"
      let cityName = city;
      let cityCode = "";
      
      const cityMatch = city.match(/(.+) \(([A-Z]+)\)/);
      if (cityMatch) {
        cityName = cityMatch[1];
        cityCode = cityMatch[2];
      }

      // Set the hotel booking data
      setHotelBooking({
        type: "hotel",
        hotelName: "", // Will be filled after hotel selection
        city: cityName,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        rooms: roomCount,
        adults: adultCount,
        children: childCount,
        infants: infantCount,
        price: 0, // Will be set after hotel selection
      });

      // Navigate to hotels page
      navigate("/hotels");
    } catch (error) {
      console.error("Hotel search error:", error);
      toast({
        title: t("Search Error", "خطأ في البحث"),
        description: t("An error occurred while searching for hotels", "حدث خطأ أثناء البحث عن الفنادق"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Destination City */}
        <div className="relative" ref={citySearchRef}>
          <Label htmlFor="destination" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Destination", "الوجهة")}
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <MapPin className="h-4 w-4" />
            </div>
            <Input
              id="destination"
              placeholder={t("Enter city", "أدخل المدينة")}
              value={city}
              onChange={(e) => handleCitySearch(e.target.value)}
              onClick={() => {
                if (!showCityOptions) {
                  setCitySearchResults(getPopularCities());
                  setShowCityOptions(true);
                }
              }}
              className="pl-9 text-black"
            />
            {city && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setCity("");
                  setCitySearchResults(getPopularCities());
                  setShowCityOptions(true);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* City dropdown */}
          {showCityOptions && (
            <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="p-2 text-xs text-gray-500 border-b">
                {citySearchResults.length > 0 
                  ? t("Select a city", "اختر مدينة") 
                  : t("No cities found", "لم يتم العثور على مدن")}
              </div>
              {citySearchResults.map((cityItem: any, index: number) => (
                <div 
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center text-black"
                  onClick={() => selectCity(`${cityItem.name} (${cityItem.code})`)}
                >
                  <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                  <div>
                    <div className="font-medium">{cityItem.name}</div>
                    <div className="text-xs text-gray-500">{cityItem.country}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Check-in Date */}
        <div>
          <Label htmlFor="check-in" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Check-in", "تاريخ الوصول")}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal pl-9 text-black",
                    !checkInDate && "text-gray-500"
                  )}
                >
                  {checkInDate ? format(checkInDate, "PPP") : t("Select date", "اختر التاريخ")}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                initialFocus
                disabled={(date) => Boolean(date < new Date(new Date().setHours(0, 0, 0, 0)))}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Check-out Date */}
        <div>
          <Label htmlFor="check-out" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Check-out", "تاريخ المغادرة")}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal pl-9 text-black",
                    !checkOutDate && "text-gray-500"
                  )}
                >
                  {checkOutDate ? format(checkOutDate, "PPP") : t("Select date", "اختر التاريخ")}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                initialFocus
                disabled={(date) => 
                  Boolean(
                    date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                    (checkInDate && date < checkInDate)
                  )
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Guests/Rooms */}
        <div className="relative" ref={guestPopoverRef}>
          <Label htmlFor="guests" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Guests & Rooms", "الضيوف والغرف")}
          </Label>
          <div
            className="relative flex items-center border rounded-md px-3 py-2 cursor-pointer"
            onClick={() => setIsGuestDetailsOpen(!isGuestDetailsOpen)}
          >
            <User className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-black">
              {adultCount} {t("Adults", "بالغين")}
              {childCount > 0 && `, ${childCount} ${t("Children", "أطفال")}`}
              {infantCount > 0 && `, ${infantCount} ${t("Infants", "رضع")}`}
              {`, ${roomCount} ${t("Rooms", "غرف")}`}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500 ml-auto" />
          </div>
          
          {/* Guest details dropdown */}
          {isGuestDetailsOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-4">
              <div className="space-y-4">
                {/* Rooms */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <Label className={`text-black font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Rooms", "الغرف")}
                    </Label>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setRoomCount(Math.max(1, roomCount - 1))}
                        disabled={roomCount <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-black font-medium">{roomCount}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setRoomCount(Math.min(5, roomCount + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Adults */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className={`text-black font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Adults", "البالغين")}
                      </Label>
                      <p className="text-xs text-gray-500">{t("12+ years", "+12 سنة")}</p>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button
                        type="button"
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
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setAdultCount(Math.min(10, adultCount + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Children */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className={`text-black font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Children", "الأطفال")}
                      </Label>
                      <p className="text-xs text-gray-500">{t("2-11 years", "2-11 سنة")}</p>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button
                        type="button"
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
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setChildCount(Math.min(6, childCount + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Infants */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className={`text-black font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Infants", "الرضع")}
                      </Label>
                      <p className="text-xs text-gray-500">{t("Under 2 years", "أقل من سنتين")}</p>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button
                        type="button"
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
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-white"
                        onClick={() => setInfantCount(Math.min(adultCount, infantCount + 1))}
                        disabled={infantCount >= adultCount}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  {infantCount > 0 && (
                    <p className="text-xs text-amber-600 mt-1">
                      {t("Each infant must be assigned to an adult", "يجب تخصيص كل رضيع لشخص بالغ")}
                    </p>
                  )}
                </div>
                
                <Button
                  className="w-full mt-2 bg-[#FF6B6B] hover:bg-[#FF5A5A] text-white"
                  onClick={() => setIsGuestDetailsOpen(false)}
                >
                  {t("Done", "تم")}
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Button */}
        <div>
          <Label className="invisible" aria-hidden="true">
            {t("Search", "بحث")}
          </Label>
          <Button 
            className="w-full bg-[#051C2C] hover:bg-[#0A3A5C] text-white flex items-center justify-center h-10" 
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner className="h-5 w-5" />
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                {t("Search Hotels", "بحث الفنادق")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}