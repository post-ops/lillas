import { products } from "@/lib/config";
import ProductCard from "./ProductCard";

export default function Products() {
  return (
    <section id="products" className="relative">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-40">
        <div className="flex flex-col gap-6 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
              The range
            </p>
            <h2 className="font-display mt-6 max-w-3xl text-4xl font-normal leading-[1.02] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[72px]">
              Control levers,<br />
              joysticks,<br />
              <em className="italic">bridge systems.</em>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-[1.7] text-ink-soft">
            Six core products. DNV, CRS, IP66 certified. Designed and
            manufactured in-house at Kongeveien 75.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 3} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
