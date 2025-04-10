import { useLanguage } from "@/context/language-context";
import SearchTabs from "@/components/search/search-tabs";

export default function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="w-full max-w-5xl mx-auto text-center text-white">
          <h1 className={`text-4xl md:text-5xl font-poppins font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Discover the World with Safrat", "اكتشف العالم مع سفرات")}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Find the best deals on flights, hotels, and car rentals", "اعثر على أفضل العروض على الرحلات والفنادق وتأجير السيارات")}
          </p>
          
          <SearchTabs />
        </div>
      </div>
    </section>
  );
}
