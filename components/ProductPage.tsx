import Link from "next/link";
import Image from "next/image";
import { brand, products } from "@/lib/config";
import ProductCard from "./ProductCard";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";

type Product = (typeof products)[number];

export default function ProductPage({ product }: { product: Product }) {
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);
  const label = product.title.split(" — ")[0];
  const tagline = product.title.split(" — ")[1] ?? "";

  return (
    <article className="bg-ink pt-28 pb-24 lg:pt-36">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] mesh-gradient" />

        <nav aria-label="Breadcrumb" className="relative text-xs font-semibold uppercase tracking-[0.22em] text-orange/70">
          <Link href="/#products" className="transition-colors hover:text-orange">
            The range
          </Link>
          <span className="mx-2 text-mute">/</span>
          <span className="text-paper">{label}</span>
        </nav>

        <div className="relative mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-2 to-ink">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,_rgba(249,132,12,0.22),_transparent_70%)]" />
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-16"
                style={{ filter: "drop-shadow(0 0 40px rgba(249,132,12,0.3))" }}
                unoptimized
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
              ({String(products.findIndex((p) => p.id === product.id) + 1).padStart(2, "0")}) · {tagline}
            </p>
            <h1 className="mt-5 text-5xl font-black leading-[1.02] tracking-tight text-paper lg:text-[72px]">
              {label}
            </h1>
            <p className="mt-7 text-[17px] leading-[1.7] text-paper-soft">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {product.specs.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-orange/15 bg-orange/8 px-3 py-1 text-[11px] font-bold tracking-widest text-orange-light"
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
                className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-bold text-ink shadow-orange-lg transition-transform hover:scale-[1.03]"
              >
                Request a quote
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 text-sm font-semibold text-paper backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/10"
              >
                Official product page →
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative mt-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
            Specifications
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-md">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.technicalSpecs).map(([k, v], i) => (
                  <tr
                    key={k}
                    className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}
                  >
                    <th
                      scope="row"
                      className="w-1/2 px-6 py-4 text-left text-paper-soft font-medium"
                    >
                      {k}
                    </th>
                    <td className="px-6 py-4 text-paper">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {product.longDescription?.length ? (
          <Reveal className="relative mt-20 grid gap-8 lg:grid-cols-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
              Engineering notes
            </p>
            <div className="space-y-5 text-[17px] leading-[1.75] text-paper-soft lg:col-span-2">
              {product.longDescription.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        ) : null}

        <Reveal className="relative mt-20 grid gap-8 lg:grid-cols-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
            Certifications
          </p>
          <ul className="flex flex-wrap gap-2 lg:col-span-2">
            {product.certifications.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-2 rounded-full border border-orange/25 bg-orange/10 px-4 py-2 text-sm font-bold text-orange-light shadow-orange"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="relative mt-20 grid gap-8 lg:grid-cols-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
            Typical applications
          </p>
          <ul className="grid gap-2 lg:col-span-2 lg:grid-cols-2">
            {product.applications.map((a) => (
              <li key={a} className="flex items-start gap-3 text-[15px] text-paper-soft">
                <span aria-hidden="true" className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-orange" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="relative mt-24 border-t border-border pt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
            Related products
          </p>
          <RevealStagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <RevealItem key={p.id}>
                <ProductCard product={p} />
              </RevealItem>
            ))}
          </RevealStagger>
        </Reveal>

        <Reveal className="relative mt-20 glass glow-border rounded-2xl p-10 lg:p-14">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-3xl font-black leading-tight text-paper lg:text-4xl">
                Need a quote on the <span className="gradient-text">{label}</span>?
              </h2>
              <p className="mt-3 max-w-md text-[15px] text-paper-soft">
                Reach the engineering team directly. Typical reply within one business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${brand.email}?subject=${encodeURIComponent(
                  "Quote request: " + product.title
                )}`}
                className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-bold text-ink shadow-orange-lg transition-transform hover:scale-[1.03]"
              >
                Email {brand.email}
              </a>
              <a
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-white/25 hover:bg-white/10"
              >
                {brand.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
