'use client';
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function RevealUp({ children, delay = 0, className = "", once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1200, transformOrigin: "50% 100%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealLeft({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60, rotateY: 8 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1200, transformOrigin: "0% 50%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealRight({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotateY: -8 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1200, transformOrigin: "100% 50%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealScale({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, rotateX: 6 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "", delayStart = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: delayStart } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, rotateX: 6, scale: 0.96 },
        visible: {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      style={{ transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxLayer({ children, speed = 0.3, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });
  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

export function useScrollProgress(amount = ["start end", "end start"]) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: amount });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  return { ref, progress: smooth };
}
