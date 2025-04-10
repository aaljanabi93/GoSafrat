export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  region: "North America" | "Middle East" | "Europe" | "Asia" | "Africa" | "South America" | "Oceania";
}

export const airports: Airport[] = [
  // North America - Canada
  { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada", region: "North America" },
  { code: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada", region: "North America" },
  { code: "YUL", name: "Montréal-Pierre Elliott Trudeau International Airport", city: "Montreal", country: "Canada", region: "North America" },
  { code: "YYC", name: "Calgary International Airport", city: "Calgary", country: "Canada", region: "North America" },
  { code: "YEG", name: "Edmonton International Airport", city: "Edmonton", country: "Canada", region: "North America" },
  { code: "YOW", name: "Ottawa Macdonald-Cartier International Airport", city: "Ottawa", country: "Canada", region: "North America" },
  { code: "YWG", name: "Winnipeg James Armstrong Richardson International Airport", city: "Winnipeg", country: "Canada", region: "North America" },
  { code: "YHZ", name: "Halifax Stanfield International Airport", city: "Halifax", country: "Canada", region: "North America" },
  
  // North America - USA
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States", region: "North America" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "United States", region: "North America" },
  { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "United States", region: "North America" },
  { code: "DFW", name: "Dallas/Fort Worth International Airport", city: "Dallas", country: "United States", region: "North America" },
  { code: "MIA", name: "Miami International Airport", city: "Miami", country: "United States", region: "North America" },
  { code: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "United States", region: "North America" },
  { code: "LAS", name: "Harry Reid International Airport", city: "Las Vegas", country: "United States", region: "North America" },
  { code: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle", country: "United States", region: "North America" },
  { code: "MCO", name: "Orlando International Airport", city: "Orlando", country: "United States", region: "North America" },
  { code: "EWR", name: "Newark Liberty International Airport", city: "Newark", country: "United States", region: "North America" },
  { code: "BOS", name: "Boston Logan International Airport", city: "Boston", country: "United States", region: "North America" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "United States", region: "North America" },
  { code: "IAD", name: "Washington Dulles International Airport", city: "Washington", country: "United States", region: "North America" },
  { code: "DEN", name: "Denver International Airport", city: "Denver", country: "United States", region: "North America" },
  { code: "PHX", name: "Phoenix Sky Harbor International Airport", city: "Phoenix", country: "United States", region: "North America" },
  
  // Middle East
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates", region: "Middle East" },
  { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar", region: "Middle East" },
  { code: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi", country: "United Arab Emirates", region: "Middle East" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey", region: "Middle East" },
  { code: "RUH", name: "King Khalid International Airport", city: "Riyadh", country: "Saudi Arabia", region: "Middle East" },
  { code: "JED", name: "King Abdulaziz International Airport", city: "Jeddah", country: "Saudi Arabia", region: "Middle East" },
  { code: "DMM", name: "King Fahd International Airport", city: "Dammam", country: "Saudi Arabia", region: "Middle East" },
  { code: "AMM", name: "Queen Alia International Airport", city: "Amman", country: "Jordan", region: "Middle East" },
  { code: "CAI", name: "Cairo International Airport", city: "Cairo", country: "Egypt", region: "Middle East" },
  { code: "BGW", name: "Baghdad International Airport", city: "Baghdad", country: "Iraq", region: "Middle East" },
  { code: "BSR", name: "Basra International Airport", city: "Basra", country: "Iraq", region: "Middle East" },
  { code: "NJF", name: "Al Najaf International Airport", city: "Najaf", country: "Iraq", region: "Middle East" },
  { code: "EBL", name: "Erbil International Airport", city: "Erbil", country: "Iraq", region: "Middle East" },
  { code: "BEY", name: "Beirut-Rafic Hariri International Airport", city: "Beirut", country: "Lebanon", region: "Middle East" },
  { code: "TLV", name: "Ben Gurion Airport", city: "Tel Aviv", country: "Israel", region: "Middle East" },
  { code: "THR", name: "Imam Khomeini International Airport", city: "Tehran", country: "Iran", region: "Middle East" },
  { code: "KWI", name: "Kuwait International Airport", city: "Kuwait City", country: "Kuwait", region: "Middle East" },
  { code: "BAH", name: "Bahrain International Airport", city: "Manama", country: "Bahrain", region: "Middle East" },
  { code: "MCT", name: "Muscat International Airport", city: "Muscat", country: "Oman", region: "Middle East" },
  
  // Europe
  { code: "LHR", name: "Heathrow Airport", city: "London", country: "United Kingdom", region: "Europe" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France", region: "Europe" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", region: "Europe" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands", region: "Europe" },
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", country: "Spain", region: "Europe" },
  { code: "FCO", name: "Leonardo da Vinci–Fiumicino Airport", city: "Rome", country: "Italy", region: "Europe" },
  { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany", region: "Europe" },
  { code: "BCN", name: "Josep Tarradellas Barcelona-El Prat Airport", city: "Barcelona", country: "Spain", region: "Europe" },
  { code: "LGW", name: "Gatwick Airport", city: "London", country: "United Kingdom", region: "Europe" },
  { code: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland", region: "Europe" },
  { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark", region: "Europe" },
  { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland", region: "Europe" },
  { code: "BRU", name: "Brussels Airport", city: "Brussels", country: "Belgium", region: "Europe" },
  { code: "VIE", name: "Vienna International Airport", city: "Vienna", country: "Austria", region: "Europe" },
  { code: "ARN", name: "Stockholm Arlanda Airport", city: "Stockholm", country: "Sweden", region: "Europe" },
  { code: "OSL", name: "Oslo Airport, Gardermoen", city: "Oslo", country: "Norway", region: "Europe" },
  { code: "HEL", name: "Helsinki Airport", city: "Helsinki", country: "Finland", region: "Europe" },
  { code: "LIS", name: "Lisbon Airport", city: "Lisbon", country: "Portugal", region: "Europe" },
  { code: "ATH", name: "Athens International Airport", city: "Athens", country: "Greece", region: "Europe" },
  { code: "WAW", name: "Warsaw Chopin Airport", city: "Warsaw", country: "Poland", region: "Europe" },
  { code: "BUD", name: "Budapest Ferenc Liszt International Airport", city: "Budapest", country: "Hungary", region: "Europe" },
  { code: "PRG", name: "Václav Havel Airport Prague", city: "Prague", country: "Czech Republic", region: "Europe" },
  
  // Asia (excluding Middle East)
  { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore", region: "Asia" },
  { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "Hong Kong", region: "Asia" },
  { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea", region: "Asia" },
  { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan", region: "Asia" },
  { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China", region: "Asia" },
  { code: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China", region: "Asia" },
  { code: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia", region: "Asia" },
  { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand", region: "Asia" },
  { code: "HND", name: "Haneda Airport", city: "Tokyo", country: "Japan", region: "Asia" },
  { code: "DEL", name: "Indira Gandhi International Airport", city: "New Delhi", country: "India", region: "Asia" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India", region: "Asia" },
  
  // Africa
  { code: "JNB", name: "O. R. Tambo International Airport", city: "Johannesburg", country: "South Africa", region: "Africa" },
  { code: "CPT", name: "Cape Town International Airport", city: "Cape Town", country: "South Africa", region: "Africa" },
  { code: "CAS", name: "Casablanca Mohammed V International Airport", city: "Casablanca", country: "Morocco", region: "Africa" },
  { code: "ADD", name: "Addis Ababa Bole International Airport", city: "Addis Ababa", country: "Ethiopia", region: "Africa" },
  { code: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi", country: "Kenya", region: "Africa" },
  { code: "LOS", name: "Murtala Muhammed International Airport", city: "Lagos", country: "Nigeria", region: "Africa" },
  
  // South America
  { code: "GRU", name: "São Paulo/Guarulhos International Airport", city: "São Paulo", country: "Brazil", region: "South America" },
  { code: "EZE", name: "Ministro Pistarini International Airport", city: "Buenos Aires", country: "Argentina", region: "South America" },
  { code: "SCL", name: "Santiago International Airport", city: "Santiago", country: "Chile", region: "South America" },
  { code: "BOG", name: "El Dorado International Airport", city: "Bogotá", country: "Colombia", region: "South America" },
  { code: "LIM", name: "Jorge Chávez International Airport", city: "Lima", country: "Peru", region: "South America" },
  
  // Oceania
  { code: "SYD", name: "Sydney Airport", city: "Sydney", country: "Australia", region: "Oceania" },
  { code: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia", region: "Oceania" },
  { code: "BNE", name: "Brisbane Airport", city: "Brisbane", country: "Australia", region: "Oceania" },
  { code: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand", region: "Oceania" },
];

export const getAirportByCode = (code: string): Airport | undefined => {
  return airports.find(airport => airport.code === code);
};

export const getAirportsByRegion = (region: Airport['region']): Airport[] => {
  return airports.filter(airport => airport.region === region);
};

export const searchAirports = (query: string): Airport[] => {
  const lowercaseQuery = query.toLowerCase();
  return airports.filter(airport => 
    airport.code.toLowerCase().includes(lowercaseQuery) || 
    airport.name.toLowerCase().includes(lowercaseQuery) || 
    airport.city.toLowerCase().includes(lowercaseQuery) || 
    airport.country.toLowerCase().includes(lowercaseQuery)
  );
};

export const getPopularAirports = (): Airport[] => {
  const popularCodes = ['JFK', 'LHR', 'DXB', 'LAX', 'SIN', 'CDG', 'FRA', 'DOH', 'AMS', 'IST', 'AMM', 'CAI', 'BGW'];
  return popularCodes.map(code => getAirportByCode(code)).filter(Boolean) as Airport[];
};