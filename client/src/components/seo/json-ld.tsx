import { FC, useEffect } from 'react';

interface JsonLDProps {
  data: Record<string, any>;
}

/**
 * Component to add JSON-LD structured data to the document head for SEO
 */
export const JsonLD: FC<JsonLDProps> = ({ data }) => {
  useEffect(() => {
    // Create script element for JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = 'json-ld-' + Math.random().toString(36).substring(2, 9);
    document.head.appendChild(script);

    // Clean up when component unmounts
    return () => {
      const scriptElement = document.getElementById(script.id);
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
    };
  }, [data]);

  return null;
};

/**
 * Generate Organization Schema.org JSON-LD data
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GoSafrat",
  "url": "https://gosafrat.com",
  "logo": "https://gosafrat.com/logo.png",
  "sameAs": [
    "https://www.facebook.com/gosafrat",
    "https://twitter.com/gosafrat",
    "https://www.instagram.com/gosafrat",
    "https://www.linkedin.com/company/gosafrat"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-234-567-8901",
    "contactType": "customer service",
    "availableLanguage": ["English", "Arabic"]
  }
};

/**
 * Generate WebSite Schema.org JSON-LD data
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://gosafrat.com",
  "name": "GoSafrat - Flight, Hotel & Car Rental Booking",
  "description": "Book flights, hotels and car rentals at the best prices. Compare deals and save on your next trip with GoSafrat.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://gosafrat.com/flights?from={origin}&to={destination}&date={departureDate}"
    },
    "query-input": [
      {
        "@type": "PropertyValueSpecification",
        "valueRequired": true,
        "valueName": "origin"
      },
      {
        "@type": "PropertyValueSpecification",
        "valueRequired": true,
        "valueName": "destination"
      },
      {
        "@type": "PropertyValueSpecification",
        "valueRequired": true,
        "valueName": "departureDate"
      }
    ]
  }
};

/**
 * Generate FAQPage Schema.org JSON-LD data
 */
export const createFaqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * Generate BreadcrumbList Schema.org JSON-LD data
 */
export const createBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://gosafrat.com${item.url}`
  }))
});