import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Globe, Award, Users } from "lucide-react";

export default function AboutPage() {
  const { language, t } = useLanguage();
  
  const teamMembers = [
    {
      name: "Sarah Johnson",
      nameAr: "سارة جونسون",
      role: "CEO & Founder",
      roleAr: "الرئيس التنفيذي والمؤسس",
      bio: "Travel industry veteran with 15+ years of experience in digital transformation and customer experience.",
      bioAr: "خبيرة في صناعة السفر مع أكثر من 15 عامًا من الخبرة في التحول الرقمي وخدمة العملاء.",
      imagePlaceholder: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Ahmed Al-Farsi",
      nameAr: "أحمد الفارسي",
      role: "CTO",
      roleAr: "المدير التقني",
      bio: "Former tech lead at Booking.com with expertise in building scalable travel platforms.",
      bioAr: "قائد تقني سابق في Booking.com مع خبرة في بناء منصات سفر قابلة للتوسع.",
      imagePlaceholder: "https://randomuser.me/api/portraits/men/78.jpg"
    },
    {
      name: "Michael Chen",
      nameAr: "مايكل تشن",
      role: "Head of Partnerships",
      roleAr: "رئيس الشراكات",
      bio: "Brings 10+ years of experience forging strategic alliances with airlines and hotels worldwide.",
      bioAr: "يجلب أكثر من 10 سنوات من الخبرة في إقامة تحالفات استراتيجية مع شركات الطيران والفنادق في جميع أنحاء العالم.",
      imagePlaceholder: "https://randomuser.me/api/portraits/men/62.jpg"
    },
    {
      name: "Layla Hassan",
      nameAr: "ليلى حسن",
      role: "UX Director",
      roleAr: "مدير تجربة المستخدم",
      bio: "Award-winning designer focused on creating intuitive and accessible travel booking experiences.",
      bioAr: "مصممة حائزة على جوائز تركز على إنشاء تجارب حجز سفر بديهية وسهلة الوصول.",
      imagePlaceholder: "https://randomuser.me/api/portraits/women/45.jpg"
    }
  ];
  
  const valueProps = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Global Reach",
      titleAr: "تواجد عالمي",
      description: "Connecting travelers to over 500+ airlines and 1.5 million accommodations worldwide.",
      descriptionAr: "نربط المسافرين بأكثر من 500 شركة طيران و1.5 مليون مكان إقامة حول العالم."
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Travel Excellence",
      titleAr: "التميز في السفر",
      description: "Award-winning service with 24/7 customer support in multiple languages.",
      descriptionAr: "خدمة حائزة على جوائز مع دعم للعملاء على مدار الساعة طوال أيام الأسبوع بعدة لغات."
    },
    {
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
      title: "Regional Expertise",
      titleAr: "خبرة إقليمية",
      description: "Deep understanding of Middle Eastern travel needs with tailored experiences.",
      descriptionAr: "فهم عميق لاحتياجات السفر في الشرق الأوسط مع تجارب مخصصة."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Customer First",
      titleAr: "العميل أولاً",
      description: "Our mission is to make travel booking simple, transparent, and enjoyable for everyone.",
      descriptionAr: "مهمتنا هي جعل حجز السفر بسيطًا وشفافًا وممتعًا للجميع."
    }
  ];

  return (
    <PageLayout 
      title="About GoSafrat" 
      titleAr="عن جوسفرات"
      subtitle="Your trusted partner in travel since 2020"
      subtitleAr="شريكك الموثوق في السفر منذ عام 2020"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
            {t("Our Story", "قصتنا")}
          </h2>
          <div className={`space-y-4 text-gray-700 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
            <p>
              {t(
                "GoSafrat was founded in 2020 with a simple mission: to make travel accessible, affordable, and enjoyable for everyone in the Middle East and beyond.",
                "تأسست جوسفرات في عام 2020 بمهمة بسيطة: جعل السفر متاحًا وبأسعار معقولة وممتعًا للجميع في الشرق الأوسط وخارجه."
              )}
            </p>
            <p>
              {t(
                "What began as a small startup has grown into a leading travel platform connecting millions of travelers with flights, hotels, and car rentals across the globe.",
                "ما بدأ كشركة ناشئة صغيرة تحول إلى منصة سفر رائدة تربط ملايين المسافرين برحلات الطيران والفنادق وتأجير السيارات في جميع أنحاء العالم."
              )}
            </p>
            <p>
              {t(
                "Our team combines deep industry expertise with cutting-edge technology to deliver a seamless booking experience tailored to the unique needs of our diverse customer base.",
                "يجمع فريقنا بين الخبرة العميقة في الصناعة والتكنولوجيا المتطورة لتقديم تجربة حجز سلسة مصممة خصيصًا لتلبية الاحتياجات الفريدة لقاعدة عملائنا المتنوعة."
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
              alt={t("GoSafrat office", "مكتب جوسفرات")}
              className="relative z-10 rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Why Choose GoSafrat?", "لماذا تختار جوسفرات؟")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <Card key={index} className="border-t-4 border-blue-500">
              <CardContent className="pt-6">
                <div className="mb-4">{prop.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(prop.title, prop.titleAr)}
                </h3>
                <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(prop.description, prop.descriptionAr)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Our Leadership Team", "فريق القيادة لدينا")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <img 
                src={member.imagePlaceholder} 
                alt={t(member.name, member.nameAr)}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className={`text-xl font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t(member.name, member.nameAr)}
              </h3>
              <p className={`text-blue-600 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t(member.role, member.roleAr)}
              </p>
              <p className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                {t(member.bio, member.bioAr)}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-xl text-center">
        <h2 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Our Mission", "مهمتنا")}
        </h2>
        <p className={`text-lg max-w-3xl mx-auto ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t(
            "To empower travelers with technology that makes discovering the world more accessible, affordable, and enjoyable for everyone.",
            "تمكين المسافرين بالتكنولوجيا التي تجعل اكتشاف العالم أكثر سهولة وبأسعار معقولة وممتعًا للجميع."
          )}
        </p>
      </div>
    </PageLayout>
  );
}