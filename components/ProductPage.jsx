'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/config";
import { HUDLabel } from "@/components/ui/HUD";
import { Reveal } from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";

export default function ProductPage({ id }) {
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <HUDLabel>Error 404 · Product not in catalogue</HUDLabel>
        <p className="text-5xl font-black text-white">Product not found</p>
        <p className="text-secondary">No product with id <code className="mono text-orange">&quot;{id}&quot;</code> exists.</p>
        <Link href="/#products" className="rounded-full bg-orange px-8 py-3 text-sm font-bold text-white hover:bg-orange-dark transition-all">
          ← Back to products
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== id);
  const specEntries = Object.entries(product.technicalSpecs);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#06080f] pt-24">
        <div className="pointer-events-none absolute inset-0 line-grid opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_0%,_rgba(249,132,12,0.14),_transparent)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06080f] to-transparent" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pb-16 pt-12 sm:px-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/#products"
              className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-secondary backdrop-blur-sm transition-all hover:border-orange/30 hover:text-white"
            >
              ← Back to products
            </Link>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-orange" />
              <HUDLabel>{product.subtitle}</HUDLabel>
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              {product.title.split("—")[0].trim()}
              {product.title.includes("—") && (
                <span className="block gradient-text text-4xl sm:text-5xl">
                  {product.title.split("—")[1].trim()}
                </span>
              )}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.specs.map((s) => (
                <span key={s} className="mono rounded-lg border border-orange/25 bg-orange/10 px-3 py-1 text-xs font-bold tracking-widest text-orange">
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-secondary">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact-cta"
                className="group relative overflow-hidden rounded-full bg-orange px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_32px_rgba(249,132,12,0.4)] transition-all hover:scale-[1.04] hover:shadow-[0_0_48px_rgba(249,132,12,0.6)]"
              >
                <span className="relative z-10">Request a quote →</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-dark to-orange-light transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              {product.link && (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-orange/30 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-orange hover:bg-orange/10"
                >
                  Official page ↗
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[460px] w-full"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/20 animate-[spin_45s_linear_infinite]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/15 animate-[spin_28s_linear_infinite_reverse]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/12 blur-3xl" />
            <motion.img
              src={product.image}
              alt={product.title}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              className="relative z-10 mx-auto h-full w-auto select-none object-contain"
              style={{ filter: "drop-shadow(0 0 120px rgba(249,132,12,0.7))" }}
              draggable={false}
            />
            <span className="pointer-events-none absolute top-6 right-6 z-20 h-10 w-10 border-t border-r border-orange/40" />
            <span className="pointer-events-none absolute bottom-6 left-6 z-20 h-10 w-10 border-b border-l border-orange/40" />
          </motion.div>
        </div>
      </section>

      {/* Specifications */}
      <section className="relative overflow-hidden bg-primary py-24 mesh-gradient">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <HUDLabel className="mb-3">Technical overview</HUDLabel>
              <h2 className="mb-8 text-4xl font-black text-white sm:text-5xl">
                Technical<br /><span className="gradient-text">Specifications</span>
              </h2>
              {product.longDescription.map((p, i) => (
                <p key={i} className={`${i > 0 ? "mt-5" : ""} text-sm leading-[1.85] text-secondary`}>
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl border border-white/6 backdrop-blur-sm">
                <div className="border-b border-white/6 bg-orange/5 px-6 py-4">
                  <HUDLabel>Spec sheet</HUDLabel>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {specEntries.map(([key, val], i) => (
                      <tr
                        key={key}
                        className={`border-b border-white/4 transition-colors hover:bg-orange/5 ${
                          i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                        }`}
                      >
                        <td className="px-6 py-3.5 font-semibold text-secondary/70 w-[48%]">{key}</td>
                        <td className="px-6 py-3.5 font-bold text-white">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Certifications + Applications */}
      <section className="relative overflow-hidden bg-[#07090f] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <Reveal>
            <HUDLabel className="mb-3">Compliance</HUDLabel>
            <h2 className="mb-8 text-3xl font-black text-white sm:text-4xl">Certifications &amp; Standards</h2>
          </Reveal>
          <div className="mb-16 flex flex-wrap gap-4">
            {product.certifications.map((cert, i) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 rounded-2xl border border-orange/25 bg-orange/8 px-6 py-4 backdrop-blur-sm transition-all hover:border-orange/45 hover:bg-orange/12"
              >
                <svg className="h-5 w-5 shrink-0 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <span className="text-sm font-bold text-white">{cert}</span>
              </motion.div>
            ))}
          </div>

          <Reveal>
            <HUDLabel className="mb-3">Use cases</HUDLabel>
            <h2 className="mb-8 text-3xl font-black text-white sm:text-4xl">Where it&apos;s used</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.applications.map((app, i) => (
              <motion.div
                key={app}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass glow-border group flex items-center gap-4 rounded-2xl px-5 py-4"
              >
                <svg className="h-5 w-5 shrink-0 text-orange/60 transition-colors group-hover:text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="3" />
                  <line x1="12" y1="8" x2="12" y2="22" />
                  <path d="M5 16H2a10 10 0 0 0 20 0h-3" />
                </svg>
                <span className="text-sm font-semibold text-secondary transition-colors group-hover:text-white">{app}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <Reveal>
            <HUDLabel className="mb-3">Explore more</HUDLabel>
            <h2 className="mb-10 text-3xl font-black text-white sm:text-4xl">Related Products</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {related.map((p, i) => (
              <Tilt key={p.id} intensity={10}>
                <Link
                  href={`/product/${p.id}`}
                  className="group block overflow-hidden rounded-2xl border border-white/5 bg-surface/50 backdrop-blur-sm transition-all hover:border-orange/30 hover:shadow-[0_0_32px_rgba(249,132,12,0.25)]"
                >
                  <div className="relative h-36 overflow-hidden bg-[#080b14]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      style={{ filter: "drop-shadow(0 0 20px rgba(249,132,12,0.4))" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                    <p className="mono mt-0.5 text-[10px] text-orange/60">{p.subtitle}</p>
                  </div>
                </Link>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact-cta"
        className="relative overflow-hidden py-28"
        style={{ background: "linear-gradient(135deg, #06080f 0%, #1a0c00 50%, #06080f 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,_rgba(249,132,12,0.1),_transparent)]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-12">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-orange/30 bg-orange/10 px-5 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              <HUDLabel>Talk to an engineer</HUDLabel>
            </div>
            <h2 className="mb-5 text-4xl font-black text-white sm:text-5xl">
              Need this product?<span className="block mt-1 gradient-text">Talk to our engineers.</span>
            </h2>
            <p className="mb-10 text-base leading-relaxed text-secondary">
              Our team in Horten, Norway is ready to help you spec the right control system for your vessel.
              We handle everything from single-unit orders to full bridge console integrations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#contact"
                className="group relative overflow-hidden rounded-full bg-orange px-10 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(249,132,12,0.4)] transition-all hover:scale-[1.04] hover:shadow-[0_0_60px_rgba(249,132,12,0.6)]"
              >
                <span className="relative z-10">Contact us →</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-dark to-orange-light transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                href={`mailto:lilaas@lilaas.no?subject=Product inquiry: ${product.title}`}
                className="rounded-full border border-orange/30 px-10 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-orange hover:bg-orange/10"
              >
                Send email
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
