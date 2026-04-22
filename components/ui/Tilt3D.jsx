'use client';
import { useRef, useCallback } from "react";

const Tilt3D = ({ children, className = "", intensity = 14, scale = 1.03 }) => {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(${scale},${scale},${scale})`;
    },
    [intensity, scale]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)`;
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
};

export default Tilt3D;
