'use client';
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { brand, stats, features, images, proofPoints } from "@/lib/config";
import Tilt3D from "@/components/ui/Tilt3D";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

/* ─── Animated number (counts up when in view) ─────────────────────────── */
function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const isNumber = /^\d+$/.test(value);
  const num = useMotionValue(0);
  const spring = useSpring(num, { stiffness: 60, damping: 18, mass: 1 });
  const display = useTransform(spring, (v) => Math.round(v).toString());
  useEffect(() => {
    if (isInView && isNumber) num.set(parseInt(value, 10));
  }, [isInView, isNumber, value, num]);
  return <span ref={ref}>{isNumber ? <motion.span>{display}</motion.span> : value}</span>;
}

/* ─── Horizontal timeline ──────────────────────────────────────────────── */
const TIMELINE = [
  { year: "1961",  title: "Founded",           text: "Jan Lilaas establishes Lilaas Finmekaniske in Horten." },
  { year: "1980s", title: "Maritime expansion", text: "Recognised supplier to ship and offshore industries." },
  { year: "2000s", title: "Global integrators", text: "Kongsberg Maritime & Wärtsilä put Lilaas on vessels worldwide." },
  { year: "2010s", title: "Beyond maritime",    text: "Precision components to CERN, defence and medicine." },
  { year: "Today", title: "World-leading",      text: `${brand.employees} staff · ${brand.exportShare}% exported · autonomy ready.` },
];

function HorizontalTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });
  const x = useTransform(smooth, [0, 0.6], ["10%", "-8%"]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div style={{ x }} className="flex gap-5 py-2">
        {TIMELINE.map(({ year, title, text }, i) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative shrink-0 w-56 overflow-hidden rounded-2xl border border-white/5 bg-surface/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/30 hover:shadow-orange"
          >
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="mb-3 inline-block rounded-lg border border-orange/30 bg-orange/10 px-2.5 py-1 mono text-[10px] font-black tracking-widest text-orange">
              {year}
            </span>
            <p className="text-sm font-bold text-white">{title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-secondary">{text}</p>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange to-transparent transition-all duration-500 group-hover:w-full rounded-b-2xl" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main section ─────────────────────────────────────────────────────── */
const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });
  const imgY  = useTransform(smooth, [0, 1], ["-12%", "12%"]);
  const blobX = useTransform(smooth, [0, 1], ["-10%", "10%"]);
  const blobY = useTransform(smooth, [0, 1], ["-5%",  "5%"]);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-[#07090f] py-28 sm:py-32">
      {/* Gradient dividers */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary to-transparent" />
      <div className="section-divider absolute inset-x-0 top-0" />

      {/* Background */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-12" />
      <motion.div style={{ x: blobX, y: blobY }} className="pointer-events-none absolute -right-32 top-0 h-[600px] w-[600px] rounded-full bg-orange/6 blur-[180px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-orange/4 blur-[140px]" />

      {/* Proof strip (top of about) */}
      <div className="relative mx-auto mb-20 max-w-7xl px-8 sm:px-16 lg:px-24">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {proofPoints.map(({ label, value, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-orange/25 hover:bg-surface/50"
            >
              <p className="hud-label mb-3 opacity-80">{label}</p>
              <p className="mono text-3xl font-black gradient-text leading-none">{value}</p>
              <p className="mt-2 text-[11px] leading-snug text-secondary/70">{sub}</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-8 sm:px-16 lg:px-24">
        {/* Section title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hud-label mb-4"
        >
          About Lilaas · Est. 1961
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-6xl"
        >
          Precision you can set on a bridge,{" "}
          <span className="gradient-text">and trust for thirty years.</span>
        </motion.h2>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column: narrative + CEO quote + features */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: 8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1100 }}
            className="space-y-5"
          >
            <p className="text-base leading-relaxed text-secondary">
              Lilaas was founded by <strong className="text-white">Jan Lilaas in 1961</strong> under
              the name Lilaas Finmekaniske. Today the company is led by{" "}
              <strong className="text-white">CEO Espen Hoff</strong>, and is one of the world&apos;s
              leading manufacturers of control levers and joysticks for maritime vessels.
            </p>
            <p className="text-base leading-relaxed text-secondary">
              <strong className="text-white">75% of revenue</strong> comes from in-house maritime
              products. Around <strong className="text-white">50%</strong> is exported directly.
              The remaining 25% is precision manufacturing for industries where tolerance of failure is zero.
            </p>

            {/* CEO quote card */}
            <Tilt3D intensity={6} scale={1.01}>
              <motion.blockquote
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="relative mt-6 overflow-hidden rounded-2xl border border-orange/25 bg-gradient-to-br from-orange/8 via-transparent to-orange/4 p-7"
              >
                <div className="pointer-events-none absolute -left-6 -top-8 text-[9rem] leading-none text-orange/10 select-none mono">&ldquo;</div>
                <p className="relative z-10 text-base leading-relaxed text-white/90 italic">
                  {brand.ceoQuote}
                </p>
                <div className="relative z-10 mt-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-sm font-black text-white">EH</span>
                  <div>
                    <p className="text-sm font-bold text-white">{brand.ceo}</p>
                    <p className="mono text-[10px] tracking-widest text-orange/70">CEO · LILAAS AS</p>
                  </div>
                </div>
              </motion.blockquote>
            </Tilt3D>

            {/* Feature grid */}
            <StaggerContainer className="mt-6 grid grid-cols-2 gap-3" delayStart={0.2}>
              {features.map(({ icon, title, text }) => (
                <StaggerItem key={title}>
                  <Tilt3D intensity={10}>
                    <div className="group relative h-full overflow-hidden rounded-xl border border-white/5 bg-surface/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-orange/25 hover:shadow-orange">
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <span className="text-xl">{icon}</span>
                      <p className="mt-2 text-sm font-bold text-white">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-secondary">{text}</p>
                    </div>
                  </Tilt3D>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>

          {/* Right column: factory + stats */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1100 }}
            className="space-y-5"
          >
            <Tilt3D intensity={7} scale={1.02}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/5">
                <motion.img
                  src={images.factory}
                  alt="Lilaas factory · Horten"
                  style={{ y: imgY, filter: "brightness(0.7) saturate(1.05)" }}
                  className="h-72 w-full object-cover transition-[filter] duration-700 group-hover:brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/4 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <div className="hud-bracket-tl" style={{ margin: 10 }} />
                <div className="hud-bracket-tr" style={{ margin: 10 }} />
                <div className="hud-bracket-bl" style={{ margin: 10 }} />
                <div className="hud-bracket-br" style={{ margin: 10 }} />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="hud-label opacity-80">Headquarters</p>
                    <p className="mt-1 text-lg font-bold text-white">Horten, Norway</p>
                    <p className="mono text-[11px] tracking-widest text-orange/70">EST. 1961</p>
                  </div>
                  <span className="rounded-full border border-orange/40 bg-orange/10 px-3 py-1 mono text-[10px] tracking-widest text-orange">
                    IN-HOUSE
                  </span>
                </div>
              </div>
            </Tilt3D>

            {/* Stats grid */}
            <StaggerContainer className="grid grid-cols-2 gap-3" delayStart={0.15}>
              {stats.map(({ value, label }) => (
                <StaggerItem key={label}>
                  <Tilt3D intensity={12}>
                    <div className="glow-border group relative h-full overflow-hidden rounded-2xl bg-surface/40 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:bg-surface/60 hover:shadow-orange">
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange/5 to-transparent transition-transform group-hover:translate-x-full" />
                      <p className="mono text-3xl font-black gradient-text">
                        <AnimatedNumber value={value} />
                        {value === "50" && <span>%</span>}
                      </p>
                      <p className="mt-1.5 text-xs text-secondary">{label}</p>
                    </div>
                  </Tilt3D>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hud-label"
            >
              Our history · 60+ years
            </motion.p>
            <span className="mono hidden text-[10px] tracking-widest text-secondary/40 sm:block">
              ← scroll →
            </span>
          </div>
          <HorizontalTimeline />
        </div>
      </div>

      {/* Bottom divider */}
      <div className="section-divider absolute inset-x-0 bottom-0" />
    </section>
  );
};

export default About;
