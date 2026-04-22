'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const launchBoat = () => typeof window.__launchBoat === "function" && window.__launchBoat();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(249,132,12,0.45)] hover:bg-orange-dark transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get in touch
          </motion.a>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={launchBoat}
              whileHover={{ scale: 1.12, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              title="Launch a vessel"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange/20 bg-surface/80 text-lg backdrop-blur-md transition-all hover:border-orange/50 hover:shadow-orange"
            >
              🚢
            </motion.button>

            <motion.button
              onClick={scrollTop}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              title="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-surface/80 backdrop-blur-md transition-all hover:border-orange/30 hover:shadow-orange"
            >
              <svg className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
