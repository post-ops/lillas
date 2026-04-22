'use client';
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { clients, partnerMarquee } from "@/lib/config";
import { HUDLabel, Ticker } from "@/components/ui/HUD";
import { Reveal } from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";

export default function Clients() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const bgY = useTransform(smooth, [0, 1], ["-6%", "6%"]);

  return (
    <section id="clients" ref={ref} className="relative overflow-hidden bg-[#07090f] py-28">
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/6 blur-[180px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
        <Reveal>
          <HUDLabel className="mb-4 text-center">Clients · Partners · Integrators</HUDLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mb-16 max-w-4xl text-center text-4xl font-black leading-[1.02] text-white sm:text-6xl">
            Trusted by{" "}
            <span className="gradient-text">the world&apos;s leading</span>{" "}
            marine &amp; science companies.
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {clients.map(({ name, description, logo }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Tilt intensity={14}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-surface/40 p-8 text-center backdrop-blur-sm transition-all hover:border-orange/30 hover:shadow-[0_0_40px_rgba(249,132,12,0.25)]">
                  <span className="pointer-events-none absolute top-3 left-3 h-5 w-5 border-t border-l border-orange/45" />
                  <span className="pointer-events-none absolute top-3 right-3 h-5 w-5 border-t border-r border-orange/45" />
                  <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-orange/45" />
                  <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-orange/45" />

                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(249,132,12,0.12), transparent 65%)" }} />
                  <div className="mb-6 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: [0, -4, 4, 0] }}
                      transition={{ duration: 0.4 }}
                      className="flex h-20 w-20 items-center justify-center rounded-2xl border border-orange/25 bg-gradient-to-br from-orange/15 to-orange/5 text-4xl shadow-[0_0_24px_rgba(249,132,12,0.35)]"
                    >
                      {logo}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{description}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 space-y-0">
        <div className="mx-auto mb-3 max-w-7xl px-6 sm:px-12">
          <HUDLabel className="opacity-70">Also shipping with</HUDLabel>
        </div>
        <Ticker items={partnerMarquee.map((p) => `${p.logo}  ${p.name}`)} duration={30} />
      </div>

      <p className="mt-12 px-6 text-center text-sm text-secondary/50">
        Installed on every vessel class —{" "}
        <strong className="text-secondary/80">fishing boats to cruise ships, worldwide.</strong>
      </p>
    </section>
  );
}
