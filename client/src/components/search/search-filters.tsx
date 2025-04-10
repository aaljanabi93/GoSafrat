import React, { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAirlineByCode, getAllAirlines } from "@/lib/airlines-data";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Define types for filter options
export interface PriceRange {
  min: number;
  max: number;
  current: [number, number];
}

export interface TimeRange {
  departure: [number, number]; // 24-hour format, e.g. [6, 12] means 6:00 AM to 12:00 PM
  arrival: [number, number];
}

export interface SearchFilters {
  priceRange: PriceRange;
  airlines: string[]; // Airline codes
  stops: number[]; // 0 = nonstop, 1 = 1 stop, 2 = 2+ stops
  departureTime: [number, number]; // Range in hours (0-24)
  arrivalTime: [number, number]; // Range in hours (0-24)
  duration: number; // Maximum duration in minutes
  layoverAirports?: string[]; // Airport codes for layovers
  onlyRefundable?: boolean;
}

export interface FilterProps {
  filters: SearchFilters;
  onFilterChange: (newFilters: SearchFilters) => void;
  onClearFilters: () => void;
  resultsCount: number;
  type?: "flight" | "hotel" | "car";
  currency: string;
}

export function formatTime(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${period}`;
}

export function formatTimeRange(range: [number, number]): string {
  return `${formatTime(range[0])} - ${formatTime(range[1])}`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const SearchFilters: React.FC<FilterProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  resultsCount,
  type = "flight",
  currency,
}) => {
  const { t, language } = useLanguage();
  const airlines = getAllAirlines();
  
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>(filters.airlines);
  const [selectedStops, setSelectedStops] = useState<number[]>(filters.stops);
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange.current);
  const [departureRange, setDepartureRange] = useState<[number, number]>(filters.departureTime);
  const [arrivalRange, setArrivalRange] = useState<[number, number]>(filters.arrivalTime);
  const [maxDuration, setMaxDuration] = useState<number>(filters.duration);
  const [refundableOnly, setRefundableOnly] = useState<boolean>(filters.onlyRefundable || false);

  // Apply filters when user clicks apply button
  const applyFilters = () => {
    const newFilters: SearchFilters = {
      ...filters,
      airlines: selectedAirlines,
      stops: selectedStops,
      priceRange: {
        ...filters.priceRange,
        current: priceRange,
      },
      departureTime: departureRange,
      arrivalTime: arrivalRange,
      duration: maxDuration,
      onlyRefundable: refundableOnly,
    };
    onFilterChange(newFilters);
  };

  // Reset filters to default values
  const resetFilters = () => {
    setSelectedAirlines([]);
    setSelectedStops([]);
    setPriceRange([filters.priceRange.min, filters.priceRange.max]);
    setDepartureRange([0, 24]);
    setArrivalRange([0, 24]);
    setMaxDuration(1440); // 24 hours in minutes
    setRefundableOnly(false);
    onClearFilters();
  };

  // Handle airline toggle
  const toggleAirline = (airlineCode: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airlineCode)
        ? prev.filter((code) => code !== airlineCode)
        : [...prev, airlineCode]
    );
  };

  // Handle stops toggle
  const toggleStops = (stopCount: number) => {
    setSelectedStops((prev) =>
      prev.includes(stopCount)
        ? prev.filter((count) => count !== stopCount)
        : [...prev, stopCount]
    );
  };

  // Active filter count for badge
  const activeFilterCount = () => {
    let count = 0;
    if (selectedAirlines.length > 0) count++;
    if (selectedStops.length > 0) count++;
    if (
      priceRange[0] !== filters.priceRange.min ||
      priceRange[1] !== filters.priceRange.max
    )
      count++;
    if (departureRange[0] !== 0 || departureRange[1] !== 24) count++;
    if (arrivalRange[0] !== 0 || arrivalRange[1] !== 24) count++;
    if (maxDuration !== 1440) count++;
    if (refundableOnly) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
          {t("Filters", "الفلاتر")}
          {activeFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount()}
            </Badge>
          )}
        </h3>
        {activeFilterCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            <X className="h-3 w-3 mr-1" />
            {t("Clear All", "مسح الكل")}
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["price", "airlines", "stops"]}>
        {/* Price Range Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Price Range", "نطاق السعر")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {formatPrice(priceRange[0], currency)}
                </span>
                <span className="text-sm font-medium">
                  {formatPrice(priceRange[1], currency)}
                </span>
              </div>
              <Slider
                defaultValue={priceRange}
                min={filters.priceRange.min}
                max={filters.priceRange.max}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Airlines Filter */}
        <AccordionItem value="airlines">
          <AccordionTrigger className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Airlines", "شركات الطيران")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {airlines.map((airline) => (
                <div key={airline.code} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox
                    id={`airline-${airline.code}`}
                    checked={selectedAirlines.includes(airline.code)}
                    onCheckedChange={() => toggleAirline(airline.code)}
                  />
                  <Label
                    htmlFor={`airline-${airline.code}`}
                    className="flex items-center text-sm cursor-pointer"
                  >
                    <img
                      src={airline.logo}
                      alt={airline.name}
                      className="w-5 h-5 object-contain mr-2"
                    />
                    <span className={language === 'ar' && airline.nameAr ? 'font-cairo' : ''}>
                      {language === 'ar' && airline.nameAr ? airline.nameAr : airline.name}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Stops Filter */}
        <AccordionItem value="stops">
          <AccordionTrigger className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Stops", "التوقفات")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="stops-0"
                  checked={selectedStops.includes(0)}
                  onCheckedChange={() => toggleStops(0)}
                />
                <Label
                  htmlFor="stops-0"
                  className={`text-sm cursor-pointer ${language === 'ar' ? 'font-cairo' : ''}`}
                >
                  {t("Nonstop", "بدون توقف")}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="stops-1"
                  checked={selectedStops.includes(1)}
                  onCheckedChange={() => toggleStops(1)}
                />
                <Label
                  htmlFor="stops-1"
                  className={`text-sm cursor-pointer ${language === 'ar' ? 'font-cairo' : ''}`}
                >
                  {t("1 Stop", "توقف واحد")}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="stops-2"
                  checked={selectedStops.includes(2)}
                  onCheckedChange={() => toggleStops(2)}
                />
                <Label
                  htmlFor="stops-2"
                  className={`text-sm cursor-pointer ${language === 'ar' ? 'font-cairo' : ''}`}
                >
                  {t("2+ Stops", "توقفين أو أكثر")}
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Departure Time Filter */}
        <AccordionItem value="departure">
          <AccordionTrigger className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Departure Time", "وقت المغادرة")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {formatTime(departureRange[0])}
                </span>
                <span className="text-sm font-medium">
                  {formatTime(departureRange[1])}
                </span>
              </div>
              <Slider
                defaultValue={departureRange}
                min={0}
                max={24}
                step={1}
                value={departureRange}
                onValueChange={(value) => setDepartureRange(value as [number, number])}
              />
              <div className="grid grid-cols-4 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="py-1 h-auto text-xs"
                  onClick={() => setDepartureRange([0, 6])}
                >
                  {t("Early Morning", "الصباح الباكر")}
                  <br />
                  12AM - 6AM
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="py-1 h-auto text-xs"
                  onClick={() => setDepartureRange([6, 12])}
                >
                  {t("Morning", "الصباح")}
                  <br />
                  6AM - 12PM
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="py-1 h-auto text-xs"
                  onClick={() => setDepartureRange([12, 18])}
                >
                  {t("Afternoon", "بعد الظهر")}
                  <br />
                  12PM - 6PM
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="py-1 h-auto text-xs"
                  onClick={() => setDepartureRange([18, 24])}
                >
                  {t("Evening", "المساء")}
                  <br />
                  6PM - 12AM
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Arrival Time Filter */}
        <AccordionItem value="arrival">
          <AccordionTrigger className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Arrival Time", "وقت الوصول")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {formatTime(arrivalRange[0])}
                </span>
                <span className="text-sm font-medium">
                  {formatTime(arrivalRange[1])}
                </span>
              </div>
              <Slider
                defaultValue={arrivalRange}
                min={0}
                max={24}
                step={1}
                value={arrivalRange}
                onValueChange={(value) => setArrivalRange(value as [number, number])}
              />
              <div className="grid grid-cols-4 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="py-1 h-auto text-xs"
                  onClick={() => setArrivalRange([0, 6])}
                >
                  {t("Early Morning", "الصباح الباكر")}
                  <br />
                  12AM - 6AM
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="py-1 h-auto text-xs"
                  onClick={() => setArrivalRange([6, 12])}
                >
                  {t("Morning", "الصباح")}
                  <br />
                  6AM - 12PM
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="py-1 h-auto text-xs"
                  onClick={() => setArrivalRange([12, 18])}
                >
                  {t("Afternoon", "بعد الظهر")}
                  <br />
                  12PM - 6PM
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="py-1 h-auto text-xs"
                  onClick={() => setArrivalRange([18, 24])}
                >
                  {t("Evening", "المساء")}
                  <br />
                  6PM - 12AM
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Flight Duration Filter */}
        <AccordionItem value="duration">
          <AccordionTrigger className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Flight Duration", "مدة الرحلة")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {t("Max Duration", "الحد الأقصى للمدة")}
                </span>
                <span className="text-sm font-medium">
                  {formatDuration(maxDuration)}
                </span>
              </div>
              <Slider
                defaultValue={[maxDuration]}
                min={60}
                max={1440}
                step={30}
                value={[maxDuration]}
                onValueChange={(value) => setMaxDuration(value[0])}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Options */}
        <AccordionItem value="options">
          <AccordionTrigger className={language === 'ar' ? 'font-cairo' : ''}>
            {t("Additional Options", "خيارات إضافية")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="refundable"
                  checked={refundableOnly}
                  onCheckedChange={(checked) => setRefundableOnly(checked === true)}
                />
                <Label
                  htmlFor="refundable"
                  className={`text-sm cursor-pointer ${language === 'ar' ? 'font-cairo' : ''}`}
                >
                  {t("Refundable Only", "قابل للاسترداد فقط")}
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{resultsCount}</span>{" "}
          {t("results found", "نتائج")}
        </div>
        <Button onClick={applyFilters} className="w-1/3">
          {t("Apply", "تطبيق")}
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;