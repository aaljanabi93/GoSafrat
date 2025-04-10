import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Plane, Building, Car, BadgeCheck, RocketLaunch, Globe, UsersRound } from "lucide-react";
import { getAllAirlines } from "@/lib/airlines-data";

export default function PartnersPage() {
  const { language, t } = useLanguage();
  const airlines = getAllAirlines().slice(0, 24); // Just use some of our existing airline data
  
  const hotelPartners = [
    { name: "Marriott International", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Marriott_International_logo.svg/2560px-Marriott_International_logo.svg.png" },
    { name: "Hilton Hotels & Resorts", logo: "https://1000logos.net/wp-content/uploads/2020/02/Hilton-Logo-2009.png" },
    { name: "Accor", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Accor_Logo.svg/2560px-Accor_Logo.svg.png" },
    { name: "IHG Hotels & Resorts", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/IHG_logo.svg/2560px-IHG_logo.svg.png" },
    { name: "Hyatt", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hyatt_Hotels_Corporation_logo.svg/2560px-Hyatt_Hotels_Corporation_logo.svg.png" },
    { name: "Radisson Hotel Group", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Radisson_Hotel_Group_logo.svg/2560px-Radisson_Hotel_Group_logo.svg.png" },
    { name: "Wyndham Hotels & Resorts", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Wyndham_Hotels_%26_Resorts_logo.svg/2560px-Wyndham_Hotels_%26_Resorts_logo.svg.png" },
    { name: "Rotana Hotels", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Rotana_Hotel_Management_Corporation_logo.svg/1280px-Rotana_Hotel_Management_Corporation_logo.svg.png" }
  ];
  
  const carRentalPartners = [
    { name: "Hertz", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Hertz_Logo.svg/2560px-Hertz_Logo.svg.png" },
    { name: "Enterprise", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Enterprise_Holdings_logo.svg/1280px-Enterprise_Holdings_logo.svg.png" },
    { name: "Avis", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Avis_logo.svg/2560px-Avis_logo.svg.png" },
    { name: "Budget", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Budget_Car_Rental_logo.svg/2560px-Budget_Car_Rental_logo.svg.png" },
    { name: "Sixt", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Sixt_Logo.svg/2560px-Sixt_Logo.svg.png" },
    { name: "Europcar", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Europcar_Logo.svg/2560px-Europcar_Logo.svg.png" }
  ];
  
  const partnershipBenefits = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Global Reach",
      titleAr: "الوصول العالمي",
      description: "Access to millions of travelers from the Middle East and worldwide.",
      descriptionAr: "الوصول إلى ملايين المسافرين من الشرق الأوسط وجميع أنحاء العالم."
    },
    {
      icon: <UsersRound className="h-8 w-8 text-blue-600" />,
      title: "Targeted Audience",
      titleAr: "جمهور مستهدف",
      description: "Connect with travelers specifically interested in your region and services.",
      descriptionAr: "تواصل مع المسافرين المهتمين تحديدًا بمنطقتك وخدماتك."
    },
    {
      icon: <RocketLaunch className="h-8 w-8 text-blue-600" />,
      title: "Growth Opportunities",
      titleAr: "فرص النمو",
      description: "Expand your market presence through our established platform.",
      descriptionAr: "وسّع تواجدك في السوق من خلال منصتنا الراسخة."
    },
    {
      icon: <BadgeCheck className="h-8 w-8 text-blue-600" />,
      title: "Seamless Integration",
      titleAr: "تكامل سلس",
      description: "Easy technical implementation with our developer-friendly APIs.",
      descriptionAr: "تنفيذ تقني سهل مع واجهات برمجة التطبيقات السهلة للمطورين."
    }
  ];
  
  const partnershipPrograms = [
    {
      name: "Airline Partners Program",
      nameAr: "برنامج شركاء الطيران",
      description: "Connect with millions of travelers seeking flights across the Middle East and beyond.",
      descriptionAr: "تواصل مع ملايين المسافرين الباحثين عن رحلات جوية عبر الشرق الأوسط وخارجه.",
      icon: <Plane className="h-8 w-8" />,
      benefits: [
        "Direct API integration", 
        "Branded presence on search results",
        "Promotional campaign opportunities",
        "Real-time analytics dashboard"
      ],
      benefitsAr: [
        "تكامل مباشر مع واجهة برمجة التطبيقات",
        "تواجد العلامة التجارية في نتائج البحث",
        "فرص للحملات الترويجية",
        "لوحة تحليلات في الوقت الفعلي"
      ]
    },
    {
      name: "Hotel Partners Program",
      nameAr: "برنامج شركاء الفنادق",
      description: "Showcase your properties to qualified travelers searching for accommodation.",
      descriptionAr: "اعرض عقاراتك للمسافرين المؤهلين الباحثين عن أماكن إقامة.",
      icon: <Building className="h-8 w-8" />,
      benefits: [
        "Zero commission for first 3 months",
        "Prioritized listing opportunities",
        "Professional photography services",
        "Direct traveler messaging"
      ],
      benefitsAr: [
        "صفر عمولة لأول 3 أشهر",
        "فرص إدراج ذات أولوية",
        "خدمات التصوير الاحترافية",
        "مراسلة مباشرة مع المسافرين"
      ]
    },
    {
      name: "Car Rental Partners Program",
      nameAr: "برنامج شركاء تأجير السيارات",
      description: "Expand your vehicle fleet's visibility and bookings through our platform.",
      descriptionAr: "وسّع رؤية أسطول سياراتك وحجوزاتك من خلال منصتنا.",
      icon: <Car className="h-8 w-8" />,
      benefits: [
        "Seamless reservation system integration",
        "Featured placements for special offers",
        "Dedicated account management",
        "Multi-language support"
      ],
      benefitsAr: [
        "تكامل سلس مع نظام الحجز",
        "أماكن مميزة للعروض الخاصة",
        "إدارة حساب مخصصة",
        "دعم متعدد اللغات"
      ]
    }
  ];

  return (
    <PageLayout 
      title="Partner With GoSafrat" 
      titleAr="الشراكة مع جوسفرات"
      subtitle="Join our global network of travel partners"
      subtitleAr="انضم إلى شبكتنا العالمية من شركاء السفر"
    >
      <div className="mb-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Why Partner With Us?", "لماذا تشاركنا؟")}
          </h2>
          <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t(
              "GoSafrat connects millions of travelers with exceptional travel experiences. Join our network of global partners and grow your business.",
              "تربط جوسفرات ملايين المسافرين بتجارب سفر استثنائية. انضم إلى شبكتنا من الشركاء العالميين وقم بتنمية أعمالك."
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {partnershipBenefits.map((benefit, index) => (
            <Card key={index} className="border-blue-100 hover:border-blue-300 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(benefit.title, benefit.titleAr)}
                </h3>
                <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(benefit.description, benefit.descriptionAr)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {partnershipPrograms.map((program, index) => (
            <Card key={index} className="border-t-4 border-blue-500">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {program.icon}
                </div>
                
                <h3 className={`text-xl font-bold mb-3 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(program.name, program.nameAr)}
                </h3>
                
                <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(program.description, program.descriptionAr)}
                </p>
                
                <h4 className={`font-semibold mb-2 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t("Key Benefits:", "الفوائد الرئيسية:")}
                </h4>
                
                <ul className={`mb-6 ${language === 'ar' ? 'text-right' : ''}`}>
                  {program.benefits.map((benefit, bidx) => (
                    <li key={bidx} className={`flex items-start mb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Check className={`h-5 w-5 text-green-500 flex-shrink-0 ${language === 'ar' ? 'ml-0 mr-2' : 'mr-2'}`} />
                      <span className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(benefit, program.benefitsAr[bidx])}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full">
                  {t("Join Program", "انضم إلى البرنامج")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Our Current Partners", "شركاؤنا الحاليون")}
        </h2>
        
        <Tabs defaultValue="airlines" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 max-w-md mx-auto">
            <TabsTrigger value="airlines" className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              <span>{t("Airlines", "شركات الطيران")}</span>
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>{t("Hotels", "الفنادق")}</span>
            </TabsTrigger>
            <TabsTrigger value="cars" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              <span>{t("Car Rentals", "تأجير السيارات")}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="airlines">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {airlines.map((airline, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-center h-24">
                  <img 
                    src={airline.logo} 
                    alt={airline.name}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hotels">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {hotelPartners.map((hotel, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-center h-24">
                  <img 
                    src={hotel.logo} 
                    alt={hotel.name}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cars">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {carRentalPartners.map((company, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-center h-24">
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-gradient-to-r from-blue-900 to-green-800 text-white rounded-xl p-8 md:p-12 mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Become a Partner Today", "كن شريكاً اليوم")}
          </h2>
          <p className={`text-lg mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t(
              "Join our expanding network of global travel partners and reach millions of travelers across the Middle East and beyond.",
              "انضم إلى شبكتنا المتنامية من شركاء السفر العالميين وتواصل مع ملايين المسافرين في جميع أنحاء الشرق الأوسط وخارجه."
            )}
          </p>
          <Button variant="secondary" size="lg" className="font-semibold">
            {t("Get Started", "ابدأ الآن")}
          </Button>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className={`text-xl font-bold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Have Questions?", "لديك أسئلة؟")}
        </h3>
        <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t(
            "Contact our partnerships team at partners@gosafrat.com",
            "تواصل مع فريق الشراكات لدينا على partners@gosafrat.com"
          )}
        </p>
      </div>
    </PageLayout>
  );
}