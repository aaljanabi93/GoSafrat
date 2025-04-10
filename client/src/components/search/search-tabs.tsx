import { useState, ReactNode } from "react";
import { useLanguage } from "@/context/language-context";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plane, Hotel, Car } from "lucide-react";
import FlightSearch from "./flight-search";
import HotelSearch from "./hotel-search";
import CarSearch from "./car-search";

interface SearchTabsProps {
  className?: string;
}

export default function SearchTabs({ className = "" }: SearchTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("flights");
  const { t, language } = useLanguage();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <Tabs defaultValue="flights" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger 
            value="flights" 
            className={`py-4 ${language === 'ar' ? 'font-cairo' : ''}`}
          >
            <Plane className="h-4 w-4 mr-2" />
            {t("Flights", "رحلات طيران")}
          </TabsTrigger>
          <TabsTrigger 
            value="hotels" 
            className={`py-4 ${language === 'ar' ? 'font-cairo' : ''}`}
          >
            <Hotel className="h-4 w-4 mr-2" />
            {t("Hotels", "فنادق")}
          </TabsTrigger>
          <TabsTrigger 
            value="cars" 
            className={`py-4 ${language === 'ar' ? 'font-cairo' : ''}`}
          >
            <Car className="h-4 w-4 mr-2" />
            {t("Cars", "سيارات")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="flights" className="p-6">
          <FlightSearch />
        </TabsContent>
        
        <TabsContent value="hotels" className="p-6">
          <HotelSearch />
        </TabsContent>
        
        <TabsContent value="cars" className="p-6">
          <CarSearch />
        </TabsContent>
      </Tabs>
    </div>
  );
}
