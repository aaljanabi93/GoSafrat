import { useLanguage } from "@/context/language-context";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <div className="flex items-center">
      <span className={`text-sm mr-2 ${language === 'ar' ? 'hidden' : ''}`}>EN</span>
      <span className={`text-sm mr-2 font-cairo ${language === 'en' ? 'hidden' : ''}`}>عربي</span>
      
      <Switch
        id="language-toggle"
        checked={language === 'ar'}
        onCheckedChange={toggleLanguage}
      />
      
      <span className={`text-sm ml-2 ${language === 'ar' ? 'hidden' : ''}`}>AR</span>
      <span className={`text-sm ml-2 font-cairo ${language === 'en' ? 'hidden' : ''}`}>EN</span>
    </div>
  );
}
