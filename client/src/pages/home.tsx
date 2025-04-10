import { useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import DealsSection from "@/components/home/deals-section";
import DestinationsSection from "@/components/home/destinations-section";
import BookingSteps from "@/components/home/booking-steps";
import ServicesSection from "@/components/home/services-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import DownloadAppSection from "@/components/home/download-app-section";
import { Helmet } from "react-helmet";

export default function Home() {
  const { t, language } = useLanguage();

  // Set document title on component mount and language change
  useEffect(() => {
    document.title = t("Safrat Travel - Book Flights, Hotels, and Cars", "سفرات - احجز الرحلات والفنادق والسيارات");
  }, [language, t]);

  return (
    <>
      <Helmet>
        <title>{t("Safrat Travel - Book Flights, Hotels, and Cars", "سفرات - احجز الرحلات والفنادق والسيارات")}</title>
        <meta name="description" content={t(
          "Book flights, hotels, and car rentals at the best prices. Find great deals on your next trip with Safrat Travel.",
          "احجز الرحلات الجوية والفنادق وتأجير السيارات بأفضل الأسعار. ابحث عن صفقات رائعة لرحلتك القادمة مع سفرات."
        )} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <HeroSection />
          <DealsSection />
          <DestinationsSection />
          <BookingSteps />
          <ServicesSection />
          <TestimonialsSection />
          <DownloadAppSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
