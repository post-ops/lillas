'use client';
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

// Dynamic imports with ssr:false — must be in a Client Component
const Hero          = dynamic(() => import("@/components/Hero"),          { ssr: false });
const About         = dynamic(() => import("@/components/About"),         { ssr: false });
const Products      = dynamic(() => import("@/components/Products"),      { ssr: false });
const Industries    = dynamic(() => import("@/components/Industries"),    { ssr: false });
const Globe         = dynamic(() => import("@/components/Globe"),         { ssr: false });
const BoatAnimation = dynamic(() => import("@/components/BoatAnimation"), { ssr: false });
const Clients       = dynamic(() => import("@/components/Clients"),       { ssr: false });
const Contact       = dynamic(() => import("@/components/Contact"),       { ssr: false });
const StarsCanvas   = dynamic(() => import("@/components/StarsCanvas"),   { ssr: false });

export default function MainSite() {
  return (
    <div className="relative z-0 bg-primary">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Industries />
      <Globe />
      <BoatAnimation />
      <Clients />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
      <Footer />
      <FloatingActions />
    </div>
  );
}
