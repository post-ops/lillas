'use client';
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Hero       = dynamic(() => import("@/components/Hero"),       { ssr: false });
const About      = dynamic(() => import("@/components/About"),      { ssr: false });
const Products   = dynamic(() => import("@/components/Products"),   { ssr: false });
const Industries = dynamic(() => import("@/components/Industries"), { ssr: false });
const Globe      = dynamic(() => import("@/components/Globe"),      { ssr: false });
const Clients    = dynamic(() => import("@/components/Clients"),    { ssr: false });
const Contact    = dynamic(() => import("@/components/Contact"),    { ssr: false });

function Section({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary fallback={null}>{children}</ErrorBoundary>;
}

export default function MainSite() {
  return (
    <div className="relative z-0 bg-primary">
      <Navbar />
      <main>
        <Section><Hero /></Section>
        <Section><About /></Section>
        <Section><Products /></Section>
        <Section><Industries /></Section>
        <Section><Globe /></Section>
        <Section><Clients /></Section>
        <Section><Contact /></Section>
      </main>
      <Footer />
    </div>
  );
}
