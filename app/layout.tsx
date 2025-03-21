import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Initialize the Inter font with specific subsets
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata for the application
export const metadata: Metadata = {
  title: 'Bookme.com | Find Your Perfect Stay',
  description: 'Find and book hotels, apartments, and vacation rentals worldwide at the best prices.',
  keywords: 'hotel booking, accommodation, travel, vacation rentals, hotels',
};

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Bookme.com | Find Your Perfect Stay" />
        <meta property="og:description" content="Find and book hotels, apartments, and vacation rentals worldwide at the best prices." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://bookme.com" />
        <meta property="og:type" content="website" />
      </head>
      <body className="antialiased min-h-screen">
        {/* Main content container */}
        <main>{children}</main>
      </body>
    </html>
  );
}