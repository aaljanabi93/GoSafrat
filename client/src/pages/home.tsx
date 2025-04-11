import { useLanguage } from "@/context/language-context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import PageTitle from "@/components/seo/page-title";
import { JsonLD, createFaqSchema } from "@/components/seo/json-ld";

export default function Home() {
  const { t, language } = useLanguage();

  // FAQ data for structured data
  const faqData = [
    {
      question: t("How do I book a flight on GoSafrat?", "كيف أحجز رحلة طيران على سفرات؟"),
      answer: t("Simply search for flights by entering your departure and arrival cities, dates, and number of passengers. Compare the results and select the flight that best suits your needs. Complete the booking by providing passenger details and payment information.", "ما عليك سوى البحث عن الرحلات الجوية بإدخال مدن المغادرة والوصول والتواريخ وعدد الركاب. قارن النتائج واختر الرحلة التي تناسب احتياجاتك بشكل أفضل. أكمل الحجز بتقديم تفاصيل الركاب ومعلومات الدفع.")
    },
    {
      question: t("Can I book a hotel without booking a flight?", "هل يمكنني حجز فندق بدون حجز رحلة طيران؟"),
      answer: t("Yes, you can book hotels separately on GoSafrat. Just navigate to the Hotels section and search for accommodations in your desired destination.", "نعم، يمكنك حجز الفنادق بشكل منفصل على سفرات. ما عليك سوى الانتقال إلى قسم الفنادق والبحث عن أماكن الإقامة في وجهتك المطلوبة.")
    },
    {
      question: t("What payment methods does GoSafrat accept?", "ما هي طرق الدفع التي تقبلها سفرات؟"),
      answer: t("GoSafrat accepts all major credit cards including Visa, Mastercard, and American Express. We also support secure online payments through Stripe.", "تقبل سفرات جميع بطاقات الائتمان الرئيسية بما في ذلك Visa و Mastercard و American Express. نحن ندعم أيضًا المدفوعات الآمنة عبر الإنترنت من خلال Stripe.")
    }
  ];

  return (
    <>
      {/* SEO optimization */}
      <PageTitle 
        title={t("Book Flights, Hotels, and Cars", "احجز الرحلات والفنادق والسيارات")} 
        description={t(
          "Book flights, hotels, and car rentals at the best prices. Find great deals on your next trip with GoSafrat.",
          "احجز الرحلات الجوية والفنادق وتأجير السيارات بأفضل الأسعار. ابحث عن صفقات رائعة لرحلتك القادمة مع سفرات."
        )} 
      />
      
      {/* Add FAQ structured data */}
      <JsonLD data={createFaqSchema(faqData)} />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <HeroSection />
          
          {/* Popular Destinations Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
                  {t("Popular Destinations", "الوجهات الشعبية")}
                </h2>
                <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {t("Explore top travel destinations with our exclusive deals and offers", "استكشف أفضل وجهات السفر مع عروضنا الحصرية")}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Dubai */}
                <div className="rounded-lg overflow-hidden shadow-md bg-white">
                  <div className="h-56 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1000")' }}>
                    <div className="h-full w-full bg-black bg-opacity-30 flex items-end p-6">
                      <h3 className="text-white text-2xl font-bold">{t("Dubai", "دبي")}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-3">{t("Explore luxury shopping, stunning architecture, and desert adventures", "استكشف التسوق الفاخر والهندسة المعمارية المذهلة ومغامرات الصحراء")}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#051C2C] font-bold">{t("From", "من")} $350</span>
                      <button className="px-4 py-2 bg-[#051C2C] text-white rounded-md hover:bg-[#0A3A5C] transition-colors">
                        {t("Explore", "استكشف")}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Istanbul */}
                <div className="rounded-lg overflow-hidden shadow-md bg-white">
                  <div className="h-56 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534008757030-27299c4371b6?q=80&w=1000")' }}>
                    <div className="h-full w-full bg-black bg-opacity-30 flex items-end p-6">
                      <h3 className="text-white text-2xl font-bold">{t("Istanbul", "اسطنبول")}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-3">{t("Where East meets West - experience rich history and vibrant culture", "حيث يلتقي الشرق بالغرب - استمتع بتاريخ غني وثقافة نابضة بالحياة")}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#051C2C] font-bold">{t("From", "من")} $280</span>
                      <button className="px-4 py-2 bg-[#051C2C] text-white rounded-md hover:bg-[#0A3A5C] transition-colors">
                        {t("Explore", "استكشف")}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Cairo */}
                <div className="rounded-lg overflow-hidden shadow-md bg-white">
                  <div className="h-56 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1000")' }}>
                    <div className="h-full w-full bg-black bg-opacity-30 flex items-end p-6">
                      <h3 className="text-white text-2xl font-bold">{t("Cairo", "القاهرة")}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-3">{t("Discover ancient pyramids, vibrant markets, and the mighty Nile", "اكتشف الأهرامات القديمة والأسواق النابضة بالحياة ونهر النيل العظيم")}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#051C2C] font-bold">{t("From", "من")} $320</span>
                      <button className="px-4 py-2 bg-[#051C2C] text-white rounded-md hover:bg-[#0A3A5C] transition-colors">
                        {t("Explore", "استكشف")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Why Choose Us Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
                  {t("Why Choose GoSafrat", "لماذا تختار سفرات")}
                </h2>
                <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {t("We're committed to making your travel experience exceptional", "نحن ملتزمون بجعل تجربة سفرك استثنائية")}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto bg-[#051C2C] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Best Price Guarantee", "ضمان أفضل سعر")}
                  </h3>
                  <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Find a lower price? We'll match it and give you an additional discount.", "وجدت سعرًا أقل؟ سنطابقه ونمنحك خصمًا إضافيًا.")}
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto bg-[#051C2C] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Safe & Secure Booking", "حجز آمن ومضمون")}
                  </h3>
                  <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Your personal and payment information is protected with industry-standard encryption.", "معلوماتك الشخصية ومعلومات الدفع محمية بتشفير بمعايير الصناعة.")}
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto bg-[#051C2C] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("24/7 Customer Support", "دعم العملاء على مدار الساعة")}
                  </h3>
                  <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Our experienced support team is available round the clock to assist you.", "فريق الدعم المتمرس لدينا متاح على مدار الساعة لمساعدتك.")}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
