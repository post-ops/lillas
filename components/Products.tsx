import { products } from "@/lib/config";
import ProductCard from "./ProductCard";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";

export default function Products() {
  return (
    <section id="products" className="relative border-t border-border py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
                The range
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-[72px]">
                Control levers.<br />
                <span className="gradient-text">Bridge systems.</span>
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-paper-soft">
              Six core products. DNV, CRS, IP66 certified. Designed and
              manufactured in-house in Horten.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <RevealItem key={p.id}>
              <ProductCard product={p} priority={i < 3} index={i} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
