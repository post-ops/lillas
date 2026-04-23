import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

const title = "Lilaas — Maritime control since 1961.";
const description =
  "Lilaas designs and manufactures maritime control levers, joysticks, and bridge systems in Horten, Norway. On thousands of vessels worldwide — through Kongsberg Maritime, Wärtsilä, and the world's leading integrators.";

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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
