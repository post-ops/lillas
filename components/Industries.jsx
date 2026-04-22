'use client';
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { industries } from "@/lib/config";

const Industries = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section
      id="industries"
      ref={containerRef}
      style={{ height: `${(industries.length + 1) * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#06080d]">
        {industries.map((industry, i) => (
          <IndustryPanel key={industry.title} industry={industry} index={i} total={industries.length} progress={smooth} />
        ))}
        <div className="pointer-events-none absolute left-8 top-24 z-50 flex items-center gap-3 sm:left-16">
          <span className="h-px w-8 bg-orange/50" />
          <p className="hud-label">Industries · 04 sectors</p>
        </div>
        <div className="absolute right-8 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2">
          {industries.map((_, i) => {
            const start = i / industries.length;
            const end = (i + 1) / industries.length;
            return <DotIndicator key={i} progress={smooth} start={start} end={end} color={industries[i].color} />;
          })}
        </div>
        <CernBadge progress={smooth} total={industries.length} />
      </div>
    </section>
  );
};

function IndustryPanel({ industry, index, total, progress }) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start - 0.05, start + 0.05, end - 0.05, end + 0.05], [0, 1, 1, 0]);
  const imgScale = useTransform(progress, [start, end], [1.08, 1.0]);
  const imgY     = useTransform(progress, [start, end], ["0%", "6%"]);
  const textY    = useTransform(progress, [start - 0.02, start + 0.12, end - 0.12, end + 0.02], ["60px", "0px", "0px", "-40px"]);
  const textOpacity = useTransform(progress, [start + 0.04, start + 0.14, end - 0.14, end - 0.04], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-end">
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 origin-center">
        {industry.image ? (
          <img src={industry.image} alt={industry.title} className="h-full w-full object-cover" style={{ filter: "brightness(0.28) saturate(0.7)" }} />
        ) : (
          <div className="h-full w-full" style={{ background: `radial-gradient(ellipse at 50% 50%, ${industry.color}20, #06080d)` }} />
        )}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 30%, ${industry.color}18, transparent 70%)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080d]/80 via-transparent to-[#06080d]/80" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 w-full px-8 pb-20 sm:px-16 sm:pb-24 lg:px-24">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest"
              style={{ background: `${industry.color}22`, color: industry.color, border: `1px solid ${industry.color}40` }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            {industry.share && (
              <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${industry.color}18`, color: industry.color }}>
                {industry.share} of revenue
              </span>
            )}
          </div>
          <div className="mb-4 flex items-center gap-4">
            <span className="text-5xl">{industry.icon}</span>
            <h2 className="text-5xl font-black sm:text-7xl" style={{ color: "#fff", textShadow: `0 0 80px ${industry.color}60` }}>
              {industry.title}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-white/60">{industry.description}</p>
          <div className="mt-8 h-px w-48 opacity-60" style={{ background: `linear-gradient(90deg, ${industry.color}, transparent)` }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function DotIndicator({ progress, start, end, color }) {
  const scale = useTransform(progress, [start, (start + end) / 2, end], [1, 1.6, 1]);
  const opacity = useTransform(progress, [start - 0.1, start, end, end + 0.1], [0.25, 1, 1, 0.25]);
  return <motion.div style={{ scale, opacity, background: color }} className="h-1.5 w-1.5 rounded-full" />;
}

function CernBadge({ progress, total }) {
  const lastStart = (total - 1) / total;
  const opacity = useTransform(progress, [lastStart + 0.1, lastStart + 0.2], [0, 1]);
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute bottom-8 left-8 z-50 flex items-center gap-4 sm:left-16">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange/25 bg-orange/10 text-xl shadow-orange">⚛️</div>
      <div>
        <p className="text-sm font-bold text-white">Supplying <span className="gradient-text">CERN&apos;s Large Hadron Collider</span></p>
        <p className="mono mt-0.5 text-[11px] tracking-widest text-secondary/70">WHERE ZERO TOLERANCE IS THE SPEC.</p>
      </div>
    </motion.div>
  );
}

export default Industries;
