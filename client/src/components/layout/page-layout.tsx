import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLanguage } from "@/context/language-context";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  titleAr?: string; 
  subtitleAr?: string;
  withHero?: boolean;
  imageUrl?: string;
}

export default function PageLayout({
  children,
  title,
  subtitle,
  titleAr,
  subtitleAr,
  withHero = true,
  imageUrl,
}: PageLayoutProps) {
  const { language, t } = useLanguage();
  
  const displayTitle = t(title, titleAr || title);
  const displaySubtitle = subtitle ? t(subtitle, subtitleAr || subtitle) : "";
  
  return (
    <>
      <Navbar />
      
      {withHero && (
        <div 
          className="bg-gradient-to-r from-blue-900 to-green-800 text-white py-16 md:py-24"
          style={imageUrl ? {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : undefined}
        >
          <div className="container mx-auto px-4 md:px-6">
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
              {displayTitle}
            </h1>
            {displaySubtitle && (
              <p className={`text-lg md:text-xl opacity-90 max-w-3xl ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                {displaySubtitle}
              </p>
            )}
          </div>
        </div>
      )}
      
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          {children}
        </div>
      </main>
      
      <Footer />
    </>
  );
}