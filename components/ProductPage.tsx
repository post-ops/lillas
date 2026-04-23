import Link from "next/link";
import Image from "next/image";
import { brand, products } from "@/lib/config";
import ProductCard from "./ProductCard";

type Product = (typeof products)[number];

export default function ProductPage({ product }: { product: Product }) {
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);
  const label = product.title.split(" — ")[0];
  const tagline = product.title.split(" — ")[1] ?? "";

  return (
    <article className="bg-paper pt-28 lg:pt-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.18em] text-ink/55">
          <Link href="/#products" className="hover:text-ink">
            The range
          </Link>
          <span className="mx-2 text-ink/30">/</span>
          <span className="text-ink">{label}</span>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-16"
                unoptimized
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
              ({String(products.findIndex((p) => p.id === product.id) + 1).padStart(2, "0")}) · {tagline}
            </p>
            <h1 className="font-display mt-5 text-5xl font-normal leading-[1.02] tracking-[-0.02em] text-ink lg:text-[72px]">
              {label}
            </h1>

            <p className="mt-8 text-[17px] leading-[1.7] text-ink-soft">
              {product.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href={`mailto:${brand.email}?subject=${encodeURIComponent(
                  "Quote request: " + product.title
                )}`}
                className="inline-flex items-center gap-2 border-b border-ink pb-0.5 text-base font-medium text-ink transition-opacity hover:opacity-70"
              >
                Request a quote
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base text-ink/70 transition-colors hover:text-ink"
              >
                Official product page →
              </a>
            </div>
          </div>
        </div>

        <section className="mt-28 grid gap-10 border-t border-line pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
              Specifications
            </p>
          </div>
          <div className="lg:col-span-9">
            <dl className="divide-y divide-line">
              {Object.entries(product.technicalSpecs).map(([k, v], i) => (
                <div key={k} className="grid grid-cols-12 gap-6 py-5">
                  <dt className="font-display col-span-12 text-xs text-ink/40 sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </dt>
                  <dt className="col-span-12 text-[15px] text-ink-soft sm:col-span-4">
                    {k}
                  </dt>
                  <dd className="col-span-12 text-[15px] font-medium text-ink sm:col-span-7">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {product.longDescription?.length ? (
          <section className="mt-28 grid gap-10 border-t border-line pt-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
                Engineering
              </p>
            </div>
            <div className="space-y-6 text-[17px] leading-[1.7] text-ink-soft lg:col-span-9">
              {product.longDescription.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-28 grid gap-10 border-t border-line pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
              Certifications
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 lg:col-span-9">
            {product.certifications.map((c) => (
              <li key={c} className="font-display text-2xl text-ink lg:text-3xl">
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-28 grid gap-10 border-t border-line pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
              Applications
            </p>
          </div>
          <ul className="grid gap-2 lg:col-span-9 lg:grid-cols-2">
            {product.applications.map((a) => (
              <li key={a} className="text-[15px] text-ink-soft">
                — {a}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-32 border-t border-line pt-16 pb-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
            Related
          </p>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      <div className="bg-ink py-24 text-paper lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <h2 className="font-display lg:col-span-7 text-4xl font-normal leading-[1.02] tracking-[-0.02em] text-paper sm:text-5xl lg:text-[64px]">
              Need a quote on the<br />
              <em className="italic">{label}</em>?
            </h2>
            <div className="lg:col-span-5 lg:pt-3">
              <p className="text-[15px] leading-[1.7] text-paper/70">
                Reach our engineering team directly. Typical reply within one
                business day.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                <a
                  href={`mailto:${brand.email}?subject=${encodeURIComponent(
                    "Quote request: " + product.title
                  )}`}
                  className="inline-flex items-center gap-2 border-b border-paper pb-0.5 text-base font-medium text-paper transition-opacity hover:opacity-70"
                >
                  Email {brand.email}
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center text-base text-paper/80 transition-colors hover:text-paper"
                >
                  {brand.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
