import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
  ogImage?: string;
}

export function SEOHead({ 
  title, 
  description = "Create apps and websites by chatting with AI", 
  canonical,
  noIndex = false,
  ogImage = "https://lovable.dev/og-image.png"
}: SEOHeadProps) {
  const fullTitle = title.includes('Lovable') ? title : `${title} - Lovable`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
