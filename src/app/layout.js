import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import SmoothScroll from "../components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Apna Restaurant | Premium Fine Dining Experience",
  description: "Experience world-class premium dining and authentic tastes at Apna Restaurant. Book a table online or order express delivery of our chef special starters, biryanis, and Chinese treats.",
  keywords: "Apna Restaurant, Fine Dining, Luxury Restaurant, Hyderabad Biryani, Table Booking, Food Delivery",
  openGraph: {
    title: "Apna Restaurant | World-Class Dining Experience",
    description: "Experience authentic taste like never before. Explore our chef special creations and book a premium table today.",
    url: "http://localhost:3000",
    siteName: "Apna Restaurant",
    images: [
      {
        url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Apna Restaurant",
    "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
    "@id": "http://localhost:3000/#restaurant",
    "url": "http://localhost:3000",
    "telephone": "+919876543210",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Gourmet Boulevard, Foodie Haven",
      "addressLocality": "Hyderabad",
      "postalCode": "500001",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body className="bg-white dark:bg-[#0c0c0c] text-neutral-900 dark:text-neutral-100 min-h-screen flex flex-col font-sans transition-colors duration-300">
        <SmoothScroll />
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
            <FloatingActions />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
