import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { useBooking } from "@/context/booking-context";
import { CarRentalData } from "@/context/booking-context";
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
import { MapPin, Users, Fuel, Cog, Edit } from "lucide-react";
import PageTitle from "@/components/seo/page-title";
import { JsonLD, createBreadcrumbSchema } from "@/components/seo/json-ld";

// Mock car data for demonstration
const carResults = [
  {
    id: 1,
    name: "Toyota Camry",
    nameAr: "تويوتا كامري",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    type: "Sedan",
    typeAr: "سيدان",
    seats: 5,
    transmission: "Automatic",
    transmissionAr: "أوتوماتيكي",
    fuel: "Petrol",
    fuelAr: "بنزين",
    price: 45,
    perDay: true,
    pickupLocation: "Dubai International Airport",
    pickupLocationAr: "مطار دبي الدولي"
  },
  {
    id: 2,
    name: "Nissan Patrol",
    nameAr: "نيسان باترول",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    type: "SUV",
    typeAr: "دفع رباعي",
    seats: 7,
    transmission: "Automatic",
    transmissionAr: "أوتوماتيكي",
    fuel: "Petrol",
    fuelAr: "بنزين",
    price: 95,
    perDay: true,
    pickupLocation: "Dubai Mall",
    pickupLocationAr: "دبي مول"
  },
  {
    id: 3,
    name: "Volkswagen Golf",
    nameAr: "فولكس واجن جولف",
    image: "https://images.unsplash.com/photo-1603985529862-9e5f2e343432?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    type: "Hatchback",
    typeAr: "هاتشباك",
    seats: 5,
    transmission: "Manual",
    transmissionAr: "يدوي",
    fuel: "Petrol",
    fuelAr: "بنزين",
    price: 35,
    perDay: true,
    pickupLocation: "Dubai Marina",
    pickupLocationAr: "دبي مارينا"
  }
];

export default function Cars() {
  const { t, language } = useLanguage();
  const { currentBooking, setCarRental } = useBooking();
  const [location, navigate] = useLocation();

  const [cars, setCars] = useState(carResults);
  const [sortOption, setSortOption] = useState("price-asc");
  
  // Title is now set by PageTitle component

  // Sort cars when option changes
  useEffect(() => {
    let sortedCars = [...carResults];
    
    if (sortOption === "price-asc") {
      sortedCars.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      sortedCars.sort((a, b) => b.price - a.price);
    } else if (sortOption === "size-desc") {
      sortedCars.sort((a, b) => b.seats - a.seats);
    }
    
    setCars(sortedCars);
  }, [sortOption]);

  const handleSelectCar = (car: any) => {
    // Calculate rental duration in days
    const pickupDate = currentBooking?.type === "car" ? new Date(currentBooking.pickupDate) : new Date();
    const dropoffDate = currentBooking?.type === "car" ? new Date(currentBooking.dropoffDate) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const days = Math.ceil((dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Create car rental data
    const rentalData = {
      type: "car",
      pickupLocation: currentBooking?.type === "car" ? currentBooking.pickupLocation : (language === 'en' ? car.pickupLocation : car.pickupLocationAr),
      dropoffLocation: currentBooking?.type === "car" ? currentBooking.dropoffLocation : (language === 'en' ? car.pickupLocation : car.pickupLocationAr),
      pickupDate: currentBooking?.type === "car" ? currentBooking.pickupDate : new Date().toISOString().split('T')[0],
      pickupTime: currentBooking?.type === "car" ? currentBooking.pickupTime : "12:00",
      dropoffDate: currentBooking?.type === "car" ? currentBooking.dropoffDate : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dropoffTime: currentBooking?.type === "car" ? currentBooking.dropoffTime : "12:00",
      carType: language === 'en' ? `${car.name} (${car.type})` : `${car.nameAr} (${car.typeAr})`,
      price: car.price * days // Total price for all days
    };
    
    setCarRental(rentalData);
    navigate("/checkout");
  };

  // Create breadcrumb schema data for structured data
  const breadcrumbItems = [
    { name: t("Home", "الرئيسية"), url: "/" },
    { name: t("Car Rentals", "تأجير السيارات"), url: "/cars" }
  ];

  return (
    <>
      {/* SEO optimization */}
      <PageTitle 
        title={t("Car Rental Search Results - GoSafrat", "نتائج البحث عن تأجير السيارات - سفرات")} 
        description={t(
          "Find and book car rentals at competitive rates. Browse available vehicles by type, features, and price on GoSafrat.",
          "ابحث واحجز سيارات بأسعار تنافسية. تصفح المركبات المتاحة حسب النوع والميزات والسعر على سفرات."
        )} 
      />
      
      {/* Add breadcrumb structured data */}
      <JsonLD data={createBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <h2 className={`text-2xl font-bold text-gray-900 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
                  {t("Car Rental Search Results", "نتائج البحث عن تأجير السيارات")}
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
                      <SelectItem value="size-desc">
                        {t("Size: Largest first", "الحجم: الأكبر أولاً")}
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
                        {currentBooking?.type === "car" ? currentBooking.pickupLocation : "Dubai, UAE"}
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
              {cars.map((car) => (
                <Card 
                  key={car.id}
                  className="border border-gray-200 hover:shadow-md transition overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                      <img 
                        src={car.image} 
                        alt={language === 'en' ? car.name : car.nameAr} 
                        className="w-full h-full object-cover max-h-64 md:max-h-full"
                      />
                    </div>
                    
                    <div className="md:col-span-8 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`text-xl font-bold ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {language === 'en' ? car.name : car.nameAr}
                          </h3>
                          
                          <div className={`text-sm text-gray-500 mt-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {language === 'en' ? car.type : car.typeAr}
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                              {language === 'en' ? car.pickupLocation : car.pickupLocationAr}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">${car.price}</div>
                          <div className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {car.perDay ? t("per day", "لليوم الواحد") : t("total", "المجموع")}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="flex items-center text-gray-700">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span className={`text-sm ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {car.seats} {t("seats", "مقاعد")}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Cog className="h-4 w-4 mr-2 text-gray-500" />
                          <span className={`text-sm ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {language === 'en' ? car.transmission : car.transmissionAr}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Fuel className="h-4 w-4 mr-2 text-gray-500" />
                          <span className={`text-sm ${language === 'ar' ? 'font-cairo' : ''}`}>
                            {language === 'en' ? car.fuel : car.fuelAr}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button 
                          className="bg-[#FF6B6B] hover:bg-opacity-90 text-white"
                          onClick={() => handleSelectCar(car)}
                        >
                          <span className={language === 'ar' ? 'font-cairo' : ''}>
                            {t("Select Car", "اختيار السيارة")}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {cars.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-lg text-gray-500 mb-2">
                    {t("No cars found", "لم يتم العثور على سيارات")}
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
