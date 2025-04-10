import { useState, useEffect } from "react";
import { useCurrency, currencies, type CurrencyCode } from "@/context/currency-context";
import { useLanguage } from "@/context/language-context";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ArrowRightLeft, ChevronDown, RefreshCw } from "lucide-react";

interface CurrencyConverterProps {
  defaultAmount?: number;
  compact?: boolean;
  className?: string;
}

export function CurrencyConverter({ 
  defaultAmount = 100, 
  compact = false,
  className = ""
}: CurrencyConverterProps) {
  const { currency: activeCurrency, setCurrency } = useCurrency();
  const { t, language, direction } = useLanguage();
  
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("USD");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>(activeCurrency.code);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [hasConverted, setHasConverted] = useState<boolean>(false);
  
  // Update toCurrency when the active currency changes
  useEffect(() => {
    setToCurrency(activeCurrency.code);
  }, [activeCurrency]);
  
  // When either currency or amount changes, update conversion
  useEffect(() => {
    handleConversion();
  }, [fromCurrency, toCurrency, amount]);
  
  const handleConversion = () => {
    if (!amount || amount <= 0) {
      setConvertedAmount(0);
      return;
    }
    
    setIsConverting(true);
    
    // Simulate API delay for animation effect
    setTimeout(() => {
      // Convert from USD to the selected currency
      const fromRate = currencies[fromCurrency].rate;
      const toRate = currencies[toCurrency].rate;
      
      // First convert to USD if fromCurrency is not USD
      const valueInUSD = amount / fromRate;
      // Then convert from USD to target currency
      const result = valueInUSD * toRate;
      
      setConvertedAmount(parseFloat(result.toFixed(2)));
      setIsConverting(false);
      setHasConverted(true);
    }, 600);
  };
  
  const swapCurrencies = () => {
    setIsConverting(true);
    
    // Animated swap effect
    setTimeout(() => {
      const temp = fromCurrency;
      setFromCurrency(toCurrency);
      setToCurrency(temp);
      
      // Update active currency
      setCurrency(fromCurrency);
    }, 300);
  };
  
  const formatCurrency = (value: number, code: CurrencyCode): string => {
    const currencyInfo = currencies[code];
    return `${currencyInfo.symbol} ${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };
  
  // Compact version for the header/navbar
  if (compact) {
    return (
      <div className={`flex items-center ${className}`}>
        <Input
          type="number"
          value={amount.toString()}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          className="w-20 h-8 text-sm"
        />
        
        <Select
          value={fromCurrency}
          onValueChange={(value) => setFromCurrency(value as CurrencyCode)}
        >
          <SelectTrigger className="w-20 h-8 text-sm mx-1">
            <SelectValue placeholder={fromCurrency} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(currencies).map((code) => (
              <SelectItem key={code} value={code}>
                {code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={swapCurrencies}
        >
          <ArrowRightLeft className="h-4 w-4" />
        </Button>
        
        <Select
          value={toCurrency}
          onValueChange={(value) => {
            setToCurrency(value as CurrencyCode);
            setCurrency(value as CurrencyCode);
          }}
        >
          <SelectTrigger className="w-20 h-8 text-sm mx-1">
            <SelectValue placeholder={toCurrency} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(currencies).map((code) => (
              <SelectItem key={code} value={code}>
                {code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`${convertedAmount}-${toCurrency}-${isConverting}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-w-[100px] text-right"
          >
            {isConverting ? (
              <div className="flex justify-center items-center h-full">
                <RefreshCw className="h-4 w-4 animate-spin text-primary" />
              </div>
            ) : (
              <div className="font-medium text-sm">
                {formatCurrency(convertedAmount, toCurrency)}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
  
  // Full version with card layout
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardTitle className={language === 'ar' ? 'font-cairo' : ''}>
          {t("Currency Converter", "محول العملات")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Amount", "المبلغ")}
            </label>
            <Input
              type="number"
              value={amount.toString()}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="h-10"
            />
          </div>
          
          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
            <div className="space-y-2">
              <label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("From", "من")}
              </label>
              <Select
                value={fromCurrency}
                onValueChange={(value) => setFromCurrency(value as CurrencyCode)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={fromCurrency} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(currencies).map((code) => (
                    <SelectItem key={code} value={code}>
                      <div className="flex justify-between w-full">
                        <span>{code}</span>
                        <span className="text-gray-500 text-xs ml-2">
                          {language === 'en' ? currencies[code as CurrencyCode].name : currencies[code as CurrencyCode].nameAr}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 border-dashed"
                onClick={swapCurrencies}
              >
                <motion.div
                  animate={{ rotate: isConverting ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ArrowRightLeft 
                    className="h-4 w-4" 
                    style={{ transform: direction === 'rtl' ? 'scaleX(-1)' : 'none' }}
                  />
                </motion.div>
              </Button>
            </div>
            
            <div className="space-y-2">
              <label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                {t("To", "إلى")}
              </label>
              <Select
                value={toCurrency}
                onValueChange={(value) => {
                  setToCurrency(value as CurrencyCode);
                  setCurrency(value as CurrencyCode);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={toCurrency} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(currencies).map((code) => (
                    <SelectItem key={code} value={code}>
                      <div className="flex justify-between w-full">
                        <span>{code}</span>
                        <span className="text-gray-500 text-xs ml-2">
                          {language === 'en' ? currencies[code as CurrencyCode].name : currencies[code as CurrencyCode].nameAr}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-4">
            <div className={`text-sm font-medium mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t("Converted Amount", "المبلغ المحول")}
            </div>
            
            <div className="bg-muted/40 rounded-lg p-4 h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${convertedAmount}-${toCurrency}-${isConverting}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {isConverting ? (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-5 w-5 animate-spin text-primary" />
                      <span>{t("Converting...", "جاري التحويل...")}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-2xl font-bold">
                        {formatCurrency(convertedAmount, toCurrency)}
                      </span>
                      <div className="text-xs text-muted-foreground mt-1">
                        {t(
                          `1 ${fromCurrency} = ${(currencies[toCurrency].rate / currencies[fromCurrency].rate).toFixed(4)} ${toCurrency}`,
                          `1 ${fromCurrency} = ${(currencies[toCurrency].rate / currencies[fromCurrency].rate).toFixed(4)} ${toCurrency}`
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}