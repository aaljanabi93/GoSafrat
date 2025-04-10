// Basic translation map for common UI elements
interface TranslationItem {
  en: string;
  ar: string;
}

// Translation map for the entire application
export const translations: Record<string, TranslationItem> = {
  // General
  appName: { en: "Safrat Travel", ar: "سفرات" },
  currency: { en: "USD", ar: "USD" },
  loading: { en: "Loading...", ar: "جار التحميل..." },
  error: { en: "An error occurred", ar: "حدث خطأ" },
  
  // Navigation
  home: { en: "Home", ar: "الرئيسية" },
  flights: { en: "Flights", ar: "رحلات طيران" },
  hotels: { en: "Hotels", ar: "فنادق" },
  cars: { en: "Cars", ar: "سيارات" },
  deals: { en: "Deals", ar: "عروض" },
  about: { en: "About", ar: "عن الشركة" },
  contact: { en: "Contact", ar: "اتصل بنا" },
  
  // Auth
  signIn: { en: "Sign In", ar: "تسجيل الدخول" },
  register: { en: "Register", ar: "التسجيل" },
  logout: { en: "Logout", ar: "تسجيل الخروج" },
  
  // Home page
  hero: {
    en: "Discover the World with Safrat",
    ar: "اكتشف العالم مع سفرات"
  },
  heroSubtitle: {
    en: "Find the best deals on flights, hotels, and car rentals",
    ar: "اعثر على أفضل العروض على الرحلات والفنادق وتأجير السيارات"
  },
  
  // Search tabs
  search: { en: "Search", ar: "بحث" },
  roundTrip: { en: "Round Trip", ar: "ذهاب وعودة" },
  oneWay: { en: "One Way", ar: "ذهاب فقط" },
  multiCity: { en: "Multi-City", ar: "وجهات متعددة" },
  
  // Flight search
  from: { en: "From: City or Airport", ar: "من: المدينة أو المطار" },
  to: { en: "To: City or Airport", ar: "إلى: المدينة أو المطار" },
  departureDate: { en: "Departure Date", ar: "تاريخ المغادرة" },
  returnDate: { en: "Return Date", ar: "تاريخ العودة" },
  passengers: { en: "Passengers", ar: "المسافرون" },
  searchFlights: { en: "Search Flights", ar: "بحث عن رحلات" },
  adult: { en: "Adult", ar: "بالغ" },
  child: { en: "Child", ar: "طفل" },
  infant: { en: "Infant", ar: "رضيع" },
  economy: { en: "Economy", ar: "اقتصادي" },
  business: { en: "Business", ar: "رجال الأعمال" },
  firstClass: { en: "First Class", ar: "الدرجة الأولى" },
  
  // Hotel search
  destination: { en: "Destination: City, Airport or Hotel", ar: "الوجهة: المدينة، المطار أو الفندق" },
  checkIn: { en: "Check In", ar: "تاريخ الوصول" },
  checkOut: { en: "Check Out", ar: "تاريخ المغادرة" },
  rooms: { en: "Rooms", ar: "غرف" },
  guests: { en: "Guests", ar: "الضيوف" },
  searchHotels: { en: "Search Hotels", ar: "بحث عن فنادق" },
  
  // Car search
  pickupLocation: { en: "Pickup Location", ar: "موقع الاستلام" },
  dropoffLocation: { en: "Drop-off Location", ar: "موقع التسليم" },
  sameDrop: { en: "Return car to the same location", ar: "إعادة السيارة إلى نفس الموقع" },
  pickupDate: { en: "Pickup Date", ar: "تاريخ الاستلام" },
  pickupTime: { en: "Pickup Time", ar: "وقت الاستلام" },
  dropoffDate: { en: "Drop-off Date", ar: "تاريخ التسليم" },
  dropoffTime: { en: "Drop-off Time", ar: "وقت التسليم" },
  searchCars: { en: "Search Cars", ar: "بحث عن سيارات" },
  
  // Deals section
  specialDeals: { en: "Special Deals", ar: "عروض خاصة" },
  dealsSubtitle: { en: "Exclusive offers for our valued customers", ar: "عروض حصرية لعملائنا الكرام" },
  viewDeal: { en: "View Deal", ar: "عرض العرض" },
  viewAllDeals: { en: "View All Deals", ar: "عرض جميع العروض" },
  
  // Popular destinations
  popularDestinations: { en: "Popular Destinations", ar: "الوجهات الشائعة" },
  destinationsSubtitle: { en: "Explore these trending destinations around the world", ar: "استكشف هذه الوجهات الرائجة حول العالم" },
  flightsFrom: { en: "Flights from", ar: "رحلات من" },
  
  // How it works
  howItWorks: { en: "How It Works", ar: "كيف يعمل" },
  howItWorksSubtitle: { en: "We make travel booking simple and hassle-free", ar: "نجعل حجز السفر بسيطًا وخالٍ من المتاعب" },
  step1: { en: "Search", ar: "ابحث" },
  step1Desc: { en: "Find the perfect trip by searching flights, hotels or car rentals", ar: "ابحث عن الرحلة المثالية من خلال البحث عن الرحلات الجوية أو الفنادق أو تأجير السيارات" },
  step2: { en: "Select", ar: "اختر" },
  step2Desc: { en: "Choose from the best options that suit your needs and budget", ar: "اختر من بين أفضل الخيارات التي تناسب احتياجاتك وميزانيتك" },
  step3: { en: "Book", ar: "احجز" },
  step3Desc: { en: "Enter passenger details and customize your trip with add-ons", ar: "أدخل تفاصيل المسافر وخصص رحلتك بالإضافات" },
  step4: { en: "Pay", ar: "ادفع" },
  step4Desc: { en: "Securely pay with multiple payment options available", ar: "ادفع بأمان مع توفر خيارات دفع متعددة" },
  
  // Services
  ourServices: { en: "Our Services", ar: "خدماتنا" },
  servicesDesc: { en: "Safrat Travel provides everything you need for a perfect journey. From booking flights, finding the ideal hotel, to arranging your transportation, we've got you covered.", ar: "توفر سفرات كل ما تحتاجه لرحلة مثالية. من حجز الرحلات الجوية، والعثور على الفندق المثالي، إلى ترتيب وسائل النقل الخاصة بك، نحن نغطي كل شيء." },
  flightBooking: { en: "Flight Booking", ar: "حجز الطيران" },
  flightBookingDesc: { en: "Compare and book flights from over 500 airlines worldwide", ar: "قارن واحجز رحلات من أكثر من 500 شركة طيران حول العالم" },
  hotelReservations: { en: "Hotel Reservations", ar: "حجوزات الفنادق" },
  hotelReservationsDesc: { en: "Find the perfect accommodation with over 2 million hotels in our database", ar: "ابحث عن السكن المثالي مع أكثر من 2 مليون فندق في قاعدة بياناتنا" },
  carRentals: { en: "Car Rentals", ar: "تأجير السيارات" },
  carRentalsDesc: { en: "Access great rates on car rentals in more than 180 countries", ar: "احصل على أسعار رائعة على تأجير السيارات في أكثر من 180 دولة" },
  
  // Testimonials
  testimonials: { en: "What Our Customers Say", ar: "ما يقوله عملاؤنا" },
  testimonialsSubtitle: { en: "Real stories from travelers who booked with Safrat", ar: "قصص حقيقية من المسافرين الذين حجزوا مع سفرات" },
  
  // App download
  getApp: { en: "Get the Safrat App", ar: "احصل على تطبيق سفرات" },
  getAppDesc: { en: "Download our mobile app for a better experience. Access your bookings, get exclusive app-only deals, and manage your trips on the go.", ar: "قم بتنزيل تطبيقنا للجوال للحصول على تجربة أفضل. الوصول إلى حجوزاتك، والحصول على عروض حصرية للتطبيق، وإدارة رحلاتك أثناء التنقل." },
  appStore: { en: "App Store", ar: "آب ستور" },
  googlePlay: { en: "Google Play", ar: "جوجل بلاي" },
  downloadOn: { en: "Download on the", ar: "تنزيل على" },
  getItOn: { en: "Get it on", ar: "احصل عليه من" },
  
  // Footer
  company: { en: "Company", ar: "الشركة" },
  aboutUs: { en: "About Us", ar: "معلومات عنا" },
  careers: { en: "Careers", ar: "وظائف" },
  partners: { en: "Partners", ar: "شركاء" },
  press: { en: "Press", ar: "صحافة" },
  support: { en: "Support", ar: "الدعم" },
  helpCenter: { en: "Help Center", ar: "مركز المساعدة" },
  contactUs: { en: "Contact Us", ar: "اتصل بنا" },
  cancellationOptions: { en: "Cancellation Options", ar: "خيارات الإلغاء" },
  safetyResources: { en: "Safety Resources", ar: "موارد السلامة" },
  legal: { en: "Legal", ar: "قانوني" },
  termsConditions: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
  privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  cookiePolicy: { en: "Cookie Policy", ar: "سياسة ملفات تعريف الارتباط" },
  copyright: { en: "© 2023 Safrat Travel. All rights reserved.", ar: "© 2023 سفرات للسفر. جميع الحقوق محفوظة." },
  paymentMethods: { en: "Payment Methods:", ar: "طرق الدفع:" },
  
  // Checkout & Booking
  passengerDetails: { en: "Passenger Details", ar: "بيانات المسافر" },
  firstName: { en: "First Name", ar: "الاسم الأول" },
  lastName: { en: "Last Name", ar: "اسم العائلة" },
  email: { en: "Email", ar: "البريد الإلكتروني" },
  phone: { en: "Phone Number", ar: "رقم الهاتف" },
  nationality: { en: "Nationality", ar: "الجنسية" },
  passportNumber: { en: "Passport Number", ar: "رقم جواز السفر" },
  paymentDetails: { en: "Payment Details", ar: "تفاصيل الدفع" },
  cardNumber: { en: "Card Number", ar: "رقم البطاقة" },
  expiryDate: { en: "Expiry Date", ar: "تاريخ انتهاء الصلاحية" },
  cvv: { en: "CVV", ar: "رمز التحقق" },
  nameOnCard: { en: "Name on Card", ar: "الاسم على البطاقة" },
  billingAddress: { en: "Billing Address", ar: "عنوان الفواتير" },
  completeBooking: { en: "Complete Booking", ar: "إتمام الحجز" },
  bookingSummary: { en: "Booking Summary", ar: "ملخص الحجز" },
  total: { en: "Total", ar: "المجموع" },
  includingTaxes: { en: "Including taxes and fees", ar: "شامل الضرائب والرسوم" },
  
  // Success page
  bookingSuccess: { en: "Booking Successful!", ar: "تم الحجز بنجاح!" },
  bookingConfirmed: { en: "Your booking has been confirmed", ar: "تم تأكيد حجزك" },
  bookingReference: { en: "Booking Reference", ar: "رقم الحجز" },
  bookingDetails: { en: "Booking Details", ar: "تفاصيل الحجز" },
  viewBooking: { en: "View Booking", ar: "عرض الحجز" },
  backToHome: { en: "Back to Home", ar: "العودة إلى الرئيسية" }
};

// Helper function to get a translation by key
export const getTranslation = (key: string, language: string): string => {
  const translationItem = translations[key];
  if (!translationItem) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  return language === "en" ? translationItem.en : translationItem.ar;
};

export default translations;
