'use client';
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { clients, partnerMarquee } from "@/lib/config";
import Tilt3D from "@/components/ui/Tilt3D";

function Marquee({ items, reverse = false }) {
  return (
    <div className="overflow-hidden py-3">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/3 px-5 py-2.5 text-sm font-semibold tracking-wide text-white/40 transition-colors hover:border-orange/20 hover:text-white/70"
          >
            <span className="text-lg">{item.logo}</span>
            {item.name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ScrollLine({ progress }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return <motion.div style={{ scaleX, originX: 0 }} className="h-px bg-gradient-to-r from-orange via-orange/50 to-transparent" />;
}

const Clients = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const bgY = useTransform(smooth, [0, 1], ["-8%", "8%"]);

  return (
    <section id="clients" ref={ref} className="relative overflow-hidden bg-[#07090f] py-28">
      <div className="pointer-events-none absolute inset-0">
        <motion.div style={{ y: bgY }} className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/6 blur-[180px]" />
      </div>

      <ScrollLine progress={smooth} />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="hud-label mb-4">Clients · Partners · Integrators</p>
          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-6xl">
            Trusted by{" "}
            <span className="gradient-text">the world&apos;s leading</span>{" "}
            marine &amp; science companies.
          </h2>
        </motion.div>

        {/* Featured 3 */}
        <div className="grid gap-6 sm:grid-cols-3">
          {clients.map(({ name, description, logo }, i) => (
            <Tilt3D key={name} intensity={14}>
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 900 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-surface/40 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-orange/30 hover:shadow-orange"
              >
                <div className="hud-bracket-tl" />
                <div className="hud-bracket-tr" />
                <div className="hud-bracket-bl" />
                <div className="hud-bracket-br" />

                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(249,132,12,0.12), transparent 65%)" }} />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/4 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <div className="mb-6 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: [0, -4, 4, 0] }}
                    transition={{ duration: 0.4 }}
                    className="flex h-20 w-20 items-center justify-center rounded-2xl border border-orange/25 bg-gradient-to-br from-orange/15 to-orange/5 text-4xl shadow-orange"
                  >
                    {logo}
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{description}</p>
                <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange/40 to-transparent transition-all duration-500 group-hover:w-3/4" />
              </motion.div>
            </Tilt3D>
          ))}
        </div>
      </div>

      {/* Marquees */}
      <div className="mt-20 space-y-1 opacity-70">
        <div className="mx-auto mb-4 max-w-7xl px-6 sm:px-16">
          <p className="hud-label opacity-70">Also shipping with</p>
        </div>
        <Marquee items={partnerMarquee} />
        <Marquee items={[...partnerMarquee].reverse()} reverse />
      </div>

      <p className="mt-12 px-6 text-center text-sm text-secondary/50">
        Installed on every vessel class —{" "}
        <strong className="text-secondary/80">fishing boats to cruise ships, worldwide.</strong>
      </p>
    </section>
  );
};

export default Clients;
