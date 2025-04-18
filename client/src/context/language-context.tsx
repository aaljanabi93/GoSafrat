import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (enText: string, arText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [direction, setDirection] = useState<Direction>("ltr");

  // Update document attributes when language changes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", language);
    html.setAttribute("dir", direction);
    
    // Add or remove RTL class for better styling support
    if (direction === "rtl") {
      document.body.classList.add("rtl");
      document.body.style.fontFamily = language === "ar" ? "Cairo, sans-serif" : "";
    } else {
      document.body.classList.remove("rtl");
      document.body.style.fontFamily = "";
    }
    
    // Update text alignment and other RTL-specific styles
    document.body.style.textAlign = direction === "rtl" ? "right" : "left";
  }, [language, direction]);

  const toggleLanguage = () => {
    if (language === "en") {
      setLanguage("ar");
      setDirection("rtl");
    } else {
      setLanguage("en");
      setDirection("ltr");
    }
  };

  // Translation helper function
  const t = (enText: string, arText: string): string => {
    return language === "en" ? enText : arText;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
