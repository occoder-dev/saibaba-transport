import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (no runtime fetch to Google Fonts required at build time).
const manrope = localFont({
  src: "./fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const bebasNeue = localFont({
  src: "./fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saibabatransport.com"),

  title: {
    default: "Saibaba Transport | Pan-India Transportation & Logistics",
    template: "%s | Saibaba Transport",
  },

  description:
    "Saibaba Transport is a pan-India multimodal transportation and logistics company specializing in textile, industrial and commercial goods movement - road (Full Truck Load, Part Truck Load) and rail freight, plus dedicated fleet solutions.",

  keywords: [
    "transport company in India",
    "rail freight transportation",
    "train transportation services",
    "textile transport services",
    "textile transportation",
    "pan India transport service",
    "goods transportation",
    "full truck load transport",
    "logistics company",
  ],

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.saibabatransport.com",
    siteName: "Saibaba Transport",
    title: "Saibaba Transport | Pan-India Transportation & Logistics",
    description:
      "Reliable pan-India road and rail transportation for textile, industrial and commercial goods.",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Saibaba Transport - Pan-India Transportation & Logistics",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Saibaba Transport | Pan-India Transportation & Logistics",
    description:
      "Reliable pan-India road and rail transportation for textile, industrial and commercial goods.",
    images: ["/social-preview.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
