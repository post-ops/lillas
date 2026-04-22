import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Lilaas — Control at Sea. Since 1961.",
  description:
    "World-leading manufacturer of maritime control levers, joysticks and bridge systems. Engineered and produced in Horten, Norway since 1961. Trusted by Kongsberg Maritime, Wärtsilä and CERN.",
  keywords: [
    "Lilaas", "control lever", "joystick", "maritime", "DNV",
    "Kongsberg", "Wärtsilä", "bridge console", "Horten", "Norway",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-primary antialiased">{children}</body>
    </html>
  );
}
