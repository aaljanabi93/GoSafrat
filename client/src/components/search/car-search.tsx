import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking } from "@/context/booking-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function CarSearch() {
  const { t, language } = useLanguage();
  const { setCarRental } = useBooking();
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  // Car search state
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [dropoffLocation, setDropoffLocation] = useState<string>("");
  const [sameLocation, setSameLocation] = useState<boolean>(true);
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>(undefined);
  const [pickupTime, setPickupTime] = useState<string>("12:00");
  const [dropoffTime, setDropoffTime] = useState<string>("12:00");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generate time options every 30 minutes
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = (i % 2) * 30;
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    const ampm = hour < 12 ? 'AM' : 'PM';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return {
      value: time,
      label: `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`
    };
  });

  // Handle search submission
  const handleSearchCars = async () => {
    if (!pickupLocation || !pickupDate || !dropoffDate) {
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
      const formattedPickupDate = format(pickupDate, "yyyy-MM-dd");
      const formattedDropoffDate = format(dropoffDate, "yyyy-MM-dd");

      // Call API
      const response = await api.searchCars({
        pickupLocation: pickupLocation,
        dropoffLocation: sameLocation ? pickupLocation : dropoffLocation,
        pickupDate: formattedPickupDate,
        dropoffDate: formattedDropoffDate,
        pickupTime: pickupTime,
        dropoffTime: dropoffTime
      });

      // Set mock booking data for demonstration
      setCarRental({
        type: "car",
        pickupLocation: pickupLocation,
        dropoffLocation: sameLocation ? pickupLocation : dropoffLocation,
        pickupDate: formattedPickupDate,
        pickupTime: pickupTime,
        dropoffDate: formattedDropoffDate,
        dropoffTime: dropoffTime,
        carType: "Economy",
        price: 49
      });

      // Navigate to results page
      navigate("/cars");
    } catch (error: any) {
      console.error("Error searching cars:", error);
      toast({
        title: t("Search Error", "خطأ في البحث"),
        description: error.message || t("Failed to search cars", "فشل في البحث عن السيارات"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSearchCars(); }}>
      <div className="space-y-4">
        {/* Pickup Location */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            className="pl-10"
            placeholder={t("Pickup Location", "موقع الاستلام")}
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
        </div>

        {/* Same location checkbox */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Checkbox 
            id="same-location" 
            checked={sameLocation} 
            onCheckedChange={(checked) => setSameLocation(checked as boolean)}
          />
          <Label 
            htmlFor="same-location" 
            className={language === 'ar' ? 'font-cairo' : ''}
          >
            {t("Return car to the same location", "إعادة السيارة إلى نفس الموقع")}
          </Label>
        </div>

        {/* Dropoff Location - only shown if same location is unchecked */}
        {!sameLocation && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              className="pl-10"
              placeholder={t("Drop-off Location", "موقع التسليم")}
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup Date */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-10 justify-start text-left font-normal",
                    !pickupDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="h-4 w-4 absolute left-3 text-gray-400" />
                  {pickupDate ? (
                    format(pickupDate, "PPP")
                  ) : (
                    <span className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Pickup Date", "تاريخ الاستلام")}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={pickupDate}
                  onSelect={setPickupDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Pickup Time */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
            <Select
              value={pickupTime}
              onValueChange={setPickupTime}
            >
              <SelectTrigger className="pl-10">
                <SelectValue placeholder={t("Pickup Time", "وقت الاستلام")} />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Dropoff Date */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-10 justify-start text-left font-normal",
                    !dropoffDate && "text-muted-foreground"
                  )}
                  disabled={!pickupDate}
                >
                  <CalendarIcon className="h-4 w-4 absolute left-3 text-gray-400" />
                  {dropoffDate ? (
                    format(dropoffDate, "PPP")
                  ) : (
                    <span className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Drop-off Date", "تاريخ التسليم")}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dropoffDate}
                  onSelect={setDropoffDate}
                  initialFocus
                  disabled={(date) => date < new Date() || (pickupDate && date < pickupDate)}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Dropoff Time */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
            <Select
              value={dropoffTime}
              onValueChange={setDropoffTime}
            >
              <SelectTrigger className="pl-10">
                <SelectValue placeholder={t("Drop-off Time", "وقت التسليم")} />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full mt-4 bg-[#FF6B6B] hover:bg-opacity-90 text-white font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t("Searching...", "جاري البحث...")}
          </div>
        ) : (
          <span className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Search Cars", "بحث عن سيارات")}
          </span>
        )}
      </Button>
    </form>
  );
}
