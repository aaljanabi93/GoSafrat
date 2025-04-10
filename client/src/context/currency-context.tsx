import React, { createContext, useState, useContext, ReactNode } from "react";

export type CurrencyCode = "USD" | "AED" | "IQD" | "JOD" | "SAR" | "QAR" | "CAD" | "EUR";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  nameAr: string;
  rate: number; // Exchange rate from USD
}

export const currencies: Record<CurrencyCode, CurrencyInfo> = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    nameAr: "دولار أمريكي",
    rate: 1
  },
  AED: {
    code: "AED",
    symbol: "د.إ",
    name: "UAE Dirham",
    nameAr: "درهم إماراتي",
    rate: 3.67
  },
  IQD: {
    code: "IQD",
    symbol: "د.ع",
    name: "Iraqi Dinar",
    nameAr: "دينار عراقي",
    rate: 1300
  },
  JOD: {
    code: "JOD",
    symbol: "د.أ",
    name: "Jordanian Dinar",
    nameAr: "دينار أردني",
    rate: 0.71
  },
  SAR: {
    code: "SAR",
    symbol: "ر.س",
    name: "Saudi Riyal",
    nameAr: "ريال سعودي",
    rate: 3.75
  },
  QAR: {
    code: "QAR",
    symbol: "ر.ق",
    name: "Qatari Riyal",
    nameAr: "ريال قطري",
    rate: 3.64
  },
  CAD: {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollar",
    nameAr: "دولار كندي",
    rate: 1.35
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    nameAr: "يورو",
    rate: 0.92
  }
};

interface CurrencyContextType {
  currency: CurrencyInfo;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyInfo>(currencies.USD);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(currencies[code]);
  };

  const formatPrice = (priceInUSD: number): string => {
    const convertedPrice = priceInUSD * currency.rate;
    
    // Format based on currency specifics
    return `${currency.symbol}${convertedPrice.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatPrice 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};