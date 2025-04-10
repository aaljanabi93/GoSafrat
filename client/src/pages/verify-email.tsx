import { useEffect, useState } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const VerifyEmail = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/verify-email");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }
    
    const verifyEmail = async () => {
      try {
        const response = await apiRequest("GET", `/api/verify-email?token=${token}`);
        const data = await response.json();
        
        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Your email has been verified successfully!");
          toast({
            title: "Email Verified",
            description: "Your email has been verified successfully!",
            variant: "default",
          });
        } else {
          setStatus("error");
          setMessage(data.message || "Failed to verify email. Invalid or expired token.");
          toast({
            title: "Verification Failed",
            description: data.message || "Failed to verify email. Invalid or expired token.",
            variant: "destructive",
          });
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again later.");
        toast({
          title: "Verification Failed",
          description: "An error occurred during verification. Please try again later.",
          variant: "destructive",
        });
      }
    };
    
    verifyEmail();
  }, [toast]);
  
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("Email Verification", "التحقق من البريد الإلكتروني")}
          </CardTitle>
          <CardDescription>
            {t(
              "Confirming your account email address",
              "تأكيد عنوان البريد الإلكتروني لحسابك"
            )}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
              <p>{t("Verifying your email address...", "جارٍ التحقق من عنوان بريدك الإلكتروني...")}</p>
            </>
          )}
          
          {status === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <p className="text-green-600 font-medium mb-2">
                {t("Email Verified Successfully!", "تم التحقق من البريد الإلكتروني بنجاح!")}
              </p>
              <p>{message}</p>
            </>
          )}
          
          {status === "error" && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mb-4" />
              <p className="text-red-600 font-medium mb-2">
                {t("Verification Failed", "فشل التحقق")}
              </p>
              <p>{message}</p>
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          {status === "success" && (
            <Button onClick={() => setLocation("/")}>
              {t("Return to Home", "العودة إلى الصفحة الرئيسية")}
            </Button>
          )}
          
          {status === "error" && (
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button variant="outline" onClick={() => setLocation("/auth")}>
                {t("Go to Login", "الذهاب إلى تسجيل الدخول")}
              </Button>
              <Button onClick={() => setLocation("/")}>
                {t("Return to Home", "العودة إلى الصفحة الرئيسية")}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;