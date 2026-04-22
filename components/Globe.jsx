'use client';
import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { HUDLabel, Ticker } from "@/components/ui/HUD";
import { Reveal } from "@/components/ui/Reveal";
import Safe3D from "@/components/ui/Safe3D";

const GlobeScene = dynamic(() => import("@/components/3d/GlobeScene"), { ssr: false });

const TICKER_ITEMS = [
  "Kongsberg Maritime", "Wärtsilä", "CERN LHC", "DNV Certified",
  "IP66 Rated", "CAN · J1939", "AESS Platform", "Since 1961",
  "~50% Export Share", "12+ Major Ports", "6 Continents",
];

const STATS = [
  { stat: "~50%", label: "Export share",    sub: "Direct to global customers" },
  { stat: "12+",  label: "Major ports",     sub: "Active service network"     },
  { stat: "60+",  label: "Years shipping",  sub: "Founded Horten, 1961"       },
  { stat: "IP66", label: "Every product",   sub: "Certified · DNV · CRS"      },
];

function GlobeFallback() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/25" />
      <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#0a1020] via-[#1a0800] to-[#0a1020]" style={{ boxShadow: "0 0 80px rgba(249,132,12,0.25)" }} />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange shadow-[0_0_24px_rgba(249,132,12,0.8)]" />
    </div>
  );
}

export default function Globe() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const globeY = useTransform(smooth, [0, 1], ["40px", "-80px"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#04060c]">
      <Ticker items={TICKER_ITEMS} duration={32} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,_rgba(249,132,12,0.09),_transparent)]" />
      <div className="pointer-events-none absolute inset-0 line-grid opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Left: copy + stats */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <HUDLabel className="mb-4">Global presence · Live network</HUDLabel>
          <h2 className="mb-6 text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-6xl">
            From{" "}
            <span className="relative inline-block">
              <span className="gradient-text">Horten</span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-orange/50" />
            </span>
            {" "}to every<br />major shipping lane.
          </h2>
          <p className="mb-10 max-w-md text-base leading-relaxed text-secondary">
            Lilaas control systems are in service across every ocean,
            delivered through Kongsberg Maritime, Wärtsilä and the world&apos;s
            leading shipyards. One signal, every port.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ stat, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass glow-border group relative overflow-hidden rounded-xl p-5"
              >
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange/6 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <p className="mono text-2xl font-black gradient-text">{stat}</p>
                <p className="mt-1 text-sm font-semibold text-white">{label}</p>
                <p className="mt-0.5 text-xs text-secondary/70">{sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: 3D globe stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: globeY }}
          className="relative mt-12 h-[520px] lg:mt-0"
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-orange/6 blur-[100px] scale-75" />
          <Safe3D className="absolute inset-0" fallback={<GlobeFallback />}>
            <GlobeScene />
          </Safe3D>

          {/* HUD chrome */}
          <span className="pointer-events-none absolute top-3 left-3 h-6 w-6 border-t border-l border-orange/45" />
          <span className="pointer-events-none absolute top-3 right-3 h-6 w-6 border-t border-r border-orange/45" />
          <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b border-l border-orange/45" />
          <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r border-orange/45" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="absolute top-4 left-4 rounded-xl border border-orange/30 bg-primary/80 px-4 py-3 backdrop-blur-md shadow-[0_0_24px_rgba(249,132,12,0.35)]"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-orange opacity-75" />
                <span className="h-2.5 w-2.5 rounded-full bg-orange" />
              </span>
              <div>
                <p className="mono text-[10px] tracking-[0.3em] text-orange">HQ · HORTEN</p>
                <p className="text-xs font-bold text-white">59.4151°N · 10.4844°E</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute bottom-4 right-4 rounded-xl border border-orange/20 bg-primary/80 px-4 py-3 backdrop-blur-md"
          >
            <p className="text-xs font-bold text-white">⚛️ Also at CERN</p>
            <p className="mono mt-0.5 text-[10px] tracking-widest text-secondary/70">LARGE HADRON COLLIDER</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
