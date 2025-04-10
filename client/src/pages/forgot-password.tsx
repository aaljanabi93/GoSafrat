import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle, MailIcon } from "lucide-react";
import * as z from "zod";
import { useLanguage } from "@/context/language-context";

// Form schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [message, setMessage] = useState<string>("");
  
  // Get email from URL query parameter if available
  const [emailFromUrl, setEmailFromUrl] = useState<string>("");
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmailFromUrl(emailParam);
    }
  }, []);
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: emailFromUrl || "",
    },
  });
  
  // Update form when emailFromUrl changes
  useEffect(() => {
    if (emailFromUrl) {
      form.setValue("email", emailFromUrl);
    }
  }, [emailFromUrl, form]);
  
  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setStatus("loading");
    
    try {
      const response = await apiRequest("POST", "/api/forgot-password", {
        email: values.email,
      });
      
      const data = await response.json();
      
      // Always show success regardless of whether the email exists or not
      // This is for security reasons - we don't want to reveal whether an email exists in our system
      setStatus("success");
      setMessage(data.message || "If an account with that email exists, a password reset link has been sent to your email.");
      toast({
        title: "Email Sent",
        description: "If an account with that email exists, a password reset link has been sent.",
        variant: "default",
      });
      
      // Clear form
      form.reset();
      
    } catch (error) {
      // Even if there's an error, for security reasons we still show success
      setStatus("success");
      setMessage("If an account with that email exists, a password reset link has been sent to your email.");
      toast({
        title: "Email Sent",
        description: "If an account with that email exists, a password reset link has been sent.",
        variant: "default",
      });
    }
  };
  
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("Forgot Password", "نسيت كلمة المرور")}
          </CardTitle>
          <CardDescription>
            {t(
              "Enter your email address and we'll send you a link to reset your password",
              "أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور"
            )}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {status === "idle" && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Email Address", "عنوان البريد الإلكتروني")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder={t("Enter your email address", "أدخل عنوان بريدك الإلكتروني")} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  {t("Send Reset Link", "إرسال رابط إعادة التعيين")}
                </Button>
              </form>
            </Form>
          )}
          
          {status === "loading" && (
            <div className="flex flex-col items-center text-center py-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
              <p>{t("Sending reset link...", "جارٍ إرسال رابط إعادة التعيين...")}</p>
            </div>
          )}
          
          {status === "success" && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <MailIcon className="h-10 w-10 text-green-600" />
              </div>
              <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
              <p className="text-green-600 font-medium mb-2">
                {t("Email Sent!", "تم إرسال البريد الإلكتروني!")}
              </p>
              <p className="mb-4">{message}</p>
              <p className="text-sm text-gray-500">
                {t("Please check your inbox and spam folder.", "يرجى التحقق من صندوق الوارد ومجلد البريد العشوائي.")}
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button variant="outline" onClick={() => setLocation("/auth")}>
              {t("Back to Login", "العودة إلى تسجيل الدخول")}
            </Button>
            {status === "success" && (
              <Button onClick={() => setLocation("/")}>
                {t("Return to Home", "العودة إلى الصفحة الرئيسية")}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;