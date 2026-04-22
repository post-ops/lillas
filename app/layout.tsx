import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lilaas — Control at Sea",
  description:
    "World-leading manufacturer of control levers and joysticks for maritime vessels. Founded in Horten, Norway 1961.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-primary">{children}</body>
    </html>
  );
}
