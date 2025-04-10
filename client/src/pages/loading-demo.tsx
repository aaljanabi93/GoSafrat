import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/language-context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoadingSpinner, LoadingSpinnerWithText } from "@/components/ui/loading-spinners";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoadingDemo() {
  const { t, language } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t("Loading Spinners - GoSafrat", "مؤشرات التحميل - جو سفرات")}</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className={`text-3xl font-bold text-gray-900 mb-8 ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
              {t("Travel-Themed Loading Spinners", "مؤشرات تحميل بطابع السفر")}
            </h1>
            
            <div className="grid grid-cols-1 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t("Loading Spinner Variants", "أنواع مؤشرات التحميل")}</CardTitle>
                  <CardDescription>{t("Different travel-themed loading spinners for various sections of the app", "مؤشرات تحميل متنوعة بطابع السفر لأقسام مختلفة من التطبيق")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="variants">
                    <TabsList className="mb-6">
                      <TabsTrigger value="variants">{t("Variants", "الأنواع")}</TabsTrigger>
                      <TabsTrigger value="sizes">{t("Sizes", "الأحجام")}</TabsTrigger>
                      <TabsTrigger value="withText">{t("With Text", "مع النص")}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="variants">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinner variant="default" />
                          <p className="text-sm text-center font-medium mt-2">{t("Default Spinner", "المؤشر الافتراضي")}</p>
                          <p className="text-xs text-gray-500 text-center">{t("For general loading states", "لحالات التحميل العامة")}</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinner variant="plane" />
                          <p className="text-sm text-center font-medium mt-2">{t("Airplane Spinner", "مؤشر الطائرة")}</p>
                          <p className="text-xs text-gray-500 text-center">{t("For flight searches and bookings", "لعمليات البحث عن الرحلات والحجوزات")}</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinner variant="compass" />
                          <p className="text-sm text-center font-medium mt-2">{t("Compass Spinner", "مؤشر البوصلة")}</p>
                          <p className="text-xs text-gray-500 text-center">{t("For maps and directions", "للخرائط والاتجاهات")}</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinner variant="globe" />
                          <p className="text-sm text-center font-medium mt-2">{t("Globe Spinner", "مؤشر الكرة الأرضية")}</p>
                          <p className="text-xs text-gray-500 text-center">{t("For international searches", "لعمليات البحث الدولية")}</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinner variant="luggage" />
                          <p className="text-sm text-center font-medium mt-2">{t("Luggage Spinner", "مؤشر الأمتعة")}</p>
                          <p className="text-xs text-gray-500 text-center">{t("For baggage options and booking completion", "لخيارات الأمتعة وإتمام الحجز")}</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinner variant="car" />
                          <p className="text-sm text-center font-medium mt-2">{t("Car Spinner", "مؤشر السيارة")}</p>
                          <p className="text-xs text-gray-500 text-center">{t("For car rental searches", "لعمليات البحث عن تأجير السيارات")}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="sizes">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinner variant="plane" size="sm" />
                          <p className="text-sm text-center font-medium mt-2">{t("Small", "صغير")}</p>
                          <p className="text-xs text-gray-500 text-center">{t("For inline or compact UI elements", "للعناصر المضمنة أو المدمجة")}</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinner variant="plane" size="md" />
                          <p className="text-sm text-center font-medium mt-2">{t("Medium", "متوسط")}</p>
                          <p className="text-xs text-gray-500 text-center">{t("For most common use cases", "للاستخدامات الشائعة")}</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinner variant="plane" size="lg" />
                          <p className="text-sm text-center font-medium mt-2">{t("Large", "كبير")}</p>
                          <p className="text-xs text-gray-500 text-center">{t("For full-page loading states", "لحالات التحميل على الصفحة الكاملة")}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="withText">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinnerWithText 
                            text={t("Searching for the best flights...", "جارٍ البحث عن أفضل الرحلات...")}
                            spinnerProps={{ variant: "plane" }}
                          />
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinnerWithText 
                            text={t("Finding your route...", "جارٍ العثور على مسارك...")}
                            spinnerProps={{ variant: "compass" }}
                          />
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinnerWithText 
                            text={t("Checking available hotels nearby...", "جارٍ التحقق من الفنادق المتوفرة بالقرب منك...")}
                            spinnerProps={{ variant: "globe" }}
                          />
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                          <LoadingSpinnerWithText 
                            text={t("Preparing your booking details...", "جارٍ تحضير تفاصيل حجزك...")}
                            spinnerProps={{ variant: "luggage" }}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t("Usage Examples", "أمثلة الاستخدام")}</CardTitle>
                  <CardDescription>{t("How these spinners would look in actual UI components", "كيف ستبدو هذه المؤشرات في مكونات واجهة المستخدم الفعلية")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full page loading example */}
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 border-b">
                        <p className="text-sm font-medium">{t("Full Page Loading", "تحميل الصفحة الكاملة")}</p>
                      </div>
                      <div className="bg-white h-60 flex items-center justify-center">
                        <LoadingSpinnerWithText 
                          text={t("Loading your travel options...", "جارٍ تحميل خيارات السفر...")}
                          spinnerProps={{ variant: "plane", size: "lg" }}
                        />
                      </div>
                    </div>
                    
                    {/* Search results loading example */}
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 border-b">
                        <p className="text-sm font-medium">{t("Search Results", "نتائج البحث")}</p>
                      </div>
                      <div className="bg-white h-60 p-4">
                        <div className="w-full h-full flex flex-col">
                          <div className="mb-4 h-10 bg-gray-100 rounded-md w-full"></div>
                          <div className="flex-grow flex items-center justify-center">
                            <LoadingSpinnerWithText 
                              text={t("Finding the best deals for you...", "جارٍ البحث عن أفضل العروض لك...")}
                              spinnerProps={{ variant: "compass" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Button loading example */}
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 border-b">
                        <p className="text-sm font-medium">{t("Button Loading State", "حالة تحميل الزر")}</p>
                      </div>
                      <div className="bg-white h-60 flex items-center justify-center p-4">
                        <div>
                          <button className="px-4 py-2 bg-primary text-white rounded-md font-medium flex items-center justify-center min-w-[180px]">
                            <LoadingSpinner variant="default" size="sm" className="mr-2" />
                            <span>{t("Processing...", "جارٍ المعالجة...")}</span>
                          </button>
                          <p className="text-sm text-gray-500 mt-4 text-center">
                            {t("Used when submitting forms or payments", "يستخدم عند إرسال النماذج أو المدفوعات")}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card loading example */}
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 border-b">
                        <p className="text-sm font-medium">{t("Card Loading State", "حالة تحميل البطاقة")}</p>
                      </div>
                      <div className="bg-white h-60 p-4 flex items-center justify-center">
                        <div className="w-full max-w-md p-4 border rounded-md flex justify-between items-center">
                          <div>
                            <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="w-16 h-3 bg-gray-100 rounded"></div>
                          </div>
                          <LoadingSpinner variant="car" size="sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}