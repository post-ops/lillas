import Link from "next/link";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  subtitle: string;
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
  const label = product.title.split(" — ")[0];
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-2">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-contain p-10 transition-transform duration-700 group-hover:scale-[1.02]"
          unoptimized
        />
        {typeof index === "number" && (
          <span className="font-display absolute left-5 top-5 text-xs text-ink/50">
            ({String(index + 1).padStart(2, "0")})
          </span>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-normal text-ink">{label}</h3>
        <span className="text-[11px] uppercase tracking-[0.15em] text-ink/50">
          {product.specs[0]}
        </span>
      </div>
      <p className="mt-1 text-sm text-ink-soft">{product.subtitle}</p>
    </Link>
  );
}
