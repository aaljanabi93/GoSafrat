import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking } from "@/context/booking-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, User, ChevronDown } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function HotelSearch() {
  const { t, language } = useLanguage();
  const { setHotelBooking } = useBooking();
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  // Hotel search state
  const [destination, setDestination] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [isGuestsOpen, setIsGuestsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle search submission
  const handleSearchHotels = async () => {
    if (!destination || !checkInDate || !checkOutDate) {
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
      const formattedCheckIn = format(checkInDate, "yyyy-MM-dd");
      const formattedCheckOut = format(checkOutDate, "yyyy-MM-dd");

      // Call API
      const response = await api.searchHotels({
        destination: destination,
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut,
        adults: adultCount,
        children: childCount,
        rooms: roomCount
      });

      // Set mock booking data for demonstration
      setHotelBooking({
        type: "hotel",
        hotelName: "Luxury Hotel",
        city: destination,
        checkInDate: formattedCheckIn,
        checkOutDate: formattedCheckOut,
        rooms: roomCount,
        adults: adultCount,
        children: childCount,
        price: 199
      });

      // Navigate to results page
      navigate("/hotels");
    } catch (error: any) {
      console.error("Error searching hotels:", error);
      toast({
        title: t("Search Error", "خطأ في البحث"),
        description: error.message || t("Failed to search hotels", "فشل في البحث عن الفنادق"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSearchHotels(); }}>
      <div className="space-y-4">
        {/* Destination */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            className="pl-10"
            placeholder={t("Destination: City, Airport or Hotel", "الوجهة: المدينة، المطار أو الفندق")}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Check In */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-10 justify-start text-left font-normal",
                    !checkInDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="h-4 w-4 absolute left-3 text-gray-400" />
                  {checkInDate ? (
                    format(checkInDate, "PPP")
                  ) : (
                    <span className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Check In", "تاريخ الوصول")}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Check Out */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-10 justify-start text-left font-normal",
                    !checkOutDate && "text-muted-foreground"
                  )}
                  disabled={!checkInDate}
                >
                  <CalendarIcon className="h-4 w-4 absolute left-3 text-gray-400" />
                  {checkOutDate ? (
                    format(checkOutDate, "PPP")
                  ) : (
                    <span className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Check Out", "تاريخ المغادرة")}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  initialFocus
                  disabled={(date) => date < new Date() || (checkInDate && date <= checkInDate)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Guests & Rooms */}
        <div className="relative">
          <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full pl-10 justify-start text-left font-normal"
              >
                <User className="h-4 w-4 absolute left-3 text-gray-400" />
                <span className={language === 'ar' ? 'font-cairo' : ''}>
                  {adultCount} {t("Adults", "بالغ")}, {childCount} {t("Children", "أطفال")}, {roomCount} {t("Room", "غرفة")}
                </span>
                <ChevronDown className="h-4 w-4 absolute right-3 text-gray-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Adults", "البالغين")}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                      >
                        -
                      </Button>
                      <span>{adultCount}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAdultCount(adultCount + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Children", "الأطفال")}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setChildCount(Math.max(0, childCount - 1))}
                      >
                        -
                      </Button>
                      <span>{childCount}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setChildCount(childCount + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Rooms", "الغرف")}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRoomCount(Math.max(1, roomCount - 1))}
                      >
                        -
                      </Button>
                      <span>{roomCount}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRoomCount(roomCount + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => setIsGuestsOpen(false)}
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
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t("Searching...", "جاري البحث...")}
          </div>
        ) : (
          <span className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Search Hotels", "بحث عن فنادق")}
          </span>
        )}
      </Button>
    </form>
  );
}
