import { Link } from "wouter";
import { useLanguage } from "@/context/language-context";
import LanguageToggle from "@/components/ui/language-toggle";
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
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-primary text-2xl font-poppins font-bold">Safrat</span>
            <span className="text-[#28B67A] text-2xl font-poppins font-light">Travel</span>
          </Link>
        </div>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
          <Link href="/" className={`hover:text-primary transition ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Home", "الرئيسية")}
          </Link>
          <Link href="/flights" className={`hover:text-primary transition ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Flights", "رحلات طيران")}
          </Link>
          <Link href="/hotels" className={`hover:text-primary transition ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Hotels", "فنادق")}
          </Link>
          <Link href="/cars" className={`hover:text-primary transition ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Cars", "سيارات")}
          </Link>
          <Link href="/" className={`hover:text-primary transition ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Deals", "عروض")}
          </Link>
        </nav>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Currency Selector */}
          <div className="hidden sm:flex items-center space-x-1 text-sm">
            <span className="font-medium">USD</span>
            <ChevronDown className="h-4 w-4" />
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
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link href="/" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Home", "الرئيسية")}
            </Link>
            <Link href="/flights" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Flights", "رحلات طيران")}
            </Link>
            <Link href="/hotels" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Hotels", "فنادق")}
            </Link>
            <Link href="/cars" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Cars", "سيارات")}
            </Link>
            <Link href="/" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Deals", "عروض")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
