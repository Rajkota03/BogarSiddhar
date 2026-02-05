import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhogar Siddhar | The Alchemist Sage",
  description: "A digital shrine and educational archive dedicated to Bhogar Siddhar, one of the 18 Siddhars.",
};

import { getSiteSettings } from "@/lib/actions/settings";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <SiteSettingsProvider settings={settings}>
          <Navbar />
          {children}
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
