import { Playfair_Display, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "yet-another-react-lightbox/styles.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ankitescapes.com"),
  title: "Ankit Escapes | Travel Portfolio & Stories",
  description:
    "Personal travel portfolio of Ankit Bhadauria documenting explorations across 15+ Indian states, 7 sacred Jyotirlingas, 5 high-altitude treks, and solo expeditions across India.",
  keywords: [
    "Ankit Bhadauria",
    "Ankit Escapes",
    "Indian Travel Blog",
    "Jyotirlinga Pilgrimage",
    "Himalayan Treks",
    "Solo Travel India",
    "Travel Portfolio",
  ],
  authors: [{ name: "Ankit Bhadauria", url: "https://www.linkedin.com/in/ankitsingh-it/" }],
  creator: "Ankit Bhadauria",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ankitescapes.com",
    siteName: "Ankit Escapes",
    title: "Ankit Escapes | Travel Portfolio & Stories",
    description:
      "Explore 15+ Indian states, 7 Jyotirlingas, 5 treks, and raw solo journeys with Ankit Bhadauria.",
    images: [
      {
        url: "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946174/travel1_tlfvlv.jpg",
        width: 1200,
        height: 630,
        alt: "Ankit Escapes - Travel Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Escapes | Travel Portfolio & Stories",
    description:
      "Explore 15+ Indian states, 7 Jyotirlingas, 5 treks, and raw solo journeys with Ankit Bhadauria.",
    images: ["https://res.cloudinary.com/dgby0i19z/image/upload/v1750946174/travel1_tlfvlv.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#0B0B0F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${playfair.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B0B0F] text-[#F5F5F4] min-h-screen selection:bg-amber-500 selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
