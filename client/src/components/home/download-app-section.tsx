import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function DownloadAppSection() {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className={`text-3xl ${language === 'ar' ? 'font-cairo' : 'font-poppins'} font-bold text-dark mb-4`}>
              {t("Get the Safrat App", "احصل على تطبيق سفرات")}
            </h2>
            <p className={`text-gray-600 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Download our mobile app for a better experience. Access your bookings, get exclusive app-only deals, and manage your trips on the go.",
                "قم بتنزيل تطبيقنا للجوال للحصول على تجربة أفضل. الوصول إلى حجوزاتك، والحصول على عروض حصرية للتطبيق، وإدارة رحلاتك أثناء التنقل.")}
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <Button
                variant="outline"
                className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-6 h-14 flex items-center justify-center"
              >
                <FaApple className="text-2xl mr-3" />
                <div className="text-left">
                  <div className="text-xs">{t("Download on the", "تنزيل على")}</div>
                  <div className="text-sm font-medium">{t("App Store", "آب ستور")}</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-6 h-14 flex items-center justify-center"
              >
                <FaGooglePlay className="text-2xl mr-3" />
                <div className="text-left">
                  <div className="text-xs">{t("Get it on", "احصل عليه من")}</div>
                  <div className="text-sm font-medium">{t("Google Play", "جوجل بلاي")}</div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-[600px] rounded-2xl shadow-xl bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">Safrat App</div>
                <p className="text-gray-500 px-4">Mobile app preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
