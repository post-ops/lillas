'use client';
import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { brand, images, proofPoints, stats, features } from "@/lib/config";
import { HUDLabel } from "@/components/ui/HUD";
import { Reveal } from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";

/* ─── Counts up when scrolled into view ────────────────────────────────── */
function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const isNum = /^\d+$/.test(value);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 18 });
  const text = useTransform(spring, (v) => Math.round(v).toString());
  useEffect(() => { if (inView && isNum) mv.set(parseInt(value, 10)); }, [inView, isNum, value, mv]);
  return <span ref={ref}>{isNum ? <motion.span>{text}</motion.span> : value}</span>;
}

const TIMELINE = [
  { year: "1961",  title: "Founded",            text: "Jan Lilaas establishes Lilaas Finmekaniske in Horten, Norway." },
  { year: "1980s", title: "Maritime expansion", text: "Recognised supplier to the ship and offshore industries." },
  { year: "2000s", title: "Global integrators", text: "Kongsberg Maritime & Wärtsilä put Lilaas on vessels worldwide." },
  { year: "2010s", title: "Beyond maritime",    text: "Precision components to CERN, defence, and medicine." },
  { year: "Today", title: "World-leading",      text: `${brand.employees} staff · ${brand.exportShare}% exported · autonomy ready.` },
];

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });
  const x = useTransform(smooth, [0, 0.7], ["6%", "-14%"]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ x }} className="flex gap-5 py-2">
        {TIMELINE.map(({ year, title, text }, i) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative shrink-0 w-60 overflow-hidden rounded-2xl border border-white/5 bg-surface/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/30 hover:shadow-[0_0_40px_rgba(249,132,12,0.25)]"
          >
            <span className="mb-3 inline-block rounded-md border border-orange/30 bg-orange/10 px-2.5 py-1 mono text-[10px] font-black tracking-widest text-orange">
              {year}
            </span>
            <p className="text-sm font-bold text-white">{title}</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">{text}</p>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange to-transparent transition-all duration-500 group-hover:w-full rounded-b-2xl" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });
  const imgY = useTransform(smooth, [0, 1], ["-10%", "12%"]);
  const blobX = useTransform(smooth, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#07090f] py-28 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary to-transparent" />
      <div className="section-divider absolute inset-x-0 top-0" />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-10" />
      <motion.div style={{ x: blobX }} className="pointer-events-none absolute -right-40 top-10 h-[600px] w-[600px] rounded-full bg-orange/6 blur-[180px]" />

      {/* Proof strip */}
      <div className="relative mx-auto mb-20 max-w-7xl px-6 sm:px-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {proofPoints.map(({ label, value, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-orange/30 hover:bg-surface/60"
            >
              <HUDLabel className="mb-3 opacity-75">{label}</HUDLabel>
              <p className="mono text-3xl font-black gradient-text leading-none">{value}</p>
              <p className="mt-2 text-[11px] leading-snug text-secondary/70">{sub}</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
        <Reveal>
          <HUDLabel className="mb-4">About Lilaas · Est. 1961</HUDLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-16 max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-6xl">
            Precision you can set on a bridge,{" "}
            <span className="gradient-text">and trust for thirty years.</span>
          </h2>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Narrative column */}
          <Reveal delay={0.15}>
            <div className="space-y-5">
              <p className="text-base leading-relaxed text-secondary">
                Lilaas was founded by <strong className="text-white">Jan Lilaas in 1961</strong> under
                the name Lilaas Finmekaniske. Today the company is led by{" "}
                <strong className="text-white">CEO Espen Hoff</strong> and is one of the world&apos;s
                leading manufacturers of control levers and joysticks for maritime vessels.
              </p>
              <p className="text-base leading-relaxed text-secondary">
                <strong className="text-white">75% of revenue</strong> comes from in-house maritime products.
                Around <strong className="text-white">50%</strong> is exported directly.
                The remaining 25% is precision manufacturing for industries where
                tolerance of failure is zero.
              </p>

              {/* CEO quote */}
              <Tilt intensity={5} scale={1.01} glow={false}>
                <motion.blockquote
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative mt-6 overflow-hidden rounded-2xl border border-orange/25 bg-gradient-to-br from-orange/10 via-transparent to-orange/5 p-7"
                >
                  <div className="pointer-events-none absolute -left-6 -top-8 select-none mono text-[9rem] leading-none text-orange/10">&ldquo;</div>
                  <p className="relative z-10 text-base leading-relaxed italic text-white/90">
                    {brand.ceoQuote}
                  </p>
                  <div className="relative z-10 mt-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange text-sm font-black text-white shadow-[0_0_20px_rgba(249,132,12,0.45)]">EH</span>
                    <div>
                      <p className="text-sm font-bold text-white">{brand.ceo}</p>
                      <p className="mono text-[10px] tracking-[0.3em] text-orange/70">CEO · LILAAS AS</p>
                    </div>
                  </div>
                </motion.blockquote>
              </Tilt>

              {/* Features */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {features.map(({ icon, title, text }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Tilt intensity={8} scale={1.02}>
                      <div className="group relative h-full overflow-hidden rounded-xl border border-white/5 bg-surface/50 p-4 backdrop-blur-sm transition-colors hover:border-orange/30">
                        <span className="text-xl">{icon}</span>
                        <p className="mt-2 text-sm font-bold text-white">{title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-secondary">{text}</p>
                      </div>
                    </Tilt>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Factory + stats */}
          <Reveal delay={0.25}>
            <Tilt intensity={6} scale={1.015} glow={false}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/5">
                <motion.img
                  src={images.factory}
                  alt="Lilaas factory · Horten"
                  loading="lazy"
                  style={{ y: imgY, filter: "brightness(0.7) saturate(1.05)" }}
                  className="h-72 w-full object-cover transition-[filter] duration-700 group-hover:brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/40 to-transparent" />
                <span className="pointer-events-none absolute top-3 left-3 h-5 w-5 border-t border-l border-orange/50" />
                <span className="pointer-events-none absolute top-3 right-3 h-5 w-5 border-t border-r border-orange/50" />
                <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-orange/50" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-orange/50" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <HUDLabel className="opacity-85">Headquarters</HUDLabel>
                    <p className="mt-1 text-lg font-bold text-white">Horten, Norway</p>
                    <p className="mono text-[11px] tracking-widest text-orange/70">EST. 1961</p>
                  </div>
                  <span className="mono rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-[10px] tracking-widest text-orange">
                    IN-HOUSE
                  </span>
                </div>
              </div>
            </Tilt>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Tilt intensity={10}>
                    <div className="glow-border relative h-full overflow-hidden rounded-2xl bg-surface/40 p-5 text-center backdrop-blur-sm">
                      <p className="mono text-3xl font-black gradient-text">
                        <AnimatedNumber value={value} />
                        {value === "50" && <span>%</span>}
                      </p>
                      <p className="mt-1.5 text-xs text-secondary">{label}</p>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <Reveal>
              <HUDLabel>Our history · 60+ years</HUDLabel>
            </Reveal>
            <span className="mono hidden text-[10px] tracking-widest text-secondary/40 sm:block">
              ← scroll →
            </span>
          </div>
          <Timeline />
        </div>
      </div>

      <div className="section-divider absolute inset-x-0 bottom-0" />
    </section>
  );
}
