import { useLanguage } from "@/context/language-context";
import { Plane, Hotel, Car } from "lucide-react";

type Service = {
  id: number;
  icon: React.ReactNode;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
};

const services: Service[] = [
  {
    id: 1,
    icon: <Plane className="h-5 w-5 text-primary" />,
    titleEn: "Flight Booking",
    titleAr: "حجز الطيران",
    descriptionEn: "Compare and book flights from over 500 airlines worldwide",
    descriptionAr: "قارن واحجز رحلات من أكثر من 500 شركة طيران حول العالم"
  },
  {
    id: 2,
    icon: <Hotel className="h-5 w-5 text-primary" />,
    titleEn: "Hotel Reservations",
    titleAr: "حجوزات الفنادق",
    descriptionEn: "Find the perfect accommodation with over 2 million hotels in our database",
    descriptionAr: "ابحث عن السكن المثالي مع أكثر من 2 مليون فندق في قاعدة بياناتنا"
  },
  {
    id: 3,
    icon: <Car className="h-5 w-5 text-primary" />,
    titleEn: "Car Rentals",
    titleAr: "تأجير السيارات",
    descriptionEn: "Access great rates on car rentals in more than 180 countries",
    descriptionAr: "احصل على أسعار رائعة على تأجير السيارات في أكثر من 180 دولة"
  }
];

export default function ServicesSection() {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className={`text-3xl ${language === 'ar' ? 'font-cairo' : 'font-poppins'} font-bold text-dark mb-4`}>
              {t("Our Services", "خدماتنا")}
            </h2>
            <p className={`text-gray-600 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Safrat Travel provides everything you need for a perfect journey. From booking flights, finding the ideal hotel, to arranging your transportation, we've got you covered.", 
                "توفر سفرات كل ما تحتاجه لرحلة مثالية. من حجز الرحلات الجوية، والعثور على الفندق المثالي، إلى ترتيب وسائل النقل الخاصة بك، نحن نغطي كل شيء.")}
            </p>
            
            <div className="space-y-4">
              {services.map((service) => (
                <div className="flex items-start" key={service.id}>
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className={`font-medium text-lg text-dark mb-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {language === 'en' ? service.titleEn : service.titleAr}
                    </h3>
                    <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {language === 'en' ? service.descriptionEn : service.descriptionAr}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              alt="Airplane Interior" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              alt="Luxury Hotel" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              alt="Rental Car" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              alt="Hotel Room" 
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
