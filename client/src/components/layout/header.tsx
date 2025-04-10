import { Link } from "wouter";
import { useLanguage } from "@/context/language-context";
import LanguageToggle from "@/components/ui/language-toggle";
import CurrencySelector from "@/components/ui/currency-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Menu, User, ChevronDown } from "lucide-react";
import logoImage from "@/assets/logo.png";

export default function Header() {
  const { t, language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`bg-white sticky top-0 z-50 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="Safrat Logo" 
                className="h-16 md:h-16 mr-2" 
              />
            </div>
          </Link>
        </div>
        
        {/* Navigation - Desktop */}
        <nav className={`hidden md:flex items-center ${language === 'ar' ? 'gap-8 rtl' : 'space-x-6'} font-medium text-gray-700`}>
          <Link href="/" className={`hover:text-primary transition ${language === 'ar' ? 'font-cairo text-right px-1' : ''}`}>
            {t("Home", "الرئيسية")}
          </Link>
          <Link href="/flights" className={`hover:text-primary transition ${language === 'ar' ? 'font-cairo text-right px-1' : ''}`}>
            {t("Flights", "رحلات طيران")}
          </Link>
          <Link href="/hotels" className={`hover:text-primary transition ${language === 'ar' ? 'font-cairo text-right px-1' : ''}`}>
            {t("Hotels", "فنادق")}
          </Link>
          <Link href="/cars" className={`hover:text-primary transition ${language === 'ar' ? 'font-cairo text-right px-1' : ''}`}>
            {t("Cars", "سيارات")}
          </Link>
          <Link href="/" className={`hover:text-primary transition ${language === 'ar' ? 'font-cairo text-right px-1' : ''}`}>
            {t("Deals", "عروض")}
          </Link>
        </nav>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Currency Selector */}
          <div className="hidden sm:block">
            <CurrencySelector />
          </div>
          
          {/* Language Toggle */}
          <LanguageToggle />
          
          {/* User Menu */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-primary transition">
                <User className="h-5 w-5 mr-1" />
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className={language === 'ar' ? 'font-cairo' : ''}>
                  {t("Sign In", "تسجيل الدخول")}
                </DropdownMenuItem>
                <DropdownMenuItem className={language === 'ar' ? 'font-cairo' : ''}>
                  {t("Register", "التسجيل")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary transition"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3">
          <div className={`container mx-auto px-4 flex flex-col ${language === 'ar' ? 'gap-4 items-end rtl' : 'space-y-3'}`}>
            <Link href="/" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo text-right w-full px-2' : ''}`}>
              {t("Home", "الرئيسية")}
            </Link>
            <Link href="/flights" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo text-right w-full px-2' : ''}`}>
              {t("Flights", "رحلات طيران")}
            </Link>
            <Link href="/hotels" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo text-right w-full px-2' : ''}`}>
              {t("Hotels", "فنادق")}
            </Link>
            <Link href="/cars" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo text-right w-full px-2' : ''}`}>
              {t("Cars", "سيارات")}
            </Link>
            <Link href="/" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo text-right w-full px-2' : ''}`}>
              {t("Deals", "عروض")}
            </Link>
            
            <div className={`pt-2 border-t border-gray-100 flex items-center ${language === 'ar' ? 'flex-row-reverse' : 'justify-between'}`}>
              <span className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo mr-2' : ''}`}>
                {t("Currency", "العملة")}:
              </span>
              <CurrencySelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
