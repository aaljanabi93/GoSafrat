import { Link, useLocation } from "wouter";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/hooks/use-auth";
import LanguageToggle from "@/components/ui/language-toggle";
import CurrencySelector from "@/components/ui/currency-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Menu, User, ChevronDown, LogOut, Settings, History, CreditCard } from "lucide-react";
import logoImage from "@/assets/logo.png";

export default function Header() {
  const { t, language } = useLanguage();
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();
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
  
  const handleLogout = () => {
    logoutMutation.mutate();
    navigate('/');
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
                {user && <span className="hidden sm:inline ml-1 mr-1">{user.firstName || user.username}</span>}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuItem 
                      className={language === 'ar' ? 'font-cairo' : ''}
                      onClick={() => navigate("/profile")}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {t("My Profile", "ملفي الشخصي")}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={language === 'ar' ? 'font-cairo' : ''}
                      onClick={() => navigate("/profile?tab=bookings")}
                    >
                      <History className="w-4 h-4 mr-2" />
                      {t("My Bookings", "حجوزاتي")}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={language === 'ar' ? 'font-cairo' : ''}
                      onClick={() => navigate("/profile?tab=payments")}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      {t("Payment Methods", "طرق الدفع")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className={language === 'ar' ? 'font-cairo' : ''}
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t("Logout", "تسجيل الخروج")}
                      {logoutMutation.isPending && (
                        <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      )}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem 
                      className={language === 'ar' ? 'font-cairo' : ''}
                      onClick={() => navigate("/auth")}
                    >
                      {t("Sign In", "تسجيل الدخول")}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={language === 'ar' ? 'font-cairo' : ''}
                      onClick={() => navigate("/auth?tab=register")}
                    >
                      {t("Register", "التسجيل")}
                    </DropdownMenuItem>
                  </>
                )}
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
            
            {/* Authentication links for mobile */}
            <div className="border-t border-gray-100 pt-2">
              {user ? (
                <>
                  <Link href="/profile" className={`hover:text-primary py-2 flex items-center ${language === 'ar' ? 'font-cairo text-right w-full px-2' : ''}`}>
                    <Settings className="w-4 h-4 mr-2" />
                    {t("My Profile", "ملفي الشخصي")}
                  </Link>
                  <Link href="/profile?tab=bookings" className={`hover:text-primary py-2 flex items-center ${language === 'ar' ? 'font-cairo text-right w-full px-2' : ''}`}>
                    <History className="w-4 h-4 mr-2" />
                    {t("My Bookings", "حجوزاتي")}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className={`hover:text-primary py-2 flex items-center ${language === 'ar' ? 'font-cairo text-right w-full px-2' : ''}`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("Logout", "تسجيل الخروج")}
                    {logoutMutation.isPending && (
                      <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    )}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo text-right w-full px-2' : ''}`}>
                    {t("Sign In", "تسجيل الدخول")}
                  </Link>
                  <Link href="/auth?tab=register" className={`hover:text-primary py-2 ${language === 'ar' ? 'font-cairo text-right w-full px-2' : ''}`}>
                    {t("Register", "التسجيل")}
                  </Link>
                </>
              )}
            </div>
            
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
