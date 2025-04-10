import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

type Testimonial = {
  id: number;
  rating: number;
  textEn: string;
  textAr: string;
  author: {
    name: string;
    image: string;
    locationEn: string;
    locationAr: string;
  };
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    textEn: "Safrat made my trip to Maldives so easy! The booking process was seamless, and I got a great deal on my flight and hotel package. Highly recommended!",
    textAr: "جعلت سفرات رحلتي إلى جزر المالديف سهلة للغاية! كانت عملية الحجز سلسة، وحصلت على صفقة رائعة على باقة الرحلة والفندق. أوصي بشدة!",
    author: {
      name: "Sarah M.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      locationEn: "London, UK",
      locationAr: "لندن، المملكة المتحدة"
    }
  },
  {
    id: 2,
    rating: 5,
    textEn: "I've been using Safrat for all my business trips for the past year. Their customer service is outstanding, and the prices are consistently competitive. My go-to travel platform!",
    textAr: "لقد كنت أستخدم سفرات لجميع رحلات عملي خلال العام الماضي. خدمة العملاء لديهم ممتازة، والأسعار تنافسية باستمرار. منصة السفر المفضلة لدي!",
    author: {
      name: "Ahmed K.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      locationEn: "Dubai, UAE",
      locationAr: "دبي، الإمارات العربية المتحدة"
    }
  },
  {
    id: 3,
    rating: 4.5,
    textEn: "The car rental service through Safrat was excellent. The process was quick, and they found me a great rate. The car was exactly as described, and pickup/drop-off was hassle-free.",
    textAr: "كانت خدمة تأجير السيارات من خلال سفرات ممتازة. كانت العملية سريعة، ووجدوا لي سعرًا رائعًا. كانت السيارة تمامًا كما هو موصوف، وكان الاستلام/التسليم خاليًا من المتاعب.",
    author: {
      name: "Maria L.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      locationEn: "Madrid, Spain",
      locationAr: "مدريد، إسبانيا"
    }
  }
];

export default function TestimonialsSection() {
  const { t, language } = useLanguage();
  
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
  
  return (
    <section className="py-12 bg-primary bg-opacity-5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className={`text-3xl ${language === 'ar' ? 'font-cairo' : 'font-poppins'} font-bold text-dark mb-2`}>
            {t("What Our Customers Say", "ما يقوله عملاؤنا")}
          </h2>
          <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Real stories from travelers who booked with Safrat", "قصص حقيقية من المسافرين الذين حجزوا مع سفرات")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className={`text-gray-700 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'en' ? `"${testimonial.textEn}"` : `"${testimonial.textAr}"`}
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.author.image} 
                    alt={testimonial.author.name} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-dark">{testimonial.author.name}</div>
                    <div className={`text-xs text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {language === 'en' ? testimonial.author.locationEn : testimonial.author.locationAr}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
