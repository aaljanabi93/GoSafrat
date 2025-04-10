import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Plane, 
  Building, 
  Car, 
  CreditCard, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  MessageCircle,
  MailOpen
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HelpCenterPage() {
  const { language, t } = useLanguage();
  
  const categories = [
    {
      icon: <Plane className="h-10 w-10 text-blue-600" />,
      title: "Flight Bookings",
      titleAr: "حجوزات الطيران",
      description: "Flight changes, cancellations, baggage info, and more",
      descriptionAr: "تغييرات الرحلات، الإلغاءات، معلومات الأمتعة، والمزيد"
    },
    {
      icon: <Building className="h-10 w-10 text-blue-600" />,
      title: "Hotel Reservations",
      titleAr: "حجوزات الفنادق",
      description: "Room types, amenities, check-in procedures, and policies",
      descriptionAr: "أنواع الغرف، المرافق، إجراءات تسجيل الوصول، والسياسات"
    },
    {
      icon: <Car className="h-10 w-10 text-blue-600" />,
      title: "Car Rentals",
      titleAr: "تأجير السيارات",
      description: "Vehicle options, pickup/dropoff, insurance information",
      descriptionAr: "خيارات المركبات، الاستلام/التسليم، معلومات التأمين"
    },
    {
      icon: <CreditCard className="h-10 w-10 text-blue-600" />,
      title: "Payments & Refunds",
      titleAr: "المدفوعات والاسترداد",
      description: "Payment methods, refund process, and cancellation fees",
      descriptionAr: "طرق الدفع، عملية الاسترداد، ورسوم الإلغاء"
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Account Management",
      titleAr: "إدارة الحساب",
      description: "Profile settings, password reset, and booking history",
      descriptionAr: "إعدادات الملف الشخصي، إعادة تعيين كلمة المرور، وسجل الحجز"
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
      title: "Security & Privacy",
      titleAr: "الأمان والخصوصية",
      description: "Account security, privacy policies, and data protection",
      descriptionAr: "أمان الحساب، سياسات الخصوصية، وحماية البيانات"
    }
  ];
  
  const popularQuestions = [
    {
      question: "How do I change or cancel my flight?",
      questionAr: "كيف يمكنني تغيير أو إلغاء رحلتي الجوية؟",
      answer: "To change or cancel your flight, go to 'My Bookings' in your account dashboard. Select the booking you wish to modify and follow the prompts for changes or cancellation. Note that fees may apply based on airline policies and fare rules.",
      answerAr: "لتغيير أو إلغاء رحلتك الجوية، انتقل إلى 'حجوزاتي' في لوحة معلومات حسابك. حدد الحجز الذي ترغب في تعديله واتبع التعليمات للتغييرات أو الإلغاء. لاحظ أنه قد تطبق رسوم بناءً على سياسات شركة الطيران وقواعد الأجرة."
    },
    {
      question: "When will I receive my e-ticket after booking?",
      questionAr: "متى سأستلم التذكرة الإلكترونية بعد الحجز؟",
      answer: "E-tickets are usually issued immediately after your payment is confirmed, and you'll receive them via email. You can also find your e-tickets in the 'My Bookings' section of your GoSafrat account.",
      answerAr: "عادةً ما يتم إصدار التذاكر الإلكترونية فورًا بعد تأكيد الدفع، وستتلقاها عبر البريد الإلكتروني. يمكنك أيضًا العثور على تذاكرك الإلكترونية في قسم 'حجوزاتي' في حساب جوسفرات الخاص بك."
    },
    {
      question: "How can I add special requests to my hotel booking?",
      questionAr: "كيف يمكنني إضافة طلبات خاصة إلى حجز الفندق الخاص بي؟",
      answer: "During the hotel booking process, there's a 'Special Requests' field where you can enter your preferences. Alternatively, after booking, you can access your reservation in 'My Bookings' and add special requests from there. Note that special requests are subject to hotel availability and cannot be guaranteed.",
      answerAr: "أثناء عملية حجز الفندق، هناك حقل 'طلبات خاصة' حيث يمكنك إدخال تفضيلاتك. بدلاً من ذلك، بعد الحجز، يمكنك الوصول إلى حجزك في 'حجوزاتي' وإضافة طلبات خاصة من هناك. لاحظ أن الطلبات الخاصة تخضع لتوفر الفندق ولا يمكن ضمانها."
    },
    {
      question: "What payment methods are accepted?",
      questionAr: "ما هي طرق الدفع المقبولة؟",
      answer: "GoSafrat accepts major credit and debit cards (Visa, Mastercard, American Express), PayPal, and in select markets, local payment methods like Apple Pay and bank transfers. The available payment methods will be displayed at checkout.",
      answerAr: "تقبل جوسفرات بطاقات الائتمان والخصم الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس)، وباي بال، وفي أسواق مختارة، طرق الدفع المحلية مثل Apple Pay والتحويلات المصرفية. سيتم عرض طرق الدفع المتاحة عند الدفع."
    },
    {
      question: "How do I contact customer support?",
      questionAr: "كيف يمكنني الاتصال بدعم العملاء؟",
      answer: "You can reach our customer support team 24/7 via live chat on our website or mobile app, by email at support@gosafrat.com, or by phone at +971-4-123-4567. For urgent assistance with current bookings, please have your booking reference number ready.",
      answerAr: "يمكنك الوصول إلى فريق دعم العملاء لدينا على مدار الساعة طوال أيام الأسبوع عبر الدردشة المباشرة على موقعنا الإلكتروني أو تطبيق الجوال، أو عبر البريد الإلكتروني على support@gosafrat.com، أو عبر الهاتف على 4567-123-4-971+. للمساعدة العاجلة في الحجوزات الحالية، يرجى تجهيز رقم مرجع الحجز الخاص بك."
    }
  ];
  
  const topicsByCat = {
    flights: [
      "Flight Cancellation", "Flight Delays", "Baggage Allowance", 
      "Flight Changes", "Check-in Information", "Booking Multiple Flights",
      "Infant & Child Tickets", "Special Assistance", "Airline Policies"
    ],
    hotels: [
      "Cancellation Policies", "Room Types", "Check-in/Check-out", 
      "Hotel Amenities", "Special Requests", "Early/Late Check-in",
      "Hotel Location", "Pet Policies", "Resort Fees"
    ],
    cars: [
      "Rental Requirements", "Insurance Options", "Fuel Policies", 
      "Vehicle Types", "One-way Rentals", "Additional Drivers",
      "Cross-border Travel", "Age Requirements", "GPS & Add-ons"
    ]
  };

  return (
    <PageLayout 
      title="Help Center" 
      titleAr="مركز المساعدة"
      subtitle="Find answers to your travel questions"
      subtitleAr="اعثر على إجابات لأسئلة السفر الخاصة بك"
    >
      <div className="max-w-3xl mx-auto mb-16">
        <div className="relative mb-12">
          <Input
            className={`py-6 pl-12 pr-4 text-lg ${language === 'ar' ? 'text-right pr-12 pl-4' : ''}`}
            placeholder={t("Search for help topics...", "البحث عن مواضيع المساعدة...")}
          />
          <Search className={`absolute top-1/2 transform -translate-y-1/2 ${language === 'ar' ? 'right-4' : 'left-4'} text-gray-400 h-5 w-5`} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">{category.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(category.title, category.titleAr)}
                </h3>
                <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(category.description, category.descriptionAr)}
                </p>
                <Button variant="link" className={`p-0 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  {t("Browse Topics", "تصفح المواضيع")}
                  <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Frequently Asked Questions", "الأسئلة المتكررة")}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {popularQuestions.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className={`text-left ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(faq.question, faq.questionAr)}
                </AccordionTrigger>
                <AccordionContent className={`text-gray-600 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t(faq.answer, faq.answerAr)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardContent className="p-6">
            <h3 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
              {t("Flight Topics", "مواضيع الطيران")}
            </h3>
            <ul className={`space-y-2 ${language === 'ar' ? 'text-right' : ''}`}>
              {topicsByCat.flights.map((topic, index) => (
                <li key={index}>
                  <Button variant="link" className="p-0 h-auto font-normal text-blue-600">
                    {topic}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
              {t("Hotel Topics", "مواضيع الفنادق")}
            </h3>
            <ul className={`space-y-2 ${language === 'ar' ? 'text-right' : ''}`}>
              {topicsByCat.hotels.map((topic, index) => (
                <li key={index}>
                  <Button variant="link" className="p-0 h-auto font-normal text-blue-600">
                    {topic}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
              {t("Car Rental Topics", "مواضيع تأجير السيارات")}
            </h3>
            <ul className={`space-y-2 ${language === 'ar' ? 'text-right' : ''}`}>
              {topicsByCat.cars.map((topic, index) => (
                <li key={index}>
                  <Button variant="link" className="p-0 h-auto font-normal text-blue-600">
                    {topic}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Live Chat Support", "دعم الدردشة المباشرة")}
            </h3>
            <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t(
                "Chat with our travel experts for immediate assistance with your bookings.",
                "تحدث مع خبراء السفر لدينا للحصول على مساعدة فورية بشأن حجوزاتك."
              )}
            </p>
            <Button>
              {t("Start Chat", "بدء الدردشة")}
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <MailOpen className="h-8 w-8 text-green-600" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Email Support", "دعم البريد الإلكتروني")}
            </h3>
            <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t(
                "Send us an email and we'll respond within 24 hours for non-urgent inquiries.",
                "أرسل لنا بريدًا إلكترونيًا وسنرد في غضون 24 ساعة للاستفسارات غير العاجلة."
              )}
            </p>
            <Button variant="outline">
              {t("Email Us", "راسلنا")}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}