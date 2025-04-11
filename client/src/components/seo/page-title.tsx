import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface PageTitleProps {
  title?: string;
  description?: string;
}

/**
 * Component to dynamically update page title and meta description for SEO
 */
export default function PageTitle({ title, description }: PageTitleProps) {
  const [location] = useLocation();
  
  useEffect(() => {
    // Default title
    const defaultTitle = 'GoSafrat - Your Trusted Partner for Flights, Hotels, and Car Rentals Worldwide';
    // Set the document title
    document.title = title ? `${title} | GoSafrat` : defaultTitle;
    
    // Update meta description if provided
    if (description) {
      // Find the meta description tag
      let metaDescription = document.querySelector('meta[name="description"]');
      
      // If it doesn't exist, create it
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      
      // Update the content
      metaDescription.setAttribute('content', description);
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://gosafrat.com${location}`);
    }
    
  }, [title, description, location]);
  
  // This component doesn't render anything
  return null;
}