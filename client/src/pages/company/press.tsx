import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Newspaper, MessageCircle, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PressPage() {
  const { language, t } = useLanguage();
  
  const pressReleases = [
    {
      title: "GoSafrat Announces Partnership with Emirates Airlines",
      titleAr: "جوسفرات تعلن عن شراكة مع طيران الإمارات",
      date: "March 15, 2025",
      dateAr: "١٥ مارس ٢٠٢٥",
      excerpt: "GoSafrat is proud to announce a new strategic partnership with Emirates Airlines, offering enhanced travel options for customers across the Middle East.",
      excerptAr: "تفخر جوسفرات بالإعلان عن شراكة استراتيجية جديدة مع طيران الإمارات، مما يوفر خيارات سفر محسنة للعملاء في جميع أنحاء الشرق الأوسط."
    },
    {
      title: "GoSafrat Secures $15M in Series A Funding",
      titleAr: "جوسفرات تحصل على ١٥ مليون دولار في جولة تمويل السلسلة أ",
      date: "February 2, 2025",
      dateAr: "٢ فبراير ٢٠٢٥",
      excerpt: "GoSafrat, the leading travel booking platform in the Middle East, today announced it has raised $15 million in Series A funding to accelerate growth and expand into new markets.",
      excerptAr: "أعلنت جوسفرات، منصة حجز السفر الرائدة في الشرق الأوسط، اليوم أنها جمعت 15 مليون دولار في تمويل السلسلة أ لتسريع النمو والتوسع إلى أسواق جديدة."
    },
    {
      title: "GoSafrat Launches Innovative Flight Comparison Feature",
      titleAr: "جوسفرات تطلق ميزة مبتكرة لمقارنة الرحلات الجوية",
      date: "January 10, 2025",
      dateAr: "١٠ يناير ٢٠٢٥",
      excerpt: "GoSafrat unveils a groundbreaking flight comparison tool that allows travelers to easily compare prices, amenities, and carbon footprints across multiple airlines.",
      excerptAr: "كشفت جوسفرات عن أداة مبتكرة لمقارنة الرحلات الجوية تتيح للمسافرين مقارنة الأسعار والمرافق والبصمات الكربونية بسهولة عبر شركات طيران متعددة."
    },
    {
      title: "GoSafrat Expands Operations to Saudi Arabia",
      titleAr: "جوسفرات توسع عملياتها إلى المملكة العربية السعودية",
      date: "December 5, 2024",
      dateAr: "٥ ديسمبر ٢٠٢٤",
      excerpt: "GoSafrat announces the opening of its new office in Riyadh, marking a significant milestone in the company's expansion across the Middle East.",
      excerptAr: "تعلن جوسفرات عن افتتاح مكتبها الجديد في الرياض، مما يمثل معلمًا مهمًا في توسع الشركة في جميع أنحاء الشرق الأوسط."
    }
  ];
  
  const newsFeatures = [
    {
      source: "TechCrunch",
      title: "How GoSafrat is Revolutionizing Travel in the Middle East",
      titleAr: "كيف تعيد جوسفرات ثورة السفر في الشرق الأوسط",
      date: "March 10, 2025",
      dateAr: "١٠ مارس ٢٠٢٥",
      link: "https://techcrunch.com"
    },
    {
      source: "Arabian Business",
      title: "GoSafrat Named Among Top 50 Tech Startups in MENA Region",
      titleAr: "جوسفرات من بين أفضل ٥٠ شركة ناشئة في مجال التكنولوجيا في منطقة الشرق الأوسط وشمال أفريقيا",
      date: "February 15, 2025",
      dateAr: "١٥ فبراير ٢٠٢٥",
      link: "https://arabianbusiness.com"
    },
    {
      source: "Forbes Middle East",
      title: "The Rising Stars of Travel Tech: GoSafrat's Journey to Success",
      titleAr: "النجوم الصاعدة في تكنولوجيا السفر: رحلة جوسفرات نحو النجاح",
      date: "January 22, 2025",
      dateAr: "٢٢ يناير ٢٠٢٥",
      link: "https://forbesmiddleeast.com"
    },
    {
      source: "Travel Weekly",
      title: "GoSafrat's Multilingual Platform Sets New Standard for Regional Travel Sites",
      titleAr: "منصة جوسفرات متعددة اللغات تضع معيارًا جديدًا لمواقع السفر الإقليمية",
      date: "December 18, 2024",
      dateAr: "١٨ ديسمبر ٢٠٢٤",
      link: "https://travelweekly.com"
    }
  ];
  
  const mediaAssets = [
    {
      name: "GoSafrat Logo Package",
      nameAr: "حزمة شعار جوسفرات",
      format: "ZIP (PNG, SVG, PDF)",
      size: "5.2 MB"
    },
    {
      name: "Executive Team Photos",
      nameAr: "صور الفريق التنفيذي",
      format: "ZIP (JPG, high-res)",
      size: "18.7 MB"
    },
    {
      name: "Product Screenshots",
      nameAr: "لقطات شاشة المنتج",
      format: "ZIP (PNG, high-res)",
      size: "12.3 MB"
    },
    {
      name: "Brand Guidelines",
      nameAr: "إرشادات العلامة التجارية",
      format: "PDF",
      size: "3.8 MB"
    },
    {
      name: "Company Fact Sheet",
      nameAr: "صحيفة حقائق الشركة",
      format: "PDF",
      size: "1.2 MB"
    }
  ];
  
  const mediaContacts = [
    {
      name: "Sarah Al-Khouri",
      nameAr: "سارة الخوري",
      title: "Head of Public Relations",
      titleAr: "رئيسة العلاقات العامة",
      email: "sarah.alkhouri@gosafrat.com",
      region: "Middle East & North Africa"
    },
    {
      name: "James Wong",
      nameAr: "جيمس وونغ",
      title: "Global Communications Director",
      titleAr: "مدير الاتصالات العالمية",
      email: "james.wong@gosafrat.com",
      region: "International Markets"
    },
    {
      name: "Fatima Nazari",
      nameAr: "فاطمة نظري",
      title: "Corporate Communications Manager",
      titleAr: "مديرة الاتصالات المؤسسية",
      email: "fatima.nazari@gosafrat.com",
      region: "Corporate & Investor Relations"
    }
  ];

  return (
    <PageLayout 
      title="Press & Media" 
      titleAr="الصحافة والإعلام"
      subtitle="News, announcements, and resources for journalists"
      subtitleAr="الأخبار والإعلانات والموارد للصحفيين"
    >
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="col-span-1 lg:col-span-2">
            <CardContent className="pt-6">
              <div className={`${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                <h2 className="text-2xl font-bold mb-4">
                  {t("About GoSafrat", "عن جوسفرات")}
                </h2>
                <p className="text-gray-700 mb-4">
                  {t(
                    "GoSafrat is a leading travel booking platform serving the Middle East and global markets, offering comprehensive flight, hotel, and car rental services in multiple languages and currencies.",
                    "جوسفرات هي منصة رائدة لحجز السفر تخدم الشرق الأوسط والأسواق العالمية، وتقدم خدمات شاملة للرحلات الجوية والفنادق وتأجير السيارات بعدة لغات وعملات."
                  )}
                </p>
                <p className="text-gray-700 mb-4">
                  {t(
                    "Founded in 2020 and headquartered in Dubai, UAE, GoSafrat has rapidly grown to become one of the most trusted names in travel technology, connecting millions of travelers with their ideal travel experiences.",
                    "تأسست جوسفرات في عام 2020 ويقع مقرها الرئيسي في دبي، الإمارات العربية المتحدة، ونمت بسرعة لتصبح واحدة من أكثر الأسماء الموثوقة في تكنولوجيا السفر، حيث تربط ملايين المسافرين بتجارب السفر المثالية."
                  )}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {t("Company Fact Sheet", "صحيفة حقائق الشركة")}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {t("Download Media Kit", "تنزيل مجموعة الوسائط")}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className={`text-xl font-bold ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                {t("Media Contacts", "جهات اتصال وسائل الإعلام")}
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mediaContacts.map((contact, index) => (
                  <div key={index} className={`${language === 'ar' ? 'text-right' : ''}`}>
                    <h4 className={`font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t(contact.name, contact.nameAr)}
                    </h4>
                    <p className={`text-sm text-blue-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t(contact.title, contact.titleAr)}
                    </p>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    <p className="text-sm text-gray-500">{contact.region}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="press-releases" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="press-releases" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              <span>{t("Press Releases", "البيانات الصحفية")}</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{t("News", "الأخبار")}</span>
            </TabsTrigger>
            <TabsTrigger value="media-assets" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>{t("Media Assets", "الأصول الإعلامية")}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="press-releases">
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                      <h3 className={`text-xl font-bold ${language === 'ar' ? 'font-cairo text-right sm:text-right' : ''} flex-1`}>
                        {t(release.title, release.titleAr)}
                      </h3>
                      <span className={`text-sm text-gray-500 whitespace-nowrap ${language === 'ar' ? 'font-cairo text-right sm:text-left' : ''} mt-1 sm:mt-0 sm:ml-4`}>
                        {t(release.date, release.dateAr)}
                      </span>
                    </div>
                    <p className={`text-gray-700 mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                      {t(release.excerpt, release.excerptAr)}
                    </p>
                    <Button variant="outline" size="sm">
                      {t("Read Full Release", "قراءة البيان الكامل")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="news">
            <div className="space-y-6">
              {newsFeatures.map((article, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <div className="flex-1">
                        <div className={`text-sm font-semibold text-blue-600 mb-1 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                          {article.source}
                        </div>
                        <h3 className={`text-xl font-bold ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                          {t(article.title, article.titleAr)}
                        </h3>
                      </div>
                      <span className={`text-sm text-gray-500 whitespace-nowrap ${language === 'ar' ? 'font-cairo text-right sm:text-left' : ''} mt-1 sm:mt-0 sm:ml-4`}>
                        {t(article.date, article.dateAr)}
                      </span>
                    </div>
                    <Button variant="link" className="px-0" asChild>
                      <a href={article.link} target="_blank" rel="noopener noreferrer">
                        {t("Read Article", "قراءة المقال")} →
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="media-assets">
            <Card>
              <CardContent className="p-6">
                <div className={`mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
                  <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t(
                      "Download official GoSafrat media assets for press and marketing use. All assets are free to use in publications with appropriate credit to GoSafrat.",
                      "قم بتنزيل الأصول الإعلامية الرسمية لجوسفرات للاستخدام الصحفي والتسويقي. جميع الأصول متاحة للاستخدام في المنشورات مع الإشارة المناسبة إلى جوسفرات."
                    )}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {mediaAssets.map((asset, index) => (
                    <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4">
                      <div className={`${language === 'ar' ? 'text-right' : ''}`}>
                        <h4 className={`font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {t(asset.name, asset.nameAr)}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {asset.format} • {asset.size}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 sm:mt-0 flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {t("Download", "تنزيل")}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="h-12 w-12 text-blue-600" />
          </div>
          
          <h2 className={`text-2xl font-bold mb-4 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Press Inquiries", "استفسارات الصحافة")}
          </h2>
          
          <p className={`text-center text-gray-700 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t(
              "For press inquiries, interview requests, or additional information about GoSafrat, please contact our media relations team.",
              "للاستفسارات الصحفية، أو طلبات المقابلات، أو معلومات إضافية حول جوسفرات، يرجى الاتصال بفريق العلاقات الإعلامية لدينا."
            )}
          </p>
          
          <div className="text-center">
            <Button className="font-semibold">
              {t("Contact Press Team", "اتصل بفريق الصحافة")}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}