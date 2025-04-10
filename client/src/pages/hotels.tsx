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
import { Helmet } from "react-helmet";
import { MapPin, Star, Edit, Wifi, Car, Coffee, Utensils } from "lucide-react";

// Mock hotel data for demonstration
const hotelResults = [
  {
    id: 1,
    name: "Grand Luxury Hotel",
    nameAr: "فندق جراند لاكشري",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "Downtown Dubai",
    locationAr: "وسط مدينة دبي",
    rating: 5,
    reviews: 487,
    price: 210,
    perNight: true,
    amenities: ["Free WiFi", "Parking", "Breakfast", "Restaurant"],
    amenitiesAr: ["واي فاي مجاني", "موقف سيارات", "إفطار", "مطعم"],
    amenityIcons: [<Wifi key="wifi" className="h-4 w-4" />, <Car key="car" className="h-4 w-4" />, <Coffee key="coffee" className="h-4 w-4" />, <Utensils key="food" className="h-4 w-4" />]
  },
  {
    id: 2,
    name: "Ocean View Resort",
    nameAr: "منتجع أوشن فيو",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "Jumeirah Beach",
    locationAr: "شاطئ جميرا",
    rating: 4.5,
    reviews: 324,
    price: 180,
    perNight: true,
    amenities: ["Free WiFi", "Pool", "Breakfast", "Spa"],
    amenitiesAr: ["واي فاي مجاني", "حمام سباحة", "إفطار", "سبا"],
    amenityIcons: [<Wifi key="wifi" className="h-4 w-4" />, <Coffee key="coffee" className="h-4 w-4" />]
  },
  {
    id: 3,
    name: "Business Plaza Hotel",
    nameAr: "فندق بيزنس بلازا",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "Business Bay",
    locationAr: "الخليج التجاري",
    rating: 4,
    reviews: 215,
    price: 150,
    perNight: true,
    amenities: ["Free WiFi", "Parking", "Business Center"],
    amenitiesAr: ["واي فاي مجاني", "موقف سيارات", "مركز أعمال"],
    amenityIcons: [<Wifi key="wifi" className="h-4 w-4" />, <Car key="car" className="h-4 w-4" />]
  }
];

export default function Hotels() {
  const { t, language } = useLanguage();
  const { currentBooking, setHotelBooking } = useBooking();
  const [location, navigate] = useLocation();

  const [hotels, setHotels] = useState(hotelResults);
  const [sortOption, setSortOption] = useState("price-asc");
  
  // Set document title
  useEffect(() => {
    document.title = t("Hotel Search Results - Safrat Travel", "نتائج البحث عن الفنادق - سفرات");
  }, [language, t]);

  // Sort hotels when option changes
  useEffect(() => {
    let sortedHotels = [...hotelResults];
    
    if (sortOption === "price-asc") {
      sortedHotels.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      sortedHotels.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-desc") {
      sortedHotels.sort((a, b) => b.rating - a.rating);
    }
    
    setHotels(sortedHotels);
  }, [sortOption]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex text-yellow-400">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-4 w-4 fill-current" />
            <Star className="absolute top-0 right-0 h-4 w-4 fill-current text-gray-300" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        )}
      </div>
    );
  };

  const handleSelectHotel = (hotel: any) => {
    // Calculate total nights
    const checkInDate = currentBooking?.type === "hotel" ? new Date(currentBooking.checkInDate) : new Date();
    const checkOutDate = currentBooking?.type === "hotel" ? new Date(currentBooking.checkOutDate) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Create hotel booking data
    const bookingData = {
      type: "hotel",
      hotelName: language === 'en' ? hotel.name : hotel.nameAr,
      city: currentBooking?.type === "hotel" ? currentBooking.city : "Dubai",
      checkInDate: currentBooking?.type === "hotel" ? currentBooking.checkInDate : new Date().toISOString().split('T')[0],
      checkOutDate: currentBooking?.type === "hotel" ? currentBooking.checkOutDate : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      rooms: currentBooking?.type === "hotel" ? currentBooking.rooms : 1,
      adults: currentBooking?.type === "hotel" ? currentBooking.adults : 2,
      children: currentBooking?.type === "hotel" ? currentBooking.children : 0,
      price: hotel.price * nights // Total price for all nights
    };
    
    setHotelBooking(bookingData);
    navigate("/checkout");
  };

  return (
    <>
      <Helmet>
        <title>{t("Hotel Search Results - Safrat Travel", "نتائج البحث عن الفنادق - سفرات")}</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <h2 className={`text-2xl font-bold text-gray-900 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
                  {t("Hotel Search Results", "نتائج البحث عن الفنادق")}
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
                      <SelectItem value="rating-desc">
                        {t("Rating: Highest first", "التقييم: الأعلى أولاً")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Card className="mt-4 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      <span className={`font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {currentBooking?.type === "hotel" ? currentBooking.city : "Dubai"}
                      </span>
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
              {hotels.map((hotel) => (
                <Card 
                  key={hotel.id}
                  className="border border-gray-200 hover:shadow-md transition overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                      <img 
                        src={hotel.image} 
                        alt={language === 'en' ? hotel.name : hotel.nameAr} 
                        className="w-full h-full object-cover max-h-64 md:max-h-full"
                      />
                    </div>
                    
                    <div className="md:col-span-8 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`text-xl font-bold ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {language === 'en' ? hotel.name : hotel.nameAr}
                          </h3>
                          
                          <div className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                              {language === 'en' ? hotel.location : hotel.locationAr}
                            </span>
                          </div>
                          
                          <div className="flex items-center mt-2">
                            {renderStars(hotel.rating)}
                            <span className="text-sm text-gray-600 ml-2">
                              ({hotel.reviews} {t("reviews", "تقييمات")})
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">${hotel.price}</div>
                          <div className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {hotel.perNight ? t("per night", "لليلة الواحدة") : t("total", "المجموع")}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {hotel.amenities.map((amenity, index) => (
                          <div 
                            key={amenity} 
                            className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {hotel.amenityIcons[index] && 
                              <span className="mr-1">{hotel.amenityIcons[index]}</span>
                            }
                            <span className={language === 'ar' ? 'font-cairo' : ''}>
                              {language === 'en' ? amenity : hotel.amenitiesAr[index]}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button 
                          className="bg-[#FF6B6B] hover:bg-opacity-90 text-white"
                          onClick={() => handleSelectHotel(hotel)}
                        >
                          <span className={language === 'ar' ? 'font-cairo' : ''}>
                            {t("Select Room", "اختيار الغرفة")}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {hotels.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-lg text-gray-500 mb-2">
                    {t("No hotels found", "لم يتم العثور على فنادق")}
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
