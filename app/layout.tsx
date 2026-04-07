import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chatbot/ChatWidget";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Quattro Software — Custom Software Development",
    template: "%s | Quattro Software",
  },
  description:
    "We are a custom software development company committed to turning your ideas into powerful solutions that drive your business forward. Expert team, tailored solutions, free consultations.",
  keywords: [
    "custom software development",
    "QuickBooks integration",
    "web development",
    "Power Apps",
    "Texas",
  ],
  openGraph: {
    type: "website",
    siteName: "Quattro Software",
    title: "Quattro Software — Custom Software Development",
    description:
      "Custom software development, QuickBooks integrations, and modern web design.",
    url: "https://quattroapps.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quattro Software — Custom Software Development",
    description:
      "Custom software development, QuickBooks integrations, and modern web design.",
  },
  metadataBase: new URL("https://quattroapps.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased bg-quattro-surface-dark text-quattro-text-primary">
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
