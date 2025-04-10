import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, ShieldCheck, Lock, Eye, Globe, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { language, t } = useLanguage();
  
  const lastUpdated = "April 5, 2025";
  const lastUpdatedAr = "٥ أبريل ٢٠٢٥";
  
  const sections = [
    {
      title: "1. Introduction",
      titleAr: "١. المقدمة",
      content: [
        "GoSafrat ('we', 'our', or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application (collectively, the 'Platform').",
        "Please read this Privacy Policy carefully. By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, please do not use our Platform.",
        "We may change this Privacy Policy from time to time. It is our policy to post any changes on this page. We encourage you to check back periodically for updates. Your continued use of the Platform following the posting of revised policies means that you accept and agree to the changes."
      ],
      contentAr: [
        "تلتزم جوسفرات ('نحن' أو 'الخاص بنا') بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام والكشف عن وحماية معلوماتك عند زيارة موقعنا الإلكتروني أو استخدام تطبيق الهاتف المحمول الخاص بنا (يشار إليهما معًا باسم 'المنصة').",
        "يرجى قراءة سياسة الخصوصية هذه بعناية. من خلال الوصول إلى المنصة أو استخدامها، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بسياسة الخصوصية هذه. إذا كنت لا توافق على سياساتنا وممارساتنا، فالرجاء عدم استخدام منصتنا.",
        "قد نقوم بتغيير سياسة الخصوصية هذه من وقت لآخر. من سياستنا نشر أي تغييرات على هذه الصفحة. نشجعك على التحقق بشكل دوري للحصول على التحديثات. استمرار استخدامك للمنصة بعد نشر السياسات المنقحة يعني أنك تقبل وتوافق على التغييرات."
      ]
    },
    {
      title: "2. Information We Collect",
      titleAr: "٢. المعلومات التي نجمعها",
      content: [
        "We collect several types of information from and about users of our Platform, including:",
        "a) Personal Information: When you create an account, make a booking, or contact us, we collect personal information that can be used to identify you such as your name, email address, postal address, phone number, date of birth, passport or ID details, payment information, and travel preferences.",
        "b) Non-Personal Information: We may automatically collect certain non-personal information when you visit our Platform, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed. This information helps us understand how users interact with our Platform.",
        "c) Booking Information: When you make a booking through our Platform, we collect information about your travel arrangements, including flight details, hotel reservations, car rentals, payment history, and special requests.",
        "d) Communications: If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide."
      ],
      contentAr: [
        "نقوم بجمع عدة أنواع من المعلومات من وحول مستخدمي منصتنا، بما في ذلك:",
        "أ) المعلومات الشخصية: عندما تقوم بإنشاء حساب أو إجراء حجز أو الاتصال بنا، نقوم بجمع معلومات شخصية يمكن استخدامها لتحديد هويتك مثل اسمك وعنوان بريدك الإلكتروني وعنوانك البريدي ورقم هاتفك وتاريخ ميلادك وتفاصيل جواز سفرك أو هويتك ومعلومات الدفع وتفضيلات السفر.",
        "ب) المعلومات غير الشخصية: قد نقوم تلقائيًا بجمع معلومات غير شخصية معينة عند زيارة منصتنا، بما في ذلك عنوان IP الخاص بك ونوع المتصفح ونظام التشغيل وعناوين URL المرجعية وأوقات الوصول والصفحات التي تمت مشاهدتها. تساعدنا هذه المعلومات في فهم كيفية تفاعل المستخدمين مع منصتنا.",
        "ج) معلومات الحجز: عندما تقوم بإجراء حجز من خلال منصتنا، نقوم بجمع معلومات حول ترتيبات سفرك، بما في ذلك تفاصيل الرحلة وحجوزات الفندق وتأجير السيارات وسجل الدفع والطلبات الخاصة.",
        "د) المراسلات: إذا اتصلت بنا مباشرة، فقد نتلقى معلومات إضافية عنك مثل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك ومحتويات الرسالة و/أو المرفقات التي قد ترسلها إلينا، وأي معلومات أخرى قد تختار تقديمها."
      ]
    },
    {
      title: "3. How We Use Your Information",
      titleAr: "٣. كيف نستخدم معلوماتك",
      content: [
        "We use the information we collect for various purposes, including:",
        "a) To provide and maintain our services, including to process transactions, fulfill bookings, and send confirmations.",
        "b) To improve and personalize your experience on our Platform, including recommending destinations and travel options that may interest you.",
        "c) To communicate with you, including responding to your inquiries, providing customer support, and sending important notices or updates.",
        "d) To send promotional communications, such as special offers, promotions, and information about new services, based on your preferences and interactions with our Platform.",
        "e) To monitor and analyze usage patterns and trends to enhance our Platform and services.",
        "f) To detect, investigate, and prevent fraudulent transactions and other illegal activities and protect the rights and property of GoSafrat and others.",
        "g) To comply with legal obligations and resolve any disputes that we may have."
      ],
      contentAr: [
        "نستخدم المعلومات التي نجمعها لأغراض مختلفة، بما في ذلك:",
        "أ) لتوفير وصيانة خدماتنا، بما في ذلك معالجة المعاملات وإتمام الحجوزات وإرسال التأكيدات.",
        "ب) لتحسين وتخصيص تجربتك على منصتنا، بما في ذلك التوصية بالوجهات وخيارات السفر التي قد تهمك.",
        "ج) للتواصل معك، بما في ذلك الرد على استفساراتك وتقديم دعم العملاء وإرسال إشعارات أو تحديثات مهمة.",
        "د) لإرسال اتصالات ترويجية، مثل العروض الخاصة والعروض الترويجية والمعلومات حول الخدمات الجديدة، بناءً على تفضيلاتك وتفاعلاتك مع منصتنا.",
        "هـ) لمراقبة وتحليل أنماط الاستخدام والاتجاهات لتعزيز منصتنا وخدماتنا.",
        "و) للكشف عن المعاملات الاحتيالية والأنشطة غير القانونية الأخرى والتحقيق فيها ومنعها وحماية حقوق وممتلكات جوسفرات والآخرين.",
        "ز) للامتثال للالتزامات القانونية وحل أي نزاعات قد تكون لدينا."
      ]
    },
    {
      title: "4. Disclosure of Your Information",
      titleAr: "٤. الكشف عن معلوماتك",
      content: [
        "We may disclose information that we collect from you in the following circumstances:",
        "a) To Service Providers: We may share your information with third-party service providers that perform services on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.",
        "b) To Travel Suppliers: To complete your booking, we need to share your personal information with relevant travel suppliers such as airlines, hotels, car rental companies, insurance providers, and other third parties involved in fulfilling your travel arrangements.",
        "c) Business Transfers: If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.",
        "d) Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).",
        "e) Protection of Rights: We may disclose your information to protect the rights, property, or safety of GoSafrat, our customers, or others."
      ],
      contentAr: [
        "قد نكشف عن المعلومات التي نجمعها منك في الظروف التالية:",
        "أ) لمزودي الخدمة: قد نشارك معلوماتك مع مزودي خدمات من جهات خارجية يقدمون خدمات نيابة عنا، بما في ذلك معالجة الدفع وتحليل البيانات وتسليم البريد الإلكتروني وخدمات الاستضافة وخدمة العملاء والمساعدة في التسويق.",
        "ب) لموردي السفر: لإكمال حجزك، نحتاج إلى مشاركة معلوماتك الشخصية مع موردي السفر ذوي الصلة مثل شركات الطيران والفنادق وشركات تأجير السيارات ومزودي التأمين وأطراف ثالثة أخرى مشاركة في تلبية ترتيبات سفرك.",
        "ج) نقل الأعمال: إذا كنا متورطين في عملية اندماج أو استحواذ أو بيع لكل أو جزء من أصولنا، فقد يتم نقل معلوماتك كجزء من تلك المعاملة.",
        "د) المتطلبات القانونية: قد نكشف عن معلوماتك إذا كان مطلوبًا منا القيام بذلك بموجب القانون أو استجابة لطلبات صالحة من قبل السلطات العامة (مثل المحكمة أو وكالة حكومية).",
        "هـ) حماية الحقوق: قد نكشف عن معلوماتك لحماية حقوق أو ممتلكات أو سلامة جوسفرات أو عملائنا أو الآخرين."
      ]
    },
    {
      title: "5. Your Choices",
      titleAr: "٥. خياراتك",
      content: [
        "You have certain choices regarding the information you provide to us and how we use it:",
        "a) Account Information: You can review and update your account information by logging into your account on our Platform.",
        "b) Marketing Communications: You can opt out of receiving promotional emails from us by following the unsubscribe instructions included in each email or by contacting us directly. Even if you opt out of promotional emails, we may still send you transactional emails related to your bookings or important account information.",
        "c) Cookies: Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Platform.",
        "d) Data Access and Portability: You may request access to the personal information we have about you and request a copy of it in a structured, commonly used format.",
        "e) Data Deletion: You may request the deletion of your personal information in certain circumstances, subject to legal requirements and exceptions."
      ],
      contentAr: [
        "لديك خيارات معينة فيما يتعلق بالمعلومات التي تقدمها لنا وكيفية استخدامها:",
        "أ) معلومات الحساب: يمكنك مراجعة وتحديث معلومات حسابك عن طريق تسجيل الدخول إلى حسابك على منصتنا.",
        "ب) اتصالات التسويق: يمكنك إلغاء الاشتراك في تلقي رسائل البريد الإلكتروني الترويجية منا باتباع تعليمات إلغاء الاشتراك المضمنة في كل بريد إلكتروني أو عن طريق الاتصال بنا مباشرة. حتى إذا اخترت إلغاء الاشتراك في رسائل البريد الإلكتروني الترويجية، فقد نستمر في إرسال رسائل البريد الإلكتروني المتعلقة بالمعاملات المتعلقة بحجوزاتك أو معلومات الحساب المهمة.",
        "ج) ملفات تعريف الارتباط: يتم ضبط معظم متصفحات الويب لقبول ملفات تعريف الارتباط بشكل افتراضي. يمكنك عادةً اختيار ضبط متصفحك لإزالة أو رفض ملفات تعريف الارتباط في المتصفح. يرجى ملاحظة أنه إذا اخترت إزالة أو رفض ملفات تعريف الارتباط، فقد يؤثر ذلك على توفر ووظائف منصتنا.",
        "د) الوصول إلى البيانات ونقلها: يمكنك طلب الوصول إلى المعلومات الشخصية التي لدينا عنك وطلب نسخة منها بتنسيق منظم وشائع الاستخدام.",
        "هـ) حذف البيانات: يمكنك طلب حذف معلوماتك الشخصية في ظروف معينة، وفقًا للمتطلبات والاستثناءات القانونية."
      ]
    },
    {
      title: "6. Data Security",
      titleAr: "٦. أمن البيانات",
      content: [
        "We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls. Any payment transactions will be encrypted using SSL technology.",
        "The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Platform, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.",
        "Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Platform. Any transmission of personal information is at your own risk."
      ],
      contentAr: [
        "لقد نفذنا تدابير مصممة لتأمين معلوماتك الشخصية من الفقدان العرضي ومن الوصول غير المصرح به والاستخدام والتغيير والكشف. يتم تخزين جميع المعلومات التي تقدمها لنا على خوادم آمنة خلف جدران حماية. سيتم تشفير أي معاملات دفع باستخدام تقنية SSL.",
        "تعتمد سلامة وأمان معلوماتك أيضًا عليك. حيث أعطيناك (أو حيث اخترت) كلمة مرور للوصول إلى أجزاء معينة من منصتنا، فأنت مسؤول عن الحفاظ على سرية كلمة المرور هذه. نطلب منك عدم مشاركة كلمة المرور الخاصة بك مع أي شخص.",
        "للأسف، نقل المعلومات عبر الإنترنت ليس آمنًا تمامًا. على الرغم من أننا نبذل قصارى جهدنا لحماية معلوماتك الشخصية، إلا أننا لا نستطيع ضمان أمان معلوماتك الشخصية المرسلة إلى منصتنا. أي نقل للمعلومات الشخصية يكون على مسؤوليتك الخاصة."
      ]
    },
    {
      title: "7. Children's Privacy",
      titleAr: "٧. خصوصية الأطفال",
      content: [
        "Our Platform is not intended for children under 16 years of age. No one under age 16 may provide any personal information to the Platform. We do not knowingly collect personal information from children under 16. If you are under 16, do not use or provide any information on this Platform.",
        "If we learn we have collected or received personal information from a child under 16 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 16, please contact us."
      ],
      contentAr: [
        "منصتنا غير مخصصة للأطفال دون سن 16 عامًا. لا يجوز لأي شخص دون سن 16 عامًا تقديم أي معلومات شخصية إلى المنصة. نحن لا نجمع عن علم معلومات شخصية من الأطفال دون سن 16 عامًا. إذا كنت دون سن 16 عامًا، فلا تستخدم أو تقدم أي معلومات على هذه المنصة.",
        "إذا علمنا أننا جمعنا أو تلقينا معلومات شخصية من طفل دون سن 16 عامًا دون التحقق من موافقة الوالدين، فسنحذف تلك المعلومات. إذا كنت تعتقد أنه قد يكون لدينا أي معلومات من أو عن طفل دون سن 16 عامًا، فيرجى الاتصال بنا."
      ]
    },
    {
      title: "8. International Data Transfers",
      titleAr: "٨. نقل البيانات الدولية",
      content: [
        "Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.",
        "If you are located outside the United Arab Emirates and choose to provide information to us, please note that we transfer the data, including personal information, to the United Arab Emirates and process it there.",
        "Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer."
      ],
      contentAr: [
        "قد يتم نقل معلوماتك إلى أجهزة كمبيوتر والاحتفاظ بها عليها خارج ولايتك أو مقاطعتك أو بلدك أو أي سلطة قضائية حكومية أخرى حيث قد تختلف قوانين حماية البيانات عن تلك الموجودة في سلطتك القضائية.",
        "إذا كنت موجودًا خارج الإمارات العربية المتحدة واخترت تقديم معلومات لنا، فيرجى ملاحظة أننا ننقل البيانات، بما في ذلك المعلومات الشخصية، إلى الإمارات العربية المتحدة ونعالجها هناك.",
        "موافقتك على سياسة الخصوصية هذه متبوعة بتقديمك لمثل هذه المعلومات تمثل موافقتك على ذلك النقل."
      ]
    },
    {
      title: "9. Your Rights Under Data Protection Laws",
      titleAr: "٩. حقوقك بموجب قوانين حماية البيانات",
      content: [
        "Depending on your location, you may have certain rights regarding your personal information under applicable data protection laws. These may include:",
        "a) The right to access the personal information we hold about you",
        "b) The right to request correction of incomplete or inaccurate personal information",
        "c) The right to request deletion of your personal information under certain circumstances",
        "d) The right to request restriction of or object to processing of your personal information",
        "e) The right to data portability",
        "f) The right to withdraw consent where processing is based on consent",
        "To exercise these rights, please contact us using the information provided in the 'Contact Us' section below. We may require specific information from you to help us confirm your identity and ensure your right to access your personal information or to exercise any of your other rights."
      ],
      contentAr: [
        "اعتمادًا على موقعك، قد يكون لديك حقوق معينة فيما يتعلق بمعلوماتك الشخصية بموجب قوانين حماية البيانات المعمول بها. قد تشمل هذه:",
        "أ) الحق في الوصول إلى المعلومات الشخصية التي نحتفظ بها عنك",
        "ب) الحق في طلب تصحيح المعلومات الشخصية غير الكاملة أو غير الدقيقة",
        "ج) الحق في طلب حذف معلوماتك الشخصية في ظروف معينة",
        "د) الحق في طلب تقييد أو الاعتراض على معالجة معلوماتك الشخصية",
        "هـ) الحق في نقل البيانات",
        "و) الحق في سحب الموافقة عندما تستند المعالجة إلى الموافقة",
        "لممارسة هذه الحقوق، يرجى الاتصال بنا باستخدام المعلومات المقدمة في قسم 'اتصل بنا' أدناه. قد نطلب معلومات محددة منك لمساعدتنا في تأكيد هويتك وضمان حقك في الوصول إلى معلوماتك الشخصية أو ممارسة أي من حقوقك الأخرى."
      ]
    },
    {
      title: "10. Contact Us",
      titleAr: "١٠. اتصل بنا",
      content: [
        "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:",
        "Email: privacy@gosafrat.com",
        "Phone: +971 4 123 4567",
        "Mailing Address: GoSafrat (Safrat Travel Solutions LLC), Level 14, Boulevard Plaza Tower 1, Downtown Dubai, United Arab Emirates",
        "Data Protection Officer: dpo@gosafrat.com"
      ],
      contentAr: [
        "إذا كان لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية هذه أو ممارسات البيانات لدينا، فيرجى الاتصال بنا على:",
        "البريد الإلكتروني: privacy@gosafrat.com",
        "الهاتف: +971 4 123 4567",
        "العنوان البريدي: جوسفرات (شركة سفرات لحلول السفر ذ.م.م)، المستوى 14، بوليفارد بلازا تاور 1، وسط دبي، الإمارات العربية المتحدة",
        "مسؤول حماية البيانات: dpo@gosafrat.com"
      ]
    }
  ];
  
  const privacyHighlights = [
    {
      icon: <Eye className="h-6 w-6 text-blue-600" />,
      title: "Information Collection",
      titleAr: "جمع المعلومات",
      description: "We collect personal and booking information to provide our services.",
      descriptionAr: "نجمع المعلومات الشخصية ومعلومات الحجز لتقديم خدماتنا."
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Information Sharing",
      titleAr: "مشاركة المعلومات",
      description: "We share information with travel suppliers to fulfill your bookings.",
      descriptionAr: "نشارك المعلومات مع موردي السفر لإتمام حجوزاتك."
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-600" />,
      title: "Data Security",
      titleAr: "أمن البيانات",
      description: "We implement security measures to protect your information.",
      descriptionAr: "نقوم بتنفيذ تدابير أمنية لحماية معلوماتك."
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "Your Rights",
      titleAr: "حقوقك",
      description: "You have rights to access, correct, and delete your data.",
      descriptionAr: "لديك حقوق للوصول إلى بياناتك وتصحيحها وحذفها."
    }
  ];

  return (
    <PageLayout 
      title="Privacy Policy" 
      titleAr="سياسة الخصوصية"
    >
      <div className="max-w-4xl mx-auto">
        <div className={`mb-8 ${language === 'ar' ? 'text-right' : ''}`}>
          <p className={`text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t(`Last Updated: ${lastUpdated}`, `آخر تحديث: ${lastUpdatedAr}`)}
          </p>
        </div>
        
        <Card className="mb-10">
          <CardContent className="pt-6">
            <div className={`${language === 'ar' ? 'text-right' : ''}`}>
              <h2 className={`text-xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("Privacy Policy Overview", "نظرة عامة على سياسة الخصوصية")}
              </h2>
              
              <p className={`text-gray-700 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t(
                  "At GoSafrat, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.",
                  "في جوسفرات، نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك عند استخدام خدماتنا."
                )}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {privacyHighlights.map((highlight, index) => (
                  <div key={index} className={`flex items-start ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'} mt-1`}>
                      {highlight.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(highlight.title, highlight.titleAr)}
                      </h3>
                      <p className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(highlight.description, highlight.descriptionAr)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <AlertCircle className={`h-6 w-6 text-blue-600 flex-shrink-0 ${language === 'ar' ? 'mt-1' : 'mt-1'}`} />
                <div>
                  <p className={`text-sm text-blue-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t(
                      "This is a summary of our privacy practices. For complete details, please read the full Privacy Policy below.",
                      "هذا ملخص لممارسات الخصوصية لدينا. للحصول على تفاصيل كاملة، يرجى قراءة سياسة الخصوصية الكاملة أدناه."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="full-policy" className="mb-12">
          <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-6">
            <TabsTrigger value="full-policy">
              {t("Full Policy", "السياسة الكاملة")}
            </TabsTrigger>
            <TabsTrigger value="your-rights">
              {t("Your Rights", "حقوقك")}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="full-policy">
            <div className="space-y-10">
              {sections.map((section, index) => (
                <div key={index} className={`${language === 'ar' ? 'text-right' : ''}`}>
                  <h2 className={`text-xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t(section.title, section.titleAr)}
                  </h2>
                  <Separator className="mb-4" />
                  <div className="space-y-3">
                    {section.content.map((paragraph, i) => (
                      <p key={i} className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(paragraph, section.contentAr[i] || paragraph)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="your-rights">
            <Card>
              <CardContent className="p-6">
                <div className={`${language === 'ar' ? 'text-right' : ''}`}>
                  <h2 className={`text-xl font-bold mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Your Rights Regarding Personal Information", "حقوقك المتعلقة بالمعلومات الشخصية")}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Right of Access", "حق الوصول")}
                      </h3>
                      <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(
                          "You have the right to request copies of your personal information. We may charge a small fee for this service.",
                          "لديك الحق في طلب نسخ من معلوماتك الشخصية. قد نفرض رسومًا صغيرة مقابل هذه الخدمة."
                        )}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Right to Rectification", "حق التصحيح")}
                      </h3>
                      <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(
                          "You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.",
                          "لديك الحق في طلب تصحيح أي معلومات تعتقد أنها غير دقيقة أو إكمال المعلومات التي تعتقد أنها غير كاملة."
                        )}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Right to Erasure", "حق المحو")}
                      </h3>
                      <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(
                          "You have the right to request that we erase your personal information, under certain conditions. This may be subject to legal requirements and exceptions.",
                          "لديك الحق في طلب محو معلوماتك الشخصية، في ظل ظروف معينة. قد يخضع ذلك للمتطلبات والاستثناءات القانونية."
                        )}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Right to Restrict Processing", "حق تقييد المعالجة")}
                      </h3>
                      <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(
                          "You have the right to request that we restrict the processing of your personal information, under certain conditions.",
                          "لديك الحق في طلب تقييد معالجة معلوماتك الشخصية، في ظل ظروف معينة."
                        )}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Right to Data Portability", "حق نقل البيانات")}
                      </h3>
                      <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(
                          "You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.",
                          "لديك الحق في طلب نقل البيانات التي جمعناها إلى منظمة أخرى، أو مباشرة إليك، في ظل ظروف معينة."
                        )}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Right to Object", "حق الاعتراض")}
                      </h3>
                      <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(
                          "You have the right to object to our processing of your personal information, under certain conditions.",
                          "لديك الحق في الاعتراض على معالجتنا لمعلوماتك الشخصية، في ظل ظروف معينة."
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <h3 className={`text-lg font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("How to Exercise Your Rights", "كيفية ممارسة حقوقك")}
                    </h3>
                    <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t(
                        "To exercise any of these rights, please submit a data subject request by contacting our Data Protection Officer at dpo@gosafrat.com or using the contact details provided in the 'Contact Us' section.",
                        "لممارسة أي من هذه الحقوق، يرجى تقديم طلب موضوع البيانات عن طريق الاتصال بمسؤول حماية البيانات لدينا على dpo@gosafrat.com أو باستخدام تفاصيل الاتصال المقدمة في قسم 'اتصل بنا'."
                      )}
                    </p>
                    <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t(
                        "We will respond to all legitimate requests within one month. Occasionally, it may take us longer if your request is particularly complex or you have made several requests.",
                        "سنرد على جميع الطلبات المشروعة في غضون شهر واحد. في بعض الأحيان، قد يستغرق الأمر وقتًا أطول إذا كان طلبك معقدًا بشكل خاص أو قدمت عدة طلبات."
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 flex items-start gap-6 flex-col md:flex-row">
          <div className="flex-shrink-0 p-3 bg-white rounded-full shadow-sm">
            <ShieldCheck className="h-10 w-10 text-blue-600" />
          </div>
          
          <div className={`${language === 'ar' ? 'text-right' : ''}`}>
            <h3 className={`text-xl font-bold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Our Commitment to Privacy", "التزامنا بالخصوصية")}
            </h3>
            <p className={`text-gray-700 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t(
                "GoSafrat is committed to safeguarding your privacy. We only collect information necessary to provide our services and improve your travel experience. Your trust is important to us.",
                "تلتزم جوسفرات بحماية خصوصيتك. نحن نجمع فقط المعلومات اللازمة لتقديم خدماتنا وتحسين تجربة سفرك. ثقتك مهمة بالنسبة لنا."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" asChild>
                <a href="mailto:privacy@gosafrat.com">
                  {t("Contact Privacy Team", "اتصل بفريق الخصوصية")}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/support/help-center">
                  {t("Visit Help Center", "زيارة مركز المساعدة")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}