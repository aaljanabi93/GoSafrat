import { useLanguage } from "@/context/language-context";
import { Search, Check, UserCheck, CreditCard } from "lucide-react";

type BookingStep = {
  id: number;
  icon: React.ReactNode;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
};

const bookingSteps: BookingStep[] = [
  {
    id: 1,
    icon: <Search className="h-6 w-6" />,
    titleEn: "Search",
    titleAr: "ابحث",
    descriptionEn: "Find the perfect trip by searching flights, hotels or car rentals",
    descriptionAr: "ابحث عن الرحلة المثالية من خلال البحث عن الرحلات الجوية أو الفنادق أو تأجير السيارات"
  },
  {
    id: 2,
    icon: <Check className="h-6 w-6" />,
    titleEn: "Select",
    titleAr: "اختر",
    descriptionEn: "Choose from the best options that suit your needs and budget",
    descriptionAr: "اختر من بين أفضل الخيارات التي تناسب احتياجاتك وميزانيتك"
  },
  {
    id: 3,
    icon: <UserCheck className="h-6 w-6" />,
    titleEn: "Book",
    titleAr: "احجز",
    descriptionEn: "Enter passenger details and customize your trip with add-ons",
    descriptionAr: "أدخل تفاصيل المسافر وخصص رحلتك بالإضافات"
  },
  {
    id: 4,
    icon: <CreditCard className="h-6 w-6" />,
    titleEn: "Pay",
    titleAr: "ادفع",
    descriptionEn: "Securely pay with multiple payment options available",
    descriptionAr: "ادفع بأمان مع توفر خيارات دفع متعددة"
  }
];

export default function BookingSteps() {
  const { language } = useLanguage();
  
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className={`text-3xl ${language === 'ar' ? 'font-cairo' : 'font-poppins'} font-bold text-dark mb-2`}>
            {language === 'en' ? "How It Works" : "كيف يعمل"}
          </h2>
          <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {language === 'en' 
              ? "We make travel booking simple and hassle-free" 
              : "نجعل حجز السفر بسيطًا وخالٍ من المتاعب"
            }
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between relative">
          {/* Step Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gray-300"></div>
          
          {bookingSteps.map((step) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center mb-8 md:mb-0 relative z-10"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className={`font-medium text-lg text-dark mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'en' ? step.titleEn : step.titleAr}
              </h3>
              <p className={`text-center text-gray-600 max-w-xs ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'en' ? step.descriptionEn : step.descriptionAr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
