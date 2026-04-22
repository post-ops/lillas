'use client';
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductPage = dynamic(() => import("@/components/ProductPage"), { ssr: false });

export default function ProductPageWrapper({ id }: { id: string }) {
  return (
    <div className="relative z-0 bg-primary">
      <Navbar />
      <ProductPage id={id} />
      <Footer />
    </div>
  );
}
