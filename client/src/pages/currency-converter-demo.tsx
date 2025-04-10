import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/language-context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CurrencyConverter } from "@/components/ui/currency-converter";

export default function CurrencyConverterDemo() {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("Currency Converter - GoSafrat", "محول العملات - جو سفرات")}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className={`text-3xl font-bold text-gray-900 mb-8 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
              {t("Currency Converter", "محول العملات")}
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="mb-8">
                  <h2 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Standard Converter", "المحول العادي")}
                  </h2>
                  <CurrencyConverter />
                </div>
                
                <div>
                  <h2 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Compact Converter", "المحول المصغر")}
                  </h2>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="mb-4">
                      <span className={`text-sm text-gray-500 mb-2 block ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("This compact version can be included in the header", "يمكن تضمين هذا الإصدار المصغر في رأس الصفحة")}
                      </span>
                    </div>
                    <CurrencyConverter compact={true} />
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {t("About Currency Conversion", "حول تحويل العملات")}
                </h2>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className={`prose ${language === 'ar' ? 'font-cairo' : ''}`}>
                    <p>
                      {t(
                        "Our currency converter allows travelers to easily convert between different currencies to help with budget planning.",
                        "يسمح محول العملات لدينا للمسافرين بالتحويل بسهولة بين العملات المختلفة للمساعدة في تخطيط الميزانية."
                      )}
                    </p>
                    
                    <h3>{t("Features", "المميزات")}</h3>
                    <ul>
                      <li>
                        {t(
                          "Real-time conversion between 8 popular currencies",
                          "تحويل بين 8 عملات شائعة في الوقت الفعلي"
                        )}
                      </li>
                      <li>
                        {t(
                          "Interactive interface with smooth animations",
                          "واجهة تفاعلية مع رسوم متحركة سلسة"
                        )}
                      </li>
                      <li>
                        {t(
                          "Compact version for quick conversions",
                          "نسخة مصغرة للتحويلات السريعة"
                        )}
                      </li>
                      <li>
                        {t(
                          "Support for both English and Arabic",
                          "دعم اللغتين العربية والإنجليزية"
                        )}
                      </li>
                    </ul>
                    
                    <h3>{t("Supported Currencies", "العملات المدعومة")}</h3>
                    <ul>
                      <li>US Dollar (USD)</li>
                      <li>UAE Dirham (AED)</li>
                      <li>Iraqi Dinar (IQD)</li>
                      <li>Jordanian Dinar (JOD)</li>
                      <li>Saudi Riyal (SAR)</li>
                      <li>Qatari Riyal (QAR)</li>
                      <li>Canadian Dollar (CAD)</li>
                      <li>Euro (EUR)</li>
                    </ul>
                    
                    <p>
                      {t(
                        "The conversion rates are updated regularly to provide accurate results for your travel planning.",
                        "يتم تحديث أسعار التحويل بانتظام لتوفير نتائج دقيقة لتخطيط رحلتك."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}