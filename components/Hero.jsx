'use client';
import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows, Environment, Float, Preload,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { brand } from "@/lib/config";
import ControlLever from "@/components/3d/ControlLever";

/* ─────────── Background particles (subtle star/dust) ─────────── */
function DustField() {
  const ref = useRef();
  const { positions, count } = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions, count };
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#ffb066" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─────────── Reflective floor plane ─────────── */
function FloorGrid() {
  return (
    <group position={[0, -1.4, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial
          color="#05070d"
          metalness={0.95}
          roughness={0.28}
          emissive="#050710"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

/* ─────────── Spinning outer ring (depth) ─────────── */
function OrbitalRing() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = s.clock.elapsedTime * 0.08;
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.2) * 0.04;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.4, -2]}>
      <torusGeometry args={[4.2, 0.008, 12, 180]} />
      <meshStandardMaterial
        color="#f9840c"
        emissive="#f9840c"
        emissiveIntensity={1.4}
        metalness={1}
        roughness={0}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

/* ─────────── Scene wrapper ─────────── */
function Scene({ pointer, scroll }) {
  return (
    <>
      <fogExp2 attach="fog" args={["#05070d", 0.038]} />
      <color attach="background" args={["#05070d"]} />

      <ambientLight intensity={0.15} color="#2a3a55" />
      <pointLight position={[ 4,  4,  3]} intensity={6.5} color="#f9840c" distance={25} decay={1.6} />
      <pointLight position={[-4,  3, -3]} intensity={3.0} color="#5aa8ff" distance={20} decay={1.6} />
      <pointLight position={[ 0, -1,  4]} intensity={1.8} color="#ffb066" distance={12} decay={1.6} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.45}
        penumbra={0.85}
        intensity={2.4}
        color="#ffd49a"
        castShadow={false}
      />

      <FloorGrid />
      <OrbitalRing />

      <Suspense fallback={null}>
        <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.15}>
          <ControlLever pointer={pointer} scroll={scroll} />
        </Float>
        <DustField />
        <ContactShadows
          position={[0, -1.39, 0]}
          opacity={0.55}
          scale={10}
          blur={2.8}
          far={3}
          color="#f9840c"
        />
        <Environment preset="night" />
      </Suspense>

      <EffectComposer multisampling={4}>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.88}
          radius={0.82}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={[0.0006, 0.0012]}
          blendFunction={BlendFunction.NORMAL}
        />
        <Vignette eskil={false} offset={0.15} darkness={0.68} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  );
}

/* ─────────── HUD Readout: live clock + coordinates ─────────── */
function LiveReadout() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setT(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mono text-[10px] tracking-[0.25em] text-orange/70">
      <span className="text-orange/50">LAT</span> 59.4151°N <span className="mx-2 text-orange/30">·</span>
      <span className="text-orange/50">LON</span> 10.4844°E <span className="mx-2 text-orange/30">·</span>
      <span className="text-orange">{t}</span>
    </div>
  );
}

/* ─────────── Main Hero component ─────────── */
const Hero = () => {
  const containerRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProg = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Mirror framer-motion scroll into a ref for three.js useFrame
  useEffect(() => scrollYProgress.on("change", (v) => { scrollProg.current = v; }), [scrollYProgress]);

  // Pointer tracking
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Scroll-driven section transitions
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });
  const titleY     = useTransform(smooth, [0, 0.6], [0, -120]);
  const titleOpacity = useTransform(smooth, [0, 0.45, 0.7], [1, 1, 0]);
  const subOpacity = useTransform(smooth, [0, 0.3, 0.55], [1, 1, 0]);
  const hudOpacity = useTransform(smooth, [0, 0.08], [1, 0]);
  const actIIOpacity = useTransform(smooth, [0.5, 0.7, 0.95], [0, 1, 1]);

  return (
    <div ref={containerRef} style={{ height: "220vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary">
        {/* 3D canvas — full viewport */}
        <div className="absolute inset-0">
          <Canvas
            dpr={[1, 1.8]}
            camera={{ position: [0, 0.8, 6.2], fov: 42, near: 0.1, far: 60 }}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.15,
            }}
          >
            <Scene pointer={pointer} scroll={scrollProg} />
            <Preload all />
          </Canvas>
        </div>

        {/* Blueprint grid overlay */}
        <div className="pointer-events-none absolute inset-0 line-grid opacity-30" />
        <div className="pointer-events-none absolute inset-0 scanlines opacity-35" />

        {/* Top glow + bottom fade */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,_rgba(249,132,12,0.16),_transparent)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-primary via-primary/70 to-transparent z-10" />

        {/* Corner HUD brackets (viewport-scale) */}
        <div className="hud-bracket-tl" style={{ top: 24, left: 24, width: 30, height: 30 }} />
        <div className="hud-bracket-tr" style={{ top: 24, right: 24, width: 30, height: 30 }} />
        <div className="hud-bracket-bl" style={{ bottom: 24, left: 24, width: 30, height: 30 }} />
        <div className="hud-bracket-br" style={{ bottom: 24, right: 24, width: 30, height: 30 }} />

        {/* Top HUD strip — coordinates + status */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="absolute top-20 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 px-6"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 rounded-full bg-orange animate-ping" />
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            </span>
            <span className="hud-label">System · Nominal · Horten HQ</span>
          </div>
          <LiveReadout />
        </motion.div>

        {/* Main title (ACT 1) */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-orange/50" />
            <span className="hud-label">Lilaas AS · Est. 1961 · Horten, Norway</span>
            <span className="h-px w-12 bg-orange/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl font-black leading-[0.92] tracking-[-0.03em] text-white sm:text-[7.5rem] xl:text-[9.5rem]"
            style={{ textShadow: "0 0 80px rgba(249,132,12,0.25)" }}
          >
            Control<br />
            <span className="gradient-text">at sea.</span>
          </motion.h1>

          <motion.p
            style={{ opacity: subOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.0 }}
            className="mt-7 max-w-lg text-base text-secondary sm:text-lg"
          >
            Precision control levers, joysticks and bridge systems.
            Engineered in-house in Horten since{" "}
            <span className="font-bold text-white">{brand.founded}</span>.
            On thousands of vessels worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#products"
              className="group relative overflow-hidden rounded-full bg-orange px-10 py-4 text-sm font-bold text-white shadow-orange-lg transition-all hover:shadow-orange-xl hover:scale-[1.04]"
            >
              <span className="relative z-10">Explore the range →</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-dark via-orange to-orange-light transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-orange/30 px-10 py-4 text-sm font-bold text-white/90 backdrop-blur-sm transition-all hover:border-orange hover:bg-orange/10 hover:text-white"
            >
              Talk to our engineers
            </a>
          </motion.div>

          {/* Trusted by */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <span className="hud-label opacity-60">Trusted by</span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold tracking-wider text-white/50">
              {["KONGSBERG MARITIME", "WÄRTSILÄ", "CERN", "ABB MARINE", "ROLLS-ROYCE MARINE"].map((n) => (
                <span key={n} className="transition-colors hover:text-white/90">{n}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ACT 2: spec callouts fly in around the lever */}
        <motion.div
          style={{ opacity: actIIOpacity }}
          className="pointer-events-none absolute inset-0 z-10"
        >
          <Callout x="8%"  y="24%" lbl="Protection" val="IP66" />
          <Callout x="88%" y="28%" lbl="Classification" val="DNV · CRS" align="right" />
          <Callout x="10%" y="62%" lbl="Interface" val="CAN · J1939" />
          <Callout x="86%" y="66%" lbl="Temperature range" val="−25 °C → +70 °C" align="right" />
          <div className="absolute left-1/2 top-[78%] -translate-x-1/2 text-center">
            <p className="hud-label mb-1">Flagship product</p>
            <p className="text-2xl font-black text-white">
              L01 <span className="gradient-text">Bridge Lever</span>
            </p>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="hud-label text-orange/50">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex h-8 w-5 items-start justify-center rounded-full border border-orange/35 pt-1.5"
          >
            <div className="h-1.5 w-0.5 rounded-full bg-orange" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

function Callout({ x, y, lbl, val, align = "left" }) {
  const isLeft = align === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="absolute flex items-center gap-3"
      style={{
        left: x, top: y,
        transform: `translate(${isLeft ? "0" : "-100%"}, -50%)`,
      }}
    >
      {isLeft && <span className="h-px w-8 bg-orange/60" />}
      <div className={`rounded-lg border border-orange/30 bg-primary/80 px-3.5 py-2 backdrop-blur-md shadow-orange ${isLeft ? "" : "text-right"}`}>
        <p className="hud-label mb-0.5 text-[9px] opacity-70">{lbl}</p>
        <p className="text-xs font-bold text-white mono">{val}</p>
      </div>
      {!isLeft && <span className="h-px w-8 bg-orange/60" />}
    </motion.div>
  );
}

export default Hero;
