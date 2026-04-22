'use client';
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductPage = dynamic(() => import("@/components/ProductPage"), { ssr: false });

export default function ProductPageWrapper({ id }: { id: string }) {
  return (
    <div className="relative z-0 bg-primary">
      <Navbar />
      <ErrorBoundary fallback={null}>
        <ProductPage id={id} />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}
