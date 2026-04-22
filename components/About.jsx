'use client';
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { brand, stats, features, images } from "@/lib/config";
import Tilt3D from "@/components/ui/Tilt3D";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

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

const TIMELINE = [
  { year: "1961",  title: "Founded",            text: "Jan Lilaas establishes Lilaas Finmekaniske in Horten, Norway." },
  { year: "1980s", title: "Maritime expansion",  text: "Recognised supplier to the ship and offshore industry." },
  { year: "2000s", title: "Global integrators",  text: "Kongsberg Maritime & Wärtsilä trust Lilaas on vessels worldwide." },
  { year: "2010s", title: "Beyond maritime",      text: "Delivering precision components to CERN, defence and medicine." },
  { year: "Today", title: "World-leading",        text: `${brand.employees} employees. ${brand.exportShare}% exported. Ready for autonomy.` },
];

function HorizontalTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });
  const x = useTransform(smooth, [0, 0.6], ["12%", "-5%"]);

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
            className="group relative shrink-0 w-52 rounded-2xl border border-white/5 bg-surface/40 p-5 transition-all duration-300 hover:border-orange/25 hover:shadow-orange"
          >
            <span className="mb-3 inline-block rounded-lg border border-orange/30 bg-orange/10 px-2.5 py-1 text-xs font-black text-orange">{year}</span>
            <p className="text-sm font-bold text-white">{title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-secondary">{text}</p>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange to-transparent transition-all duration-500 group-hover:w-full rounded-b-2xl" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });

  const imgY  = useTransform(smooth, [0, 1], ["-10%", "10%"]);
  const blobX = useTransform(smooth, [0, 1], ["-10%", "10%"]);
  const blobY = useTransform(smooth, [0, 1], ["-5%",  "5%"]);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-[#0a0c14] py-28">
      {/* top fade from hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary to-transparent" />
      {/* section divider line */}
      <div className="section-divider absolute inset-x-0 top-0" />

      <div className="dot-grid pointer-events-none absolute inset-0 opacity-15" />
      <motion.div style={{ x: blobX, y: blobY }} className="pointer-events-none absolute -right-32 top-0 h-[600px] w-[600px] rounded-full bg-orange/6 blur-[180px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-orange/4 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-8 sm:px-16 lg:px-24">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange">
          About Lilaas
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-3xl text-4xl font-black text-white sm:text-5xl leading-tight"
        >
          World-class precision —{" "}
          <span className="gradient-text">from Horten to the globe</span>
        </motion.h2>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
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
              <strong className="text-white">CEO Espen Hoff</strong> and is one of the world&apos;s
              leading manufacturers of control levers and joysticks for maritime vessels.
            </p>
            <p className="text-base leading-relaxed text-secondary">
              <strong className="text-white">75% of revenue</strong> comes from in-house maritime
              products, while 25% is precision manufacturing for demanding industries.
              Around <strong className="text-white">50% of products are exported</strong> directly.
            </p>

            <Tilt3D intensity={6} scale={1.01}>
              <motion.blockquote
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="relative mt-4 overflow-hidden rounded-2xl border border-orange/20 bg-orange/5 p-6 group"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/3 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <div className="mb-2 text-4xl leading-none text-orange/25">&quot;</div>
                <p className="text-sm italic leading-relaxed text-secondary">{brand.ceoQuote}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-orange">— {brand.ceo}, CEO</p>
              </motion.blockquote>
            </Tilt3D>

            <StaggerContainer className="mt-4 grid grid-cols-2 gap-3" delayStart={0.2}>
              {features.map(({ icon, title, text }) => (
                <StaggerItem key={title}>
                  <Tilt3D intensity={10}>
                    <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-surface/50 p-4 transition-all duration-300 hover:border-orange/20 hover:shadow-orange">
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange/5 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                      <span className="text-xl">{icon}</span>
                      <p className="mt-1 text-sm font-semibold text-white">{title}</p>
                      <p className="mt-0.5 text-xs text-secondary">{text}</p>
                    </div>
                  </Tilt3D>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1100 }}
            className="space-y-5"
          >
            <Tilt3D intensity={7} scale={1.02}>
              <div className="overflow-hidden rounded-2xl border border-white/5 relative group">
                <motion.img
                  src={images.factory}
                  alt="Lilaas factory Horten"
                  style={{ y: imgY, filter: "brightness(0.75)" }}
                  className="h-60 w-full object-cover transition-[filter] duration-700 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/4 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange/60">Headquarters</p>
                  <p className="text-sm font-semibold text-white">Horten, Norway — Est. 1961</p>
                </div>
              </div>
            </Tilt3D>

            <StaggerContainer className="grid grid-cols-2 gap-3" delayStart={0.15}>
              {stats.map(({ value, label }) => (
                <StaggerItem key={label}>
                  <Tilt3D intensity={12}>
                    <div className="glow-border group relative overflow-hidden rounded-2xl bg-surface/40 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:bg-surface/60 hover:shadow-orange">
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange/5 to-transparent transition-transform group-hover:translate-x-full" />
                      <p className="text-3xl font-black gradient-text">
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

        <div className="mt-16">
          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-orange/60">
            Our history
          </motion.p>
          <HorizontalTimeline />
        </div>
      </div>
      {/* bottom divider */}
      <div className="section-divider absolute inset-x-0 bottom-0" />
    </section>
  );
};

export default About;
