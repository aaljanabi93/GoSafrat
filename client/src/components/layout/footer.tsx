import { Link } from "wouter";
import { useLanguage } from "@/context/language-context";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-white text-2xl font-poppins font-bold">Go</span>
              <span className="text-[#28B67A] text-2xl font-poppins font-bold">Safrat</span>
            </div>
            <p className={`text-gray-400 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Your trusted partner for flights, hotels, and car rentals worldwide.", 
                "شريكك الموثوق للرحلات الجوية والفنادق وتأجير السيارات في جميع أنحاء العالم.")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          {/* Company */}
          <div>
            <h3 className={`font-medium text-lg mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Company", "الشركة")}
            </h3>
            <ul className="space-y-2">
              {[
                { key: "About Us", arKey: "معلومات عنا", href: "#" },
                { key: "Careers", arKey: "وظائف", href: "#" },
                { key: "Partners", arKey: "شركاء", href: "#" },
                { key: "Press", arKey: "صحافة", href: "#" }
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.href} className={`text-gray-400 hover:text-white transition ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t(item.key, item.arKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className={`font-medium text-lg mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Support", "الدعم")}
            </h3>
            <ul className="space-y-2">
              {[
                { key: "Help Center", arKey: "مركز المساعدة", href: "#" },
                { key: "Contact Us", arKey: "اتصل بنا", href: "#" },
                { key: "Cancellation Options", arKey: "خيارات الإلغاء", href: "#" },
                { key: "Safety Resources", arKey: "موارد السلامة", href: "#" }
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.href} className={`text-gray-400 hover:text-white transition ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t(item.key, item.arKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className={`font-medium text-lg mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Legal", "قانوني")}
            </h3>
            <ul className="space-y-2">
              {[
                { key: "Terms & Conditions", arKey: "الشروط والأحكام", href: "#" },
                { key: "Privacy Policy", arKey: "سياسة الخصوصية", href: "#" },
                { key: "Cookie Policy", arKey: "سياسة ملفات تعريف الارتباط", href: "#" }
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.href} className={`text-gray-400 hover:text-white transition ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t(item.key, item.arKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-gray-400 text-sm mb-4 md:mb-0 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("© 2025 GoSafrat. All rights reserved.", "© 2025 جوسفرات. جميع الحقوق محفوظة.")}
            </p>
            
            <div className="flex items-center">
              <span className={`text-gray-400 text-sm mr-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("Payment Methods:", "طرق الدفع:")}
              </span>
              <div className="flex space-x-3">
                <FaCcVisa className="text-gray-400 text-2xl" />
                <FaCcMastercard className="text-gray-400 text-2xl" />
                <FaCcAmex className="text-gray-400 text-2xl" />
                <FaCcPaypal className="text-gray-400 text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
