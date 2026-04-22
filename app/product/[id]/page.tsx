import type { Metadata } from "next";
import ProductPageWrapper from "@/components/ProductPageWrapper";
import { products } from "@/lib/config";

export function generateStaticParams() {
  return products.map((p: { id: string }) => ({ id: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p: { id: string }) => p.id === id);
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
  return <ProductPageWrapper id={id} />;
}
