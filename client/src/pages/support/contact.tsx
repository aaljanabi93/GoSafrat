import PageLayout from "@/components/layout/page-layout";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const contactFormSchema = z.object({
    name: z.string().min(2, {
      message: t("Name must be at least 2 characters.", "يجب أن يكون الاسم على الأقل حرفين.")
    }),
    email: z.string().email({
      message: t("Please enter a valid email address.", "يرجى إدخال عنوان بريد إلكتروني صحيح.")
    }),
    subject: z.string().min(5, {
      message: t("Subject must be at least 5 characters.", "يجب أن يكون الموضوع على الأقل 5 أحرف.")
    }),
    message: z.string().min(10, {
      message: t("Message must be at least 10 characters.", "يجب أن تكون الرسالة على الأقل 10 أحرف.")
    }),
  });
  
  const bookingFormSchema = z.object({
    name: z.string().min(2, {
      message: t("Name must be at least 2 characters.", "يجب أن يكون الاسم على الأقل حرفين.")
    }),
    email: z.string().email({
      message: t("Please enter a valid email address.", "يرجى إدخال عنوان بريد إلكتروني صحيح.")
    }),
    bookingRef: z.string().min(5, {
      message: t("Please enter a valid booking reference.", "يرجى إدخال مرجع حجز صالح.")
    }),
    issueType: z.string().min(1, {
      message: t("Please select an issue type.", "يرجى تحديد نوع المشكلة.")
    }),
    details: z.string().min(10, {
      message: t("Details must be at least 10 characters.", "يجب أن تكون التفاصيل على الأقل 10 أحرف.")
    }),
  });
  
  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const bookingForm = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      bookingRef: "",
      issueType: "",
      details: "",
    },
  });

  const onContactSubmit = (values: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t("Message Sent", "تم إرسال الرسالة"),
        description: t("We'll get back to you as soon as possible.", "سنرد عليك في أقرب وقت ممكن."),
      });
      contactForm.reset();
    }, 1500);
  };
  
  const onBookingSubmit = (values: z.infer<typeof bookingFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t("Request Submitted", "تم تقديم الطلب"),
        description: t("Our support team will review your case shortly.", "سيقوم فريق الدعم لدينا بمراجعة حالتك قريبًا."),
      });
      bookingForm.reset();
    }, 1500);
  };
  
  const offices = [
    {
      city: "Dubai",
      cityAr: "دبي",
      address: "Level 14, Boulevard Plaza Tower 1, Sheikh Mohammed Bin Rashid Boulevard, Downtown Dubai, UAE",
      addressAr: "المستوى 14، بوليفارد بلازا تاور 1، شارع الشيخ محمد بن راشد، وسط دبي، الإمارات العربية المتحدة",
      phone: "+971 4 123 4567",
      email: "dubai@gosafrat.com"
    },
    {
      city: "Cairo",
      cityAr: "القاهرة",
      address: "18 El-Falaki St, Bab El Louk, Abdeen, Cairo Governorate, Egypt",
      addressAr: "18 شارع الفلكي، باب اللوق، عابدين، محافظة القاهرة، مصر",
      phone: "+20 2 2792 1234",
      email: "cairo@gosafrat.com"
    },
    {
      city: "Amman",
      cityAr: "عمان",
      address: "King Hussein Business Park, Building 10, King Abdullah II St, Amman, Jordan",
      addressAr: "مجمع الملك حسين للأعمال، مبنى 10، شارع الملك عبد الله الثاني، عمان، الأردن",
      phone: "+962 6 580 1234",
      email: "amman@gosafrat.com"
    }
  ];
  
  const operationHours = [
    {
      days: "Monday - Friday",
      daysAr: "الإثنين - الجمعة",
      hours: "9:00 AM - 9:00 PM",
      hoursAr: "٩:٠٠ ص - ٩:٠٠ م"
    },
    {
      days: "Saturday",
      daysAr: "السبت",
      hours: "10:00 AM - 6:00 PM",
      hoursAr: "١٠:٠٠ ص - ٦:٠٠ م"
    },
    {
      days: "Sunday",
      daysAr: "الأحد",
      hours: "10:00 AM - 6:00 PM",
      hoursAr: "١٠:٠٠ ص - ٦:٠٠ م"
    }
  ];
  
  const issueTypes = [
    { value: "change", label: "Booking Changes", labelAr: "تغييرات الحجز" },
    { value: "cancellation", label: "Cancellation Request", labelAr: "طلب الإلغاء" },
    { value: "refund", label: "Refund Inquiry", labelAr: "استفسار عن استرداد الأموال" },
    { value: "payment", label: "Payment Issues", labelAr: "مشاكل الدفع" },
    { value: "documentation", label: "Travel Documents", labelAr: "وثائق السفر" },
    { value: "service", label: "Service Complaints", labelAr: "شكاوى الخدمة" },
    { value: "other", label: "Other", labelAr: "أخرى" }
  ];

  return (
    <PageLayout 
      title="Contact Us" 
      titleAr="اتصل بنا"
      subtitle="We're here to help with your travel needs"
      subtitleAr="نحن هنا للمساعدة في احتياجات السفر الخاصة بك"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        <div className="lg:col-span-2">
          <h2 className={`text-2xl font-bold mb-6 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
            {t("Get in Touch", "تواصل معنا")}
          </h2>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="general" className="text-sm sm:text-base">
                {t("General Inquiry", "استفسار عام")}
              </TabsTrigger>
              <TabsTrigger value="booking" className="text-sm sm:text-base">
                {t("Booking Support", "دعم الحجز")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardContent className="pt-6">
                  <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={contactForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className={language === 'ar' ? 'text-right' : ''}>
                              <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                                {t("Name", "الاسم")}
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t("Your full name", "اسمك الكامل")} 
                                  {...field} 
                                  className={language === 'ar' ? 'text-right' : ''}
                                />
                              </FormControl>
                              <FormMessage className={language === 'ar' ? 'font-cairo' : ''} />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={contactForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className={language === 'ar' ? 'text-right' : ''}>
                              <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                                {t("Email", "البريد الإلكتروني")}
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t("Your email address", "عنوان بريدك الإلكتروني")} 
                                  type="email" 
                                  {...field} 
                                  className={language === 'ar' ? 'text-right' : ''}
                                />
                              </FormControl>
                              <FormMessage className={language === 'ar' ? 'font-cairo' : ''} />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={contactForm.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem className={language === 'ar' ? 'text-right' : ''}>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Subject", "الموضوع")}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={t("What is your message about?", "ما هو موضوع رسالتك؟")} 
                                {...field} 
                                className={language === 'ar' ? 'text-right' : ''}
                              />
                            </FormControl>
                            <FormMessage className={language === 'ar' ? 'font-cairo' : ''} />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className={language === 'ar' ? 'text-right' : ''}>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Message", "الرسالة")}
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={t("Please provide details about your inquiry", "يرجى تقديم تفاصيل حول استفسارك")}
                                rows={5}
                                {...field}
                                className={language === 'ar' ? 'text-right' : ''}
                              />
                            </FormControl>
                            <FormMessage className={language === 'ar' ? 'font-cairo' : ''} />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                        {isSubmitting ? 
                          t("Sending...", "جاري الإرسال...") : 
                          t("Send Message", "إرسال الرسالة")
                        }
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="booking">
              <Card>
                <CardContent className="pt-6">
                  <Form {...bookingForm}>
                    <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={bookingForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className={language === 'ar' ? 'text-right' : ''}>
                              <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                                {t("Name", "الاسم")}
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t("Your full name", "اسمك الكامل")} 
                                  {...field} 
                                  className={language === 'ar' ? 'text-right' : ''}
                                />
                              </FormControl>
                              <FormMessage className={language === 'ar' ? 'font-cairo' : ''} />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={bookingForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className={language === 'ar' ? 'text-right' : ''}>
                              <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                                {t("Email", "البريد الإلكتروني")}
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t("Your email address", "عنوان بريدك الإلكتروني")} 
                                  type="email" 
                                  {...field} 
                                  className={language === 'ar' ? 'text-right' : ''}
                                />
                              </FormControl>
                              <FormMessage className={language === 'ar' ? 'font-cairo' : ''} />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={bookingForm.control}
                        name="bookingRef"
                        render={({ field }) => (
                          <FormItem className={language === 'ar' ? 'text-right' : ''}>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Booking Reference", "مرجع الحجز")}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={t("Enter your booking reference number", "أدخل رقم مرجع الحجز الخاص بك")} 
                                {...field} 
                                className={language === 'ar' ? 'text-right' : ''}
                              />
                            </FormControl>
                            <FormDescription className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Found in your confirmation email", "موجود في بريد التأكيد الإلكتروني الخاص بك")}
                            </FormDescription>
                            <FormMessage className={language === 'ar' ? 'font-cairo' : ''} />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={bookingForm.control}
                        name="issueType"
                        render={({ field }) => (
                          <FormItem className={language === 'ar' ? 'text-right' : ''}>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Issue Type", "نوع المشكلة")}
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t("Select an issue type", "حدد نوع المشكلة")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {issueTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {t(type.label, type.labelAr)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className={language === 'ar' ? 'font-cairo' : ''} />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={bookingForm.control}
                        name="details"
                        render={({ field }) => (
                          <FormItem className={language === 'ar' ? 'text-right' : ''}>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Details", "التفاصيل")}
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={t("Please describe your issue in detail", "يرجى وصف مشكلتك بالتفصيل")}
                                rows={5}
                                {...field}
                                className={language === 'ar' ? 'text-right' : ''}
                              />
                            </FormControl>
                            <FormMessage className={language === 'ar' ? 'font-cairo' : ''} />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                        {isSubmitting ? 
                          t("Submitting...", "جاري التقديم...") : 
                          t("Submit Request", "تقديم الطلب")
                        }
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <h2 className={`text-2xl font-bold mb-6 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
            {t("Contact Information", "معلومات الاتصال")}
          </h2>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <Phone className={`h-5 w-5 text-blue-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <div>
                    <h3 className={`font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Customer Support", "دعم العملاء")}
                    </h3>
                    <p className="text-gray-600">+971 4 123 4567</p>
                  </div>
                </div>
                
                <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <Mail className={`h-5 w-5 text-blue-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <div>
                    <h3 className={`font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Email", "البريد الإلكتروني")}
                    </h3>
                    <p className="text-gray-600">support@gosafrat.com</p>
                  </div>
                </div>
                
                <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <MessageSquare className={`h-5 w-5 text-blue-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <div>
                    <h3 className={`font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Live Chat", "الدردشة المباشرة")}
                    </h3>
                    <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Available in our app and website", "متوفر في تطبيقنا وموقعنا الإلكتروني")}
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <Clock className={`h-5 w-5 text-blue-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <div>
                    <h3 className={`font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {t("Hours of Operation", "ساعات العمل")}
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      {operationHours.map((hours, index) => (
                        <div key={index} className={language === 'ar' ? 'font-cairo' : ''}>
                          <span className="font-medium">{t(hours.days, hours.daysAr)}:</span> {t(hours.hours, hours.hoursAr)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className={`font-semibold mb-4 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                {t("Our Offices", "مكاتبنا")}
              </h3>
              
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className={`${index > 0 ? 'pt-4 border-t border-gray-100' : ''}`}>
                    <h4 className={`font-semibold text-blue-600 mb-1 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                      {t(office.city, office.cityAr)}
                    </h4>
                    <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                      <MapPin className={`h-5 w-5 text-gray-500 flex-shrink-0 ${language === 'ar' ? 'ml-2 mt-1' : 'mr-2 mt-1'}`} />
                      <p className={`text-gray-600 text-sm ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t(office.address, office.addressAr)}
                      </p>
                    </div>
                    <div className={`flex items-center mt-1 ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                      <Phone className={`h-4 w-4 text-gray-500 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                      <p className="text-gray-600 text-sm">{office.phone}</p>
                    </div>
                    <div className={`flex items-center mt-1 ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                      <Mail className={`h-4 w-4 text-gray-500 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                      <p className="text-gray-600 text-sm">{office.email}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className={`font-semibold mb-3 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {t("Connect With Us", "تواصل معنا")}
                </h3>
                <div className={`flex gap-3 ${language === 'ar' ? 'justify-end' : ''}`}>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}