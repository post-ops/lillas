'use client';
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { industries } from "@/lib/config";
import { HUDLabel } from "@/components/ui/HUD";

function IndustryPanel({ industry, index, total, progress }) {
  const start = index / total;
  const end   = (index + 1) / total;

  const opacity     = useTransform(progress, [start - 0.05, start + 0.05, end - 0.05, end + 0.05], [0, 1, 1, 0]);
  const imgScale    = useTransform(progress, [start, end], [1.12, 1.0]);
  const imgY        = useTransform(progress, [start, end], ["0%", "8%"]);
  const textY       = useTransform(progress, [start - 0.02, start + 0.12, end - 0.12, end + 0.02], ["70px", "0px", "0px", "-50px"]);
  const textOpacity = useTransform(progress, [start + 0.04, start + 0.14, end - 0.14, end - 0.04], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-end">
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 origin-center">
        {industry.image ? (
          <img
            src={industry.image}
            alt={industry.title}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.32) saturate(0.85)" }}
          />
        ) : (
          <div className="h-full w-full" style={{ background: `radial-gradient(ellipse at 50% 50%, ${industry.color}22, #06080d)` }} />
        )}
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 70% 60% at 50% 30%, ${industry.color}18, transparent 70%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070d]/85 via-transparent to-[#05070d]/85" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 w-full px-8 pb-24 sm:px-16 sm:pb-28 lg:px-24"
      >
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-4">
            <span
              className="mono rounded-full px-3 py-1 text-[10px] font-black tracking-widest"
              style={{
                background: `${industry.color}22`,
                color: industry.color,
                border: `1px solid ${industry.color}40`,
              }}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {industry.share && (
              <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${industry.color}18`, color: industry.color }}>
                {industry.share} of revenue
              </span>
            )}
          </div>
          <div className="mb-5 flex items-center gap-5">
            <span className="text-5xl sm:text-6xl">{industry.icon}</span>
            <h2
              className="text-5xl font-black leading-[0.95] text-white sm:text-7xl"
              style={{ textShadow: `0 0 80px ${industry.color}60` }}
            >
              {industry.title}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {industry.description}
          </p>
          <div className="mt-8 h-px w-48 opacity-60" style={{ background: `linear-gradient(90deg, ${industry.color}, transparent)` }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function DotIndicator({ progress, start, end, color }) {
  const scale   = useTransform(progress, [start, (start + end) / 2, end], [1, 1.7, 1]);
  const opacity = useTransform(progress, [start - 0.1, start, end, end + 0.1], [0.22, 1, 1, 0.22]);
  return <motion.div style={{ scale, opacity, background: color }} className="h-1.5 w-1.5 rounded-full" />;
}

function CernBadge({ progress, total }) {
  const lastStart = (total - 1) / total;
  const opacity   = useTransform(progress, [lastStart + 0.1, lastStart + 0.2], [0, 1]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-8 left-8 z-50 flex items-center gap-4 sm:left-16"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange/30 bg-orange/10 text-xl shadow-[0_0_24px_rgba(249,132,12,0.4)]">⚛️</div>
      <div>
        <p className="text-sm font-bold text-white">
          Supplying <span className="gradient-text">CERN&apos;s Large Hadron Collider</span>
        </p>
        <p className="mono mt-0.5 text-[11px] tracking-widest text-secondary/80">WHERE ZERO TOLERANCE IS THE SPEC.</p>
      </div>
    </motion.div>
  );
}

export default function Industries() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section
      id="industries"
      ref={ref}
      style={{ height: `${(industries.length + 1) * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#05070d]">
        {industries.map((industry, i) => (
          <IndustryPanel
            key={industry.title}
            industry={industry}
            index={i}
            total={industries.length}
            progress={smooth}
          />
        ))}

        {/* Top-left label */}
        <div className="pointer-events-none absolute left-8 top-24 z-50 flex items-center gap-3 sm:left-16">
          <span className="h-px w-10 bg-orange/50" />
          <HUDLabel>Industries · 04 sectors</HUDLabel>
        </div>

        {/* Dot indicators */}
        <div className="absolute right-8 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 sm:right-12">
          {industries.map((_, i) => {
            const start = i / industries.length;
            const end   = (i + 1) / industries.length;
            return (
              <DotIndicator
                key={i}
                progress={smooth}
                start={start}
                end={end}
                color={industries[i].color}
              />
            );
          })}
        </div>

        <CernBadge progress={smooth} total={industries.length} />
      </div>
    </section>
  );
}
