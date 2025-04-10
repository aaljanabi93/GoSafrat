import React from "react";
import { useLanguage } from "@/context/language-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "price_asc" | "price_desc" | "duration_asc" | "duration_desc" | "departure_asc" | "departure_desc" | "arrival_asc" | "arrival_desc" | "recommended";

interface SortProps {
  currentSort: SortOption;
  onSortChange: (sortOption: SortOption) => void;
  type?: "flight" | "hotel" | "car";
}

export const SearchSort: React.FC<SortProps> = ({
  currentSort,
  onSortChange,
  type = "flight",
}) => {
  const { t, language } = useLanguage();

  const getSortOptions = () => {
    switch (type) {
      case "flight":
        return [
          { value: "recommended", label: t("Recommended", "الأنسب") },
          { value: "price_asc", label: t("Price: Low to High", "السعر: من الأقل إلى الأعلى") },
          { value: "price_desc", label: t("Price: High to Low", "السعر: من الأعلى إلى الأقل") },
          { value: "duration_asc", label: t("Duration: Shortest", "المدة: الأقصر") },
          { value: "departure_asc", label: t("Departure: Earliest", "المغادرة: الأبكر") },
          { value: "departure_desc", label: t("Departure: Latest", "المغادرة: الأخير") },
          { value: "arrival_asc", label: t("Arrival: Earliest", "الوصول: الأبكر") },
          { value: "arrival_desc", label: t("Arrival: Latest", "الوصول: الأخير") },
        ];
      case "hotel":
        return [
          { value: "recommended", label: t("Recommended", "الأنسب") },
          { value: "price_asc", label: t("Price: Low to High", "السعر: من الأقل إلى الأعلى") },
          { value: "price_desc", label: t("Price: High to Low", "السعر: من الأعلى إلى الأقل") },
          { value: "rating_desc", label: t("Rating: Highest First", "التقييم: الأعلى أولاً") },
        ];
      case "car":
        return [
          { value: "recommended", label: t("Recommended", "الأنسب") },
          { value: "price_asc", label: t("Price: Low to High", "السعر: من الأقل إلى الأعلى") },
          { value: "price_desc", label: t("Price: High to Low", "السعر: من الأعلى إلى الأقل") },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <label className={`text-sm text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
        {t("Sort by:", "ترتيب حسب:")}
      </label>
      <Select
        value={currentSort}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="h-9 w-52">
          <SelectValue placeholder={t("Recommended", "الأنسب")} />
        </SelectTrigger>
        <SelectContent>
          {getSortOptions().map((option) => (
            <SelectItem key={option.value} value={option.value} className={language === 'ar' ? 'font-cairo' : ''}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchSort;