import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import * as z from "zod";
import { useLanguage } from "@/context/language-context";

// Form schema
const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/reset-password");
  
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    
    if (!tokenParam) {
      setStatus("error");
      setMessage("Reset token is missing.");
      toast({
        title: "Token Missing",
        description: "Password reset token is missing.",
        variant: "destructive",
      });
    } else {
      setToken(tokenParam);
      setStatus("idle");
    }
  }, [toast]);
  
  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      return;
    }
    
    setStatus("loading");
    
    try {
      const response = await apiRequest("POST", "/api/reset-password", {
        token,
        newPassword: values.password,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Your password has been reset successfully!");
        toast({
          title: "Password Reset",
          description: "Your password has been reset successfully!",
          variant: "default",
        });
        
        // Clear form
        form.reset();
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          setLocation("/auth");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to reset password. Invalid or expired token.");
        toast({
          title: "Reset Failed",
          description: data.message || "Failed to reset password. Invalid or expired token.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred during password reset. Please try again later.");
      toast({
        title: "Reset Failed",
        description: "An error occurred during password reset. Please try again later.",
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
              "Enter your new password below",
              "أدخل كلمة المرور الجديدة أدناه"
            )}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {status === "idle" && token && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("New Password", "كلمة المرور الجديدة")}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <p className="text-green-600 font-medium mb-2">
                {t("Password Reset Successfully!", "تم إعادة تعيين كلمة المرور بنجاح!")}
              </p>
              <p>{message}</p>
              <p className="mt-4 text-sm text-gray-500">
                {t("Redirecting to login page...", "جارٍ إعادة التوجيه إلى صفحة تسجيل الدخول...")}
              </p>
            </div>
          )}
          
          {status === "error" && (
            <div className="flex flex-col items-center text-center py-4">
              <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
              <p className="text-red-600 font-medium mb-2">
                {t("Password Reset Failed", "فشل إعادة تعيين كلمة المرور")}
              </p>
              <p>{message}</p>
            </div>
          )}
        </CardContent>
        
        {status === "error" && (
          <CardFooter className="flex justify-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button variant="outline" onClick={() => setLocation("/auth")}>
                {t("Go to Login", "الذهاب إلى تسجيل الدخول")}
              </Button>
              <Button onClick={() => setLocation("/")}>
                {t("Return to Home", "العودة إلى الصفحة الرئيسية")}
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;