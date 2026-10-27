import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, siteUrl, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "SPAN Disaster Services",
  title: {
    default: "SPAN Disaster Services | Neighborhood Preparedness",
    template: "%s | SPAN Disaster Services",
  },
  description:
    "SPAN Disaster Services helps neighborhoods of 15–20 households prepare, organize, and practice the skills needed to respond together during the critical first hour after a major disaster.",
  openGraph: {
    title: "SPAN Disaster Services | Your Neighbors. Your Preparedness. Your First Response.",
    description:
      "A structured, practical, repeatable process that helps ordinary people prepare their households and work together as an organized neighborhood response team.",
    type: "website",
    siteName: "SPAN Disaster Services",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
