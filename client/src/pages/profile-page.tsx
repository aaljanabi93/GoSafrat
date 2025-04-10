import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/context/language-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, UserCircle } from "lucide-react";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Profile information schema
const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
});

// Password change schema
const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "bookings">("profile");

  // Get user bookings
  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["/api/user/bookings"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/user/bookings");
      return res.json();
    },
    enabled: !!user,
  });

  // Profile form handling
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  // Password form handling
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const res = await apiRequest("PUT", "/api/user/profile", data);
      return res.json();
    },
    onSuccess: (data: Omit<User, "password">) => {
      // Update the user data in the query cache
      queryClient.setQueryData(["/api/user"], { ...user, ...data });
      toast({
        title: t("Profile Updated", "تم تحديث الملف الشخصي"),
        description: t("Your profile information has been updated successfully.", "تم تحديث معلومات ملفك الشخصي بنجاح."),
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("Update Failed", "فشل التحديث"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const res = await apiRequest("POST", "/api/user/change-password", data);
      return res.json();
    },
    onSuccess: () => {
      passwordForm.reset();
      toast({
        title: t("Password Changed", "تم تغيير كلمة المرور"),
        description: t("Your password has been changed successfully.", "تم تغيير كلمة المرور الخاصة بك بنجاح."),
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("Password Change Failed", "فشل تغيير كلمة المرور"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Form submission handlers
  const onProfileSubmit = (values: ProfileFormValues) => {
    updateProfileMutation.mutate(values);
  };

  const onPasswordSubmit = (values: PasswordFormValues) => {
    const { currentPassword, newPassword } = values;
    changePasswordMutation.mutate({ currentPassword, newPassword });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <UserCircle className="h-12 w-12 text-primary mr-4" />
        <div>
          <h1 className={`text-2xl font-bold ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("My Profile", "ملفي الشخصي")}
          </h1>
          <p className={`text-gray-500 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {t("Manage your account and bookings", "إدارة حسابك وحجوزاتك")}
          </p>
        </div>
      </div>

      <Tabs 
        defaultValue="profile" 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "profile" | "security" | "bookings")}
        className="w-full"
      >
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-8">
          <TabsTrigger value="profile" className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Profile Information", "معلومات الملف الشخصي")}
          </TabsTrigger>
          <TabsTrigger value="security" className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Security", "الأمان")}
          </TabsTrigger>
          <TabsTrigger value="bookings" className={language === 'ar' ? 'font-cairo' : ''}>
            {t("My Bookings", "حجوزاتي")}
          </TabsTrigger>
        </TabsList>

        {/* Profile Information */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Personal Information", "المعلومات الشخصية")}
              </CardTitle>
              <CardDescription className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Update your personal information", "تحديث معلوماتك الشخصية")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={profileForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                            {t("First Name", "الاسم الأول")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                            {t("Last Name", "اسم العائلة")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                          {t("Email", "البريد الإلكتروني")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                          {t("Phone Number", "رقم الهاتف")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="mt-4" 
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    {t("Save Changes", "حفظ التغييرات")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Change Password", "تغيير كلمة المرور")}
              </CardTitle>
              <CardDescription className={language === 'ar' ? 'font-cairo' : ''}>
                {t("Update your password", "تحديث كلمة المرور الخاصة بك")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                          {t("Current Password", "كلمة المرور الحالية")}
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                          {t("New Password", "كلمة المرور الجديدة")}
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={language === 'ar' ? 'font-cairo' : ''}>
                          {t("Confirm New Password", "تأكيد كلمة المرور الجديدة")}
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="mt-4" 
                    disabled={changePasswordMutation.isPending}
                  >
                    {changePasswordMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {t("Update Password", "تحديث كلمة المرور")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle className={language === 'ar' ? 'font-cairo' : ''}>
                {t("My Bookings", "حجوزاتي")}
              </CardTitle>
              <CardDescription className={language === 'ar' ? 'font-cairo' : ''}>
                {t("View all your bookings and their status", "عرض جميع حجوزاتك وحالتها")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookingsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : bookings && (bookings.flights.length > 0 || bookings.hotels.length > 0 || bookings.cars.length > 0) ? (
                <div className="space-y-8">
                  {/* Flight Bookings */}
                  {bookings.flights.length > 0 && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Flight Bookings", "حجوزات الطيران")}
                      </h3>
                      <div className="space-y-4">
                        {bookings.flights.map((booking: any) => (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-medium">{booking.airline} {booking.flightNumber}</p>
                                <p className="text-sm text-gray-600">
                                  {booking.departureCity} ({booking.departureAirport}) → {booking.arrivalCity} ({booking.arrivalAirport})
                                </p>
                                <p className="text-sm text-gray-600">
                                  {new Date(booking.departureTime).toLocaleString()}
                                </p>
                              </div>
                              <Badge variant="default">
                                {(booking.status || "pending").toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>
                                {t("Passengers", "المسافرون")}: {booking.passengers}
                              </span>
                              <span>
                                {t("Class", "الدرجة")}: {booking.cabinClass}
                              </span>
                              <span>
                                {t("Price", "السعر")}: ${parseFloat(booking.price.toString()).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hotel Bookings */}
                  {bookings.hotels.length > 0 && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Hotel Bookings", "حجوزات الفنادق")}
                      </h3>
                      <div className="space-y-4">
                        {bookings.hotels.map((booking: any) => (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-medium">{booking.hotelName}</p>
                                <p className="text-sm text-gray-600">{booking.city}</p>
                                <p className="text-sm text-gray-600">
                                  {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge variant="default">
                                {(booking.status || "pending").toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>
                                {t("Rooms", "الغرف")}: {booking.rooms}
                              </span>
                              <span>
                                {t("Adults", "البالغين")}: {booking.adults}
                              </span>
                              <span>
                                {t("Price", "السعر")}: ${parseFloat(booking.price.toString()).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Car Rentals */}
                  {bookings.cars.length > 0 && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {t("Car Rentals", "تأجير السيارات")}
                      </h3>
                      <div className="space-y-4">
                        {bookings.cars.map((rental: any) => (
                          <div key={rental.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-medium">{rental.carType}</p>
                                <p className="text-sm text-gray-600">
                                  {rental.pickupLocation} - {rental.dropoffLocation}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {new Date(rental.pickupDate).toLocaleDateString()} {rental.pickupTime} - {new Date(rental.dropoffDate).toLocaleDateString()} {rental.dropoffTime}
                                </p>
                              </div>
                              <Badge variant="default">
                                {(rental.status || "pending").toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex justify-end text-sm">
                              <span>
                                {t("Price", "السعر")}: ${parseFloat(rental.price.toString()).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Alert>
                  <AlertTitle className={language === 'ar' ? 'font-cairo' : ''}>
                    {t("No Bookings Found", "لم يتم العثور على حجوزات")}
                  </AlertTitle>
                  <AlertDescription className={language === 'ar' ? 'font-cairo' : ''}>
                    {t("You don't have any bookings yet. Start searching for flights, hotels, or car rentals to create a booking.", "ليس لديك أي حجوزات حتى الآن. ابدأ بالبحث عن رحلات طيران أو فنادق أو تأجير سيارات لإنشاء حجز.")}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}