import Link from "next/link";
import Image from "next/image";
import { brand, products } from "@/lib/config";
import ProductCard from "./ProductCard.new";

type Product = (typeof products)[number];

export default function ProductPage({ product }: { product: Product }) {
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <article className="bg-[#0b0e14] pt-28 pb-24 lg:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <nav aria-label="Breadcrumb" className="text-sm text-white/50">
          <Link href="/#products" className="transition-colors hover:text-white">
            Products
          </Link>
          <span className="mx-2 text-white/30">/</span>
          <span className="text-white/80">{product.title.split(" — ")[0]}</span>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-[#13161f]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-12"
              unoptimized
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {product.title}
            </h1>
            <p className="mt-2 text-lg text-white/55">{product.subtitle}</p>

            <p className="mt-6 text-base leading-relaxed text-white/75">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {product.specs.map((s) => (
                <span
                  key={s}
                  className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${brand.email}?subject=${encodeURIComponent(
                  "Quote request: " + product.title
                )}`}
                className="inline-flex items-center gap-2 rounded-md bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
              >
                Request a quote
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 hover:bg-white/5"
              >
                Official product page
              </a>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            Technical specifications
          </h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-white/5">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.technicalSpecs).map(([k, v], i) => (
                  <tr
                    key={k}
                    className={i % 2 === 0 ? "bg-[#13161f]" : "bg-[#0f131c]"}
                  >
                    <th
                      scope="row"
                      className="w-1/2 px-6 py-4 text-left font-medium text-white/65"
                    >
                      {k}
                    </th>
                    <td className="px-6 py-4 text-white/90">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {product.longDescription?.length ? (
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
              Engineering notes
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-white/75 lg:col-span-2">
              {product.longDescription.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-20 grid gap-10 lg:grid-cols-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            Certifications
          </h2>
          <ul className="flex flex-wrap gap-2 lg:col-span-2">
            {product.certifications.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/85"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-orange" aria-hidden="true">
                  <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" strokeLinejoin="round" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            Typical applications
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-2">
            {product.applications.map((a) => (
              <li key={a} className="flex items-start gap-3 text-sm text-white/80">
                <span aria-hidden="true" className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-orange" />
                {a}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-24 border-t border-white/5 pt-16">
          <h2 className="text-2xl font-semibold text-white">Related products</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-xl border border-white/5 bg-[#13161f] p-8 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white">Need a quote?</h2>
              <p className="mt-2 text-sm text-white/65">
                Reach the engineering team directly. Typical reply within one business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${brand.email}?subject=${encodeURIComponent(
                  "Quote request: " + product.title
                )}`}
                className="inline-flex items-center gap-2 rounded-md bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
              >
                Email {brand.email}
              </a>
              <a
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 hover:bg-white/5"
              >
                {brand.phone}
              </a>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
