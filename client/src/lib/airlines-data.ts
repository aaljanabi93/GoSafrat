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
  },
  // Adding new airlines from the provided list
  "A3": {
    code: "A3",
    name: "Aegean Airlines",
    nameAr: "إيجيان إيرلاينز",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Aegean_Airlines_logo_2020.svg", 
    aircraft: ["Airbus A320", "Airbus A321"],
    alliance: "Star Alliance"
  },
  "EI": {
    code: "EI",
    name: "Aer Lingus",
    nameAr: "إير لينغوس",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Aer_Lingus_logo.svg",
    aircraft: ["Airbus A320", "Airbus A330"],
    alliance: "None"
  },
  "SU": {
    code: "SU",
    name: "Aeroflot",
    nameAr: "أيروفلوت",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Aeroflot_Russian_Airlines_Logo.svg",
    aircraft: ["Boeing 777", "Airbus A320"],
    alliance: "SkyTeam"
  },
  "AR": {
    code: "AR",
    name: "Aerolineas Argentinas",
    nameAr: "أيرولينياس أرجنتيناس",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Aerol%C3%ADneas_Argentinas_Logo_2010.svg",
    aircraft: ["Boeing 737", "Airbus A330"],
    alliance: "SkyTeam"
  },
  "AM": {
    code: "AM",
    name: "Aeromexico",
    nameAr: "أيروميكسيكو",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Aeromexico_logo.svg",
    aircraft: ["Boeing 737", "Boeing 787"],
    alliance: "SkyTeam"
  },
  "KC": {
    code: "KC",
    name: "Air Astana",
    nameAr: "إير أستانا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Air_Astana_Logo.svg",
    aircraft: ["Airbus A320", "Boeing 767"],
    alliance: "None"
  },
  "UU": {
    code: "UU",
    name: "Air Austral",
    nameAr: "إير أوسترال",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Air_Austral_Logo.svg",
    aircraft: ["Boeing 777", "Boeing 787"],
    alliance: "None"
  },
  "BT": {
    code: "BT",
    name: "Air Baltic",
    nameAr: "إير بالتيك",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/AirBaltic_logo.svg",
    aircraft: ["Airbus A220"],
    alliance: "None"
  },
  "SN": {
    code: "SN",
    name: "Brussels Airlines",
    nameAr: "بروكسل إيرلاينز",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Brussels_Airlines_Logo.svg",
    aircraft: ["Airbus A320", "Airbus A330"],
    alliance: "Star Alliance"
  },
  "AC": {
    code: "AC",
    name: "Air Canada",
    nameAr: "إير كندا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Air_Canada_Logo.svg",
    aircraft: ["Boeing 777", "Boeing 787"],
    alliance: "Star Alliance"
  },
  "TX": {
    code: "TX",
    name: "Air Caraibes",
    nameAr: "إير كارايبس",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Air_Caraibes_Logo.svg",
    aircraft: ["Airbus A330", "Airbus A350"],
    alliance: "None"
  },
  "CA": {
    code: "CA",
    name: "Air China",
    nameAr: "إير تشاينا",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/69/Air_China_logo.svg",
    aircraft: ["Boeing 747", "Boeing 777"],
    alliance: "Star Alliance"
  },
  "XK": {
    code: "XK",
    name: "Air Corsica",
    nameAr: "إير كورسيكا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Air_Corsica_logo.svg",
    aircraft: ["Airbus A320"],
    alliance: "None"
  },
  "EN": {
    code: "EN",
    name: "Air Dolomiti",
    nameAr: "إير دولوميتي",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Air_Dolomiti_Logo.svg",
    aircraft: ["Embraer E195"],
    alliance: "Star Alliance"
  },
  "UX": {
    code: "UX",
    name: "Air Europa",
    nameAr: "إير أوروبا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Air_Europa_Logo.svg",
    aircraft: ["Boeing 787", "Boeing 737"],
    alliance: "SkyTeam"
  },
  "AI": {
    code: "AI",
    name: "Air India",
    nameAr: "إير إنديا",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Air_India_Logo.svg",
    aircraft: ["Boeing 777", "Boeing 787"],
    alliance: "Star Alliance"
  },
  "IX": {
    code: "IX",
    name: "Air India Express",
    nameAr: "إير إنديا إكسبرس",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b8/Air_India_Express_Logo.svg",
    aircraft: ["Boeing 737"],
    alliance: "None"
  },
  "NX": {
    code: "NX",
    name: "Air Macau",
    nameAr: "إير ماكاو",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/1d/Air_Macau_Logo.svg",
    aircraft: ["Airbus A320"],
    alliance: "None"
  },
  "KM": {
    code: "KM",
    name: "Air Malta",
    nameAr: "إير مالطا",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Air_Malta_Logo.svg",
    aircraft: ["Airbus A320"],
    alliance: "None"
  },
  "MK": {
    code: "MK",
    name: "Air Mauritius",
    nameAr: "إير موريشيوس",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Air_Mauritius_logo.svg",
    aircraft: ["Airbus A330", "Airbus A350"],
    alliance: "None"
  },
  "SW": {
    code: "SW",
    name: "Air Namibia",
    nameAr: "إير ناميبيا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Air_Namibia_Logo.svg",
    aircraft: ["Airbus A319", "Embraer ERJ"],
    alliance: "None"
  },
  "NZ": {
    code: "NZ",
    name: "Air New Zealand",
    nameAr: "إير نيوزيلاندا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Air_New_Zealand_logo.svg",
    aircraft: ["Boeing 777", "Boeing 787"],
    alliance: "Star Alliance"
  },
  "JU": {
    code: "JU",
    name: "Air Serbia",
    nameAr: "إير صربيا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/94/Air_Serbia_logo.svg",
    aircraft: ["Airbus A319", "Airbus A320"],
    alliance: "None"
  },
  "TN": {
    code: "TN",
    name: "Air Tahiti Nui",
    nameAr: "إير تاهيتي نوي",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e0/Air_Tahiti_Nui_Logo.svg",
    aircraft: ["Boeing 787"],
    alliance: "None"
  },
  "TS": {
    code: "TS",
    name: "Air Transat",
    nameAr: "إير ترانسات",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Air_Transat_Logo.svg",
    aircraft: ["Airbus A321", "Airbus A330"],
    alliance: "None"
  },
  "AK": {
    code: "AK",
    name: "AirAsia",
    nameAr: "إير آسيا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/AirAsia_Logo.svg",
    aircraft: ["Airbus A320"],
    alliance: "None"
  },
  "D7": {
    code: "D7",
    name: "AirAsia X",
    nameAr: "إير آسيا إكس",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/AirAsia_X_Logo.svg",
    aircraft: ["Airbus A330"],
    alliance: "None"
  },
  "SB": {
    code: "SB",
    name: "Aircalin",
    nameAr: "إيركالين",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/03/Aircalin_Logo.svg",
    aircraft: ["Airbus A320", "Airbus A330"],
    alliance: "None"
  },
  "AS": {
    code: "AS",
    name: "Alaska Airlines",
    nameAr: "ألاسكا إيرلاينز",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Alaska_Airlines_logo_2016.svg",
    aircraft: ["Boeing 737"],
    alliance: "Oneworld"
  },
  "AZ": {
    code: "AZ",
    name: "Alitalia",
    nameAr: "أليطاليا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Alitalia_Logo.svg",
    aircraft: ["Airbus A320", "Boeing 777"],
    alliance: "SkyTeam"
  },
  "G4": {
    code: "G4",
    name: "Allegiant",
    nameAr: "أليجيانت",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Allegiant_Travel_Company_Logo.svg",
    aircraft: ["Airbus A320"],
    alliance: "None"
  },
  "AA": {
    code: "AA",
    name: "American Airlines",
    nameAr: "أمريكان إيرلاينز",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/American_Airlines_logo_2013.svg",
    aircraft: ["Boeing 777", "Boeing 787"],
    alliance: "Oneworld"
  },
  "NH": {
    code: "NH",
    name: "ANA",
    nameAr: "أول نيبون إيرويز",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/All_Nippon_Airways_Logo_%28English%29.svg",
    aircraft: ["Boeing 777", "Boeing 787"],
    alliance: "Star Alliance"
  },
  "OZ": {
    code: "OZ",
    name: "Asiana",
    nameAr: "أسيانا",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Asiana_Airlines_logo.svg",
    aircraft: ["Airbus A350", "Boeing 777"],
    alliance: "Star Alliance"
  },
  "OS": {
    code: "OS",
    name: "Austrian",
    nameAr: "أوستريان",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Austrian_airlines_logo.svg",
    aircraft: ["Airbus A320", "Boeing 777"],
    alliance: "Star Alliance"
  },
  "J2": {
    code: "J2",
    name: "Azerbaijan Hava Yollary",
    nameAr: "أذربيجان هافا يولاري",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b0/Azerbaijan_Airlines_logo.svg",
    aircraft: ["Boeing 787", "Airbus A320"],
    alliance: "None"
  },
  "S4": {
    code: "S4",
    name: "Azores Airlines",
    nameAr: "أزورس إيرلاينز",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Azores_Airlines_logo.svg",
    aircraft: ["Airbus A320", "Airbus A321"],
    alliance: "None"
  },
  "AD": {
    code: "AD",
    name: "Azul",
    nameAr: "أزول",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Azul_Brazilian_Airlines_logo.svg",
    aircraft: ["Embraer E195", "Airbus A320"],
    alliance: "None"
  },
  "QH": {
    code: "QH",
    name: "Bamboo Airways",
    nameAr: "بامبو إيرويز",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bamboo_Airways_Logo.svg",
    aircraft: ["Boeing 787", "Airbus A320"],
    alliance: "None"
  },
  "PG": {
    code: "PG",
    name: "Bangkok Airways",
    nameAr: "بانكوك إيرويز",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/Bangkok_Airways_Logo.svg",
    aircraft: ["Airbus A320", "ATR 72"],
    alliance: "None"
  },
  "BW": {
    code: "BW",
    name: "Caribbean Airlines",
    nameAr: "كاريبيان إيرلاينز",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Caribbean_Airlines_Logo_2020.svg",
    aircraft: ["Boeing 737"],
    alliance: "None"
  },
  "KA": {
    code: "KA",
    name: "Cathay Dragon",
    nameAr: "كاثاي دراغون",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Cathay_Dragon_Logo.svg",
    aircraft: ["Airbus A320", "Airbus A330"],
    alliance: "Oneworld"
  },
  "CX": {
    code: "CX",
    name: "Cathay Pacific",
    nameAr: "كاثاي باسيفيك",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Cathay_Pacific_Logo.svg",
    aircraft: ["Boeing 777", "Airbus A350"],
    alliance: "Oneworld"
  },
  "DE": {
    code: "DE",
    name: "Condor",
    nameAr: "كوندور",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Condor_Flugdienst_Logo_2022.svg",
    aircraft: ["Airbus A320", "Boeing 767"],
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