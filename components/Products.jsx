'use client';
import { Suspense, useRef, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Environment, Float, Preload, ContactShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { products } from "@/lib/config";

/* ──────────────────────────────────────────────────────────────
   3D display podium — rotating plinth where the active
   product image "floats". A cinematic orange spotlight on the
   centre, reflective floor, and ambient fog sets the stage.
   ────────────────────────────────────────────────────────────── */

function Podium() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.18;
  });
  return (
    <group position={[0, -1.5, 0]}>
      {/* Outer rotating rim */}
      <mesh ref={ref}>
        <torusGeometry args={[1.55, 0.02, 12, 128]} />
        <meshStandardMaterial
          color="#f9840c"
          emissive="#f9840c"
          emissiveIntensity={3}
          metalness={1}
          roughness={0}
        />
      </mesh>
      {/* Inner static bevel */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[1.4, 1.5, 0.06, 64]} />
        <meshStandardMaterial color="#0a0d14" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Glow disc */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.35, 64]} />
        <meshBasicMaterial
          color="#f9840c"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* Orbital rings rotating around the product */
function OrbitalCage({ active }) {
  const g = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (g.current) {
      g.current.rotation.y = t * 0.18;
      g.current.rotation.x = Math.sin(t * 0.25) * 0.06;
    }
  });
  return (
    <group ref={g}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.012, 12, 120]} />
        <meshStandardMaterial color="#f9840c" emissive="#f9840c" emissiveIntensity={2} metalness={1} roughness={0} transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[2.25, 0.008, 10, 120]} />
        <meshStandardMaterial color="#ffac50" emissive="#ffac50" emissiveIntensity={1.2} metalness={1} roughness={0} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[-0.7, 1.0, 0.4]}>
        <torusGeometry args={[2.55, 0.006, 10, 120]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.9} metalness={1} roughness={0} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0.5, -0.8, 1.1]}>
        <torusGeometry args={[2.9, 0.004, 8, 100]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={1.5} metalness={1} roughness={0} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* Floating product image as a textured plane */
function ProductPlane({ url, scrollActivity }) {
  const tex = useLoader(THREE.TextureLoader, url);
  const ref = useRef();
  useEffect(() => {
    if (tex) {
      tex.anisotropy = 8;
      tex.colorSpace = THREE.SRGBColorSpace;
    }
  }, [tex]);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.y = 0.1 + Math.sin(t * 1.1) * 0.05;
      ref.current.rotation.y = Math.sin(t * 0.3) * 0.08 + (scrollActivity?.current ?? 0) * 0.3;
    }
  });
  return (
    <mesh ref={ref}>
      <planeGeometry args={[2.4, 2.4]} />
      <meshBasicMaterial map={tex} transparent alphaTest={0.05} toneMapped={false} />
    </mesh>
  );
}

/* Particle sparkle around the podium */
function SparkField() {
  const pts = useRef();
  const { pos, count } = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 2.5;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3]     = Math.cos(a) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.8;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    return { pos, count };
  }, []);
  useFrame((s) => {
    if (pts.current) pts.current.rotation.y = s.clock.elapsedTime * 0.08;
  });
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#f9840c"
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

function Scene({ activeImage, scrollActivity }) {
  return (
    <>
      <color attach="background" args={["#04060c"]} />
      <fogExp2 attach="fog" args={["#04060c", 0.10]} />

      <ambientLight intensity={0.08} color="#223" />
      <spotLight position={[0, 6, 2]} angle={0.5} penumbra={0.8} intensity={3.2} color="#f9840c" />
      <pointLight position={[4, 2, 3]}   intensity={3.5} color="#f9840c" distance={15} />
      <pointLight position={[-4, 2, -3]} intensity={1.5} color="#5aa8ff" distance={15} />
      <pointLight position={[0, -1.2, 2]} intensity={1.8} color="#ffb066" distance={6} />

      <Podium />
      <OrbitalCage />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.25}>
          <ProductPlane url={activeImage} scrollActivity={scrollActivity} />
        </Float>
        <SparkField />
        <ContactShadows position={[0, -1.49, 0]} opacity={0.55} scale={6} blur={2.4} far={2.2} color="#f9840c" />
        <Environment preset="warehouse" />
      </Suspense>

      <EffectComposer multisampling={4}>
        <Bloom intensity={1.6} luminanceThreshold={0.15} luminanceSmoothing={0.88} radius={0.85} blendFunction={BlendFunction.ADD} />
      </EffectComposer>
    </>
  );
}

/* ─────────── Product catalogue panel (right column) ─────────── */
function CatalogueItem({ product, active, onSelect, index }) {
  return (
    <motion.button
      onClick={() => onSelect(index)}
      whileHover={{ x: 4 }}
      className={`group relative w-full overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-all duration-300 ${
        active
          ? "border-orange/50 bg-orange/10 shadow-orange"
          : "border-white/5 bg-surface/40 hover:border-orange/25 hover:bg-surface/60"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`mono text-[10px] font-bold tracking-widest ${
            active ? "text-orange" : "text-orange/50"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-bold text-white">{product.title}</p>
          <p className="mono mt-0.5 truncate text-[10px] text-orange/60">
            {product.subtitle}
          </p>
        </div>
        <motion.span
          animate={{ x: active ? 0 : -6, opacity: active ? 1 : 0 }}
          className="text-orange"
        >
          →
        </motion.span>
      </div>
      {active && (
        <motion.div
          layoutId="catalogue-highlight"
          className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-orange via-orange-light to-transparent"
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.button>
  );
}

/* ─────────── Main Products component ─────────── */
const Products = () => {
  const containerRef = useRef(null);
  const scrollActivity = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = products[activeIndex];

  // Auto-advance when user isn't interacting
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % products.length);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  // Subtle spin nudge on every change
  useEffect(() => {
    scrollActivity.current = 1;
    const t = setTimeout(() => { scrollActivity.current = 0; }, 600);
    return () => clearTimeout(t);
  }, [activeIndex]);

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative overflow-hidden bg-primary py-24 sm:py-28"
    >
      {/* Top glow */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 line-grid opacity-15" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-orange/5 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-orange/4 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-16">
        {/* Section header */}
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="hud-label mb-3">The range · 06 products</p>
            <h2 className="text-4xl font-black leading-[1.05] text-white sm:text-6xl">
              Bridge-grade{" "}
              <span className="gradient-text">controls,</span>
              <br />
              built in Horten.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-secondary lg:text-right">
            Every lever, joystick and bridge-console system is designed,
            machined, wired and tested in-house. DNV and CRS certified.
            Deployed worldwide via the industry&apos;s top integrators.
          </p>
        </div>

        {/* Main showcase: 3D stage + product detail + catalogue */}
        <div className="grid gap-6 lg:grid-cols-[1.15fr_360px]">
          {/* LEFT: stage + detail */}
          <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#04060c]">
            <div className="hud-bracket-tl" />
            <div className="hud-bracket-tr" />
            <div className="hud-bracket-bl" />
            <div className="hud-bracket-br" />

            {/* 3D stage */}
            <div className="relative h-[460px] w-full sm:h-[540px]">
              <Canvas
                dpr={[1, 1.8]}
                camera={{ position: [0, 0.7, 5.2], fov: 38 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
              >
                <Scene activeImage={active.image} scrollActivity={scrollActivity} />
                <Preload all />
              </Canvas>

              {/* Spec chips floating over stage */}
              <div className="pointer-events-none absolute left-6 top-6 flex flex-col gap-2">
                {active.specs.slice(0, 2).map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="rounded-md border border-orange/30 bg-primary/80 px-3 py-1 mono text-[10px] tracking-widest text-orange backdrop-blur-md"
                  >
                    {s}
                  </motion.div>
                ))}
              </div>
              <div className="pointer-events-none absolute right-6 top-6 flex flex-col items-end gap-2">
                {active.specs.slice(2, 4).map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="rounded-md border border-orange/30 bg-primary/80 px-3 py-1 mono text-[10px] tracking-widest text-orange backdrop-blur-md"
                  >
                    {s}
                  </motion.div>
                ))}
              </div>

              {/* Product counter top-center */}
              <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 rounded-full border border-orange/25 bg-primary/70 px-4 py-1.5 backdrop-blur-md">
                <span className="mono text-[10px] tracking-[0.3em] text-orange/90">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(products.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Detail zone */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 px-8 pb-8 sm:px-12 sm:pb-12"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="hud-label mb-2">{active.subtitle}</p>
                    <h3 className="text-3xl font-black text-white sm:text-4xl">
                      {active.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-secondary">
                      {active.description}
                    </p>
                  </div>
                  <Link
                    href={`/product/${active.id}`}
                    className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-bold text-white shadow-orange transition-all hover:shadow-orange-lg hover:scale-[1.03]"
                  >
                    View data sheet
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>

                {/* Quick spec row */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {active.certifications.slice(0, 4).map((c) => (
                    <div
                      key={c}
                      className="flex items-center gap-2 rounded-lg border border-white/5 bg-surface/50 px-3 py-2"
                    >
                      <svg
                        className="h-4 w-4 shrink-0 text-orange"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="mono text-[11px] font-bold tracking-widest text-white/80">
                        {c}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: catalogue */}
          <div className="flex flex-col gap-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="hud-label">Catalogue</span>
              <span className="mono text-[10px] tracking-widest text-secondary/40">
                auto · 8s
              </span>
            </div>
            {products.map((p, i) => (
              <CatalogueItem
                key={p.id}
                product={p}
                active={i === activeIndex}
                onSelect={setActiveIndex}
                index={i}
              />
            ))}
            <div className="mt-3 rounded-xl border border-orange/15 bg-gradient-to-br from-orange/8 to-transparent p-5">
              <p className="mono text-[10px] font-bold tracking-[0.3em] text-orange">
                LILAAS TECHNOLOGY
              </p>
              <p className="mt-2 text-base font-black text-white">AESS</p>
              <p className="mt-1 text-xs text-secondary">
                Azimuth Electronic Shaft System — proprietary CAN-bus master/slave
                for every vessel class. Full duplicate controls, zero extra I/O.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
