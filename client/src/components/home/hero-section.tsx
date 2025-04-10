import { useState, ReactNode } from "react";
import { useLanguage } from "@/context/language-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Building, Car } from "lucide-react";
import FlightSearch from "@/components/search/flight-search";
import HotelSearch from "@/components/search/hotel-search";
import CarSearch from "@/components/search/car-search";

// Background image URL for the hero section
const bgImage = 'linear-gradient(to right, rgba(5,28,44,0.8), rgba(10,58,92,0.8)), url("/hero-bg.jpg")';

export default function HeroSection() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("flights");
  
  // Change tab handler
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <section 
      className="relative bg-cover bg-center py-16 md:py-24" 
      style={{ backgroundImage: bgImage }}
    >
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center text-white mb-10">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
            {t("Find Your Perfect Trip", "ابحث عن رحلتك المثالية")}
          </h1>
          <p className={`text-lg md:text-xl opacity-90 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Search and compare flights, hotels, and car rentals from trusted partners", "ابحث وقارن بين الرحلات الجوية والفنادق وتأجير السيارات من شركاء موثوق بهم")}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Tabs defaultValue="flights" onValueChange={handleTabChange}>
            <TabsList className="w-full grid grid-cols-3 rounded-none">
              <TabItem 
                value="flights" 
                label={t("Flights", "رحلات جوية")} 
                icon={<Plane className="h-4 w-4 mr-2" />} 
                isActive={activeTab === "flights"}
              />
              <TabItem 
                value="hotels" 
                label={t("Hotels", "فنادق")} 
                icon={<Building className="h-4 w-4 mr-2" />} 
                isActive={activeTab === "hotels"}
              />
              <TabItem 
                value="cars" 
                label={t("Cars", "سيارات")} 
                icon={<Car className="h-4 w-4 mr-2" />} 
                isActive={activeTab === "cars"}
              />
            </TabsList>
            
            <TabsContent value="flights" className="m-0">
              <FlightSearch />
            </TabsContent>
            <TabsContent value="hotels" className="m-0">
              <HotelSearch />
            </TabsContent>
            <TabsContent value="cars" className="m-0">
              <CarSearch />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

// Tab item component
function TabItem({ 
  value, 
  label, 
  icon, 
  isActive 
}: { 
  value: string; 
  label: string; 
  icon: ReactNode;
  isActive: boolean;
}) {
  return (
    <TabsTrigger 
      value={value} 
      className={`py-3 flex items-center justify-center text-black font-medium transition-all
        ${isActive ? 'text-[#051C2C] border-b-2 border-[#051C2C]' : 'text-gray-600 hover:text-gray-900'}`}
    >
      {icon}
      <span>{label}</span>
    </TabsTrigger>
  );
}