'use client';
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { brand } from "@/lib/config";
import Safe3D from "@/components/ui/Safe3D";
import { HUDLabel, LiveClock, StatusLED } from "@/components/ui/HUD";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

/* Static fallback shown if WebGL fails / loads. */
function HeroFallback() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,_rgba(249,132,12,0.22),_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_55%,_rgba(255,176,102,0.14),_transparent_65%)]" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/30 animate-[spin_32s_linear_infinite]" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/15 animate-[spin_48s_linear_infinite_reverse]" />
    </div>
  );
}

const TRUSTED = [
  "KONGSBERG MARITIME",
  "WÄRTSILÄ",
  "CERN",
  "ABB MARINE",
  "ROLLS-ROYCE MARINE",
];

export default function Hero() {
  const containerRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProg = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });

  useEffect(() => scrollYProgress.on("change", (v) => { scrollProg.current = v; }), [scrollYProgress]);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth)  * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const titleY       = useTransform(smooth, [0, 0.8], [0, -180]);
  const titleOpacity = useTransform(smooth, [0, 0.45, 0.7], [1, 1, 0]);
  const subOpacity   = useTransform(smooth, [0, 0.3, 0.55], [1, 1, 0]);
  const hudOpacity   = useTransform(smooth, [0, 0.1], [1, 0]);

  return (
    <section ref={containerRef} id="top" className="relative h-[170vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary">
        {/* 3D stage (with fallback) */}
        <Safe3D
          className="absolute inset-0 bg-gradient-to-br from-[#05070d] via-[#07091a] to-[#05070d]"
          fallback={<HeroFallback />}
        >
          <div className="absolute inset-0">
            <HeroScene pointer={pointer} scroll={scrollProg} />
          </div>
        </Safe3D>

        {/* Engineering overlays */}
        <div className="pointer-events-none absolute inset-0 line-grid opacity-25" />
        <div className="pointer-events-none absolute inset-0 scanlines opacity-30" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-primary via-primary/70 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,_rgba(249,132,12,0.15),_transparent)]" />

        {/* Hud corner brackets at viewport scale */}
        <span className="pointer-events-none absolute top-6 left-6 h-10 w-10 border-t border-l border-orange/40 z-20" />
        <span className="pointer-events-none absolute top-6 right-6 h-10 w-10 border-t border-r border-orange/40 z-20" />
        <span className="pointer-events-none absolute bottom-24 left-6 h-10 w-10 border-b border-l border-orange/40 z-20" />
        <span className="pointer-events-none absolute bottom-24 right-6 h-10 w-10 border-b border-r border-orange/40 z-20" />

        {/* Top HUD bar */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="absolute top-24 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-4">
            <StatusLED label="SYSTEM · NOMINAL" />
            <span className="mono text-[10px] tracking-[0.3em] text-orange/50">|</span>
            <LiveClock prefix="UTC" />
          </div>
          <p className="mono text-[10px] tracking-[0.35em] text-orange/50">
            LAT 59.4151°N · LON 10.4844°E · HORTEN, NO
          </p>
        </motion.div>

        {/* Center title */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-orange/50" />
            <HUDLabel>LILAAS AS · EST. {brand.founded} · HORTEN</HUDLabel>
            <span className="h-px w-12 bg-orange/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[4.5rem] font-black leading-[0.9] tracking-[-0.04em] text-white sm:text-[7.5rem] xl:text-[10rem]"
            style={{ textShadow: "0 0 80px rgba(249,132,12,0.28)" }}
          >
            Control<br />
            <span className="gradient-text">at sea.</span>
          </motion.h1>

          <motion.p
            style={{ opacity: subOpacity }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
          >
            Precision control levers, joysticks &amp; bridge systems.
            Engineered in-house in <span className="text-white font-semibold">Horten</span> since
            {" "}<span className="text-white font-semibold">{brand.founded}</span>. On thousands of vessels worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#products"
              className="group relative overflow-hidden rounded-full bg-orange px-10 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(249,132,12,0.4)] transition-all hover:scale-[1.04] hover:shadow-[0_0_60px_rgba(249,132,12,0.6)]"
            >
              <span className="relative z-10">Explore the range →</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-dark via-orange to-orange-light transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-orange/35 px-10 py-4 text-sm font-bold text-white/90 backdrop-blur-sm transition-all hover:border-orange hover:bg-orange/10 hover:text-white"
            >
              Talk to our engineers
            </a>
          </motion.div>

          {/* Trusted-by row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-14 flex flex-col items-center gap-3"
          >
            <HUDLabel className="opacity-60">Trusted by</HUDLabel>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {TRUSTED.map((n, i) => (
                <motion.span
                  key={n}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + i * 0.08 }}
                  className="mono text-xs font-semibold tracking-[0.22em] text-white/45 transition-colors hover:text-white/85"
                >
                  {n}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="mono text-[10px] tracking-[0.35em] text-orange/50">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-5 items-start justify-center rounded-full border border-orange/35 pt-1.5"
          >
            <span className="h-1.5 w-0.5 rounded-full bg-orange" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
