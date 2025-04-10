import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking } from "@/context/booking-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinners";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Car, Clock, Search, X, MapPin } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { cities, searchCities, getPopularCities } from "@/lib/cities-data";

// Car types available
const carTypes = [
  "Economy",
  "Compact",
  "Midsize",
  "Full-size",
  "SUV",
  "Luxury",
  "Minivan"
];

// Time slots for pickup/dropoff
const timeSlots = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

export default function CarSearch() {
  const { t, language } = useLanguage();
  const { setCarRental } = useBooking();
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  // Car rental search state
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [dropoffLocation, setDropoffLocation] = useState<string>("");
  const [sameLocation, setSameLocation] = useState<boolean>(true);
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>(undefined);
  const [pickupTime, setPickupTime] = useState<string>("10:00");
  const [dropoffTime, setDropoffTime] = useState<string>("10:00");
  const [carType, setCarType] = useState<string>("Economy");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // City search
  const [showPickupOptions, setShowPickupOptions] = useState<boolean>(false);
  const [showDropoffOptions, setShowDropoffOptions] = useState<boolean>(false);
  const [citySearchResults, setCitySearchResults] = useState<any[]>([]);
  
  const pickupSearchRef = useRef<HTMLDivElement>(null);
  const dropoffSearchRef = useRef<HTMLDivElement>(null);

  // Close poppers when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickupSearchRef.current && !pickupSearchRef.current.contains(event.target as Node)) {
        setShowPickupOptions(false);
      }
      if (dropoffSearchRef.current && !dropoffSearchRef.current.contains(event.target as Node)) {
        setShowDropoffOptions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickupSearchRef, dropoffSearchRef]);

  // Update dropoff location when same location is toggled
  useEffect(() => {
    if (sameLocation) {
      setDropoffLocation(pickupLocation);
    }
  }, [sameLocation, pickupLocation]);

  // Handle city search for pickup
  const handlePickupSearch = (input: string) => {
    setPickupLocation(input);
    if (sameLocation) {
      setDropoffLocation(input);
    }
    
    if (input.length > 0) {
      const results = searchCities(input);
      setCitySearchResults(results);
      setShowPickupOptions(true);
    } else {
      setCitySearchResults(getPopularCities());
      setShowPickupOptions(true);
    }
  };

  // Handle city search for dropoff
  const handleDropoffSearch = (input: string) => {
    setDropoffLocation(input);
    
    if (input.length > 0) {
      const results = searchCities(input);
      setCitySearchResults(results);
      setShowDropoffOptions(true);
    } else {
      setCitySearchResults(getPopularCities());
      setShowDropoffOptions(true);
    }
  };

  // Select city from dropdown for pickup
  const selectPickupCity = (city: string) => {
    setPickupLocation(city);
    if (sameLocation) {
      setDropoffLocation(city);
    }
    setShowPickupOptions(false);
  };

  // Select city from dropdown for dropoff
  const selectDropoffCity = (city: string) => {
    setDropoffLocation(city);
    setShowDropoffOptions(false);
  };

  // Handle car search
  const handleSearch = async () => {
    if (!pickupLocation) {
      toast({
        title: t("Pickup Location Required", "موقع الاستلام مطلوب"),
        description: t("Please enter a pickup location", "الرجاء إدخال موقع الاستلام"),
        variant: "destructive",
      });
      return;
    }

    if (!dropoffLocation) {
      toast({
        title: t("Drop-off Location Required", "موقع التسليم مطلوب"),
        description: t("Please enter a drop-off location", "الرجاء إدخال موقع التسليم"),
        variant: "destructive",
      });
      return;
    }

    if (!pickupDate) {
      toast({
        title: t("Pickup Date Required", "تاريخ الاستلام مطلوب"),
        description: t("Please select a pickup date", "الرجاء اختيار تاريخ الاستلام"),
        variant: "destructive",
      });
      return;
    }

    if (!dropoffDate) {
      toast({
        title: t("Drop-off Date Required", "تاريخ التسليم مطلوب"),
        description: t("Please select a drop-off date", "الرجاء اختيار تاريخ التسليم"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Calculate rental duration in days
      const pickup = new Date(pickupDate);
      const dropoff = new Date(dropoffDate);
      const durationMs = dropoff.getTime() - pickup.getTime();
      const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
      
      // Calculate estimated price (for demo purposes)
      let basePrice = 0;
      switch (carType) {
        case "Economy": basePrice = 30; break;
        case "Compact": basePrice = 35; break;
        case "Midsize": basePrice = 45; break;
        case "Full-size": basePrice = 55; break;
        case "SUV": basePrice = 65; break;
        case "Luxury": basePrice = 85; break;
        case "Minivan": basePrice = 75; break;
        default: basePrice = 40;
      }
      const totalPrice = basePrice * durationDays;

      // Set the car rental data
      setCarRental({
        type: "car",
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation,
        pickupDate: pickupDate.toISOString(),
        pickupTime: pickupTime,
        dropoffDate: dropoffDate.toISOString(),
        dropoffTime: dropoffTime,
        carType: carType,
        price: totalPrice
      });

      // Navigate to cars page
      navigate("/cars");
    } catch (error) {
      console.error("Car search error:", error);
      toast({
        title: t("Search Error", "خطأ في البحث"),
        description: t("An error occurred while searching for cars", "حدث خطأ أثناء البحث عن السيارات"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-3 flex items-center mb-2">
          <label className="flex items-center cursor-pointer text-black">
            <input
              type="checkbox"
              checked={sameLocation}
              onChange={(e) => setSameLocation(e.target.checked)}
              className="w-4 h-4 mr-2 text-[#051C2C] border-gray-300 rounded"
            />
            <span className={language === 'ar' ? 'font-cairo' : ''}>
              {t("Return car to the same location", "إعادة السيارة إلى نفس المكان")}
            </span>
          </label>
        </div>
        
        {/* Pickup Location */}
        <div className="relative" ref={pickupSearchRef}>
          <Label htmlFor="pickup-location" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Pickup Location", "موقع الاستلام")}
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <MapPin className="h-4 w-4" />
            </div>
            <Input
              id="pickup-location"
              placeholder={t("Enter city", "أدخل المدينة")}
              value={pickupLocation}
              onChange={(e) => handlePickupSearch(e.target.value)}
              onClick={() => {
                if (!showPickupOptions) {
                  setCitySearchResults(getPopularCities());
                  setShowPickupOptions(true);
                }
              }}
              className="pl-9 text-black"
            />
            {pickupLocation && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setPickupLocation("");
                  if (sameLocation) setDropoffLocation("");
                  setCitySearchResults(getPopularCities());
                  setShowPickupOptions(true);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* City dropdown */}
          {showPickupOptions && (
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
                  onClick={() => selectPickupCity(`${cityItem.name} (${cityItem.code})`)}
                >
                  <Car className="h-4 w-4 mr-2 text-gray-500" />
                  <div>
                    <div className="font-medium">{cityItem.name}</div>
                    <div className="text-xs text-gray-500">{cityItem.country}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Dropoff Location (only show if not same as pickup) */}
        {!sameLocation && (
          <div className="relative" ref={dropoffSearchRef}>
            <Label htmlFor="dropoff-location" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Dropoff Location", "موقع التسليم")}
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <MapPin className="h-4 w-4" />
              </div>
              <Input
                id="dropoff-location"
                placeholder={t("Enter city", "أدخل المدينة")}
                value={dropoffLocation}
                onChange={(e) => handleDropoffSearch(e.target.value)}
                onClick={() => {
                  if (!showDropoffOptions) {
                    setCitySearchResults(getPopularCities());
                    setShowDropoffOptions(true);
                  }
                }}
                className="pl-9 text-black"
              />
              {dropoffLocation && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setDropoffLocation("");
                    setCitySearchResults(getPopularCities());
                    setShowDropoffOptions(true);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* City dropdown */}
            {showDropoffOptions && (
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
                    onClick={() => selectDropoffCity(`${cityItem.name} (${cityItem.code})`)}
                  >
                    <Car className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <div className="font-medium">{cityItem.name}</div>
                      <div className="text-xs text-gray-500">{cityItem.country}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Pickup Date */}
        <div>
          <Label htmlFor="pickup-date" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Pickup Date", "تاريخ الاستلام")}
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
                    !pickupDate && "text-gray-500"
                  )}
                >
                  {pickupDate ? format(pickupDate, "PPP") : t("Select date", "اختر التاريخ")}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                initialFocus
                disabled={(date) => Boolean(date < new Date(new Date().setHours(0, 0, 0, 0)))}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Pickup Time */}
        <div>
          <Label htmlFor="pickup-time" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Pickup Time", "وقت الاستلام")}
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Clock className="h-4 w-4" />
            </div>
            <Select value={pickupTime} onValueChange={setPickupTime}>
              <SelectTrigger className="pl-9 text-black">
                <SelectValue placeholder={t("Select time", "اختر الوقت")} />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Dropoff Date */}
        <div>
          <Label htmlFor="dropoff-date" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Dropoff Date", "تاريخ التسليم")}
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
                    !dropoffDate && "text-gray-500"
                  )}
                >
                  {dropoffDate ? format(dropoffDate, "PPP") : t("Select date", "اختر التاريخ")}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dropoffDate}
                onSelect={setDropoffDate}
                initialFocus
                disabled={(date) => 
                  Boolean(
                    date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                    (pickupDate && date < pickupDate)
                  )
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Dropoff Time */}
        <div>
          <Label htmlFor="dropoff-time" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Dropoff Time", "وقت التسليم")}
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Clock className="h-4 w-4" />
            </div>
            <Select value={dropoffTime} onValueChange={setDropoffTime}>
              <SelectTrigger className="pl-9 text-black">
                <SelectValue placeholder={t("Select time", "اختر الوقت")} />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Car Type */}
        <div>
          <Label htmlFor="car-type" className={`text-black mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Car Type", "نوع السيارة")}
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Car className="h-4 w-4" />
            </div>
            <Select value={carType} onValueChange={setCarType}>
              <SelectTrigger className="pl-9 text-black">
                <SelectValue placeholder={t("Select car type", "اختر نوع السيارة")} />
              </SelectTrigger>
              <SelectContent>
                {carTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
                {t("Search Cars", "بحث السيارات")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}