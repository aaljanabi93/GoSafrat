import { useLanguage } from "@/context/language-context";
import parisImage from "@/assets/destinations/paris.svg";
import tokyoImage from "@/assets/destinations/tokyo.svg";
import newyorkImage from "@/assets/destinations/newyork.svg";
import singaporeImage from "@/assets/destinations/singapore.svg";
import dubaiImage from "@/assets/destinations/dubai.svg";
import londonImage from "@/assets/destinations/london.svg";
import istanbulImage from "@/assets/destinations/istanbul.svg";

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
    image: dubaiImage,
    nameEn: "Dubai",
    nameAr: "دبي",
    priceFrom: 290
  },
  {
    id: 2,
    image: parisImage,
    nameEn: "Paris",
    nameAr: "باريس",
    priceFrom: 320
  },
  {
    id: 3,
    image: londonImage,
    nameEn: "London",
    nameAr: "لندن",
    priceFrom: 350
  },
  {
    id: 4,
    image: istanbulImage,
    nameEn: "Istanbul",
    nameAr: "اسطنبول",
    priceFrom: 270
  },
  {
    id: 5,
    image: tokyoImage,
    nameEn: "Tokyo",
    nameAr: "طوكيو",
    priceFrom: 680
  },
  {
    id: 6,
    image: newyorkImage,
    nameEn: "New York",
    nameAr: "نيويورك",
    priceFrom: 420
  },
  {
    id: 7,
    image: singaporeImage,
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.map((destination) => (
            <div 
              key={destination.id} 
              className="relative rounded-lg overflow-hidden group cursor-pointer shadow-md"
            >
              <img 
                src={destination.image} 
                alt={language === 'en' ? destination.nameEn : destination.nameAr} 
                className="w-full h-40 md:h-32 lg:h-36 object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 text-white">
                <h3 className={`${language === 'ar' ? 'font-cairo' : 'font-poppins'} font-semibold text-base lg:text-lg`}>
                  {language === 'en' ? destination.nameEn : destination.nameAr}
                </h3>
                <div className="flex items-center">
                  <span className={`text-xs lg:text-sm ${language === 'ar' ? 'font-cairo' : ''}`}>
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
