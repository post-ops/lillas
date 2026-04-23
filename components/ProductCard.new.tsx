import Link from "next/link";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
};

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-white/5 bg-[#13161f] transition-colors hover:border-white/15"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0b0e14]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.03]"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg font-semibold text-white">{product.title}</h3>
          <p className="mt-0.5 text-sm text-white/50">{product.subtitle}</p>
        </div>
        <p className="text-sm leading-relaxed text-white/70">
          {product.description.length > 110
            ? product.description.slice(0, 110).trim() + "…"
            : product.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {product.specs.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/65"
            >
              {s}
            </span>
          ))}
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange transition-colors group-hover:text-orange-light">
          View specifications
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}
