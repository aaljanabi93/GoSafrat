import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, CheckCircle, Plane, Building, Car, Clock, ArrowRight, Calendar } from "lucide-react";

export default function CancellationPage() {
  const { language, t } = useLanguage();
  
  const flightCancellationPolicies = [
    {
      type: "Economy Basic",
      typeAr: "الاقتصادية الأساسية",
      rules: [
        {
          timeframe: "Within 24 hours of booking (7+ days before departure)",
          timeframeAr: "خلال 24 ساعة من الحجز (قبل 7+ أيام من المغادرة)",
          fee: "No fee",
          feeAr: "بدون رسوم"
        },
        {
          timeframe: "More than 72 hours before departure",
          timeframeAr: "أكثر من 72 ساعة قبل المغادرة",
          fee: "USD 100 or 25% of fare (whichever is higher)",
          feeAr: "100 دولار أمريكي أو 25٪ من الأجرة (أيهما أعلى)"
        },
        {
          timeframe: "Less than 72 hours before departure",
          timeframeAr: "أقل من 72 ساعة قبل المغادرة",
          fee: "Non-refundable",
          feeAr: "غير قابلة للاسترداد"
        }
      ]
    },
    {
      type: "Economy Flex",
      typeAr: "الاقتصادية المرنة",
      rules: [
        {
          timeframe: "More than 24 hours before departure",
          timeframeAr: "أكثر من 24 ساعة قبل المغادرة",
          fee: "USD 50 or 10% of fare (whichever is higher)",
          feeAr: "50 دولار أمريكي أو 10٪ من الأجرة (أيهما أعلى)"
        },
        {
          timeframe: "Less than 24 hours before departure",
          timeframeAr: "أقل من 24 ساعة قبل المغادرة",
          fee: "USD 100 or 25% of fare (whichever is higher)",
          feeAr: "100 دولار أمريكي أو 25٪ من الأجرة (أيهما أعلى)"
        }
      ]
    },
    {
      type: "Business & First Class",
      typeAr: "درجة رجال الأعمال والدرجة الأولى",
      rules: [
        {
          timeframe: "More than 72 hours before departure",
          timeframeAr: "أكثر من 72 ساعة قبل المغادرة",
          fee: "USD 150 or 10% of fare (whichever is higher)",
          feeAr: "150 دولار أمريكي أو 10٪ من الأجرة (أيهما أعلى)"
        },
        {
          timeframe: "Less than 72 hours before departure",
          timeframeAr: "أقل من 72 ساعة قبل المغادرة",
          fee: "USD 300 or 20% of fare (whichever is higher)",
          feeAr: "300 دولار أمريكي أو 20٪ من الأجرة (أيهما أعلى)"
        }
      ]
    }
  ];
  
  const hotelCancellationPolicies = [
    {
      type: "Free Cancellation",
      typeAr: "إلغاء مجاني",
      description: "Full refund if cancelled before the specified deadline (typically 24-48 hours before check-in).",
      descriptionAr: "استرداد كامل في حالة الإلغاء قبل الموعد النهائي المحدد (عادة 24-48 ساعة قبل تسجيل الوصول)."
    },
    {
      type: "Partial Refund",
      typeAr: "استرداد جزئي",
      description: "Partial refund if cancelled within the specified timeframe, typically 50-75% of the total booking amount.",
      descriptionAr: "استرداد جزئي في حالة الإلغاء ضمن الإطار الزمني المحدد، عادة 50-75٪ من إجمالي مبلغ الحجز."
    },
    {
      type: "Non-Refundable",
      typeAr: "غير قابل للاسترداد",
      description: "No refund available. These rates are typically discounted compared to refundable options.",
      descriptionAr: "لا يوجد استرداد متاح. هذه الأسعار عادة ما تكون مخفضة مقارنة بالخيارات القابلة للاسترداد."
    },
    {
      type: "Pay at Property",
      typeAr: "الدفع في العقار",
      description: "Most 'Pay at Property' bookings can be cancelled without any fee until the day of arrival, unless otherwise specified.",
      descriptionAr: "يمكن إلغاء معظم حجوزات 'الدفع في العقار' بدون أي رسوم حتى يوم الوصول، ما لم يتم تحديد خلاف ذلك."
    }
  ];
  
  const carRentalCancellationPolicies = [
    {
      type: "Free Cancellation",
      typeAr: "إلغاء مجاني",
      description: "Cancel up to 48 hours before pickup for a full refund.",
      descriptionAr: "إلغاء قبل 48 ساعة من الاستلام للحصول على استرداد كامل."
    },
    {
      type: "Pay Now",
      typeAr: "ادفع الآن",
      description: "Cancel up to 72 hours before pickup for a full refund. Cancellations within 72 hours may incur a fee of one day's rental.",
      descriptionAr: "إلغاء قبل 72 ساعة من الاستلام للحصول على استرداد كامل. قد تتحمل رسومًا تعادل إيجار يوم واحد في حالة الإلغاء في غضون 72 ساعة."
    },
    {
      type: "Pay at Pickup",
      typeAr: "الدفع عند الاستلام",
      description: "Most 'Pay at Pickup' reservations can be cancelled without penalty up to 24 hours before pickup.",
      descriptionAr: "يمكن إلغاء معظم حجوزات 'الدفع عند الاستلام' بدون غرامة حتى 24 ساعة قبل الاستلام."
    },
    {
      type: "Special Offers",
      typeAr: "عروض خاصة",
      description: "Special offers and discounted rates may have stricter cancellation policies. Please check the specific terms at the time of booking.",
      descriptionAr: "قد يكون للعروض الخاصة والأسعار المخفضة سياسات إلغاء أكثر صرامة. يرجى التحقق من الشروط المحددة وقت الحجز."
    }
  ];
  
  const cancellationFAQs = [
    {
      question: "How do I cancel my booking?",
      questionAr: "كيف يمكنني إلغاء حجزي؟",
      answer: "You can cancel your booking by logging into your GoSafrat account, navigating to 'My Bookings', selecting the booking you wish to cancel, and following the cancellation instructions. Alternatively, you can contact our customer support team for assistance.",
      answerAr: "يمكنك إلغاء حجزك عن طريق تسجيل الدخول إلى حساب جوسفرات الخاص بك، والانتقال إلى 'حجوزاتي'، وتحديد الحجز الذي ترغب في إلغائه، واتباع تعليمات الإلغاء. بدلاً من ذلك، يمكنك الاتصال بفريق دعم العملاء لدينا للحصول على المساعدة."
    },
    {
      question: "How long does it take to process my refund?",
      questionAr: "كم من الوقت يستغرق معالجة استردادي؟",
      answer: "Refund processing times vary depending on your payment method and the policies of your bank or credit card company. Typically, refunds are processed within 5-10 business days after approval. Some financial institutions may take up to 30 days to reflect the refund in your account.",
      answerAr: "تختلف أوقات معالجة الاسترداد حسب طريقة الدفع الخاصة بك وسياسات البنك أو شركة بطاقة الائتمان. عادةً، تتم معالجة المبالغ المستردة في غضون 5-10 أيام عمل بعد الموافقة. قد تستغرق بعض المؤسسات المالية ما يصل إلى 30 يومًا لتعكس الاسترداد في حسابك."
    },
    {
      question: "What if I need to cancel due to an emergency or illness?",
      questionAr: "ماذا لو اضطررت إلى الإلغاء بسبب حالة طارئة أو مرض؟",
      answer: "While standard cancellation policies still apply, we recommend purchasing travel insurance to cover unexpected emergencies or illnesses. In special circumstances, you can submit a request with supporting documentation (such as medical certificates) to our customer service team, who will review your case and may offer more flexible cancellation terms at their discretion.",
      answerAr: "في حين أن سياسات الإلغاء القياسية لا تزال تنطبق، نوصي بشراء تأمين السفر لتغطية حالات الطوارئ أو الأمراض غير المتوقعة. في ظروف خاصة، يمكنك تقديم طلب مع المستندات الداعمة (مثل الشهادات الطبية) إلى فريق خدمة العملاء لدينا، الذي سيراجع حالتك وقد يقدم شروط إلغاء أكثر مرونة وفقًا لتقديرهم."
    },
    {
      question: "Can I modify my booking instead of cancelling it?",
      questionAr: "هل يمكنني تعديل حجزي بدلاً من إلغائه؟",
      answer: "Yes, for many bookings, you can make modifications instead of cancelling. Log into your account, go to 'My Bookings', select the booking you want to change, and look for the 'Modify Booking' option. Changes such as dates, passenger names, or seat selections may incur change fees, which are typically lower than cancellation fees.",
      answerAr: "نعم، بالنسبة للعديد من الحجوزات، يمكنك إجراء تعديلات بدلاً من الإلغاء. قم بتسجيل الدخول إلى حسابك، انتقل إلى 'حجوزاتي'، حدد الحجز الذي تريد تغييره، وابحث عن خيار 'تعديل الحجز'. قد تتحمل التغييرات مثل التواريخ أو أسماء الركاب أو اختيارات المقاعد رسوم تغيير، والتي عادة ما تكون أقل من رسوم الإلغاء."
    },
    {
      question: "What if the airline/hotel/car rental company changes or cancels my booking?",
      questionAr: "ماذا لو قامت شركة الطيران/الفندق/تأجير السيارات بتغيير أو إلغاء حجزي؟",
      answer: "If the service provider cancels or makes significant changes to your booking, you are typically entitled to a full refund or alternative arrangements at no additional cost. We will notify you of any changes and assist you with your options. For minor changes (such as slight schedule adjustments), normal modification policies may apply.",
      answerAr: "إذا قام مزود الخدمة بإلغاء حجزك أو إجراء تغييرات كبيرة عليه، فأنت عادةً ما تكون مؤهلاً للحصول على استرداد كامل أو ترتيبات بديلة دون أي تكلفة إضافية. سنخطرك بأي تغييرات ونساعدك في خياراتك. بالنسبة للتغييرات الطفيفة (مثل تعديلات الجدول الزمني الطفيفة)، قد تنطبق سياسات التعديل العادية."
    }
  ];

  return (
    <PageLayout 
      title="Cancellation Options" 
      titleAr="خيارات الإلغاء"
      subtitle="Understanding our cancellation policies and refund options"
      subtitleAr="فهم سياسات الإلغاء وخيارات الاسترداد لدينا"
    >
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("Free Cancellation Period", "فترة الإلغاء المجانية")}
              </h3>
              <p className={`text-gray-700 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t(
                  "Most bookings can be cancelled for free within 24 hours of booking if made 7+ days before departure.",
                  "يمكن إلغاء معظم الحجوزات مجانًا في غضون 24 ساعة من الحجز إذا تم إجراؤها قبل 7+ أيام من المغادرة."
                )}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Calendar className="h-10 w-10 text-amber-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("Flexible Options", "خيارات مرنة")}
              </h3>
              <p className={`text-gray-700 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t(
                  "Choose flexible booking options during checkout for more lenient cancellation terms.",
                  "اختر خيارات الحجز المرنة أثناء الدفع للحصول على شروط إلغاء أكثر تساهلاً."
                )}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("Travel Insurance", "تأمين السفر")}
              </h3>
              <p className={`text-gray-700 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t(
                  "Add travel insurance to your booking for coverage against unexpected cancellations.",
                  "أضف تأمين السفر إلى حجزك للتغطية ضد عمليات الإلغاء غير المتوقعة."
                )}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-3xl mx-auto mb-10">
          <div className={`bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h4 className={`font-semibold mb-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("Important Notice", "إشعار مهم")}
              </h4>
              <p className={`text-sm text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t(
                  "Cancellation policies vary based on the specific terms of your booking, the service provider, and the rate type selected. Always check the specific cancellation policy for your booking before making a reservation.",
                  "تختلف سياسات الإلغاء بناءً على الشروط المحددة لحجزك، ومزود الخدمة، ونوع السعر المحدد. تحقق دائمًا من سياسة الإلغاء المحددة لحجزك قبل إجراء الحجز."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Cancellation Policies by Service Type", "سياسات الإلغاء حسب نوع الخدمة")}
        </h2>
        
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 max-w-md mx-auto">
            <TabsTrigger value="flights" className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              <span>{t("Flights", "رحلات الطيران")}</span>
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
          
          <TabsContent value="flights">
            <div className="space-y-6">
              {flightCancellationPolicies.map((policy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className={language === 'ar' ? 'font-cairo text-right' : ''}>
                      {t(policy.type, policy.typeAr)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-t border-gray-200 pt-4">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className={`text-left pb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`}>
                              {t("Timeframe", "الإطار الزمني")}
                            </th>
                            <th className={`text-left pb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`}>
                              {t("Cancellation Fee", "رسوم الإلغاء")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {policy.rules.map((rule, ruleIndex) => (
                            <tr key={ruleIndex} className="border-t border-gray-100">
                              <td className={`py-3 ${language === 'ar' ? 'text-right font-cairo' : ''}`}>
                                {t(rule.timeframe, rule.timeframeAr)}
                              </td>
                              <td className={`py-3 ${language === 'ar' ? 'text-right font-cairo' : ''}`}>
                                {t(rule.fee, rule.feeAr)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                <p>
                  {t(
                    "* Please note that these are general guidelines. Specific airline policies may vary and take precedence. Fare rules are displayed during the booking process.",
                    "* يرجى ملاحظة أن هذه إرشادات عامة. قد تختلف سياسات شركات الطيران المحددة وتأخذ الأسبقية. يتم عرض قواعد الأجرة أثناء عملية الحجز."
                  )}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hotels">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotelCancellationPolicies.map((policy, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className={`text-lg font-semibold mb-3 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                      {t(policy.type, policy.typeAr)}
                    </h3>
                    <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                      {t(policy.description, policy.descriptionAr)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className={`mt-6 text-sm text-gray-600 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
              <p>
                {t(
                  "* Hotel cancellation policies are clearly displayed on the property page and during the booking process. During major events, holidays, or peak travel times, hotels may enforce stricter cancellation policies.",
                  "* يتم عرض سياسات إلغاء الفندق بوضوح في صفحة العقار وأثناء عملية الحجز. خلال الأحداث الكبرى أو العطلات أو أوقات السفر الذروة، قد تفرض الفنادق سياسات إلغاء أكثر صرامة."
                )}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="cars">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carRentalCancellationPolicies.map((policy, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className={`text-lg font-semibold mb-3 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                      {t(policy.type, policy.typeAr)}
                    </h3>
                    <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                      {t(policy.description, policy.descriptionAr)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className={`mt-6 text-sm text-gray-600 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
              <p>
                {t(
                  "* No-show policies: If you fail to pick up your rental car at the scheduled time without notifying the rental company, you may be charged the full rental amount with no refund option.",
                  "* سياسات عدم الحضور: إذا فشلت في استلام سيارتك المستأجرة في الوقت المحدد دون إخطار شركة التأجير، فقد يتم تحصيل كامل مبلغ الإيجار منك بدون خيار استرداد."
                )}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Cancellation Process", "عملية الإلغاء")}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className={`${language === 'ar' ? 'text-right' : ''}`}>
                  <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("How to Cancel Online", "كيفية الإلغاء عبر الإنترنت")}
                  </h3>
                  <ol className={`list-decimal ${language === 'ar' ? 'font-cairo mr-5' : 'ml-5'} space-y-2`}>
                    <li>
                      {t(
                        "Log into your GoSafrat account",
                        "قم بتسجيل الدخول إلى حساب جوسفرات الخاص بك"
                      )}
                    </li>
                    <li>
                      {t(
                        "Navigate to 'My Bookings' in your account dashboard",
                        "انتقل إلى 'حجوزاتي' في لوحة معلومات حسابك"
                      )}
                    </li>
                    <li>
                      {t(
                        "Select the booking you wish to cancel",
                        "حدد الحجز الذي ترغب في إلغائه"
                      )}
                    </li>
                    <li>
                      {t(
                        "Click on the 'Cancel Booking' button",
                        "انقر على زر 'إلغاء الحجز'"
                      )}
                    </li>
                    <li>
                      {t(
                        "Review the cancellation terms and fees",
                        "راجع شروط الإلغاء والرسوم"
                      )}
                    </li>
                    <li>
                      {t(
                        "Confirm your cancellation",
                        "قم بتأكيد الإلغاء الخاص بك"
                      )}
                    </li>
                    <li>
                      {t(
                        "You will receive a cancellation confirmation via email",
                        "ستتلقى تأكيد الإلغاء عبر البريد الإلكتروني"
                      )}
                    </li>
                  </ol>
                </div>
                
                <div className={`${language === 'ar' ? 'text-right' : ''}`}>
                  <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Cancellation by Phone", "الإلغاء عبر الهاتف")}
                  </h3>
                  <p className={`mb-3 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t(
                      "To cancel by phone, call our customer service at +971 4 123 4567 with your booking reference number ready.",
                      "للإلغاء عبر الهاتف، اتصل بخدمة العملاء لدينا على 4567 123 4 971+ مع تجهيز رقم مرجع الحجز الخاص بك."
                    )}
                  </p>
                </div>
                
                <div className={`${language === 'ar' ? 'text-right' : ''}`}>
                  <h3 className={`text-lg font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Refund Process", "عملية الاسترداد")}
                  </h3>
                  <p className={`mb-3 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t(
                      "After your cancellation is confirmed, any eligible refund will be processed automatically to your original payment method. Processing times vary depending on your payment provider, typically taking 5-10 business days to appear in your account.",
                      "بعد تأكيد الإلغاء الخاص بك، سيتم معالجة أي استرداد مؤهل تلقائيًا إلى طريقة الدفع الأصلية الخاصة بك. تختلف أوقات المعالجة حسب مزود الدفع الخاص بك، وعادة ما تستغرق 5-10 أيام عمل للظهور في حسابك."
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Frequently Asked Questions", "الأسئلة المتكررة")}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {cancellationFAQs.map((faq, index) => (
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
      
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 text-center">
        <h3 className={`text-xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Need Help With Your Cancellation?", "هل تحتاج إلى مساعدة في الإلغاء؟")}
        </h3>
        <p className={`text-gray-700 mb-6 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t(
            "Our customer support team is available 24/7 to assist you with any cancellation needs or questions about refunds.",
            "فريق دعم العملاء لدينا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك في أي احتياجات إلغاء أو أسئلة حول المبالغ المستردة."
          )}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="flex items-center gap-2">
            {t("Contact Support", "اتصل بالدعم")}
          </Button>
          <Button variant="outline" className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            {t("View My Bookings", "عرض حجوزاتي")}
            <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}