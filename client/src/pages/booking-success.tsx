import { useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking } from "@/context/booking-context";
import { useLocation } from "wouter";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { CheckCircle, ArrowRight, Copy } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function BookingSuccess() {
  const { t, language } = useLanguage();
  const { currentBooking, clearBooking } = useBooking();
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Set document title
  useEffect(() => {
    document.title = t("Booking Confirmed - Safrat Travel", "تم تأكيد الحجز - سفرات");
  }, [language, t]);
  
  // Generate a random booking reference
  const generateBookingReference = () => {
    const prefix = currentBooking?.type === "flight" 
      ? "FLT" 
      : currentBooking?.type === "hotel" 
        ? "HTL" 
        : "CAR";
    
    const randomNumbers = Math.floor(10000000 + Math.random() * 90000000);
    return `${prefix}-${randomNumbers}`;
  };
  
  const bookingReference = generateBookingReference();
  
  // Format booking details based on type
  const formatBookingDetails = () => {
    if (!currentBooking) return null;
    
    if (currentBooking.type === "flight") {
      return {
        title: t("Flight Booking", "حجز رحلة طيران"),
        description: t("Your flight booking has been confirmed", "تم تأكيد حجز رحلتك"),
        details: [
          {
            label: t("Flight", "الرحلة"),
            value: currentBooking.airline || t("Selected Flight", "الرحلة المحددة")
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
            value: format(new Date(currentBooking.departureTime), "PPP")
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
        ]
      };
    } else if (currentBooking.type === "hotel") {
      return {
        title: t("Hotel Booking", "حجز فندق"),
        description: t("Your hotel booking has been confirmed", "تم تأكيد حجز الفندق الخاص بك"),
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
        description: t("Your car rental has been confirmed", "تم تأكيد تأجير السيارة الخاص بك"),
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
  
  const handleCopyReference = () => {
    navigator.clipboard.writeText(bookingReference);
    toast({
      title: t("Copied!", "تم النسخ!"),
      description: t("Booking reference copied to clipboard", "تم نسخ مرجع الحجز إلى الحافظة"),
    });
  };
  
  return (
    <>
      <Helmet>
        <title>{t("Booking Confirmed - Safrat Travel", "تم تأكيد الحجز - سفرات")}</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-8 px-8 pb-8">
                <div className="flex flex-col items-center text-center mb-8">
                  <CheckCircle className="text-green-500 h-16 w-16 mb-4" />
                  <h1 className={`text-3xl font-bold ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
                    {t("Booking Successful!", "تم الحجز بنجاح!")}
                  </h1>
                  <p className={`text-gray-600 mt-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {bookingDetails?.description || t("Your booking has been confirmed", "تم تأكيد حجزك")}
                  </p>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center mb-6">
                  <div>
                    <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Booking Reference", "رقم الحجز")}
                    </p>
                    <p className="font-mono text-lg font-bold">{bookingReference}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleCopyReference}>
                    <Copy className="h-4 w-4 mr-1" />
                    <span className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Copy", "نسخ")}
                    </span>
                  </Button>
                </div>
                
                {bookingDetails && (
                  <div>
                    <h2 className={`text-lg font-semibold mb-3 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Booking Details", "تفاصيل الحجز")}
                    </h2>
                    
                    <div className="space-y-2 mb-6">
                      {bookingDetails.details.map((detail, index) => (
                        <div key={index} className="flex justify-between">
                          <span className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {detail.label}:
                          </span>
                          <span className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between font-medium mb-1">
                      <span className={language === 'ar' ? 'font-cairo' : ''}>
                        {t("Total", "المجموع")}:
                      </span>
                      <span className="text-primary font-bold">${currentBooking?.price}</span>
                    </div>
                    
                    <p className={`text-xs text-gray-500 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Payment completed", "تم إكمال الدفع")}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse">
                  <Button 
                    variant="outline"
                    className={language === 'ar' ? 'font-cairo' : ''}
                    onClick={() => {
                      clearBooking();
                      navigate("/");
                    }}
                  >
                    <span className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Back to Home", "العودة إلى الرئيسية")}
                    </span>
                  </Button>
                  
                  <Button 
                    className={language === 'ar' ? 'font-cairo' : ''}
                  >
                    <span className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("View Booking", "عرض الحجز")}
                    </span>
                    {language === 'en' ? (
                      <ArrowRight className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-1" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
