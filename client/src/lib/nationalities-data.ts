export interface Nationality {
  code: string;
  name: string;
  nameAr: string;
  region: string;
}

export interface VisaRequirement {
  destination: string;  // Country code
  nationality: string;  // Country code of traveler
  required: boolean;
  onArrival: boolean;
  notes?: string;
}

// ISO 3166-1 alpha-2 country codes
export const nationalities: Nationality[] = [
  // Middle East
  { code: "AE", name: "United Arab Emirates", nameAr: "الإمارات العربية المتحدة", region: "Middle East" },
  { code: "SA", name: "Saudi Arabia", nameAr: "المملكة العربية السعودية", region: "Middle East" },
  { code: "QA", name: "Qatar", nameAr: "قطر", region: "Middle East" },
  { code: "KW", name: "Kuwait", nameAr: "الكويت", region: "Middle East" },
  { code: "BH", name: "Bahrain", nameAr: "البحرين", region: "Middle East" },
  { code: "OM", name: "Oman", nameAr: "عمان", region: "Middle East" },
  { code: "JO", name: "Jordan", nameAr: "الأردن", region: "Middle East" },
  { code: "LB", name: "Lebanon", nameAr: "لبنان", region: "Middle East" },
  { code: "IQ", name: "Iraq", nameAr: "العراق", region: "Middle East" },
  { code: "YE", name: "Yemen", nameAr: "اليمن", region: "Middle East" },
  { code: "SY", name: "Syria", nameAr: "سوريا", region: "Middle East" },
  { code: "PS", name: "Palestine", nameAr: "فلسطين", region: "Middle East" },
  { code: "IL", name: "Israel", nameAr: "إسرائيل", region: "Middle East" },
  { code: "IR", name: "Iran", nameAr: "إيران", region: "Middle East" },
  { code: "TR", name: "Turkey", nameAr: "تركيا", region: "Middle East" },
  { code: "EG", name: "Egypt", nameAr: "مصر", region: "Middle East" },
  
  // North America
  { code: "US", name: "United States", nameAr: "الولايات المتحدة", region: "North America" },
  { code: "CA", name: "Canada", nameAr: "كندا", region: "North America" },
  { code: "MX", name: "Mexico", nameAr: "المكسيك", region: "North America" },

  // Europe
  { code: "GB", name: "United Kingdom", nameAr: "المملكة المتحدة", region: "Europe" },
  { code: "FR", name: "France", nameAr: "فرنسا", region: "Europe" },
  { code: "DE", name: "Germany", nameAr: "ألمانيا", region: "Europe" },
  { code: "IT", name: "Italy", nameAr: "إيطاليا", region: "Europe" },
  { code: "ES", name: "Spain", nameAr: "إسبانيا", region: "Europe" },
  { code: "PT", name: "Portugal", nameAr: "البرتغال", region: "Europe" },
  { code: "NL", name: "Netherlands", nameAr: "هولندا", region: "Europe" },
  { code: "BE", name: "Belgium", nameAr: "بلجيكا", region: "Europe" },
  { code: "CH", name: "Switzerland", nameAr: "سويسرا", region: "Europe" },
  { code: "AT", name: "Austria", nameAr: "النمسا", region: "Europe" },
  { code: "GR", name: "Greece", nameAr: "اليونان", region: "Europe" },
  { code: "SE", name: "Sweden", nameAr: "السويد", region: "Europe" },
  { code: "NO", name: "Norway", nameAr: "النرويج", region: "Europe" },
  { code: "DK", name: "Denmark", nameAr: "الدنمارك", region: "Europe" },
  { code: "FI", name: "Finland", nameAr: "فنلندا", region: "Europe" },
  { code: "IE", name: "Ireland", nameAr: "أيرلندا", region: "Europe" },
  { code: "PL", name: "Poland", nameAr: "بولندا", region: "Europe" },
  { code: "RU", name: "Russia", nameAr: "روسيا", region: "Europe" },
  
  // Asia
  { code: "CN", name: "China", nameAr: "الصين", region: "Asia" },
  { code: "JP", name: "Japan", nameAr: "اليابان", region: "Asia" },
  { code: "KR", name: "South Korea", nameAr: "كوريا الجنوبية", region: "Asia" },
  { code: "IN", name: "India", nameAr: "الهند", region: "Asia" },
  { code: "PK", name: "Pakistan", nameAr: "باكستان", region: "Asia" },
  { code: "BD", name: "Bangladesh", nameAr: "بنغلاديش", region: "Asia" },
  { code: "ID", name: "Indonesia", nameAr: "إندونيسيا", region: "Asia" },
  { code: "MY", name: "Malaysia", nameAr: "ماليزيا", region: "Asia" },
  { code: "SG", name: "Singapore", nameAr: "سنغافورة", region: "Asia" },
  { code: "TH", name: "Thailand", nameAr: "تايلاند", region: "Asia" },
  { code: "PH", name: "Philippines", nameAr: "الفلبين", region: "Asia" },
  { code: "VN", name: "Vietnam", nameAr: "فيتنام", region: "Asia" },
  
  // Africa
  { code: "ZA", name: "South Africa", nameAr: "جنوب أفريقيا", region: "Africa" },
  { code: "NG", name: "Nigeria", nameAr: "نيجيريا", region: "Africa" },
  { code: "MA", name: "Morocco", nameAr: "المغرب", region: "Africa" },
  { code: "DZ", name: "Algeria", nameAr: "الجزائر", region: "Africa" },
  { code: "TN", name: "Tunisia", nameAr: "تونس", region: "Africa" },
  { code: "LY", name: "Libya", nameAr: "ليبيا", region: "Africa" },
  { code: "SD", name: "Sudan", nameAr: "السودان", region: "Africa" },
  { code: "ET", name: "Ethiopia", nameAr: "إثيوبيا", region: "Africa" },
  { code: "KE", name: "Kenya", nameAr: "كينيا", region: "Africa" },
  
  // South America
  { code: "BR", name: "Brazil", nameAr: "البرازيل", region: "South America" },
  { code: "AR", name: "Argentina", nameAr: "الأرجنتين", region: "South America" },
  { code: "CL", name: "Chile", nameAr: "تشيلي", region: "South America" },
  { code: "CO", name: "Colombia", nameAr: "كولومبيا", region: "South America" },
  { code: "PE", name: "Peru", nameAr: "بيرو", region: "South America" },
  
  // Oceania
  { code: "AU", name: "Australia", nameAr: "أستراليا", region: "Oceania" },
  { code: "NZ", name: "New Zealand", nameAr: "نيوزيلندا", region: "Oceania" },
];

// A dataset of visa requirements between countries
// This is a simplified version for demonstration purposes
export const visaRequirements: VisaRequirement[] = [
  // Requirements for traveling to the United States
  { destination: "US", nationality: "CA", required: false, onArrival: false },
  { destination: "US", nationality: "GB", required: true, onArrival: false, notes: "ESTA required" },
  { destination: "US", nationality: "DE", required: true, onArrival: false, notes: "ESTA required" },
  { destination: "US", nationality: "FR", required: true, onArrival: false, notes: "ESTA required" },
  { destination: "US", nationality: "IT", required: true, onArrival: false, notes: "ESTA required" },
  { destination: "US", nationality: "ES", required: true, onArrival: false, notes: "ESTA required" },
  { destination: "US", nationality: "AE", required: true, onArrival: false },
  { destination: "US", nationality: "SA", required: true, onArrival: false },
  { destination: "US", nationality: "QA", required: true, onArrival: false },
  { destination: "US", nationality: "KW", required: true, onArrival: false },
  { destination: "US", nationality: "BH", required: true, onArrival: false },
  { destination: "US", nationality: "OM", required: true, onArrival: false },
  { destination: "US", nationality: "JO", required: true, onArrival: false },
  { destination: "US", nationality: "IN", required: true, onArrival: false },
  { destination: "US", nationality: "CN", required: true, onArrival: false },
  { destination: "US", nationality: "JP", required: true, onArrival: false, notes: "ESTA required" },
  { destination: "US", nationality: "KR", required: true, onArrival: false, notes: "ESTA required" },
  { destination: "US", nationality: "AU", required: true, onArrival: false, notes: "ESTA required" },
  { destination: "US", nationality: "NZ", required: true, onArrival: false, notes: "ESTA required" },
  
  // Requirements for traveling to the UK
  { destination: "GB", nationality: "US", required: true, onArrival: false, notes: "ETA required" },
  { destination: "GB", nationality: "CA", required: true, onArrival: false, notes: "ETA required" },
  { destination: "GB", nationality: "DE", required: false, onArrival: false },
  { destination: "GB", nationality: "FR", required: false, onArrival: false },
  { destination: "GB", nationality: "IT", required: false, onArrival: false },
  { destination: "GB", nationality: "ES", required: false, onArrival: false },
  { destination: "GB", nationality: "AE", required: true, onArrival: false },
  { destination: "GB", nationality: "SA", required: true, onArrival: false },
  { destination: "GB", nationality: "QA", required: true, onArrival: false },
  { destination: "GB", nationality: "KW", required: true, onArrival: false },
  { destination: "GB", nationality: "BH", required: true, onArrival: false },
  { destination: "GB", nationality: "OM", required: true, onArrival: false },
  { destination: "GB", nationality: "JO", required: true, onArrival: false },
  { destination: "GB", nationality: "IN", required: true, onArrival: false },
  { destination: "GB", nationality: "CN", required: true, onArrival: false },
  { destination: "GB", nationality: "JP", required: true, onArrival: false },
  { destination: "GB", nationality: "KR", required: true, onArrival: false },
  { destination: "GB", nationality: "AU", required: true, onArrival: false, notes: "ETA required" },
  { destination: "GB", nationality: "NZ", required: true, onArrival: false, notes: "ETA required" },
  
  // Requirements for traveling to Schengen Area (using Germany as example)
  { destination: "DE", nationality: "US", required: false, onArrival: false },
  { destination: "DE", nationality: "CA", required: false, onArrival: false },
  { destination: "DE", nationality: "GB", required: false, onArrival: false },
  { destination: "DE", nationality: "FR", required: false, onArrival: false },
  { destination: "DE", nationality: "IT", required: false, onArrival: false },
  { destination: "DE", nationality: "ES", required: false, onArrival: false },
  { destination: "DE", nationality: "AE", required: true, onArrival: false },
  { destination: "DE", nationality: "SA", required: true, onArrival: false },
  { destination: "DE", nationality: "QA", required: true, onArrival: false },
  { destination: "DE", nationality: "KW", required: true, onArrival: false },
  { destination: "DE", nationality: "BH", required: true, onArrival: false },
  { destination: "DE", nationality: "OM", required: true, onArrival: false },
  { destination: "DE", nationality: "JO", required: true, onArrival: false },
  { destination: "DE", nationality: "IN", required: true, onArrival: false },
  { destination: "DE", nationality: "CN", required: true, onArrival: false },
  { destination: "DE", nationality: "JP", required: false, onArrival: false },
  { destination: "DE", nationality: "KR", required: false, onArrival: false },
  { destination: "DE", nationality: "AU", required: false, onArrival: false },
  { destination: "DE", nationality: "NZ", required: false, onArrival: false },
  
  // Requirements for traveling to UAE
  { destination: "AE", nationality: "US", required: false, onArrival: true },
  { destination: "AE", nationality: "CA", required: false, onArrival: true },
  { destination: "AE", nationality: "GB", required: false, onArrival: true },
  { destination: "AE", nationality: "DE", required: false, onArrival: true },
  { destination: "AE", nationality: "FR", required: false, onArrival: true },
  { destination: "AE", nationality: "IT", required: false, onArrival: true },
  { destination: "AE", nationality: "ES", required: false, onArrival: true },
  { destination: "AE", nationality: "SA", required: false, onArrival: false, notes: "GCC citizens" },
  { destination: "AE", nationality: "QA", required: false, onArrival: false, notes: "GCC citizens" },
  { destination: "AE", nationality: "KW", required: false, onArrival: false, notes: "GCC citizens" },
  { destination: "AE", nationality: "BH", required: false, onArrival: false, notes: "GCC citizens" },
  { destination: "AE", nationality: "OM", required: false, onArrival: false, notes: "GCC citizens" },
  { destination: "AE", nationality: "JO", required: true, onArrival: false },
  { destination: "AE", nationality: "IN", required: true, onArrival: false },
  { destination: "AE", nationality: "CN", required: true, onArrival: false },
  { destination: "AE", nationality: "JP", required: false, onArrival: true },
  { destination: "AE", nationality: "KR", required: false, onArrival: true },
  { destination: "AE", nationality: "AU", required: false, onArrival: true },
  { destination: "AE", nationality: "NZ", required: false, onArrival: true },
  
  // Requirements for traveling to Jordan
  { destination: "JO", nationality: "US", required: true, onArrival: true },
  { destination: "JO", nationality: "CA", required: true, onArrival: true },
  { destination: "JO", nationality: "GB", required: true, onArrival: true },
  { destination: "JO", nationality: "DE", required: true, onArrival: true },
  { destination: "JO", nationality: "FR", required: true, onArrival: true },
  { destination: "JO", nationality: "IT", required: true, onArrival: true },
  { destination: "JO", nationality: "ES", required: true, onArrival: true },
  { destination: "JO", nationality: "AE", required: false, onArrival: false },
  { destination: "JO", nationality: "SA", required: false, onArrival: false },
  { destination: "JO", nationality: "QA", required: false, onArrival: false },
  { destination: "JO", nationality: "KW", required: false, onArrival: false },
  { destination: "JO", nationality: "BH", required: false, onArrival: false },
  { destination: "JO", nationality: "OM", required: false, onArrival: false },
  { destination: "JO", nationality: "IN", required: true, onArrival: false },
  { destination: "JO", nationality: "CN", required: true, onArrival: false },
  { destination: "JO", nationality: "JP", required: true, onArrival: true },
  { destination: "JO", nationality: "KR", required: true, onArrival: true },
  { destination: "JO", nationality: "AU", required: true, onArrival: true },
  { destination: "JO", nationality: "NZ", required: true, onArrival: true },
  
  // Requirements for traveling to Egypt
  { destination: "EG", nationality: "US", required: true, onArrival: true },
  { destination: "EG", nationality: "CA", required: true, onArrival: true },
  { destination: "EG", nationality: "GB", required: true, onArrival: true },
  { destination: "EG", nationality: "DE", required: true, onArrival: true },
  { destination: "EG", nationality: "FR", required: true, onArrival: true },
  { destination: "EG", nationality: "IT", required: true, onArrival: true },
  { destination: "EG", nationality: "ES", required: true, onArrival: true },
  { destination: "EG", nationality: "AE", required: false, onArrival: false },
  { destination: "EG", nationality: "SA", required: false, onArrival: false },
  { destination: "EG", nationality: "QA", required: false, onArrival: false },
  { destination: "EG", nationality: "KW", required: false, onArrival: false },
  { destination: "EG", nationality: "BH", required: false, onArrival: false },
  { destination: "EG", nationality: "OM", required: false, onArrival: false },
  { destination: "EG", nationality: "JO", required: false, onArrival: false },
  { destination: "EG", nationality: "IN", required: true, onArrival: false },
  { destination: "EG", nationality: "CN", required: true, onArrival: false },
  { destination: "EG", nationality: "JP", required: true, onArrival: true },
  { destination: "EG", nationality: "KR", required: true, onArrival: true },
  { destination: "EG", nationality: "AU", required: true, onArrival: true },
  { destination: "EG", nationality: "NZ", required: true, onArrival: true },
];

// Helper function to get nationality by code
export const getNationalityByCode = (code: string): Nationality | undefined => {
  return nationalities.find(nationality => nationality.code === code);
};

// Helper function to check if visa is required
export const checkVisaRequirement = (
  nationalityCode: string, 
  destinationCode: string
): { required: boolean; onArrival: boolean; notes?: string } | null => {
  // If same country, no visa required
  if (nationalityCode === destinationCode) {
    return { required: false, onArrival: false };
  }
  
  // Find the visa requirement in our database
  const requirement = visaRequirements.find(
    req => req.nationality === nationalityCode && req.destination === destinationCode
  );
  
  if (requirement) {
    return {
      required: requirement.required,
      onArrival: requirement.onArrival,
      notes: requirement.notes
    };
  }
  
  // Default to requiring visa if not found in our database
  return { required: true, onArrival: false };
};

// Helper function to get nationalities by region
export const getNationalitiesByRegion = (region: string): Nationality[] => {
  return nationalities.filter(nationality => nationality.region === region);
};

// Helper function to search nationalities
export const searchNationalities = (query: string): Nationality[] => {
  const lowercaseQuery = query.toLowerCase();
  return nationalities.filter(nationality => 
    nationality.code.toLowerCase().includes(lowercaseQuery) || 
    nationality.name.toLowerCase().includes(lowercaseQuery) || 
    nationality.nameAr.includes(lowercaseQuery)
  );
};

// Helper function to get destination country code from airport code
export const getCountryCodeFromAirport = (airportCode: string): string => {
  // This is a simplified version
  // In a real application, you would use a more comprehensive airport database
  const airportCountryMap: Record<string, string> = {
    // US airports
    "JFK": "US", "LAX": "US", "ORD": "US", "MIA": "US", "DFW": "US", 
    "SFO": "US", "ATL": "US", "LAS": "US", "SEA": "US", "BOS": "US",
    
    // Canada airports
    "YYZ": "CA", "YVR": "CA", "YUL": "CA", "YYC": "CA", "YOW": "CA",
    
    // UK airports
    "LHR": "GB", "LGW": "GB", "MAN": "GB", "EDI": "GB", "BHX": "GB",
    
    // Germany airports
    "FRA": "DE", "MUC": "DE", "TXL": "DE", "DUS": "DE", "HAM": "DE",
    
    // France airports
    "CDG": "FR", "ORY": "FR", "NCE": "FR", "LYS": "FR", "MRS": "FR",
    
    // UAE airports
    "DXB": "AE", "AUH": "AE", "SHJ": "AE",
    
    // Saudi Arabia airports
    "RUH": "SA", "JED": "SA", "DMM": "SA", "MED": "SA",
    
    // Qatar, Kuwait, Bahrain, Oman airports
    "DOH": "QA", "KWI": "KW", "BAH": "BH", "MCT": "OM",
    
    // Jordan airports
    "AMM": "JO", "AQJ": "JO",
    
    // Egypt airports
    "CAI": "EG", "HBE": "EG", "LXR": "EG", "SSH": "EG",
    
    // Other Middle East
    "BEY": "LB", "BGW": "IQ", "BSR": "IQ", "EBL": "IQ", "TLV": "IL", "THR": "IR",
    
    // Europe major airports
    "AMS": "NL", "MAD": "ES", "BCN": "ES", "FCO": "IT", "MXP": "IT",
    "ZRH": "CH", "VIE": "AT", "BRU": "BE", "CPH": "DK", "ARN": "SE",
    "OSL": "NO", "HEL": "FI", "LIS": "PT", "ATH": "GR", "IST": "TR",
    
    // Asia major airports
    "HKG": "HK", "PEK": "CN", "PVG": "CN", "NRT": "JP", "HND": "JP",
    "ICN": "KR", "SIN": "SG", "BKK": "TH", "KUL": "MY", "DEL": "IN",
    "BOM": "IN",
    
    // Australia & New Zealand
    "SYD": "AU", "MEL": "AU", "BNE": "AU", "AKL": "NZ",
    
    // Default to US if not found
    "default": "US"
  };
  
  return airportCountryMap[airportCode] || airportCountryMap.default;
};