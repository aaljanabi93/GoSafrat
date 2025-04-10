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
import { Loader2, CheckCircle, ShieldCheckIcon } from "lucide-react";
import * as z from "zod";
import { useLanguage } from "@/context/language-context";

// Form schema with password validation
const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [token, setToken] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });
  
  // Get token from URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setStatus("error");
      setError("Missing reset token. Please use the link from your email.");
    }
  }, []);
  
  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      setStatus("error");
      setError("Missing reset token. Please use the link from your email.");
      return;
    }
    
    setStatus("loading");
    
    try {
      const response = await apiRequest("POST", "/api/reset-password", {
        token,
        newPassword: values.password
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to reset password");
      }
      
      setStatus("success");
      toast({
        title: "Password Reset Successfully",
        description: "Your password has been reset. You can now log in with your new password.",
        variant: "default",
      });
      
      // Clear form
      form.reset();
      
    } catch (error: any) {
      setStatus("error");
      setError(error.message || "An error occurred while resetting your password. Please try again.");
      toast({
        title: "Password Reset Failed",
        description: error.message || "An error occurred while resetting your password. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("Reset Password", "إعادة تعيين كلمة المرور")}
          </CardTitle>
          <CardDescription>
            {t(
              "Please enter your new password below",
              "الرجاء إدخال كلمة المرور الجديدة أدناه"
            )}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {status === "idle" && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("New Password", "كلمة المرور الجديدة")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder={t("Enter your new password", "أدخل كلمة المرور الجديدة")} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Confirm Password", "تأكيد كلمة المرور")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder={t("Confirm your new password", "تأكيد كلمة المرور الجديدة")} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="p-3 bg-amber-50 text-amber-800 text-sm rounded border border-amber-200">
                  <p className="font-medium mb-1">{t("Password Requirements:", "متطلبات كلمة المرور:")}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{t("At least 8 characters", "8 أحرف على الأقل")}</li>
                    <li>{t("At least one uppercase letter", "حرف كبير واحد على الأقل")}</li>
                    <li>{t("At least one lowercase letter", "حرف صغير واحد على الأقل")}</li>
                    <li>{t("At least one number", "رقم واحد على الأقل")}</li>
                  </ul>
                </div>
                
                <Button type="submit" className="w-full">
                  {t("Reset Password", "إعادة تعيين كلمة المرور")}
                </Button>
              </form>
            </Form>
          )}
          
          {status === "loading" && (
            <div className="flex flex-col items-center text-center py-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
              <p>{t("Resetting your password...", "جارٍ إعادة تعيين كلمة المرور...")}</p>
            </div>
          )}
          
          {status === "success" && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <ShieldCheckIcon className="h-10 w-10 text-green-600" />
              </div>
              <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
              <p className="text-green-600 font-medium mb-2">
                {t("Password Reset Successfully!", "تم إعادة تعيين كلمة المرور بنجاح!")}
              </p>
              <p className="mb-4">
                {t("Your password has been reset. You can now log in with your new password.", "تم إعادة تعيين كلمة المرور الخاصة بك. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.")}
              </p>
            </div>
          )}
          
          {status === "error" && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <ShieldCheckIcon className="h-10 w-10 text-red-600" />
              </div>
              <p className="text-red-600 font-medium mb-2">
                {t("Password Reset Failed", "فشل إعادة تعيين كلمة المرور")}
              </p>
              <p className="mb-4 text-red-600">{error}</p>
              <p className="text-gray-500">
                {t("Please try again or request a new password reset link.", "يرجى المحاولة مرة أخرى أو طلب رابط إعادة تعيين كلمة مرور جديد.")}
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {status === "success" ? (
              <Button className="w-full" onClick={() => setLocation("/auth")}>
                {t("Go to Login", "الذهاب إلى تسجيل الدخول")}
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setLocation("/auth")}>
                {t("Back to Login", "العودة إلى تسجيل الدخول")}
              </Button>
            )}
            
            {status === "error" && (
              <Button variant="outline" onClick={() => setLocation("/forgot-password")}>
                {t("Request New Link", "طلب رابط جديد")}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;