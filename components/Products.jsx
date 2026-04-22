'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/config";
import { HUDLabel } from "@/components/ui/HUD";
import { Reveal } from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";

/* A big, floating hero showcase for the active product. Uses only CSS transforms. */
function ProductStage({ active, activeIndex }) {
  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-3xl border border-white/5 bg-[#04060c] sm:h-[520px]">
      {/* Grid + gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 line-grid opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_55%,_rgba(249,132,12,0.18),_transparent_70%)]" />

      {/* Ambient orbiting rings (pure CSS) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/20 animate-[spin_40s_linear_infinite]" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/15 animate-[spin_25s_linear_infinite_reverse]" />
        <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/10 animate-[spin_18s_linear_infinite]" />
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl" />
      </div>

      {/* Animated product image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 0.85, rotateY: 25 }}
          animate={{ opacity: 1, scale: 1,    rotateY: 0  }}
          exit={{    opacity: 0, scale: 0.9,  rotateY: -25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: 1200 }}
        >
          <motion.img
            src={active.image}
            alt={active.title}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            className="h-[60%] w-auto select-none object-contain"
            style={{ filter: "drop-shadow(0 0 120px rgba(249,132,12,0.6))" }}
            draggable={false}
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* HUD chrome */}
      <span className="pointer-events-none absolute top-3 left-3 h-5 w-5 border-t border-l border-orange/50" />
      <span className="pointer-events-none absolute top-3 right-3 h-5 w-5 border-t border-r border-orange/50" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-orange/50" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-orange/50" />

      {/* Top-left spec chips */}
      <div className="pointer-events-none absolute left-6 top-6 flex flex-col gap-2">
        {active.specs.slice(0, 2).map((s, i) => (
          <motion.div
            key={`${active.id}-${s}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="mono rounded-md border border-orange/30 bg-primary/80 px-3 py-1 text-[10px] tracking-widest text-orange backdrop-blur-md"
          >
            {s}
          </motion.div>
        ))}
      </div>

      {/* Top-right spec chips */}
      <div className="pointer-events-none absolute right-6 top-6 flex flex-col items-end gap-2">
        {active.specs.slice(2, 4).map((s, i) => (
          <motion.div
            key={`${active.id}-r-${s}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            className="mono rounded-md border border-orange/30 bg-primary/80 px-3 py-1 text-[10px] tracking-widest text-orange backdrop-blur-md"
          >
            {s}
          </motion.div>
        ))}
      </div>

      {/* Product counter */}
      <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 rounded-full border border-orange/30 bg-primary/70 px-4 py-1.5 backdrop-blur-md">
        <span className="mono text-[10px] tracking-[0.3em] text-orange/90">
          {String(activeIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom floor-plate */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#04060c] to-transparent" />
    </div>
  );
}

function CatalogueItem({ product, active, index, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(index)}
      whileHover={{ x: 4 }}
      className={`group relative w-full overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-all ${
        active
          ? "border-orange/55 bg-orange/10 shadow-[0_0_32px_rgba(249,132,12,0.3)]"
          : "border-white/5 bg-surface/40 hover:border-orange/30 hover:bg-surface/60"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`mono text-[10px] font-bold tracking-widest ${active ? "text-orange" : "text-orange/50"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white">{product.title}</p>
          <p className="mono mt-0.5 truncate text-[10px] text-orange/60">{product.subtitle}</p>
        </div>
        <motion.span animate={{ x: active ? 0 : -6, opacity: active ? 1 : 0 }} className="text-orange">
          →
        </motion.span>
      </div>
      {active && (
        <motion.div
          layoutId="catalogue-underline"
          className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-orange via-orange-light to-transparent"
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.button>
  );
}

export default function Products() {
  const [idx, setIdx] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIdx((i) => (i + 1) % products.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const active = products[idx];

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-primary py-28 sm:py-32"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 line-grid opacity-12" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-orange/5 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-orange/4 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <HUDLabel className="mb-3">The range · 06 products</HUDLabel>
            <h2 className="text-4xl font-black leading-[1.04] text-white sm:text-6xl">
              Bridge-grade{" "}
              <span className="gradient-text">controls,</span>
              <br />
              built in Horten.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-secondary lg:text-right">
              Every lever, joystick and bridge-console system is designed,
              machined, wired and tested in-house. DNV and CRS certified.
              Deployed worldwide via the industry&apos;s top integrators.
            </p>
          </Reveal>
        </div>

        {/* Stage + catalogue */}
        <div className="grid gap-6 lg:grid-cols-[1.15fr_340px]">
          {/* Stage */}
          <div className="space-y-5">
            <ProductStage active={active} activeIndex={idx} />

            {/* Detail band */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{    opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl border border-white/5 bg-surface/40 p-6 backdrop-blur-sm sm:p-8"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-lg">
                    <HUDLabel className="mb-2">{active.subtitle}</HUDLabel>
                    <h3 className="text-2xl font-black text-white sm:text-3xl">{active.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-secondary">{active.description}</p>
                  </div>
                  <Link
                    href={`/product/${active.id}`}
                    className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-bold text-white shadow-[0_0_28px_rgba(249,132,12,0.35)] transition-all hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(249,132,12,0.55)]"
                  >
                    View data sheet
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>

                {/* Cert row */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {active.certifications.slice(0, 4).map((c) => (
                    <div
                      key={c}
                      className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.025] px-3 py-2"
                    >
                      <svg className="h-4 w-4 shrink-0 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="mono text-[11px] font-bold tracking-widest text-white/80">{c}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Catalogue */}
          <div className="flex flex-col gap-3">
            <div className="mb-1 flex items-center justify-between">
              <HUDLabel>Catalogue</HUDLabel>
              <span className="mono text-[10px] tracking-widest text-secondary/40">auto · 7s</span>
            </div>

            {products.map((p, i) => (
              <CatalogueItem key={p.id} product={p} active={i === idx} index={i} onSelect={setIdx} />
            ))}

            <div className="mt-3 overflow-hidden rounded-xl border border-orange/15 bg-gradient-to-br from-orange/8 to-transparent p-5">
              <HUDLabel>LILAAS TECHNOLOGY</HUDLabel>
              <p className="mt-2 text-base font-black text-white">AESS</p>
              <p className="mt-1 text-xs text-secondary">
                Azimuth Electronic Shaft System — proprietary CAN-bus master/slave
                for every vessel class. Full duplicate controls, zero extra I/O.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
