import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShieldCheck, 
  AlertCircle, 
  Bug, 
  Globe, 
  FileText, 
  Umbrella, 
  Landmark,
  Lock,
  Heart,
  ExternalLink,
  MapPin,
  CheckCircle
} from "lucide-react";

export default function SafetyResourcesPage() {
  const { language, t } = useLanguage();
  
  const travelAdvisories = [
    {
      region: "Middle East & North Africa",
      regionAr: "الشرق الأوسط وشمال أفريقيا",
      advisories: [
        {
          country: "United Arab Emirates",
          countryAr: "الإمارات العربية المتحدة",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        },
        {
          country: "Saudi Arabia",
          countryAr: "المملكة العربية السعودية",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        },
        {
          country: "Jordan",
          countryAr: "الأردن",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        },
        {
          country: "Egypt",
          countryAr: "مصر",
          level: "Moderate Risk",
          levelAr: "مخاطر متوسطة",
          levelColor: "text-yellow-600",
          notes: "Exercise increased caution in certain areas",
          notesAr: "ممارسة زيادة الحذر في مناطق معينة"
        },
        {
          country: "Qatar",
          countryAr: "قطر",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        }
      ]
    },
    {
      region: "Europe",
      regionAr: "أوروبا",
      advisories: [
        {
          country: "France",
          countryAr: "فرنسا",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        },
        {
          country: "Germany",
          countryAr: "ألمانيا",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        },
        {
          country: "United Kingdom",
          countryAr: "المملكة المتحدة",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        },
        {
          country: "Italy",
          countryAr: "إيطاليا",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        },
        {
          country: "Spain",
          countryAr: "إسبانيا",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        }
      ]
    },
    {
      region: "Asia & Pacific",
      regionAr: "آسيا والمحيط الهادئ",
      advisories: [
        {
          country: "Japan",
          countryAr: "اليابان",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        },
        {
          country: "Singapore",
          countryAr: "سنغافورة",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        },
        {
          country: "Malaysia",
          countryAr: "ماليزيا",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        },
        {
          country: "Thailand",
          countryAr: "تايلاند",
          level: "Low to Moderate Risk",
          levelAr: "مخاطر منخفضة إلى متوسطة",
          levelColor: "text-yellow-600",
          notes: "Exercise increased caution in southern provinces",
          notesAr: "ممارسة زيادة الحذر في المقاطعات الجنوبية"
        },
        {
          country: "Australia",
          countryAr: "أستراليا",
          level: "Low Risk",
          levelAr: "مخاطر منخفضة",
          levelColor: "text-green-600",
          notes: "Exercise normal precautions",
          notesAr: "ممارسة الاحتياطات العادية"
        }
      ]
    }
  ];
  
  const safetyResources = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Global Travel Advisory",
      titleAr: "النصائح العالمية للسفر",
      description: "Access the latest travel advisories and safety ratings for countries worldwide.",
      descriptionAr: "الوصول إلى أحدث النصائح والتقييمات الأمنية للسفر للدول حول العالم.",
      url: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/"
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Travel Documentation Guide",
      titleAr: "دليل وثائق السفر",
      description: "Information on required travel documents, visas, and entry requirements.",
      descriptionAr: "معلومات عن وثائق السفر المطلوبة والتأشيرات ومتطلبات الدخول.",
      url: "#"
    },
    {
      icon: <Bug className="h-8 w-8 text-blue-600" />,
      title: "Health & Vaccination Information",
      titleAr: "معلومات الصحة والتطعيم",
      description: "Health risks, vaccination requirements, and medical advice by destination.",
      descriptionAr: "المخاطر الصحية، متطلبات التطعيم، والنصائح الطبية حسب الوجهة.",
      url: "https://www.who.int/travel-advice"
    },
    {
      icon: <Umbrella className="h-8 w-8 text-blue-600" />,
      title: "Travel Insurance Resources",
      titleAr: "موارد تأمين السفر",
      description: "Guide to selecting appropriate travel insurance for your journey.",
      descriptionAr: "دليل لاختيار تأمين السفر المناسب لرحلتك.",
      url: "#"
    },
    {
      icon: <Landmark className="h-8 w-8 text-blue-600" />,
      title: "Embassy & Consulate Directory",
      titleAr: "دليل السفارات والقنصليات",
      description: "Find contact information for embassies and consulates worldwide.",
      descriptionAr: "العثور على معلومات الاتصال للسفارات والقنصليات في جميع أنحاء العالم.",
      url: "#"
    },
    {
      icon: <Lock className="h-8 w-8 text-blue-600" />,
      title: "Cybersecurity While Traveling",
      titleAr: "الأمن السيبراني أثناء السفر",
      description: "Tips for keeping your devices and data secure when traveling.",
      descriptionAr: "نصائح للحفاظ على أمان أجهزتك وبياناتك أثناء السفر.",
      url: "#"
    }
  ];
  
  const emergencyContacts = [
    {
      country: "United Arab Emirates",
      countryAr: "الإمارات العربية المتحدة",
      police: "999",
      ambulance: "998",
      fire: "997"
    },
    {
      country: "Saudi Arabia",
      countryAr: "المملكة العربية السعودية",
      police: "999",
      ambulance: "997",
      fire: "998"
    },
    {
      country: "Qatar",
      countryAr: "قطر",
      police: "999",
      ambulance: "999",
      fire: "999"
    },
    {
      country: "Egypt",
      countryAr: "مصر",
      police: "122",
      ambulance: "123",
      fire: "180"
    },
    {
      country: "Jordan",
      countryAr: "الأردن",
      police: "911",
      ambulance: "911",
      fire: "911"
    }
  ];
  
  const safetyTips = [
    {
      category: "General Travel Safety",
      categoryAr: "سلامة السفر العامة",
      tips: [
        "Research your destination thoroughly before traveling",
        "Register your trip with your country's embassy or consulate",
        "Keep copies of important documents (passport, ID, insurance) separately from originals",
        "Share your itinerary with family or friends",
        "Stay informed about local news and conditions at your destination"
      ],
      tipsAr: [
        "ابحث عن وجهتك بشكل شامل قبل السفر",
        "سجل رحلتك لدى سفارة أو قنصلية بلدك",
        "احتفظ بنسخ من المستندات المهمة (جواز السفر، الهوية، التأمين) بشكل منفصل عن النسخ الأصلية",
        "شارك خط سير رحلتك مع العائلة أو الأصدقاء",
        "ابق على اطلاع بالأخبار والظروف المحلية في وجهتك"
      ]
    },
    {
      category: "Health & Wellness",
      categoryAr: "الصحة والعافية",
      tips: [
        "Check vaccination requirements well in advance of travel",
        "Pack a basic first-aid kit and any personal medications",
        "Stay hydrated, especially when flying or in hot climates",
        "Protect yourself from sun exposure and insect bites",
        "Know how to access emergency medical services at your destination"
      ],
      tipsAr: [
        "تحقق من متطلبات التطعيم قبل وقت كافٍ من السفر",
        "قم بتجهيز مجموعة إسعافات أولية أساسية وأي أدوية شخصية",
        "حافظ على ترطيب جسمك، خاصة عند الطيران أو في المناخات الحارة",
        "احمِ نفسك من التعرض للشمس ولدغات الحشرات",
        "اعرف كيفية الوصول إلى خدمات الطوارئ الطبية في وجهتك"
      ]
    },
    {
      category: "Financial Security",
      categoryAr: "الأمن المالي",
      tips: [
        "Notify your bank and credit card companies of your travel plans",
        "Carry multiple forms of payment (cash, cards, travel money cards)",
        "Use ATMs in secure locations like banks or hotels",
        "Be cautious when using public Wi-Fi for financial transactions",
        "Keep a small amount of local currency for immediate needs upon arrival"
      ],
      tipsAr: [
        "أبلغ البنك وشركات بطاقات الائتمان الخاصة بك بخطط سفرك",
        "احمل أشكالًا متعددة من وسائل الدفع (نقدًا، بطاقات، بطاقات أموال السفر)",
        "استخدم أجهزة الصراف الآلي في مواقع آمنة مثل البنوك أو الفنادق",
        "كن حذرًا عند استخدام Wi-Fi العام للمعاملات المالية",
        "احتفظ بمبلغ صغير من العملة المحلية للاحتياجات الفورية عند الوصول"
      ]
    },
    {
      category: "Transportation Safety",
      categoryAr: "سلامة النقل",
      tips: [
        "Use licensed taxis or reputable ride-sharing services",
        "Research local transportation options before arriving",
        "Be vigilant in crowded transportation hubs",
        "Wear seatbelts in vehicles and follow local traffic laws",
        "Avoid traveling alone at night in unfamiliar areas"
      ],
      tipsAr: [
        "استخدم سيارات الأجرة المرخصة أو خدمات مشاركة الركوب ذات السمعة الطيبة",
        "ابحث عن خيارات النقل المحلية قبل الوصول",
        "كن يقظًا في مراكز النقل المزدحمة",
        "ارتدِ أحزمة الأمان في المركبات واتبع قوانين المرور المحلية",
        "تجنب السفر بمفردك في الليل في المناطق غير المألوفة"
      ]
    }
  ];

  return (
    <PageLayout 
      title="Safety Resources" 
      titleAr="موارد السلامة"
      subtitle="Essential information for safe and secure travel"
      subtitleAr="معلومات أساسية للسفر الآمن والمضمون"
    >
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
              {t("Travel with Confidence", "سافر بثقة")}
            </h2>
            <div className={`space-y-4 text-gray-700 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
              <p>
                {t(
                  "At GoSafrat, your safety and well-being are our top priorities. We've compiled this comprehensive collection of safety resources, travel advisories, and essential information to help you prepare for a secure and worry-free journey.",
                  "في جوسفرات، سلامتك ورفاهيتك هما أولوياتنا القصوى. لقد جمعنا هذه المجموعة الشاملة من موارد السلامة ونصائح السفر والمعلومات الأساسية لمساعدتك على الاستعداد لرحلة آمنة وخالية من القلق."
                )}
              </p>
              <p>
                {t(
                  "Whether you're planning a business trip or a family vacation, staying informed about potential risks and taking appropriate precautions can make all the difference in ensuring a smooth travel experience.",
                  "سواء كنت تخطط لرحلة عمل أو إجازة عائلية، فإن البقاء على اطلاع بالمخاطر المحتملة واتخاذ الاحتياطات المناسبة يمكن أن يحدث فرقًا كبيرًا في ضمان تجربة سفر سلسة."
                )}
              </p>
            </div>
            
            <div className={`mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3 ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
              <ShieldCheck className={`h-6 w-6 text-blue-600 flex-shrink-0 ${language === 'ar' ? 'mt-1' : 'mt-1'}`} />
              <div>
                <h3 className={`font-semibold text-blue-800 mb-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {t("GoSafrat SafeTravel Commitment", "التزام جوسفرات بالسفر الآمن")}
                </h3>
                <p className={`text-sm text-blue-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {t(
                    "We regularly update our safety resources with information from trusted international sources to help travelers make informed decisions.",
                    "نقوم بتحديث موارد السلامة لدينا بانتظام بمعلومات من مصادر دولية موثوقة لمساعدة المسافرين على اتخاذ قرارات مستنيرة."
                  )}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <AlertCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t("Travel Advisories", "نصائح السفر")}
                </h3>
                <p className={`text-sm text-gray-700 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(
                    "Current safety levels and guidelines for countries worldwide.",
                    "مستويات السلامة الحالية والإرشادات للدول في جميع أنحاء العالم."
                  )}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t("Health Information", "معلومات صحية")}
                </h3>
                <p className={`text-sm text-gray-700 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(
                    "Health risks, vaccination requirements, and medical resources.",
                    "المخاطر الصحية، متطلبات التطعيم، والموارد الطبية."
                  )}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <MapPin className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t("Local Emergency Contacts", "جهات اتصال الطوارئ المحلية")}
                </h3>
                <p className={`text-sm text-gray-700 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(
                    "Emergency numbers and embassy contacts for major destinations.",
                    "أرقام الطوارئ وجهات اتصال السفارات للوجهات الرئيسية."
                  )}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Lock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t("Travel Safety Tips", "نصائح سلامة السفر")}
                </h3>
                <p className={`text-sm text-gray-700 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(
                    "Practical advice for staying safe while traveling abroad.",
                    "نصائح عملية للبقاء آمنًا أثناء السفر للخارج."
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Current Travel Advisories", "نصائح السفر الحالية")}
        </h2>
        
        <div className={`mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 max-w-3xl mx-auto ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
          <AlertCircle className={`h-6 w-6 text-amber-600 flex-shrink-0 ${language === 'ar' ? 'mt-1' : 'mt-1'}`} />
          <div>
            <p className={`text-sm text-amber-800 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t(
                "Travel advisories are updated regularly but may not reflect sudden changes. Always check with official government sources for the most current information before traveling.",
                "يتم تحديث نصائح السفر بانتظام ولكنها قد لا تعكس التغييرات المفاجئة. تحقق دائمًا من المصادر الحكومية الرسمية للحصول على أحدث المعلومات قبل السفر."
              )}
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="middle-east" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 max-w-md mx-auto">
            <TabsTrigger value="middle-east">
              {t("Middle East & Africa", "الشرق الأوسط وأفريقيا")}
            </TabsTrigger>
            <TabsTrigger value="europe">
              {t("Europe", "أوروبا")}
            </TabsTrigger>
            <TabsTrigger value="asia">
              {t("Asia & Pacific", "آسيا والمحيط الهادئ")}
            </TabsTrigger>
          </TabsList>
          
          {travelAdvisories.map((region, index) => (
            <TabsContent key={index} value={region.region === "Middle East & North Africa" ? "middle-east" : region.region === "Europe" ? "europe" : "asia"}>
              <Card>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                    {t(region.region, region.regionAr)}
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className={`text-left py-3 ${language === 'ar' ? 'text-right font-cairo' : ''}`}>
                            {t("Country", "الدولة")}
                          </th>
                          <th className={`text-left py-3 ${language === 'ar' ? 'text-right font-cairo' : ''}`}>
                            {t("Risk Level", "مستوى الخطر")}
                          </th>
                          <th className={`text-left py-3 ${language === 'ar' ? 'text-right font-cairo' : ''}`}>
                            {t("Notes", "ملاحظات")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {region.advisories.map((advisory, i) => (
                          <tr key={i} className="border-b border-gray-100">
                            <td className={`py-3 ${language === 'ar' ? 'text-right font-cairo' : ''}`}>
                              {t(advisory.country, advisory.countryAr)}
                            </td>
                            <td className={`py-3 ${language === 'ar' ? 'text-right font-cairo' : ''} ${advisory.levelColor}`}>
                              {t(advisory.level, advisory.levelAr)}
                            </td>
                            <td className={`py-3 ${language === 'ar' ? 'text-right font-cairo' : ''}`}>
                              {t(advisory.notes, advisory.notesAr)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Safety Resources", "موارد السلامة")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyResources.map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">{resource.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(resource.title, resource.titleAr)}
                </h3>
                <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(resource.description, resource.descriptionAr)}
                </p>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2" asChild>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {t("Access Resource", "الوصول إلى المورد")}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Emergency Contacts - Middle East", "جهات اتصال الطوارئ - الشرق الأوسط")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {emergencyContacts.map((contact, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className={`text-xl font-semibold mb-3 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(contact.country, contact.countryAr)}
                </h3>
                <div className={`space-y-2 ${language === 'ar' ? 'text-right' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Police:", "الشرطة:")}
                    </span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{contact.police}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Ambulance:", "الإسعاف:")}
                    </span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{contact.ambulance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={language === 'ar' ? 'font-cairo' : ''}>
                      {t("Fire:", "المطافئ:")}
                    </span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{contact.fire}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Travel Safety Tips", "نصائح سلامة السفر")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyTips.map((category, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(category.category, category.categoryAr)}
                </h3>
                <ul className={`space-y-2 ${language === 'ar' ? 'text-right' : ''}`}>
                  {category.tips.map((tip, i) => (
                    <li key={i} className={`flex items-start ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className={`h-5 w-5 text-green-500 flex-shrink-0 ${language === 'ar' ? 'ml-2 mt-0.5' : 'mr-2 mt-0.5'}`} />
                      <span className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(tip, category.tipsAr[i])}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl p-8 md:p-12 text-center">
        <h3 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Safe Travels Guarantee", "ضمان السفر الآمن")}
        </h3>
        <p className={`text-lg mb-6 max-w-3xl mx-auto ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t(
            "GoSafrat is committed to providing you with up-to-date safety information and resources to help ensure a secure and enjoyable travel experience.",
            "تلتزم جوسفرات بتزويدك بأحدث معلومات وموارد السلامة للمساعدة في ضمان تجربة سفر آمنة وممتعة."
          )}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button variant="secondary" size="lg" className="font-semibold">
            {t("Explore Travel Insurance", "استكشف تأمين السفر")}
          </Button>
          <Button variant="outline" className="text-white border-white hover:bg-blue-800">
            {t("Contact Support", "اتصل بالدعم")}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}