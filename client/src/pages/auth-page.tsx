import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { useLanguage } from "@/context/language-context";
import { Loader2 } from "lucide-react";
import logoImage from "@/assets/logo.png";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = insertUserSchema
  .extend({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    phoneNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { t, language } = useLanguage();
  const { user, loginMutation, registerMutation } = useAuth();
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  
  // Check if the URL contains the tab parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    } else if (tab === 'login') {
      setActiveTab('login');
    }
  }, [location]);

  // Login form handling
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form handling
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    mode: "onChange", // Validate on change
  });

  // Form submission handlers
  const onLoginSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  const onRegisterSubmit = (values: RegisterFormValues) => {
    // Remove confirmPassword as it's not in the database schema
    const { confirmPassword, ...userData } = values;
    registerMutation.mutate(userData);
  };

  // If user is already logged in, redirect to home
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col md:flex-row">
      {/* Hero Section */}
      <div className="bg-primary md:w-1/2 p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-md text-center">
          <img src={logoImage} alt="GoSafrat Logo" className="h-20 mx-auto mb-6" />
          <h1 className={`text-3xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Your Journey Begins Here", "رحلتك تبدأ من هنا")}
          </h1>
          <p className={`text-xl mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t(
              "Discover the best flights, hotels, and car rentals for your next adventure.",
              "اكتشف أفضل الرحلات والفنادق وتأجير السيارات لمغامرتك القادمة."
            )}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className={`text-lg font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("200+ Airlines", "200+ شركة طيران")}
              </h3>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className={`text-lg font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("Global Coverage", "تغطية عالمية")}
              </h3>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className={`text-lg font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("Best Prices", "أفضل الأسعار")}
              </h3>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className={`text-lg font-semibold ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("24/7 Support", "دعم على مدار الساعة")}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Forms */}
      <div className="md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Login", "تسجيل الدخول")}
              </TabsTrigger>
              <TabsTrigger value="register" className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Register", "التسجيل")}
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className={language === 'ar' ? 'font-cairo' : ''}>
                    {t("Welcome Back", "مرحبا بعودتك")}
                  </CardTitle>
                  <CardDescription className={language === 'ar' ? 'font-cairo' : ''}>
                    {t("Enter your credentials to access your account", "أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Username", "اسم المستخدم")}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder={t("Enter your username", "أدخل اسم المستخدم")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Password", "كلمة المرور")}
                            </FormLabel>
                            <FormControl>
                              <Input type="password" placeholder={t("Enter your password", "أدخل كلمة المرور")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end mb-2">
                        <Button 
                          variant="link" 
                          className="p-0 text-sm" 
                          onClick={() => {
                            const email = loginForm.getValues().username;
                            window.location.href = `/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ''}`;
                          }}
                        >
                          {t("Forgot Password?", "نسيت كلمة المرور؟")}
                        </Button>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {t("Login", "تسجيل الدخول")}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Don't have an account?", "ليس لديك حساب؟")}{" "}
                    <Button 
                      variant="link" 
                      className="p-0" 
                      onClick={() => setActiveTab("register")}
                    >
                      {t("Register now", "سجل الآن")}
                    </Button>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Registration Form */}
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className={language === 'ar' ? 'font-cairo' : ''}>
                    {t("Create an Account", "إنشاء حساب")}
                  </CardTitle>
                  <CardDescription className={language === 'ar' ? 'font-cairo' : ''}>
                    {t("Fill in your details to create a new account", "املأ بياناتك لإنشاء حساب جديد")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                                {t("First Name", "الاسم الأول")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("Enter your first name", "أدخل اسمك الأول")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                                {t("Last Name", "اسم العائلة")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("Enter your last name", "أدخل اسم العائلة")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Username", "اسم المستخدم")}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder={t("Choose a username", "اختر اسم مستخدم")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Email", "البريد الإلكتروني")}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder={t("Enter your email", "أدخل بريدك الإلكتروني")} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Phone Number", "رقم الهاتف")}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={t("Enter your phone number", "أدخل رقم هاتفك")} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Password", "كلمة المرور")}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder={t("Create a password", "أنشئ كلمة مرور")} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                              {t("Confirm Password", "تأكيد كلمة المرور")}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder={t("Confirm your password", "تأكيد كلمة المرور")} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {t("Register", "التسجيل")}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {t("Already have an account?", "هل لديك حساب بالفعل؟")}{" "}
                    <Button 
                      variant="link" 
                      className="p-0" 
                      onClick={() => setActiveTab("login")}
                    >
                      {t("Login here", "تسجيل الدخول من هنا")}
                    </Button>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}