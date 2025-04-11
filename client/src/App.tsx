import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Flights from "@/pages/flights";
import FlightDetails from "@/pages/flight-details";
import Hotels from "@/pages/hotels";
import Cars from "@/pages/cars";
import Checkout from "@/pages/checkout-fixed";
import BookingSuccess from "@/pages/booking-success";
import LoadingDemo from "@/pages/loading-demo";
import AuthPage from "@/pages/auth-page";
import ProfilePage from "@/pages/profile-page";
import VerifyEmail from "@/pages/verify-email";
import ResetPassword from "@/pages/reset-password";
import ForgotPassword from "@/pages/forgot-password";
import { LanguageProvider } from "@/context/language-context";
import { BookingProvider } from "@/context/booking-context";
import { CurrencyProvider } from "@/context/currency-context";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { JsonLD, organizationSchema, websiteSchema } from "@/components/seo/json-ld";
import SitemapDebug from "@/components/seo/sitemap-generator";

// Import all our new pages
import AboutPage from "@/pages/company/about";
import CareersPage from "@/pages/company/careers";
import PartnersPage from "@/pages/company/partners";
import PressPage from "@/pages/company/press";
import HelpCenterPage from "@/pages/support/help-center";
import ContactPage from "@/pages/support/contact";
import CancellationPage from "@/pages/support/cancellation";
import SafetyResourcesPage from "@/pages/support/safety";
import TermsAndConditionsPage from "@/pages/legal/terms";
import PrivacyPolicyPage from "@/pages/legal/privacy";
import CookiePolicyPage from "@/pages/legal/cookies";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/flights" component={Flights} />
      <Route path="/flight-details/:id" component={FlightDetails} />
      <Route path="/hotels" component={Hotels} />
      <Route path="/cars" component={Cars} />
      <ProtectedRoute path="/checkout">
        <Checkout />
      </ProtectedRoute>
      <ProtectedRoute path="/booking-success">
        <BookingSuccess />
      </ProtectedRoute>
      <Route path="/loading-demo" component={LoadingDemo} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <ProtectedRoute path="/profile">
        <ProfilePage />
      </ProtectedRoute>
      
      {/* Company Pages */}
      <Route path="/company/about" component={AboutPage} />
      <Route path="/company/careers" component={CareersPage} />
      <Route path="/company/partners" component={PartnersPage} />
      <Route path="/company/press" component={PressPage} />
      
      {/* Support Pages */}
      <Route path="/support/help-center" component={HelpCenterPage} />
      <Route path="/support/contact" component={ContactPage} />
      <Route path="/support/cancellation" component={CancellationPage} />
      <Route path="/support/safety" component={SafetyResourcesPage} />
      
      {/* Legal Pages */}
      <Route path="/legal/terms" component={TermsAndConditionsPage} />
      <Route path="/legal/privacy" component={PrivacyPolicyPage} />
      <Route path="/legal/cookies" component={CookiePolicyPage} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CurrencyProvider>
          <AuthProvider>
            <BookingProvider>
              {/* Add structured data for SEO */}
              <JsonLD data={websiteSchema} />
              <JsonLD data={organizationSchema} />
              {/* In development, output site routes for debugging */}
              {process.env.NODE_ENV === 'development' && <SitemapDebug />}
              <Router />
              <Toaster />
            </BookingProvider>
          </AuthProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
