'use client';
import { useEffect, useState } from "react";

/** Four HUD corner brackets inside any `relative` parent. */
export function HUDCorners({ className = "" }) {
  return (
    <>
      <span className={`pointer-events-none absolute top-3 left-3 h-5 w-5 border-t border-l border-orange/45 ${className}`} />
      <span className={`pointer-events-none absolute top-3 right-3 h-5 w-5 border-t border-r border-orange/45 ${className}`} />
      <span className={`pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-orange/45 ${className}`} />
      <span className={`pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-orange/45 ${className}`} />
    </>
  );
}

/** Monospace label line. */
export function HUDLabel({ children, className = "" }) {
  return (
    <p className={`mono text-[10px] font-bold uppercase tracking-[0.3em] text-orange/80 ${className}`}>
      {children}
    </p>
  );
}

/** Live UTC clock + configurable prefix. */
export function LiveClock({ prefix = "UTC" }) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(
        `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="mono text-[10px] tracking-[0.3em] text-orange/70">
      {prefix} <span className="text-orange">{t}</span>
    </span>
  );
}

/** Pulsing LED dot (green-ish "all systems nominal") */
export function StatusLED({ label = "NOMINAL" }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-orange opacity-75" />
        <span className="relative h-2 w-2 rounded-full bg-orange shadow-[0_0_8px_rgba(249,132,12,0.9)]" />
      </span>
      <span className="mono text-[10px] font-bold tracking-[0.3em] text-orange/80">{label}</span>
    </span>
  );
}

/** Horizontal marquee ticker. */
export function Ticker({ items, duration = 30 }) {
  const all = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-orange/10 bg-black/40 py-3">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: `ticker-scroll ${duration}s linear infinite` }}
      >
        {all.map((item, i) => (
          <span
            key={i}
            className="mono inline-flex items-center gap-3 text-[11px] tracking-[0.25em] text-orange/60"
          >
            <span className="h-1 w-1 rounded-full bg-orange/60" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
