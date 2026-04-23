"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { brand, images } from "@/lib/config";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,_rgba(249,132,12,0.35),_transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/30 animate-[spin_32s_linear_infinite]" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/15 animate-[spin_48s_linear_infinite_reverse]" />
    </div>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden mesh-ocean" style={{ minHeight: "100svh" }}>
      <div className="absolute inset-0 dot-grid-fine opacity-40" />
      <div className="absolute inset-0 -z-0">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-[1400px] px-6 pt-40 pb-24 lg:px-12 lg:pt-48">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-3 rounded-full border border-orange/25 bg-orange/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-orange-light"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-orange opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-orange" />
              </span>
              Est. 1961 · Horten, Norway
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.1, ease: EASE }}
              className="mt-8 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.02em] text-paper sm:text-7xl lg:text-[112px]"
            >
              Maritime <span className="gradient-text">control</span><br />
              at sea.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-paper-soft"
            >
              {brand.description} Designed, engineered, and manufactured in Horten since {brand.founded}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-ink shadow-orange-lg transition-transform hover:scale-[1.03]"
              >
                Request a quote
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-paper backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/10"
              >
                See the range
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative border-t border-border bg-ink/40 backdrop-blur-md"
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-border px-6 py-6 lg:grid-cols-4 lg:px-12">
            {[
              { k: "Since", v: "1961" },
              { k: "Employees", v: "60" },
              { k: "Exported", v: "50%" },
              { k: "Vessels", v: "1000s" },
            ].map((s) => (
              <div key={s.k} className="px-4 first:pl-0 last:pr-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mute">{s.k}</div>
                <div className="mt-1 text-2xl font-bold text-paper">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Image
        src={images.logo}
        alt=""
        aria-hidden="true"
        width={1}
        height={1}
        className="hidden"
        unoptimized
      />
    </section>
  );
}
