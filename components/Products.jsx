'use client';
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { Torus, Float, Preload } from "@react-three/drei";
import { products } from "@/lib/config";
import AnimatedGrid from "@/components/ui/AnimatedGrid";
import Tilt3D from "@/components/ui/Tilt3D";

function makeCircleSprite() {
  const c = document.createElement("canvas");
  c.width = 64; c.height = 64;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.5, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
let SPRITE = null;

function SpotlightRings({ speed = 1 }) {
  const g = useRef();
  useFrame((s) => {
    g.current.rotation.y = s.clock.elapsedTime * 0.25 * speed;
    g.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.4) * 0.1;
  });
  return (
    <group ref={g}>
      <Torus args={[2.0, 0.035, 16, 120]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#f9840c" emissive="#f9840c" emissiveIntensity={4.0} metalness={1} roughness={0} />
      </Torus>
      <Torus args={[2.5, 0.022, 16, 120]} rotation={[1.0, 0.5, 0]}>
        <meshStandardMaterial color="#ffac50" emissive="#ffac50" emissiveIntensity={2.5} metalness={1} roughness={0} />
      </Torus>
      <Torus args={[2.9, 0.014, 16, 120]} rotation={[-0.7, 1.1, 0.4]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} metalness={1} roughness={0} />
      </Torus>
      <Torus args={[3.4, 0.009, 16, 120]} rotation={[0.3, -0.8, 1.2]}>
        <meshStandardMaterial color="#f9840c" emissive="#f9840c" emissiveIntensity={2.0} metalness={1} roughness={0} transparent opacity={0.6} />
      </Torus>
      <Torus args={[3.9, 0.006, 16, 100]} rotation={[0.9, 0.3, -0.8]}>
        <meshStandardMaterial color="#ff6622" emissive="#ff6622" emissiveIntensity={1.2} metalness={1} roughness={0} transparent opacity={0.3} />
      </Torus>
    </group>
  );
}

function SpotlightParticles() {
  const pts = useRef();
  const count = 600;
  const pos = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  if (!SPRITE) SPRITE = makeCircleSprite();
  useFrame((s) => { pts.current.rotation.y = s.clock.elapsedTime * 0.05; });
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.11} map={SPRITE} color="#f9840c" transparent opacity={0.38} alphaTest={0.01} sizeAttenuation depthWrite={false} />
    </points>
  );
}

const ProductCard = ({ id, title, subtitle, description, image, specs, isActive, onClick }) => (
  <Tilt3D intensity={10} scale={1.025}>
    <motion.div
      layout
      onClick={onClick}
      animate={{
        borderColor: isActive ? "rgba(249,132,12,0.55)" : "rgba(255,255,255,0.04)",
        boxShadow: isActive ? "0 0 40px rgba(249,132,12,0.22), 0 0 0 1px rgba(249,132,12,0.15)" : "none",
      }}
      transition={{ duration: 0.3 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border bg-surface/50 backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(249,132,12,0.13), transparent 60%)", opacity: isActive ? 1 : 0 }} />
      <div className="relative h-44 overflow-hidden bg-[#09090f]">
        <motion.img src={image} alt={title} className="h-full w-full object-contain p-5"
          animate={{ scale: isActive ? 1.12 : 1 }} transition={{ duration: 0.45 }}
          style={{ filter: "drop-shadow(0 0 28px rgba(249,132,12,0.45))" }} />
      </div>
      <div className="p-5">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="mt-0.5 font-mono text-[10px] text-orange/70">{subtitle}</p>
        <p className="mt-2 text-xs leading-relaxed text-secondary line-clamp-2">{description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {specs.slice(0, 3).map((s) => (
            <span key={s} className="rounded-md border border-orange/15 bg-orange/8 px-2 py-0.5 text-[10px] font-semibold text-orange/80">{s}</span>
          ))}
        </div>
        <Link href={`/product/${id}`} onClick={(e) => e.stopPropagation()}
          className="mt-4 flex items-center gap-1 text-xs font-semibold text-orange opacity-0 transition-opacity group-hover:opacity-100">
          View details <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange to-transparent transition-all duration-500"
        style={{ width: isActive ? "100%" : "0%" }} />
    </motion.div>
  </Tilt3D>
);

const Products = () => {
  const containerRef = useRef(null);
  const [manualIndex, setManualIndex] = useState(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scrollIndex = useTransform(scrollYProgress, [0, 1], [0, products.length - 0.001]);
  const [scrollActiveIndex, setScrollActiveIndex] = useState(0);
  const scrollActiveIndexRef = useRef(0);

  useEffect(() => {
    return scrollIndex.on("change", (v) => {
      const idx = Math.min(products.length - 1, Math.floor(v));
      if (idx !== scrollActiveIndexRef.current) {
        scrollActiveIndexRef.current = idx;
        setScrollActiveIndex(idx);
        setManualIndex(null);
      }
    });
  }, [scrollIndex]);

  const activeIndex = manualIndex !== null ? manualIndex : scrollActiveIndex;
  const active = products[activeIndex];
  const sectionHeight = products.length * 50 + 100;

  return (
    <section id="products" ref={containerRef} style={{ height: `${sectionHeight}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-primary">
        <AnimatedGrid opacity={0.3} />
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-orange/15 to-transparent" />

        <div className="relative flex h-full flex-col px-6 pt-8 sm:px-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-orange">Products</p>
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                Control systems for <span className="gradient-text">all vessel types</span>
              </h2>
            </div>
            <p className="hidden text-xs text-secondary sm:block">Scroll or click a product</p>
          </div>

          <div className="grid flex-1 min-h-0 gap-6 lg:grid-cols-[1fr_420px]">
            {/* Spotlight */}
            <div className="relative overflow-hidden rounded-3xl border border-orange/15 min-h-0">
              <div className="absolute inset-0 bg-[#060810]">
                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6.5], fov: 40 }} gl={{ antialias: true, toneMapping: 4, toneMappingExposure: 1.25 }}>
                  <ambientLight intensity={0.08} />
                  <pointLight position={[4, 4, 4]} intensity={5} color="#f9840c" />
                  <pointLight position={[-3, -2, -4]} intensity={1.5} color="#ffac50" />
                  <Suspense fallback={null}>
                    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25}>
                      <SpotlightRings />
                    </Float>
                    <SpotlightParticles />
                  </Suspense>
                  <EffectComposer multisampling={4}>
                    <Bloom intensity={2.8} luminanceThreshold={0.12} luminanceSmoothing={0.9} radius={0.85} blendFunction={BlendFunction.ADD} />
                  </EffectComposer>
                  <Preload all />
                </Canvas>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(249,132,12,0.10),_transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-[#060810]/80" />

              <AnimatePresence mode="wait">
                <motion.div key={activeIndex}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.97 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-10"
                >
                  <div className="mb-6 flex justify-center lg:justify-start">
                    <motion.img key={active.image} src={active.image} alt={active.title}
                      initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="h-40 w-auto object-contain sm:h-52"
                      style={{ filter: "drop-shadow(0 0 80px rgba(249,132,12,0.70))" }} />
                  </div>

                  <span className="mb-2 text-xs font-bold uppercase tracking-widest text-orange">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-3xl font-black text-white sm:text-4xl">{active.title}</h3>
                  <p className="mt-1 font-mono text-sm text-orange/60">{active.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-secondary max-w-md">{active.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {active.specs.map((s) => (
                      <span key={s} className="rounded-lg border border-orange/20 bg-orange/10 px-3 py-1 text-xs font-bold text-orange">{s}</span>
                    ))}
                  </div>

                  <Link href={`/product/${active.id}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-orange px-6 py-2.5 text-sm font-bold text-white shadow-orange hover:bg-orange-dark transition-all">
                    Full product page →
                  </Link>
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-orange/60"
                animate={{ width: `${((activeIndex + 1) / products.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Product grid */}
            <div className="overflow-y-auto scrollbar-hide flex flex-col gap-3 pb-4 min-h-0">
              {products.map((p, i) => (
                <ProductCard key={p.title} {...p} index={i} isActive={i === activeIndex} onClick={() => setManualIndex(i)} />
              ))}
              <div className="mt-1 rounded-2xl border border-orange/15 bg-orange/5 p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-orange">Lilaas technology</p>
                <p className="mt-0.5 text-sm font-black text-white">AESS — Azimuth Electronic Shaft System</p>
                <p className="mt-1.5 text-xs text-secondary">Proprietary CAN-bus manoeuvring system. Master/slave for all vessel types.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
