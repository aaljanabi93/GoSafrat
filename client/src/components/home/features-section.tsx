import React from "react";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Plane, Globe, CreditCard, Ticket } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

const FeatureCard = ({ icon, titleEn, titleAr, descriptionEn, descriptionAr }: FeatureCardProps) => {
  const { language } = useLanguage();
  
  return (
    <Card className="h-full transition-all hover:shadow-lg border-none bg-white shadow-md">
      <CardContent className="p-6 flex flex-col items-center text-center h-full">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
          {icon}
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
          {language === 'en' ? titleEn : titleAr}
        </h3>
        <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
          {language === 'en' ? descriptionEn : descriptionAr}
        </p>
      </CardContent>
    </Card>
  );
};

export default function FeaturesSection() {
  const { t, language } = useLanguage();
  
  const features: FeatureCardProps[] = [
    {
      icon: <Building2 className="w-8 h-8" />,
      titleEn: "Hotel Booking Engine",
      titleAr: "محرك حجز الفنادق",
      descriptionEn: "Seamlessly book hotels worldwide with our robust booking engine, offering real-time availability and instant confirmations.",
      descriptionAr: "احجز الفنادق في جميع أنحاء العالم بسلاسة من خلال محرك الحجز القوي الخاص بنا، مع توفير إمكانية الحجز الفوري والتأكيدات الفورية."
    },
    {
      icon: <Plane className="w-8 h-8" />,
      titleEn: "Flight Booking Engine",
      titleAr: "محرك حجز الرحلات الجوية",
      descriptionEn: "Find and book the best flights with our comprehensive flight search engine connecting to hundreds of airlines globally.",
      descriptionAr: "ابحث واحجز أفضل الرحلات الجوية مع محرك البحث الشامل للرحلات الذي يربطك بمئات شركات الطيران حول العالم."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      titleEn: "Third Party Connections",
      titleAr: "اتصالات الأطراف الثالثة",
      descriptionEn: "Integrated with major global travel suppliers to provide the most comprehensive travel options and competitive rates.",
      descriptionAr: "متكامل مع كبار موردي السفر العالميين لتوفير أكثر خيارات السفر شمولاً وأسعار تنافسية."
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      titleEn: "Multicurrency",
      titleAr: "تعدد العملات",
      descriptionEn: "Book and pay in multiple currencies with real-time exchange rates for maximum convenience and transparency.",
      descriptionAr: "احجز وادفع بعملات متعددة مع أسعار صرف فورية لتحقيق أقصى قدر من الراحة والشفافية."
    },
    {
      icon: <Ticket className="w-8 h-8" />,
      titleEn: "RealTime Voucher & Ticket Issuance",
      titleAr: "إصدار القسائم والتذاكر في الوقت الفعلي",
      descriptionEn: "Instant digital vouchers and tickets delivered immediately after booking, eliminating waiting times.",
      descriptionAr: "قسائم وتذاكر رقمية فورية يتم تسليمها مباشرة بعد الحجز، مما يلغي أوقات الانتظار."
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
            {t("Powerful Booking Features", "ميزات حجز قوية")}
          </h2>
          <p className={`text-gray-600 max-w-3xl mx-auto ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t(
              "Our platform offers state-of-the-art travel booking capabilities to ensure you get the best experience.",
              "توفر منصتنا إمكانيات حجز سفر متطورة لضمان حصولك على أفضل تجربة."
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              titleEn={feature.titleEn}
              titleAr={feature.titleAr}
              descriptionEn={feature.descriptionEn}
              descriptionAr={feature.descriptionAr}
            />
          ))}
        </div>
      </div>
    </section>
  );
}