import { useLanguage } from "@/context/language-context";

type Destination = {
  id: number;
  image: string;
  nameEn: string;
  nameAr: string;
  priceFrom: number;
};

const destinations: Destination[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1569838299924-dcf4bde5e75a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    nameEn: "Paris",
    nameAr: "باريس",
    priceFrom: 320
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1593692047230-d6f8a3d3e205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    nameEn: "Tokyo",
    nameAr: "طوكيو",
    priceFrom: 680
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1536746953245-ffe279dd5bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    nameEn: "New York",
    nameAr: "نيويورك",
    priceFrom: 420
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1595880500173-bc794d0daee3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    nameEn: "Singapore",
    nameAr: "سنغافورة",
    priceFrom: 510
  }
];

export default function DestinationsSection() {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className={`text-3xl ${language === 'ar' ? 'font-cairo' : 'font-poppins'} font-bold text-dark mb-2`}>
            {t("Popular Destinations", "الوجهات الشائعة")}
          </h2>
          <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Explore these trending destinations around the world", "استكشف هذه الوجهات الرائجة حول العالم")}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((destination) => (
            <div 
              key={destination.id} 
              className="relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <img 
                src={destination.image} 
                alt={language === 'en' ? destination.nameEn : destination.nameAr} 
                className="w-full h-60 object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className={`${language === 'ar' ? 'font-cairo' : 'font-poppins'} font-semibold text-xl`}>
                  {language === 'en' ? destination.nameEn : destination.nameAr}
                </h3>
                <div className="flex items-center">
                  <span className={`text-sm ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'en' 
                      ? `Flights from $${destination.priceFrom}` 
                      : `رحلات من $${destination.priceFrom}`
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
