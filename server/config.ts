// Application configuration 
interface Config {
  // Base domain used for generating links in emails
  domain: string;
  
  // Full URL for the application
  appUrl: string;
  
  // Frontend URL if different from appUrl
  frontendUrl: string;
  
  // Email sender address
  emailSender: string;
  
  // Session secret
  sessionSecret: string;
  
  // Whether the app is running in production
  isProduction: boolean;
}

// Default development configuration
const devConfig: Config = {
  domain: 'localhost:5000',
  appUrl: 'http://localhost:5000',
  frontendUrl: 'http://localhost:5000',
  emailSender: 'noreply@gosafrat.com',
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret-key',
  isProduction: false,
};

// Production configuration
const prodConfig: Config = {
  domain: 'gosafrat.com',
  appUrl: 'https://gosafrat.com',
  frontendUrl: 'https://gosafrat.com',
  emailSender: 'noreply@gosafrat.com',
  sessionSecret: process.env.SESSION_SECRET || '',
  isProduction: true,
};

// Helper to get the right config based on environment
export const config: Config = process.env.NODE_ENV === 'production' 
  ? prodConfig 
  : devConfig;

// Helper function to build absolute URLs 
export function buildUrl(path: string): string {
  // Make sure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${config.appUrl}${normalizedPath}`;
}