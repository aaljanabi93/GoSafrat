import React, { useEffect } from 'react';

// Define all site routes that should be part of the sitemap
const siteRoutes = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/flights', priority: 0.9, changefreq: 'daily' },
  { path: '/hotels', priority: 0.9, changefreq: 'daily' },
  { path: '/cars', priority: 0.9, changefreq: 'daily' },
  { path: '/auth', priority: 0.7, changefreq: 'monthly' },
  
  // Company Pages
  { path: '/company/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/company/careers', priority: 0.6, changefreq: 'weekly' },
  { path: '/company/partners', priority: 0.6, changefreq: 'monthly' },
  { path: '/company/press', priority: 0.7, changefreq: 'weekly' },
  
  // Support Pages
  { path: '/support/help-center', priority: 0.8, changefreq: 'monthly' },
  { path: '/support/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/support/cancellation', priority: 0.7, changefreq: 'monthly' },
  { path: '/support/safety', priority: 0.7, changefreq: 'monthly' },
  
  // Legal Pages
  { path: '/legal/terms', priority: 0.5, changefreq: 'yearly' },
  { path: '/legal/privacy', priority: 0.5, changefreq: 'yearly' },
  { path: '/legal/cookies', priority: 0.5, changefreq: 'yearly' },
];

/**
 * Generates and registers a sitemap.xml route in the server
 * This should be used by the server routing logic to serve the sitemap
 */
export function generateSitemapXml(): string {
  const baseUrl = 'https://gosafrat.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  siteRoutes.forEach(route => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${route.path}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${route.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  return sitemap;
}

/**
 * Gets all site routes that should be part of the sitemap
 */
export function getSiteRoutes() {
  return siteRoutes;
}

/**
 * This component doesn't render anything visible but can be used to
 * output debugging info about the sitemap in development
 */
export default function SitemapDebug() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Available routes for sitemap:');
      console.table(siteRoutes);
    }
  }, []);
  
  return null;
}