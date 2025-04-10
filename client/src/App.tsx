import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Flights from "@/pages/flights";
import Hotels from "@/pages/hotels";
import Cars from "@/pages/cars";
import Checkout from "@/pages/checkout-fixed";
import BookingSuccess from "@/pages/booking-success";
import LoadingDemo from "@/pages/loading-demo";
import { LanguageProvider } from "@/context/language-context";
import { BookingProvider } from "@/context/booking-context";
import { CurrencyProvider } from "@/context/currency-context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/flights" component={Flights} />
      <Route path="/hotels" component={Hotels} />
      <Route path="/cars" component={Cars} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/booking-success" component={BookingSuccess} />
      <Route path="/loading-demo" component={LoadingDemo} />
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
          <BookingProvider>
            <Router />
            <Toaster />
          </BookingProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
