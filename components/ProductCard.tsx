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

export default function ProductCard({
  product,
  priority = false,
  index,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
}) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 backdrop-blur-md transition-all hover:border-orange/40 hover:shadow-orange-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-surface-2 to-ink">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,_rgba(249,132,12,0.18),_transparent_70%)]" />
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-contain p-10 transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ filter: "drop-shadow(0 0 24px rgba(249,132,12,0.25))" }}
          unoptimized
        />
        {typeof index === "number" && (
          <span className="absolute left-4 top-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange/70">
            ({String(index + 1).padStart(2, "0")})
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-xl font-bold text-paper">{product.title.split(" — ")[0]}</h3>
          <p className="mt-1 text-sm text-mute">{product.subtitle}</p>
        </div>
        <p className="text-sm leading-relaxed text-paper-soft">
          {product.description.length > 120
            ? product.description.slice(0, 120).trim() + "…"
            : product.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {product.specs.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-md border border-orange/15 bg-orange/8 px-2.5 py-1 text-[10px] font-bold tracking-widest text-orange-light"
            >
              {s}
            </span>
          ))}
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-orange transition-all group-hover:gap-2.5">
          View specifications
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
