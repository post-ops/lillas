import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const title = "Lilaas — Control at Sea. Since 1961.";
const description =
  "World-leading manufacturer of maritime control levers, joysticks and bridge systems. Engineered and produced in Horten, Norway since 1961. Trusted by Kongsberg Maritime, Wärtsilä and CERN.";

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
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-primary antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
