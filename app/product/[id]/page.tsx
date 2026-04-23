import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/lib/config";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product — Lilaas" };
  return {
    title: `${product.title} — Lilaas`,
    description: product.description,
  };
}

export default async function ProductRoute(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  return (
    <div className="bg-[#0b0e14]">
      <Navbar />
      <ProductPage product={product} />
      <Footer />
    </div>
  );
}
