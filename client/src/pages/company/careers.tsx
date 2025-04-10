import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BriefcaseBusiness, 
  Code, 
  HeartHandshake, 
  BarChart, 
  Building, 
  GraduationCap,
  MapPin
} from "lucide-react";

export default function CareersPage() {
  const { language, t } = useLanguage();
  
  const benefits = [
    {
      icon: <Building className="h-8 w-8 text-blue-600" />,
      title: "Flexible Work",
      titleAr: "عمل مرن",
      description: "Hybrid and remote work options across our global offices.",
      descriptionAr: "خيارات العمل الهجين والعمل عن بعد في مكاتبنا العالمية."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
      title: "Growth & Learning",
      titleAr: "النمو والتعلم",
      description: "Professional development budget and mentorship programs.",
      descriptionAr: "ميزانية التطوير المهني وبرامج التوجيه."
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-blue-600" />,
      title: "Inclusive Culture",
      titleAr: "ثقافة شاملة",
      description: "Diverse and supportive environment where everyone belongs.",
      descriptionAr: "بيئة متنوعة وداعمة حيث ينتمي الجميع."
    },
    {
      icon: <MapPin className="h-8 w-8 text-blue-600" />,
      title: "Travel Perks",
      titleAr: "مزايا السفر",
      description: "Employee travel discounts and annual travel stipend.",
      descriptionAr: "خصومات سفر للموظفين ومخصصات سفر سنوية."
    }
  ];
  
  const jobOpenings = {
    technology: [
      {
        title: "Senior Frontend Engineer",
        titleAr: "مهندس واجهة أمامية أول",
        location: "Dubai, UAE or Remote",
        locationAr: "دبي، الإمارات العربية المتحدة أو عن بعد",
        department: "Engineering",
        departmentAr: "هندسة البرمجيات",
        type: "Full-time",
        typeAr: "دوام كامل"
      },
      {
        title: "Backend Developer (Node.js)",
        titleAr: "مطور الخلفية (Node.js)",
        location: "Amman, Jordan or Remote",
        locationAr: "عمان، الأردن أو عن بعد",
        department: "Engineering",
        departmentAr: "هندسة البرمجيات",
        type: "Full-time",
        typeAr: "دوام كامل"
      },
      {
        title: "DevOps Engineer",
        titleAr: "مهندس DevOps",
        location: "Dubai, UAE",
        locationAr: "دبي، الإمارات العربية المتحدة",
        department: "Infrastructure",
        departmentAr: "البنية التحتية",
        type: "Full-time",
        typeAr: "دوام كامل"
      }
    ],
    marketing: [
      {
        title: "Digital Marketing Specialist",
        titleAr: "أخصائي تسويق رقمي",
        location: "Cairo, Egypt",
        locationAr: "القاهرة، مصر",
        department: "Marketing",
        departmentAr: "التسويق",
        type: "Full-time",
        typeAr: "دوام كامل"
      },
      {
        title: "Content Writer (Arabic/English)",
        titleAr: "كاتب محتوى (عربي/إنجليزي)",
        location: "Remote",
        locationAr: "عن بعد",
        department: "Content",
        departmentAr: "المحتوى",
        type: "Contract",
        typeAr: "عقد"
      }
    ],
    operations: [
      {
        title: "Customer Support Specialist (Arabic/English)",
        titleAr: "أخصائي دعم العملاء (عربي/إنجليزي)",
        location: "Dubai, UAE",
        locationAr: "دبي، الإمارات العربية المتحدة",
        department: "Customer Support",
        departmentAr: "دعم العملاء",
        type: "Full-time",
        typeAr: "دوام كامل"
      },
      {
        title: "Travel Operations Manager",
        titleAr: "مدير عمليات السفر",
        location: "Riyadh, Saudi Arabia",
        locationAr: "الرياض، المملكة العربية السعودية",
        department: "Operations",
        departmentAr: "العمليات",
        type: "Full-time",
        typeAr: "دوام كامل"
      }
    ],
    business: [
      {
        title: "Business Development Manager - Airlines",
        titleAr: "مدير تطوير الأعمال - شركات الطيران",
        location: "Dubai, UAE",
        locationAr: "دبي، الإمارات العربية المتحدة",
        department: "Business Development",
        departmentAr: "تطوير الأعمال",
        type: "Full-time",
        typeAr: "دوام كامل"
      },
      {
        title: "Hotel Partnerships Specialist",
        titleAr: "أخصائي شراكات الفنادق",
        location: "Doha, Qatar",
        locationAr: "الدوحة، قطر",
        department: "Partnerships",
        departmentAr: "الشراكات",
        type: "Full-time",
        typeAr: "دوام كامل"
      }
    ]
  };
  
  const renderJobCard = (job: any) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h3 className={`text-xl font-semibold mb-1 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
              {t(job.title, job.titleAr)}
            </h3>
            <div className={`flex flex-wrap gap-2 mb-3 ${language === 'ar' ? 'justify-end' : ''}`}>
              <span className="inline-flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" /> 
                {t(job.location, job.locationAr)}
              </span>
              <span className="inline-flex items-center text-sm text-gray-600 mx-2">
                •
              </span>
              <span className="text-sm text-gray-600">
                {t(job.department, job.departmentAr)}
              </span>
              <span className="inline-flex items-center text-sm text-gray-600 mx-2">
                •
              </span>
              <span className="text-sm text-gray-600">
                {t(job.type, job.typeAr)}
              </span>
            </div>
          </div>
          <Button variant="outline" className="mt-3 md:mt-0">
            {t("Apply Now", "قدم الآن")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout 
      title="Careers at GoSafrat" 
      titleAr="الوظائف في جوسفرات"
      subtitle="Join our team and help shape the future of travel"
      subtitleAr="انضم إلى فريقنا وساعد في تشكيل مستقبل السفر"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
            {t("Grow With Us", "انمو معنا")}
          </h2>
          <div className={`space-y-4 text-gray-700 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
            <p>
              {t(
                "At GoSafrat, we're building the next generation of travel technology, connecting millions of travelers across the Middle East and beyond with seamless, delightful experiences.",
                "في جوسفرات، نقوم ببناء الجيل التالي من تكنولوجيا السفر، ونربط ملايين المسافرين في الشرق الأوسط وخارجه بتجارب سلسة وممتعة."
              )}
            </p>
            <p>
              {t(
                "Our diverse team spans multiple countries and brings together expertise from the travel industry, technology, design, and customer experience fields.",
                "يمتد فريقنا المتنوع عبر العديد من البلدان ويجمع بين الخبرات من صناعة السفر والتكنولوجيا والتصميم ومجالات تجربة العملاء."
              )}
            </p>
            <p>
              {t(
                "We're looking for passionate individuals who share our vision of making travel more accessible and enjoyable for everyone.",
                "نبحث عن أفراد متحمسين يشاركوننا رؤيتنا لجعل السفر أكثر سهولة ومتعة للجميع."
              )}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-gradient-to-br from-blue-50 to-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(benefit.title, benefit.titleAr)}
                </h3>
                <p className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(benefit.description, benefit.descriptionAr)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Open Positions", "الوظائف المتاحة")}
        </h2>
        
        <Tabs defaultValue="technology" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="technology" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>{t("Technology", "التكنولوجيا")}</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>{t("Marketing", "التسويق")}</span>
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4" />
              <span>{t("Operations", "العمليات")}</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4" />
              <span>{t("Business", "الأعمال")}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="technology">
            {jobOpenings.technology.map((job, index) => renderJobCard(job))}
          </TabsContent>
          
          <TabsContent value="marketing">
            {jobOpenings.marketing.map((job, index) => renderJobCard(job))}
          </TabsContent>
          
          <TabsContent value="operations">
            {jobOpenings.operations.map((job, index) => renderJobCard(job))}
          </TabsContent>
          
          <TabsContent value="business">
            {jobOpenings.business.map((job, index) => renderJobCard(job))}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl p-8 md:p-12 text-center mb-8">
        <h2 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Don't See the Right Role?", "لا ترى الدور المناسب؟")}
        </h2>
        <p className={`text-lg mb-6 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t(
            "We're always looking for talented individuals. Send us your resume and let us know how you can contribute to our mission.",
            "نحن دائمًا نبحث عن أفراد موهوبين. أرسل لنا سيرتك الذاتية وأخبرنا كيف يمكنك المساهمة في مهمتنا."
          )}
        </p>
        <Button variant="secondary" size="lg" className="font-semibold">
          {t("Submit Your Resume", "أرسل سيرتك الذاتية")}
        </Button>
      </div>
      
      <div className="text-center">
        <h3 className={`text-xl font-bold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Have Questions?", "لديك أسئلة؟")}
        </h3>
        <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t(
            "Contact our recruiting team at careers@gosafrat.com",
            "تواصل مع فريق التوظيف لدينا على careers@gosafrat.com"
          )}
        </p>
      </div>
    </PageLayout>
  );
}