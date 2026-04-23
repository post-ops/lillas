import { products } from "@/lib/config";
import ProductCard from "./ProductCard.new";

export default function Products() {
  return (
    <section id="products" className="border-t border-white/5 bg-[#0b0e14] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
              Products
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Control levers and bridge systems.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Designed and manufactured in-house — from the anodised aluminium housing
              to the CAN bus electronics. DNV, CRS, IP66 certified.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
