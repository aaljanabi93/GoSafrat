import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Cookie, CheckCircle, XCircle, Settings, AlertCircle } from "lucide-react";

export default function CookiePolicyPage() {
  const { language, t } = useLanguage();
  
  const lastUpdated = "April 5, 2025";
  const lastUpdatedAr = "٥ أبريل ٢٠٢٥";
  
  const sections = [
    {
      title: "1. What Are Cookies",
      titleAr: "١. ما هي ملفات تعريف الارتباط",
      content: [
        "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.",
        "The cookies we use may store personal information about you, such as your preferences or login details, or they may collect statistical information about how you use our website, such as which pages you visit and how long you spend on each page."
      ],
      contentAr: [
        "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهاز الكمبيوتر أو الجهاز المحمول الخاص بك عند زيارة موقع ويب. يتم استخدامها على نطاق واسع لجعل مواقع الويب تعمل بكفاءة أكبر وتوفير معلومات لأصحاب مواقع الويب.",
        "قد تخزن ملفات تعريف الارتباط التي نستخدمها معلومات شخصية عنك، مثل تفضيلاتك أو تفاصيل تسجيل الدخول الخاصة بك، أو قد تجمع معلومات إحصائية حول كيفية استخدامك لموقعنا الإلكتروني، مثل الصفحات التي تزورها والمدة التي تقضيها في كل صفحة."
      ]
    },
    {
      title: "2. Types of Cookies We Use",
      titleAr: "٢. أنواع ملفات تعريف الارتباط التي نستخدمها",
      content: [
        "We use the following types of cookies on our website:",
        "a) Essential Cookies: These cookies are necessary for the operation of our website. They enable core functionality such as security, network management, and account access. You cannot opt-out of these cookies.",
        "b) Analytics Cookies: These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and your experience.",
        "c) Functional Cookies: These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
        "d) Targeting/Advertising Cookies: These cookies are used to build a profile of your interests and show you relevant advertisements on other sites. They remember that you have visited our website and this information may be shared with other organizations, such as advertisers."
      ],
      contentAr: [
        "نستخدم الأنواع التالية من ملفات تعريف الارتباط على موقعنا الإلكتروني:",
        "أ) ملفات تعريف الارتباط الأساسية: هذه الملفات ضرورية لتشغيل موقعنا الإلكتروني. إنها تمكن الوظائف الأساسية مثل الأمان وإدارة الشبكة والوصول إلى الحساب. لا يمكنك إلغاء الاشتراك في ملفات تعريف الارتباط هذه.",
        "ب) ملفات تعريف الارتباط التحليلية: تساعدنا ملفات تعريف الارتباط هذه على فهم كيفية تفاعل الزوار مع موقعنا الإلكتروني من خلال جمع المعلومات والإبلاغ عنها بشكل مجهول. يساعدنا هذا في تحسين موقعنا الإلكتروني وتجربتك.",
        "ج) ملفات تعريف الارتباط الوظيفية: تتيح ملفات تعريف الارتباط هذه للموقع الإلكتروني توفير وظائف وتخصيص محسنين. قد يتم تعيينها من قبلنا أو من قبل مزودي خدمات الجهات الخارجية الذين أضفنا خدماتهم إلى صفحاتنا.",
        "د) ملفات تعريف الارتباط المستهدفة/الإعلانية: تُستخدم ملفات تعريف الارتباط هذه لبناء ملف تعريف لاهتماماتك وإظهار الإعلانات ذات الصلة على المواقع الأخرى. إنها تتذكر أنك زرت موقعنا الإلكتروني وقد تتم مشاركة هذه المعلومات مع منظمات أخرى، مثل المعلنين."
      ]
    },
    {
      title: "3. Third-Party Cookies",
      titleAr: "٣. ملفات تعريف الارتباط من الجهات الخارجية",
      content: [
        "Some cookies on our website are set by third parties. These third parties include:",
        "a) Google Analytics: We use Google Analytics to collect information about how visitors use our website. This helps us improve our website and your experience.",
        "b) Social Media: We may embed content from social media platforms, such as Facebook, Twitter, and Instagram. These platforms may set their own cookies when you interact with their content.",
        "c) Advertising Partners: Our advertising partners may set cookies on your device when you visit our website. These cookies help them to show you relevant advertisements on other websites.",
        "d) Payment Processors: When you make a booking or purchase through our website, our payment processors may set cookies to ensure the security and proper functioning of the transaction.",
        "Please note that we do not have control over these third-party cookies. You should check the privacy policies of these third parties for more information about their use of cookies."
      ],
      contentAr: [
        "يتم تعيين بعض ملفات تعريف الارتباط على موقعنا الإلكتروني من قبل جهات خارجية. تشمل هذه الجهات الخارجية:",
        "أ) Google Analytics: نستخدم Google Analytics لجمع معلومات حول كيفية استخدام الزوار لموقعنا الإلكتروني. يساعدنا هذا في تحسين موقعنا الإلكتروني وتجربتك.",
        "ب) وسائل التواصل الاجتماعي: قد نقوم بتضمين محتوى من منصات التواصل الاجتماعي، مثل Facebook و Twitter و Instagram. قد تقوم هذه المنصات بتعيين ملفات تعريف الارتباط الخاصة بها عند تفاعلك مع محتواها.",
        "ج) شركاء الإعلان: قد يقوم شركاؤنا في الإعلان بتعيين ملفات تعريف الارتباط على جهازك عند زيارة موقعنا الإلكتروني. تساعد ملفات تعريف الارتباط هذه في إظهار الإعلانات ذات الصلة على مواقع الويب الأخرى.",
        "د) معالجات الدفع: عندما تقوم بإجراء حجز أو شراء من خلال موقعنا الإلكتروني، قد يقوم معالجو الدفع لدينا بتعيين ملفات تعريف الارتباط لضمان أمن وحسن سير المعاملة.",
        "يرجى ملاحظة أننا لا نتحكم في ملفات تعريف الارتباط هذه من جهات خارجية. يجب عليك التحقق من سياسات الخصوصية لهذه الجهات الخارجية للحصول على مزيد من المعلومات حول استخدامها لملفات تعريف الارتباط."
      ]
    },
    {
      title: "4. Managing Cookies",
      titleAr: "٤. إدارة ملفات تعريف الارتباط",
      content: [
        "You can manage cookies through your browser settings. Most browsers allow you to refuse to accept cookies, delete cookies, or be notified when a cookie is set. Please note that if you disable or refuse cookies, some parts of our website may become inaccessible or not function properly.",
        "Here's how you can manage cookies in popular browsers:",
        "a) Chrome: Settings > Privacy and security > Cookies and other site data",
        "b) Firefox: Options > Privacy & Security > Cookies and Site Data",
        "c) Safari: Preferences > Privacy > Cookies and website data",
        "d) Edge: Settings > Cookies and site permissions > Cookies and site data",
        "You can also visit www.allaboutcookies.org for more information about how to manage and delete cookies across different browsers and devices."
      ],
      contentAr: [
        "يمكنك إدارة ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك. تسمح لك معظم المتصفحات برفض قبول ملفات تعريف الارتباط، أو حذف ملفات تعريف الارتباط، أو تلقي إشعار عند تعيين ملف تعريف ارتباط. يرجى ملاحظة أنه إذا قمت بتعطيل أو رفض ملفات تعريف الارتباط، فقد تصبح بعض أجزاء موقعنا الإلكتروني غير قابلة للوصول أو لا تعمل بشكل صحيح.",
        "إليك كيفية إدارة ملفات تعريف الارتباط في المتصفحات الشائعة:",
        "أ) Chrome: الإعدادات > الخصوصية والأمان > ملفات تعريف الارتباط وبيانات الموقع الأخرى",
        "ب) Firefox: الخيارات > الخصوصية والأمان > ملفات تعريف الارتباط وبيانات الموقع",
        "ج) Safari: التفضيلات > الخصوصية > ملفات تعريف الارتباط وبيانات الموقع",
        "د) Edge: الإعدادات > ملفات تعريف الارتباط وأذونات الموقع > ملفات تعريف الارتباط وبيانات الموقع",
        "يمكنك أيضًا زيارة www.allaboutcookies.org للحصول على مزيد من المعلومات حول كيفية إدارة وحذف ملفات تعريف الارتباط عبر مختلف المتصفحات والأجهزة."
      ]
    },
    {
      title: "5. Cookie Preferences",
      titleAr: "٥. تفضيلات ملفات تعريف الارتباط",
      content: [
        "When you first visit our website, you will be presented with a cookie banner that allows you to accept or decline non-essential cookies. You can change your cookie preferences at any time by clicking on the 'Cookie Settings' link in the footer of our website.",
        "Please note that essential cookies cannot be disabled as they are necessary for the functioning of our website."
      ],
      contentAr: [
        "عند زيارة موقعنا الإلكتروني لأول مرة، سيتم عرض شعار ملفات تعريف الارتباط الذي يسمح لك بقبول أو رفض ملفات تعريف الارتباط غير الأساسية. يمكنك تغيير تفضيلات ملفات تعريف الارتباط في أي وقت بالنقر على رابط 'إعدادات ملفات تعريف الارتباط' في تذييل موقعنا الإلكتروني.",
        "يرجى ملاحظة أنه لا يمكن تعطيل ملفات تعريف الارتباط الأساسية لأنها ضرورية لعمل موقعنا الإلكتروني."
      ]
    },
    {
      title: "6. Changes to This Cookie Policy",
      titleAr: "٦. التغييرات على سياسة ملفات تعريف الارتباط هذه",
      content: [
        "We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page, and if the changes are significant, we will provide a more prominent notice.",
        "We encourage you to periodically review this Cookie Policy to stay informed about our use of cookies."
      ],
      contentAr: [
        "قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر لتعكس التغييرات في التكنولوجيا أو اللوائح أو ممارسات أعمالنا. سيتم نشر أي تغييرات على هذه الصفحة، وإذا كانت التغييرات كبيرة، فسنقدم إشعارًا أكثر بروزًا.",
        "نشجعك على مراجعة سياسة ملفات تعريف الارتباط هذه بشكل دوري للبقاء على اطلاع حول استخدامنا لملفات تعريف الارتباط."
      ]
    },
    {
      title: "7. Contact Us",
      titleAr: "٧. اتصل بنا",
      content: [
        "If you have any questions or concerns about this Cookie Policy or our use of cookies, please contact us at:",
        "Email: privacy@gosafrat.com",
        "Phone: +971 4 123 4567",
        "Mailing Address: GoSafrat (Safrat Travel Solutions LLC), Level 14, Boulevard Plaza Tower 1, Downtown Dubai, United Arab Emirates"
      ],
      contentAr: [
        "إذا كان لديك أي أسئلة أو استفسارات حول سياسة ملفات تعريف الارتباط هذه أو استخدامنا لملفات تعريف الارتباط، فيرجى الاتصال بنا على:",
        "البريد الإلكتروني: privacy@gosafrat.com",
        "الهاتف: +971 4 123 4567",
        "العنوان البريدي: جوسفرات (شركة سفرات لحلول السفر ذ.م.م)، المستوى 14، بوليفارد بلازا تاور 1، وسط دبي، الإمارات العربية المتحدة"
      ]
    }
  ];
  
  const cookieFAQs = [
    {
      question: "What happens if I disable cookies?",
      questionAr: "ماذا يحدث إذا قمت بتعطيل ملفات تعريف الارتباط؟",
      answer: "If you disable all cookies, you may not be able to use certain features of our website, such as logging into your account or making bookings. Essential cookies will still function as they are necessary for the website to work properly.",
      answerAr: "إذا قمت بتعطيل جميع ملفات تعريف الارتباط، فقد لا تتمكن من استخدام ميزات معينة من موقعنا الإلكتروني، مثل تسجيل الدخول إلى حسابك أو إجراء الحجوزات. ستظل ملفات تعريف الارتباط الأساسية تعمل لأنها ضرورية لعمل الموقع بشكل صحيح."
    },
    {
      question: "Do you use cookies to track my location?",
      questionAr: "هل تستخدم ملفات تعريف الارتباط لتتبع موقعي؟",
      answer: "We may collect general location information (such as country or city) through IP addresses to provide local services and comply with regional regulations. However, we do not track your precise location unless you explicitly grant permission.",
      answerAr: "قد نجمع معلومات عامة عن الموقع (مثل البلد أو المدينة) من خلال عناوين IP لتقديم خدمات محلية والامتثال للوائح الإقليمية. ومع ذلك، فإننا لا نتتبع موقعك الدقيق ما لم تمنح إذنًا صريحًا."
    },
    {
      question: "How long do cookies stay on my device?",
      questionAr: "كم من الوقت تبقى ملفات تعريف الارتباط على جهازي؟",
      answer: "The length of time a cookie stays on your device depends on its type. Session cookies are temporary and are deleted when you close your browser. Persistent cookies remain on your device until they expire or you delete them, which can range from a few days to several years depending on their purpose.",
      answerAr: "تعتمد مدة بقاء ملف تعريف الارتباط على جهازك على نوعه. ملفات تعريف الارتباط للجلسة مؤقتة ويتم حذفها عند إغلاق المتصفح. تبقى ملفات تعريف الارتباط الدائمة على جهازك حتى تنتهي صلاحيتها أو تقوم بحذفها، والتي يمكن أن تتراوح من بضعة أيام إلى عدة سنوات حسب الغرض منها."
    },
    {
      question: "Can cookies contain viruses or malware?",
      questionAr: "هل يمكن أن تحتوي ملفات تعريف الارتباط على فيروسات أو برامج ضارة؟",
      answer: "No, cookies are simply text files and cannot contain viruses or malware. They are not executable programs and cannot install anything on your device. However, malicious websites could potentially use the information stored in cookies for harmful purposes, which is why it's important to only visit trusted websites.",
      answerAr: "لا، ملفات تعريف الارتباط هي مجرد ملفات نصية ولا يمكن أن تحتوي على فيروسات أو برامج ضارة. إنها ليست برامج قابلة للتنفيذ ولا يمكنها تثبيت أي شيء على جهازك. ومع ذلك، يمكن للمواقع الخبيثة أن تستخدم المعلومات المخزنة في ملفات تعريف الارتباط لأغراض ضارة، ولهذا السبب من المهم زيارة المواقع الموثوقة فقط."
    },
    {
      question: "Do you sell data collected through cookies?",
      questionAr: "هل تبيع البيانات التي تم جمعها من خلال ملفات تعريف الارتباط؟",
      answer: "No, we do not sell data collected through cookies to third parties. We use the information gathered through cookies to improve our services, personalize your experience, and provide relevant content and advertisements. For more information about how we use your data, please refer to our Privacy Policy.",
      answerAr: "لا، نحن لا نبيع البيانات التي تم جمعها من خلال ملفات تعريف الارتباط لأطراف ثالثة. نستخدم المعلومات التي تم جمعها من خلال ملفات تعريف الارتباط لتحسين خدماتنا، وتخصيص تجربتك، وتقديم محتوى وإعلانات ذات صلة. لمزيد من المعلومات حول كيفية استخدامنا لبياناتك، يرجى الرجوع إلى سياسة الخصوصية الخاصة بنا."
    }
  ];
  
  const cookieTypes = [
    {
      type: "Essential",
      typeAr: "أساسية",
      description: "Required for basic site functionality. Cannot be disabled.",
      descriptionAr: "مطلوبة للوظائف الأساسية للموقع. لا يمكن تعطيلها.",
      examples: ["Session cookies", "Authentication cookies", "Security cookies"],
      examplesAr: ["ملفات تعريف ارتباط الجلسة", "ملفات تعريف ارتباط المصادقة", "ملفات تعريف ارتباط الأمان"],
      canDisable: false
    },
    {
      type: "Analytics",
      typeAr: "تحليلية",
      description: "Help us understand how visitors interact with our website.",
      descriptionAr: "تساعدنا على فهم كيفية تفاعل الزوار مع موقعنا الإلكتروني.",
      examples: ["Google Analytics", "Usage statistics", "Performance tracking"],
      examplesAr: ["Google Analytics", "إحصائيات الاستخدام", "تتبع الأداء"],
      canDisable: true
    },
    {
      type: "Functional",
      typeAr: "وظيفية",
      description: "Enable enhanced functionality and personalization.",
      descriptionAr: "تمكين الوظائف المحسنة والتخصيص.",
      examples: ["Language preferences", "Location preferences", "Recently viewed items"],
      examplesAr: ["تفضيلات اللغة", "تفضيلات الموقع", "العناصر التي تمت مشاهدتها مؤخرًا"],
      canDisable: true
    },
    {
      type: "Targeting/Advertising",
      typeAr: "استهداف/إعلان",
      description: "Used to display relevant advertisements on our site and others.",
      descriptionAr: "تستخدم لعرض الإعلانات ذات الصلة على موقعنا ومواقع أخرى.",
      examples: ["Ad network cookies", "Social media cookies", "Remarketing cookies"],
      examplesAr: ["ملفات تعريف ارتباط شبكة الإعلانات", "ملفات تعريف ارتباط وسائل التواصل الاجتماعي", "ملفات تعريف ارتباط إعادة التسويق"],
      canDisable: true
    }
  ];

  return (
    <PageLayout 
      title="Cookie Policy" 
      titleAr="سياسة ملفات تعريف الارتباط"
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
                {t("Cookie Policy Overview", "نظرة عامة على سياسة ملفات تعريف الارتباط")}
              </h2>
              
              <p className={`text-gray-700 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t(
                  "This Cookie Policy explains how GoSafrat uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.",
                  "توضح سياسة ملفات تعريف الارتباط هذه كيف تستخدم جوسفرات ملفات تعريف الارتباط والتقنيات المماثلة للتعرف عليك عند زيارة موقعنا الإلكتروني. إنها توضح ماهية هذه التقنيات ولماذا نستخدمها، بالإضافة إلى حقوقك في التحكم في استخدامنا لها."
                )}
              </p>
              
              <div className={`p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <AlertCircle className={`h-6 w-6 text-blue-600 flex-shrink-0 ${language === 'ar' ? 'mt-1' : 'mt-1'}`} />
                <div>
                  <p className={`text-sm text-blue-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t(
                      "By continuing to use our website, you agree to our use of cookies as described in this policy. You can manage your cookie preferences through your browser settings or our cookie consent tool.",
                      "من خلال الاستمرار في استخدام موقعنا الإلكتروني، فإنك توافق على استخدامنا لملفات تعريف الارتباط كما هو موضح في هذه السياسة. يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك أو أداة موافقة ملفات تعريف الارتباط لدينا."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {cookieTypes.map((cookieType, index) => (
              <Card key={index} className={cookieType.canDisable ? "" : "border-blue-200"}>
                <CardContent className="p-6">
                  <div className={`flex items-center justify-between mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex items-center gap-2">
                      <Cookie className="h-5 w-5 text-blue-600" />
                      <h3 className={`font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(cookieType.type, cookieType.typeAr)}
                      </h3>
                    </div>
                    {cookieType.canDisable ? (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  
                  <p className={`text-sm text-gray-600 mb-3 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                    {t(cookieType.description, cookieType.descriptionAr)}
                  </p>
                  
                  <div className={`${language === 'ar' ? 'text-right' : ''}`}>
                    <p className={`text-xs text-gray-500 font-medium mb-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Examples:", "أمثلة:")}
                    </p>
                    <ul className={`text-xs text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {cookieType.examples.map((example, i) => (
                        <li key={i}>• {t(example, cookieType.examplesAr[i])}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {t("Manage Cookie Preferences", "إدارة تفضيلات ملفات تعريف الارتباط")}
            </Button>
          </div>
        </div>
        
        <div className="space-y-10 mb-12">
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
        
        <div className="mb-12">
          <h2 className={`text-xl font-bold mb-6 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Frequently Asked Questions", "الأسئلة المتكررة")}
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            {cookieFAQs.map((faq, index) => (
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
        
        <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-6 flex-col md:flex-row">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <Cookie className="h-10 w-10 text-blue-600" />
          </div>
          
          <div className={`${language === 'ar' ? 'text-right' : ''}`}>
            <h3 className={`text-lg font-bold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Still Have Questions?", "هل لا تزال لديك أسئلة؟")}
            </h3>
            <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t(
                "If you have any questions about our Cookie Policy or how we use cookies, please contact our privacy team at privacy@gosafrat.com.",
                "إذا كان لديك أي أسئلة حول سياسة ملفات تعريف الارتباط الخاصة بنا أو كيفية استخدامنا لملفات تعريف الارتباط، فيرجى الاتصال بفريق الخصوصية لدينا على privacy@gosafrat.com."
              )}
            </p>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <a href="/legal/privacy">
                  {t("Privacy Policy", "سياسة الخصوصية")}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/legal/terms">
                  {t("Terms & Conditions", "الشروط والأحكام")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}