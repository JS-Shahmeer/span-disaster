import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
