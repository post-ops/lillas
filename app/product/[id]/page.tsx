import ProductPageWrapper from "@/components/ProductPageWrapper";
import { products } from "@/lib/config";

export function generateStaticParams() {
  return products.map((p: { id: string }) => ({ id: p.id }));
}

export default function ProductRoute({ params }: { params: { id: string } }) {
  return <ProductPageWrapper id={params.id} />;
}
