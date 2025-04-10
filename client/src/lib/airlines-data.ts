export interface Airline {
  code: string;
  name: string;
  nameAr?: string;
  logo: string;
  aircraft: string[];
  alliance: "Oneworld" | "Star Alliance" | "SkyTeam" | "None";
}

export const airlines: Record<string, Airline> = {
  "RJ": { 
    code: "RJ",
    name: "Royal Jordanian", 
    nameAr: "الملكية الأردنية",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Royal_Jordanian_Airlines_logo.svg/1200px-Royal_Jordanian_Airlines_logo.svg.png",
    aircraft: ["Boeing 787", "Airbus A320"],
    alliance: "Oneworld"
  },
  "EK": { 
    code: "EK",
    name: "Emirates", 
    nameAr: "طيران الإمارات",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
    aircraft: ["Airbus A380", "Boeing 777"],
    alliance: "None"
  },
  "QR": { 
    code: "QR",
    name: "Qatar Airways", 
    nameAr: "القطرية",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png",
    aircraft: ["Airbus A350", "Boeing 787"],
    alliance: "Oneworld"
  },
  "TK": { 
    code: "TK",
    name: "Turkish Airlines", 
    nameAr: "الخطوط الجوية التركية",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Turkish_Airlines_logo.svg",
    aircraft: ["Boeing 777", "Airbus A330"],
    alliance: "Star Alliance"
  },
  "EY": { 
    code: "EY",
    name: "Etihad Airways", 
    nameAr: "الاتحاد للطيران",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Etihad_Airways_logo.svg",
    aircraft: ["Boeing 787", "Airbus A380"],
    alliance: "None"
  },
  "GF": { 
    code: "GF",
    name: "Gulf Air", 
    nameAr: "طيران الخليج",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Gulf_Air_logo.svg",
    aircraft: ["Boeing 787", "Airbus A320"],
    alliance: "None"
  },
  "MS": { 
    code: "MS",
    name: "EgyptAir", 
    nameAr: "مصر للطيران",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/EgyptAir_logo.svg",
    aircraft: ["Boeing 787", "Airbus A320"],
    alliance: "Star Alliance"
  },
  "LH": { 
    code: "LH",
    name: "Lufthansa", 
    nameAr: "لوفتهانزا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Lufthansa_Logo_2018.svg",
    aircraft: ["Boeing 747", "Airbus A380"],
    alliance: "Star Alliance"
  },
  "BA": { 
    code: "BA",
    name: "British Airways", 
    nameAr: "الخطوط الجوية البريطانية",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/British_Airways_Logo.svg",
    aircraft: ["Boeing 777", "Airbus A320"],
    alliance: "Oneworld"
  },
  "AF": { 
    code: "AF",
    name: "Air France", 
    nameAr: "إير فرانس",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Air_France_Logo.svg",
    aircraft: ["Boeing 777", "Airbus A350"],
    alliance: "SkyTeam"
  },
  "SV": { 
    code: "SV",
    name: "Saudia", 
    nameAr: "السعودية",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/65/Saudia_Logo.svg",
    aircraft: ["Boeing 787", "Airbus A320"],
    alliance: "SkyTeam"
  },
  "KU": { 
    code: "KU",
    name: "Kuwait Airways", 
    nameAr: "الخطوط الجوية الكويتية",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5c/Kuwait_Airways_Logo.svg",
    aircraft: ["Boeing 777", "Airbus A330"],
    alliance: "None"
  },
  "OA": { 
    code: "OA",
    name: "Olympic Air", 
    nameAr: "أوليمبيك إير",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Olympic_Air_logo.svg",
    aircraft: ["Bombardier Dash 8"],
    alliance: "None"
  },
  "WY": { 
    code: "WY",
    name: "Oman Air", 
    nameAr: "الطيران العماني",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Oman_Air_Logo.svg",
    aircraft: ["Boeing 787", "Airbus A330"],
    alliance: "None"
  },
  "G9": { 
    code: "G9",
    name: "Air Arabia", 
    nameAr: "العربية للطيران",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/37/Air_Arabia_Logo.svg",
    aircraft: ["Airbus A320"],
    alliance: "None"
  },
  "FZ": { 
    code: "FZ",
    name: "Flydubai", 
    nameAr: "فلاي دبي",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/FlyDubai_logo.svg",
    aircraft: ["Boeing 737"],
    alliance: "None"
  },
  // Adding more Middle Eastern and international carriers
  "ME": {
    code: "ME",
    name: "Middle East Airlines",
    nameAr: "طيران الشرق الأوسط",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/MEA_logo.svg",
    aircraft: ["Airbus A320", "Airbus A330"],
    alliance: "SkyTeam"
  },
  "J9": {
    code: "J9",
    name: "Jazeera Airways",
    nameAr: "طيران الجزيرة",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3b/Jazeera_Airways_Logo.svg",
    aircraft: ["Airbus A320"],
    alliance: "None"
  },
  "IA": {
    code: "IA",
    name: "Iraqi Airways",
    nameAr: "الخطوط الجوية العراقية",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/65/Iraqi_Airways_Logo.svg",
    aircraft: ["Boeing 737", "Boeing 777"],
    alliance: "None"
  },
  "R5": {
    code: "R5",
    name: "Jordan Aviation",
    nameAr: "الأردنية للطيران",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/Jordan_Aviation_Logo.png",
    aircraft: ["Boeing 737", "Airbus A320"],
    alliance: "None"
  },
  "NL": {
    code: "NL", 
    name: "Shaheen Air",
    nameAr: "شاهين إير",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9b/Shaheen_Air_logo.svg",
    aircraft: ["Airbus A320", "Airbus A330"],
    alliance: "None"
  },
  "RB": {
    code: "RB",
    name: "Syrian Air",
    nameAr: "السورية للطيران",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c3/Syrianair_Logo.svg",
    aircraft: ["Airbus A320"],
    alliance: "None"
  },
  "XY": {
    code: "XY",
    name: "flynas",
    nameAr: "طيران ناس",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Flynas_Logo.svg",
    aircraft: ["Airbus A320"],
    alliance: "None"
  },
  "PK": {
    code: "PK",
    name: "Pakistan International Airlines",
    nameAr: "الخطوط الجوية الباكستانية الدولية",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/PIA_logo.svg",
    aircraft: ["Boeing 777", "Airbus A320"],
    alliance: "None"
  }
};

export const getAirlineByCode = (code: string): Airline | undefined => {
  return airlines[code];
};

export const getAllAirlines = (): Airline[] => {
  return Object.values(airlines);
};

export const getAirlinesByAlliance = (alliance: Airline['alliance']): Airline[] => {
  return Object.values(airlines).filter(airline => airline.alliance === alliance);
};

// Get a list of airline codes for mock flight generation
export const getAirlineCodes = (): string[] => {
  return Object.keys(airlines);
};