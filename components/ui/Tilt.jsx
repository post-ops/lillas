'use client';
import { useRef, useCallback } from "react";

/** Cursor-driven 3D tilt wrapper with perspective transforms. */
export default function Tilt({ children, className = "", intensity = 12, scale = 1.03, glow = true }) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform =
        `perspective(1000px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(${scale},${scale},${scale})`;
      if (glow) {
        el.style.setProperty("--tilt-glow-x", `${(x + 0.5) * 100}%`);
        el.style.setProperty("--tilt-glow-y", `${(y + 0.5) * 100}%`);
        el.style.setProperty("--tilt-glow-opacity", "1");
      }
    },
    [intensity, scale, glow]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)`;
    if (glow) el.style.setProperty("--tilt-glow-opacity", "0");
  }, [glow]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.18s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
        ["--tilt-glow-opacity"]: 0,
      }}
    >
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: "var(--tilt-glow-opacity, 0)",
            background:
              "radial-gradient(220px circle at var(--tilt-glow-x, 50%) var(--tilt-glow-y, 50%), rgba(249,132,12,0.18), transparent 70%)",
          }}
        />
      )}
      {children}
    </div>
  );
}
