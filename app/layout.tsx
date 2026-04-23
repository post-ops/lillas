import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = "Lilaas — Maritime control since 1961.";
const description =
  "Lilaas designs and manufactures maritime control levers, joysticks, and bridge systems in Horten, Norway. Trusted by Kongsberg Maritime, Wärtsilä, and CERN.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lilaas.no"),
  title,
  description,
  keywords: [
    "Lilaas", "control lever", "joystick", "maritime", "DNV",
    "Kongsberg", "Wärtsilä", "bridge console", "Horten", "Norway",
  ],
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Lilaas",
    locale: "en_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-ink text-paper antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
