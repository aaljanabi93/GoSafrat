import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsAndConditionsPage() {
  const { language, t } = useLanguage();
  
  const lastUpdated = "April 5, 2025";
  const lastUpdatedAr = "٥ أبريل ٢٠٢٥";
  
  const sections = [
    {
      title: "1. Introduction",
      titleAr: "١. المقدمة",
      content: [
        "These Terms and Conditions ('Terms') govern your use of the GoSafrat website and mobile application ('the Platform'), including any content, functionality, and services offered on or through the Platform.",
        "By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Platform.",
        "GoSafrat is operated by Safrat Travel Solutions LLC, registered in the United Arab Emirates with company registration number XXXXXXXX."
      ],
      contentAr: [
        "تحكم هذه الشروط والأحكام ('الشروط') استخدامك لموقع جوسفرات الإلكتروني وتطبيق الهاتف المحمول ('المنصة')، بما في ذلك أي محتوى أو وظائف أو خدمات مقدمة على المنصة أو من خلالها.",
        "من خلال الوصول إلى المنصة أو استخدامها، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على هذه الشروط، فيجب عليك عدم الوصول إلى المنصة أو استخدامها.",
        "تدار جوسفرات بواسطة شركة سفرات لحلول السفر ذ.م.م، المسجلة في الإمارات العربية المتحدة برقم تسجيل الشركة XXXXXXXX."
      ]
    },
    {
      title: "2. User Accounts",
      titleAr: "٢. حسابات المستخدمين",
      content: [
        "You may need to create an account to use certain features of the Platform. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
        "You must provide accurate, current, and complete information during the registration process and keep your account information updated.",
        "You agree to notify us immediately of any unauthorized access to or use of your username or password or any other breach of security.",
        "We reserve the right to disable any user account at any time, at our sole discretion, if we believe you have violated any provision of these Terms."
      ],
      contentAr: [
        "قد تحتاج إلى إنشاء حساب لاستخدام ميزات معينة في المنصة. أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك وعن جميع الأنشطة التي تحدث تحت حسابك.",
        "يجب عليك تقديم معلومات دقيقة وحديثة وكاملة أثناء عملية التسجيل والحفاظ على تحديث معلومات حسابك.",
        "أنت توافق على إخطارنا فورًا بأي وصول غير مصرح به أو استخدام لاسم المستخدم أو كلمة المرور الخاصة بك أو أي خرق آخر للأمان.",
        "نحتفظ بالحق في تعطيل أي حساب مستخدم في أي وقت، وفقًا لتقديرنا الخاص، إذا اعتقدنا أنك انتهكت أي بند من هذه الشروط."
      ]
    },
    {
      title: "3. Booking and Payment Terms",
      titleAr: "٣. شروط الحجز والدفع",
      content: [
        "The Platform provides a service that allows you to search for, compare, and book travel services offered by third-party suppliers such as airlines, hotels, and car rental companies ('Service Providers').",
        "By making a booking through our Platform, you enter into a direct contractual relationship with the Service Provider. GoSafrat acts solely as an intermediary between you and the Service Provider.",
        "All prices displayed on the Platform are inclusive of applicable taxes and fees unless otherwise stated. Additional charges, such as baggage fees, hotel amenities, or insurance, may apply and will be clearly disclosed before you complete your booking.",
        "Payment for bookings must be made at the time of reservation using one of our accepted payment methods. Your booking is not confirmed until payment is successfully processed and you receive a confirmation email.",
        "By providing your payment information, you represent and warrant that you have the legal right to use the payment method provided and that the information you supply is true, correct, and complete."
      ],
      contentAr: [
        "توفر المنصة خدمة تتيح لك البحث عن خدمات السفر التي تقدمها الجهات الخارجية مثل شركات الطيران والفنادق وشركات تأجير السيارات ('مزودي الخدمة') ومقارنتها وحجزها.",
        "من خلال إجراء حجز عبر منصتنا، فإنك تدخل في علاقة تعاقدية مباشرة مع مزود الخدمة. تعمل جوسفرات فقط كوسيط بينك وبين مزود الخدمة.",
        "جميع الأسعار المعروضة على المنصة شاملة للضرائب والرسوم المطبقة ما لم يُذكر خلاف ذلك. قد تنطبق رسوم إضافية، مثل رسوم الأمتعة أو مرافق الفندق أو التأمين، وسيتم الكشف عنها بوضوح قبل إكمال الحجز.",
        "يجب أن يتم الدفع مقابل الحجوزات في وقت الحجز باستخدام إحدى طرق الدفع المقبولة لدينا. لا يتم تأكيد حجزك حتى تتم معالجة الدفع بنجاح وتتلقى رسالة تأكيد بالبريد الإلكتروني.",
        "من خلال تقديم معلومات الدفع الخاصة بك، فإنك تقر وتضمن أن لديك الحق القانوني في استخدام طريقة الدفع المقدمة وأن المعلومات التي تقدمها صحيحة ودقيقة وكاملة."
      ]
    },
    {
      title: "4. Cancellation and Refund Policy",
      titleAr: "٤. سياسة الإلغاء والاسترداد",
      content: [
        "Cancellation and refund policies vary depending on the terms set by each Service Provider. The specific cancellation policy applicable to your booking will be displayed before you complete your purchase.",
        "To cancel a booking, you must follow the cancellation process provided on the Platform or contact our customer service team. Cancellation fees may apply as per the Service Provider's terms.",
        "Refunds, when applicable, will be processed back to the original payment method used for the booking. The time required for the refund to appear in your account depends on your financial institution and may take up to 30 days.",
        "In case of flight cancellations or significant schedule changes by the airline, refund policies will be governed by the airline's conditions of carriage and applicable aviation regulations."
      ],
      contentAr: [
        "تختلف سياسات الإلغاء واسترداد الأموال حسب الشروط التي يحددها كل مزود خدمة. سيتم عرض سياسة الإلغاء المحددة المطبقة على حجزك قبل إكمال عملية الشراء.",
        "لإلغاء الحجز، يجب عليك اتباع عملية الإلغاء المقدمة على المنصة أو الاتصال بفريق خدمة العملاء لدينا. قد تنطبق رسوم الإلغاء وفقًا لشروط مزود الخدمة.",
        "ستتم معالجة المبالغ المستردة، عندما تكون مطبقة، وإعادتها إلى طريقة الدفع الأصلية المستخدمة للحجز. يعتمد الوقت المطلوب لظهور المبلغ المسترد في حسابك على مؤسستك المالية وقد يستغرق ما يصل إلى 30 يومًا.",
        "في حالة إلغاء الرحلات الجوية أو تغييرات جدول مواعيد كبيرة من قبل شركة الطيران، ستخضع سياسات استرداد الأموال لشروط النقل الخاصة بشركة الطيران واللوائح الجوية المعمول بها."
      ]
    },
    {
      title: "5. Intellectual Property Rights",
      titleAr: "٥. حقوق الملكية الفكرية",
      content: [
        "The Platform and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by GoSafrat, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
        "These Terms permit you to use the Platform for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Platform, except as follows:",
        "- Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.",
        "- You may store files that are automatically cached by your Web browser for display enhancement purposes.",
        "- You may print or download one copy of a reasonable number of pages of the Platform for your own personal, non-commercial use and not for further reproduction, publication, or distribution."
      ],
      contentAr: [
        "المنصة وجميع محتوياتها وميزاتها ووظائفها (بما في ذلك على سبيل المثال لا الحصر جميع المعلومات والبرامج والنصوص والعروض والصور والفيديو والصوت وتصميمها واختيارها وترتيبها) مملوكة لـجوسفرات، أو المرخصين لها، أو موفري هذه المواد الآخرين وهي محمية بموجب حقوق النشر الدولية والعلامات التجارية وبراءات الاختراع والأسرار التجارية وغيرها من قوانين الملكية الفكرية أو حقوق الملكية.",
        "تسمح لك هذه الشروط باستخدام المنصة للاستخدام الشخصي غير التجاري فقط. يجب عليك عدم إعادة إنتاج أو توزيع أو تعديل أو إنشاء أعمال مشتقة من أو عرض علني أو أداء علني أو إعادة نشر أو تنزيل أو تخزين أو نقل أي من المواد الموجودة على منصتنا، إلا كما يلي:",
        "- قد يقوم جهاز الكمبيوتر الخاص بك بتخزين نسخ مؤقتة من هذه المواد في ذاكرة الوصول العشوائي (RAM) بشكل عرضي للوصول إلى هذه المواد وعرضها.",
        "- يمكنك تخزين الملفات التي يتم تخزينها مؤقتًا تلقائيًا بواسطة متصفح الويب الخاص بك لأغراض تحسين العرض.",
        "- يمكنك طباعة أو تنزيل نسخة واحدة من عدد معقول من صفحات المنصة لاستخدامك الشخصي غير التجاري وليس لمزيد من النسخ أو النشر أو التوزيع."
      ]
    },
    {
      title: "6. User Content",
      titleAr: "٦. محتوى المستخدم",
      content: [
        "The Platform may contain reviews, ratings, and other user-generated content ('User Content'). By submitting User Content to the Platform, you grant GoSafrat a worldwide, non-exclusive, royalty-free, transferable, and sublicensable right to use, reproduce, modify, distribute, prepare derivative works of, display, and perform your User Content in connection with the Platform and GoSafrat's business operations.",
        "You represent and warrant that you own or control all rights in and to your User Content and have the right to grant the license above. You also represent and warrant that your User Content does not violate any third-party rights, including intellectual property rights and privacy rights, and complies with all applicable laws and the terms of these Terms.",
        "We have the right, but not the obligation, to monitor, edit, or remove any User Content at our sole discretion, including if we determine that such User Content violates these Terms or may harm our reputation or the reputation of our Service Providers."
      ],
      contentAr: [
        "قد تحتوي المنصة على مراجعات وتقييمات ومحتوى آخر ينشئه المستخدم ('محتوى المستخدم'). من خلال تقديم محتوى المستخدم إلى المنصة، فإنك تمنح جوسفرات حقًا عالميًا وغير حصري وبدون إتاوات وقابل للتحويل وقابل للترخيص من الباطن لاستخدام محتوى المستخدم الخاص بك وإعادة إنتاجه وتعديله وتوزيعه وإعداد أعمال مشتقة منه وعرضه وأدائه فيما يتعلق بالمنصة وعمليات أعمال جوسفرات.",
        "أنت تقر وتضمن أنك تمتلك أو تسيطر على جميع الحقوق في محتوى المستخدم الخاص بك ولديك الحق في منح الترخيص أعلاه. كما تقر وتضمن أن محتوى المستخدم الخاص بك لا ينتهك أي حقوق لطرف ثالث، بما في ذلك حقوق الملكية الفكرية وحقوق الخصوصية، ويتوافق مع جميع القوانين المعمول بها وشروط هذه الشروط.",
        "لدينا الحق، ولكن ليس الالتزام، بمراقبة أو تحرير أو إزالة أي محتوى للمستخدم وفقًا لتقديرنا الخاص، بما في ذلك إذا قررنا أن محتوى المستخدم هذا ينتهك هذه الشروط أو قد يضر بسمعتنا أو سمعة مزودي الخدمة لدينا."
      ]
    },
    {
      title: "7. Limitation of Liability",
      titleAr: "٧. تحديد المسؤولية",
      content: [
        "To the fullest extent permitted by applicable law, GoSafrat and its officers, directors, employees, agents, subsidiaries, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, loss of data, and whether caused by tort (including negligence), breach of contract, or otherwise, even if foreseeable.",
        "The foregoing limitations will apply whether such damages arise out of breach of contract, tort (including negligence), or otherwise and regardless of whether such damages were foreseeable or GoSafrat was advised of the possibility of such damages.",
        "In no event shall GoSafrat's total liability to you for all claims, damages, losses, and causes of action (whether in contract, tort (including negligence), or otherwise) exceed the amount paid by you, if any, for accessing this Platform during the 12 months immediately preceding the date of your claim or one hundred dollars ($100), whichever is greater."
      ],
      contentAr: [
        "إلى أقصى حد يسمح به القانون المعمول به، لن تكون جوسفرات ومسؤوليها ومديريها وموظفيها ووكلائها والشركات التابعة لها والمنتسبة إليها مسؤولين عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، بما في ذلك على سبيل المثال لا الحصر، الإصابة الشخصية أو الألم والمعاناة أو الضيق العاطفي أو فقدان الإيرادات أو فقدان الأرباح أو فقدان العمل أو الادخار المتوقع أو فقدان الاستخدام أو فقدان السمعة الطيبة أو فقدان البيانات، وسواء كان ذلك ناتجًا عن ضرر (بما في ذلك الإهمال) أو خرق العقد أو غير ذلك، حتى إذا كان متوقعًا.",
        "ستنطبق القيود السابقة سواء نشأت هذه الأضرار عن خرق العقد أو الضرر (بما في ذلك الإهمال) أو غير ذلك وبغض النظر عما إذا كانت هذه الأضرار متوقعة أو تم إخطار جوسفرات باحتمال حدوث مثل هذه الأضرار.",
        "لن تتجاوز المسؤولية الإجمالية لـجوسفرات تجاهك عن جميع المطالبات والأضرار والخسائر وأسباب الدعوى (سواء في العقد أو الضرر (بما في ذلك الإهمال) أو غير ذلك) المبلغ الذي دفعته، إن وجد، للوصول إلى هذه المنصة خلال الـ 12 شهرًا السابقة مباشرة لتاريخ مطالبتك أو مائة دولار (100 دولار)، أيهما أكبر."
      ]
    },
    {
      title: "8. Indemnification",
      titleAr: "٨. التعويض",
      content: [
        "You agree to defend, indemnify, and hold harmless GoSafrat, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Platform, including, but not limited to, your User Content, any use of the Platform's content, services, and products other than as expressly authorized in these Terms."
      ],
      contentAr: [
        "أنت توافق على الدفاع عن جوسفرات والشركات التابعة لها والمرخصين ومقدمي الخدمات لها، ومسؤوليها ومديريها وموظفيها ومقاوليها ووكلائها والمرخصين والموردين والخلفاء والمتنازل لهم، وتعويضهم وإبراء ذمتهم من وضد أي مطالبات أو مسؤوليات أو أضرار أو أحكام أو جوائز أو خسائر أو تكاليف أو نفقات أو رسوم (بما في ذلك أتعاب المحاماة المعقولة) الناشئة عن أو المتعلقة بانتهاكك لهذه الشروط أو استخدامك للمنصة، بما في ذلك، على سبيل المثال لا الحصر، محتوى المستخدم الخاص بك، وأي استخدام لمحتوى المنصة وخدماتها ومنتجاتها بخلاف ما هو مصرح به صراحة في هذه الشروط."
      ]
    },
    {
      title: "9. Governing Law and Dispute Resolution",
      titleAr: "٩. القانون الحاكم وتسوية المنازعات",
      content: [
        "These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, without giving effect to any choice or conflict of law provision or rule.",
        "Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Platform shall be instituted exclusively in the courts of Dubai, United Arab Emirates. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.",
        "Any dispute arising out of or in connection with these Terms, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by arbitration under the Arbitration Rules of the Dubai International Arbitration Centre, which Rules are deemed to be incorporated by reference into this clause."
      ],
      contentAr: [
        "تخضع هذه الشروط وتفسر وفقًا لقوانين دولة الإمارات العربية المتحدة، دون تنفيذ أي اختيار أو تعارض في أحكام أو قواعد القانون.",
        "يجب رفع أي دعوى قانونية أو إجراء أو دعوى ناشئة عن هذه الشروط أو المنصة أو متعلقة بها حصريًا في محاكم دبي، الإمارات العربية المتحدة. أنت تتنازل عن أي وجميع الاعتراضات على ممارسة الاختصاص القضائي عليك من قبل هذه المحاكم وعلى مكان الانعقاد في هذه المحاكم.",
        "أي نزاع ينشأ عن أو فيما يتعلق بهذه الشروط، بما في ذلك أي سؤال يتعلق بوجودها أو صحتها أو إنهائها، يتم إحالته ويحل نهائيًا بواسطة التحكيم بموجب قواعد التحكيم الخاصة بمركز دبي للتحكيم الدولي، والتي تعتبر القواعد مدمجة بالإشارة إلى هذا البند."
      ]
    },
    {
      title: "10. Changes to Terms",
      titleAr: "١٠. التغييرات في الشروط",
      content: [
        "We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when we post them.",
        "Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you."
      ],
      contentAr: [
        "يجوز لنا مراجعة وتحديث هذه الشروط من وقت لآخر وفقًا لتقديرنا الخاص. جميع التغييرات سارية المفعول فورًا عندما ننشرها.",
        "استمرار استخدامك للمنصة بعد نشر الشروط المعدلة يعني أنك تقبل وتوافق على التغييرات. من المتوقع أن تتحقق من هذه الصفحة بشكل متكرر حتى تكون على علم بأي تغييرات، لأنها ملزمة لك."
      ]
    },
    {
      title: "11. Contact Information",
      titleAr: "١١. معلومات الاتصال",
      content: [
        "Questions or comments about the Platform or these Terms may be directed to our customer service team at:",
        "Email: legal@gosafrat.com",
        "Phone: +971 4 123 4567",
        "Mailing Address: GoSafrat (Safrat Travel Solutions LLC), Level 14, Boulevard Plaza Tower 1, Downtown Dubai, United Arab Emirates"
      ],
      contentAr: [
        "يمكن توجيه الأسئلة أو التعليقات حول المنصة أو هذه الشروط إلى فريق خدمة العملاء لدينا على:",
        "البريد الإلكتروني: legal@gosafrat.com",
        "الهاتف: +971 4 123 4567",
        "العنوان البريدي: جوسفرات (شركة سفرات لحلول السفر ذ.م.م)، المستوى 14، بوليفارد بلازا تاور 1، وسط دبي، الإمارات العربية المتحدة"
      ]
    }
  ];

  return (
    <PageLayout 
      title="Terms and Conditions" 
      titleAr="الشروط والأحكام"
    >
      <div className="max-w-4xl mx-auto">
        <div className={`mb-8 ${language === 'ar' ? 'text-right' : ''}`}>
          <p className={`text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t(`Last Updated: ${lastUpdated}`, `آخر تحديث: ${lastUpdatedAr}`)}
          </p>
        </div>
        
        <Card className="mb-10">
          <CardContent className="pt-6">
            <div className={`text-gray-700 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
              <p className="mb-4">
                {t(
                  "Please read these Terms and Conditions carefully before using our website and services. By accessing or using GoSafrat, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.",
                  "يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام موقعنا الإلكتروني وخدماتنا. من خلال الوصول إلى جوسفرات أو استخدامها، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك استخدام خدماتنا."
                )}
              </p>
            </div>
          </CardContent>
        </Card>
        
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
        
        <div className={`mt-12 p-6 bg-gray-50 rounded-lg ${language === 'ar' ? 'text-right' : ''}`}>
          <h3 className={`text-lg font-semibold mb-3 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Acceptance of Terms", "قبول الشروط")}
          </h3>
          <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t(
              "By using the GoSafrat platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
              "باستخدام منصة جوسفرات، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، فالرجاء عدم استخدام خدماتنا."
            )}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}