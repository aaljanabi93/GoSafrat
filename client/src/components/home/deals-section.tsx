import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

type Deal = {
  id: number;
  image: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  discount: string;
  discountType: "percentage" | "tag";
  originalPrice: number;
  discountedPrice: number;
};

const deals: Deal[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507501336603-6e31db2be093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    titleEn: "Dubai Gateway Package",
    titleAr: "باقة بوابة دبي",
    descriptionEn: "3 Nights + Flight + Activities",
    descriptionAr: "3 ليالي + رحلة طيران + أنشطة",
    discount: "20%",
    discountType: "percentage",
    originalPrice: 1200,
    discountedPrice: 960
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    titleEn: "Maldives Luxury Escape",
    titleAr: "هروب فاخر إلى جزر المالديف",
    descriptionEn: "5 Nights + Flight + All Inclusive",
    descriptionAr: "5 ليالي + رحلة طيران + إقامة شاملة",
    discount: "HOT",
    discountType: "tag",
    originalPrice: 3500,
    discountedPrice: 2800
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    titleEn: "Istanbul Discovery",
    titleAr: "اكتشاف اسطنبول",
    descriptionEn: "4 Nights + Flight + Guided Tours",
    descriptionAr: "4 ليالي + رحلة طيران + جولات مصحوبة بمرشدين",
    discount: "15%",
    discountType: "percentage",
    originalPrice: 1100,
    discountedPrice: 935
  }
];

export default function DealsSection() {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className={`text-3xl ${language === 'ar' ? 'font-cairo' : 'font-poppins'} font-bold text-dark mb-2`}>
            {t("Special Deals", "عروض خاصة")}
          </h2>
          <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Exclusive offers for our valued customers", "عروض حصرية لعملائنا الكرام")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Card 
              key={deal.id}
              className="overflow-hidden shadow-md hover:shadow-lg transition bg-gray-50"
            >
              <img 
                src={deal.image} 
                alt={language === 'en' ? deal.titleEn : deal.titleAr} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={`${language === 'ar' ? 'font-cairo' : 'font-poppins'} font-semibold text-lg text-dark`}>
                      {language === 'en' ? deal.titleEn : deal.titleAr}
                    </h3>
                    <p className={`text-gray-600 text-sm ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {language === 'en' ? deal.descriptionEn : deal.descriptionAr}
                    </p>
                  </div>
                  <div className={`${deal.discountType === 'percentage' ? 'bg-[#28B67A]' : 'bg-[#FF6B6B]'} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {deal.discount}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-gray-400 line-through text-sm">${deal.originalPrice}</p>
                    <p className="text-primary font-semibold text-xl">${deal.discountedPrice}</p>
                  </div>
                  <Button 
                    variant="default" 
                    className={`${language === 'ar' ? 'font-cairo' : ''}`}
                  >
                    {t("View Deal", "عرض العرض")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            variant="outline" 
            className={`border-primary text-primary hover:bg-gray-100 ${language === 'ar' ? 'font-cairo' : ''}`}
          >
            {t("View All Deals", "عرض جميع العروض")}
          </Button>
        </div>
      </div>
    </section>
  );
}
