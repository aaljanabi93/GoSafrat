import { useCurrency, currencies, type CurrencyCode } from "@/context/currency-context";
import { useLanguage } from "@/context/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const { language } = useLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-1 text-sm cursor-pointer focus:outline-none">
        <span className="font-medium">{currency.code}</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {Object.keys(currencies).map((code) => {
          const currencyInfo = currencies[code as CurrencyCode];
          return (
            <DropdownMenuItem
              key={code}
              className={`flex justify-between ${language === 'ar' ? 'font-cairo' : ''}`}
              onClick={() => setCurrency(code as CurrencyCode)}
            >
              <span>{code}</span>
              <span className="text-gray-500 text-xs">
                {language === 'en' ? currencyInfo.name : currencyInfo.nameAr}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}