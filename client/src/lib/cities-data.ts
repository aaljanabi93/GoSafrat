export interface City {
  code: string;
  name: string;
  nameAr?: string;
  country: string;
  countryCode: string;
  region: "North America" | "Middle East" | "Europe" | "Asia" | "Africa" | "South America" | "Oceania";
}

export const cities: City[] = [
  // Middle East
  { code: "DXB", name: "Dubai", country: "United Arab Emirates", countryCode: "AE", region: "Middle East" },
  { code: "AUH", name: "Abu Dhabi", country: "United Arab Emirates", countryCode: "AE", region: "Middle East" },
  { code: "SHJ", name: "Sharjah", country: "United Arab Emirates", countryCode: "AE", region: "Middle East" },
  { code: "DOH", name: "Doha", country: "Qatar", countryCode: "QA", region: "Middle East" },
  { code: "RUH", name: "Riyadh", country: "Saudi Arabia", countryCode: "SA", region: "Middle East" },
  { code: "JED", name: "Jeddah", country: "Saudi Arabia", countryCode: "SA", region: "Middle East" },
  { code: "DMM", name: "Dammam", country: "Saudi Arabia", countryCode: "SA", region: "Middle East" },
  { code: "MED", name: "Medina", country: "Saudi Arabia", countryCode: "SA", region: "Middle East" },
  { code: "AMM", name: "Amman", country: "Jordan", countryCode: "JO", region: "Middle East" },
  { code: "AQJ", name: "Aqaba", country: "Jordan", countryCode: "JO", region: "Middle East" },
  { code: "CAI", name: "Cairo", country: "Egypt", countryCode: "EG", region: "Middle East" },
  { code: "HBE", name: "Alexandria", country: "Egypt", countryCode: "EG", region: "Middle East" },
  { code: "LXR", name: "Luxor", country: "Egypt", countryCode: "EG", region: "Middle East" },
  { code: "HRG", name: "Hurghada", country: "Egypt", countryCode: "EG", region: "Middle East" },
  { code: "SSH", name: "Sharm El Sheikh", country: "Egypt", countryCode: "EG", region: "Middle East" },
  { code: "BGW", name: "Baghdad", country: "Iraq", countryCode: "IQ", region: "Middle East" },
  { code: "BSR", name: "Basra", country: "Iraq", countryCode: "IQ", region: "Middle East" },
  { code: "ISU", name: "Sulaimaniyah", country: "Iraq", countryCode: "IQ", region: "Middle East" },
  { code: "NJF", name: "Najaf", country: "Iraq", countryCode: "IQ", region: "Middle East" },
  { code: "EBL", name: "Erbil", country: "Iraq", countryCode: "IQ", region: "Middle East" },
  { code: "BEY", name: "Beirut", country: "Lebanon", countryCode: "LB", region: "Middle East" },
  { code: "TLV", name: "Tel Aviv", country: "Israel", countryCode: "IL", region: "Middle East" },
  { code: "THR", name: "Tehran", country: "Iran", countryCode: "IR", region: "Middle East" },
  { code: "MHD", name: "Mashhad", country: "Iran", countryCode: "IR", region: "Middle East" },
  { code: "SYZ", name: "Shiraz", country: "Iran", countryCode: "IR", region: "Middle East" },
  { code: "KWI", name: "Kuwait City", country: "Kuwait", countryCode: "KW", region: "Middle East" },
  { code: "BAH", name: "Manama", country: "Bahrain", countryCode: "BH", region: "Middle East" },
  { code: "MCT", name: "Muscat", country: "Oman", countryCode: "OM", region: "Middle East" },
  { code: "SLL", name: "Salalah", country: "Oman", countryCode: "OM", region: "Middle East" },
  
  // Europe
  { code: "LHR", name: "London", country: "United Kingdom", countryCode: "GB", region: "Europe" },
  { code: "MAN", name: "Manchester", country: "United Kingdom", countryCode: "GB", region: "Europe" },
  { code: "EDI", name: "Edinburgh", country: "United Kingdom", countryCode: "GB", region: "Europe" },
  { code: "CDG", name: "Paris", country: "France", countryCode: "FR", region: "Europe" },
  { code: "NCE", name: "Nice", country: "France", countryCode: "FR", region: "Europe" },
  { code: "FRA", name: "Frankfurt", country: "Germany", countryCode: "DE", region: "Europe" },
  { code: "MUC", name: "Munich", country: "Germany", countryCode: "DE", region: "Europe" },
  { code: "BER", name: "Berlin", country: "Germany", countryCode: "DE", region: "Europe" },
  { code: "AMS", name: "Amsterdam", country: "Netherlands", countryCode: "NL", region: "Europe" },
  { code: "MAD", name: "Madrid", country: "Spain", countryCode: "ES", region: "Europe" },
  { code: "BCN", name: "Barcelona", country: "Spain", countryCode: "ES", region: "Europe" },
  { code: "FCO", name: "Rome", country: "Italy", countryCode: "IT", region: "Europe" },
  { code: "MXP", name: "Milan", country: "Italy", countryCode: "IT", region: "Europe" },
  { code: "VCE", name: "Venice", country: "Italy", countryCode: "IT", region: "Europe" },
  { code: "ZRH", name: "Zurich", country: "Switzerland", countryCode: "CH", region: "Europe" },
  { code: "VIE", name: "Vienna", country: "Austria", countryCode: "AT", region: "Europe" },
  { code: "IST", name: "Istanbul", country: "Turkey", countryCode: "TR", region: "Europe" },
  { code: "ATH", name: "Athens", country: "Greece", countryCode: "GR", region: "Europe" },
  { code: "PRG", name: "Prague", country: "Czech Republic", countryCode: "CZ", region: "Europe" },
  
  // North America
  { code: "JFK", name: "New York", country: "United States", countryCode: "US", region: "North America" },
  { code: "LAX", name: "Los Angeles", country: "United States", countryCode: "US", region: "North America" },
  { code: "ORD", name: "Chicago", country: "United States", countryCode: "US", region: "North America" },
  { code: "MIA", name: "Miami", country: "United States", countryCode: "US", region: "North America" },
  { code: "SFO", name: "San Francisco", country: "United States", countryCode: "US", region: "North America" },
  { code: "LAS", name: "Las Vegas", country: "United States", countryCode: "US", region: "North America" },
  { code: "YYZ", name: "Toronto", country: "Canada", countryCode: "CA", region: "North America" },
  { code: "YVR", name: "Vancouver", country: "Canada", countryCode: "CA", region: "North America" },
  { code: "YUL", name: "Montreal", country: "Canada", countryCode: "CA", region: "North America" },
  { code: "MEX", name: "Mexico City", country: "Mexico", countryCode: "MX", region: "North America" },
  
  // Asia (excluding Middle East)
  { code: "SIN", name: "Singapore", country: "Singapore", countryCode: "SG", region: "Asia" },
  { code: "HKG", name: "Hong Kong", country: "Hong Kong", countryCode: "HK", region: "Asia" },
  { code: "ICN", name: "Seoul", country: "South Korea", countryCode: "KR", region: "Asia" },
  { code: "NRT", name: "Tokyo", country: "Japan", countryCode: "JP", region: "Asia" },
  { code: "PEK", name: "Beijing", country: "China", countryCode: "CN", region: "Asia" },
  { code: "PVG", name: "Shanghai", country: "China", countryCode: "CN", region: "Asia" },
  { code: "KUL", name: "Kuala Lumpur", country: "Malaysia", countryCode: "MY", region: "Asia" },
  { code: "BKK", name: "Bangkok", country: "Thailand", countryCode: "TH", region: "Asia" },
  { code: "DEL", name: "New Delhi", country: "India", countryCode: "IN", region: "Asia" },
  { code: "BOM", name: "Mumbai", country: "India", countryCode: "IN", region: "Asia" },
  
  // Africa
  { code: "JNB", name: "Johannesburg", country: "South Africa", countryCode: "ZA", region: "Africa" },
  { code: "CPT", name: "Cape Town", country: "South Africa", countryCode: "ZA", region: "Africa" },
  { code: "NBO", name: "Nairobi", country: "Kenya", countryCode: "KE", region: "Africa" },
  { code: "ACC", name: "Accra", country: "Ghana", countryCode: "GH", region: "Africa" },
  { code: "LOS", name: "Lagos", country: "Nigeria", countryCode: "NG", region: "Africa" },
  { code: "CMN", name: "Casablanca", country: "Morocco", countryCode: "MA", region: "Africa" },
  
  // South America
  { code: "GRU", name: "São Paulo", country: "Brazil", countryCode: "BR", region: "South America" },
  { code: "EZE", name: "Buenos Aires", country: "Argentina", countryCode: "AR", region: "South America" },
  { code: "SCL", name: "Santiago", country: "Chile", countryCode: "CL", region: "South America" },
  { code: "BOG", name: "Bogotá", country: "Colombia", countryCode: "CO", region: "South America" },
  { code: "LIM", name: "Lima", country: "Peru", countryCode: "PE", region: "South America" },
  
  // Oceania
  { code: "SYD", name: "Sydney", country: "Australia", countryCode: "AU", region: "Oceania" },
  { code: "MEL", name: "Melbourne", country: "Australia", countryCode: "AU", region: "Oceania" },
  { code: "BNE", name: "Brisbane", country: "Australia", countryCode: "AU", region: "Oceania" },
  { code: "PER", name: "Perth", country: "Australia", countryCode: "AU", region: "Oceania" },
  { code: "AKL", name: "Auckland", country: "New Zealand", countryCode: "NZ", region: "Oceania" }
];

export const getCityByCode = (code: string): City | undefined => {
  return cities.find(city => city.code === code);
};

export const getCitiesByRegion = (region: City['region']): City[] => {
  return cities.filter(city => city.region === region);
};

export const searchCities = (query: string): City[] => {
  const lowercaseQuery = query.toLowerCase();
  
  // First, filter cities that match the query
  const filteredCities = cities.filter(city => 
    city.code.toLowerCase().includes(lowercaseQuery) || 
    city.name.toLowerCase().includes(lowercaseQuery) || 
    city.country.toLowerCase().includes(lowercaseQuery)
  );
  
  // Then, sort with priority:
  // 1. Cities with codes that start with the query
  // 2. Cities with names that start with the query
  // 3. Alphabetically by name
  return filteredCities.sort((a, b) => {
    // Prioritize cities with codes that start with the query
    const aCodeStarts = a.code.toLowerCase().startsWith(lowercaseQuery);
    const bCodeStarts = b.code.toLowerCase().startsWith(lowercaseQuery);
    
    if (aCodeStarts && !bCodeStarts) return -1;
    if (!aCodeStarts && bCodeStarts) return 1;
    
    // Next, prioritize cities with names that start with the query
    const aNameStarts = a.name.toLowerCase().startsWith(lowercaseQuery);
    const bNameStarts = b.name.toLowerCase().startsWith(lowercaseQuery);
    
    if (aNameStarts && !bNameStarts) return -1;
    if (!aNameStarts && bNameStarts) return 1;
    
    // Finally, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });
};

export const getPopularCities = (): City[] => {
  const popularCodes = [
    // Middle East
    'DXB', 'DOH', 'RUH', 'JED', 'AMM', 'CAI', 'BGW', 'BEY', 'KWI', 'BAH', 'MCT',
    // Europe
    'LHR', 'CDG', 'FRA', 'MAD', 'IST', 'FCO', 'AMS',
    // North America
    'JFK', 'LAX', 'YYZ', 
    // Asia
    'SIN', 'HKG', 'BKK', 'DEL',
    // Africa
    'JNB', 'CAI', 'CMN',
    // South America
    'GRU', 'EZE',
    // Oceania
    'SYD', 'MEL'
  ];
  
  return popularCodes
    .map(code => getCityByCode(code))
    .filter(Boolean) as City[];
};