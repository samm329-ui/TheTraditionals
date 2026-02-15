
import * as React from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { config, cn } from '@/lib/utils';
import { Inter, Playfair_Display } from 'next/font/google';
import PageTransition from '@/components/page-transition';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thetraditionalneedlework.in';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": config.fullName,
  "alternateName": ["Traditional Needle Work", "The Traditional Needlework", "Traditional Clothing Store"],
  "description": config.description,
  "url": siteUrl,
  "telephone": "+91-XXXXX-XXXXX",
  "priceRange": "₹₹-₹₹₹",
  "image": "https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/hero%20video/hero%20vid.webp",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "289",
    "bestRating": "5",
    "worstRating": "1"
  },
  "category": "Traditional Clothing Store",
  "paymentAccepted": ["Cash", "UPI", "WhatsApp Order"],
  "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 10:00-20:00",
  "sameAs": [
    "https://www.instagram.com/thetraditionalneedlework"
  ]
};

// WebSite schema for sitelinks search box
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": config.fullName,
  "alternateName": ["Traditional Needle Work", "The Traditional Needlework"],
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/#collections?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

// BreadcrumbList schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteUrl
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Collections",
      "item": `${siteUrl}/#collections`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "About",
      "item": `${siteUrl}/about`
    }
  ]
};


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Traditional Needle Work | Handcrafted Traditional Clothing",
    template: "%s | The Traditional Needle Work",
  },
  description:
    "Premium traditional clothing brand featuring handcrafted embroidered Punjabis, designer blouses, and custom stitching services. Authentic Bengali craftsmanship with modern elegance. Specializing in traditional wear, bridal collections, and bespoke tailoring.",
  keywords: [
    // Core Identity
    "Traditional Needle Work", "Traditional Clothing", "Handcrafted Punjabi",
    "Designer Blouse", "Custom Stitching", "Bengali Clothing",

    // Products
    "Embroidered Punjabi", "Designer Blouse", "Traditional Saree", "Bridal Blouse",
    "Custom Punjabi", "Wedding Punjabi", "Festival Wear", "Occasion Wear",
    "Traditional Wear", "Ethnic Clothing", "Bengali Traditional Dress",

    // Services
    "Custom Tailoring", "Bespoke Clothing", "Made to Measure", "Custom Embroidery",
    "Blouse Stitching", "Punjabi Stitching", "Alteration Services",

    // Occasions
    "Wedding Wear", "Bridal Collection", "Festival Clothing", "Durga Puja Dress",
    "Occasion Dress", "Traditional Ceremony Wear", "Cultural Event Clothing",

    // Craft & Quality
    "Hand Embroidery", "Traditional Needlework", "Bengali Embroidery",
    "Premium Fabric", "Quality Craftsmanship", "Traditional Art",

    // Regional
    "Bengali Punjabi", "Bengali Blouse", "Traditional Bengali Clothing",
    "West Bengal Traditional Wear", "Kolkata Traditional Dress"
  ],
  authors: [{ name: 'The Traditional Needle Work', url: siteUrl }],
  creator: 'The Traditional Needle Work',
  publisher: 'The Traditional Needle Work',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "The Traditional Needle Work | Handcrafted Traditional Clothing",
    description: "Discover premium traditional clothing with authentic Bengali craftsmanship. Embroidered Punjabis, designer blouses, and custom stitching services.",
    url: siteUrl,
    siteName: "The Traditional Needle Work",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'The Traditional Needle Work - Premium Traditional Clothing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `The Traditional Needle Work | Handcrafted Traditional Clothing`,
    description: config.description,
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },

  // Favicon configuration for Google SERP compliance
  icons: {
    // Using PNG icons as primary since favicon.ico is not deploying correctly
    icon: [
      { url: '/icons/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/icons/icon-48x48.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#D4A574',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, playfair.variable)}>
      <head>
        {/* Preconnect and DNS Prefetch for faster external resource loading */}
        <link rel="preconnect" href="https://ihpfajyotvzcdqagdslw.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ihpfajyotvzcdqagdslw.supabase.co" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <React.Suspense fallback={null}>
          <PageTransition>
            {children}
          </PageTransition>
        </React.Suspense>
        <Toaster />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EP02M0S335"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-EP02M0S335');
          `}
        </Script>
      </body>
    </html>
  );
}
