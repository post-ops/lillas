'use client';
import { Suspense, useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Float, Preload } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { brand, images } from "@/lib/config";
import AnimatedGrid from "@/components/ui/AnimatedGrid";

const hs = { p: 0 };

function makeCircleSprite() {
  const canvas = document.createElement("canvas");
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0,   "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.85)");
  grad.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}
let CIRCLE_SPRITE = null;

function OrbitalRings() {
  const g  = useRef();
  const m1 = useRef();
  const m2 = useRef();

  useFrame((s) => {
    const p = hs.p;
    g.current.rotation.y = s.clock.elapsedTime * 0.18;
    g.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.35) * 0.12;
    g.current.scale.setScalar(1 + p * 0.4);
    if (m1.current) m1.current.emissiveIntensity = 1.2 + p * 0.6;
    if (m2.current) m2.current.emissiveIntensity = 0.7 + p * 0.3;
  });

  return (
    <group ref={g}>
      <Torus args={[2.5, 0.038, 24, 256]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial ref={m1} color="#f9840c" emissive="#f9840c" emissiveIntensity={2.5} metalness={1} roughness={0} />
      </Torus>
      <Torus args={[3.1, 0.022, 20, 256]} rotation={[1.1, 0.4, 0]}>
        <meshStandardMaterial ref={m2} color="#ffac50" emissive="#ffac50" emissiveIntensity={1.6} metalness={1} roughness={0} />
      </Torus>
      <Torus args={[3.6, 0.016, 20, 256]} rotation={[-0.8, 1.0, 0.3]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.4} metalness={1} roughness={0} />
      </Torus>
      <Torus args={[2.8, 0.012, 16, 256]} rotation={[Math.PI / 2 + 0.4, 0.8, 0.6]}>
        <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={2.0} metalness={1} roughness={0} transparent opacity={0.75} />
      </Torus>
      <Torus args={[4.0, 0.007, 16, 200]} rotation={[0.5, -0.6, 1.0]}>
        <meshStandardMaterial color="#f9840c" emissive="#f9840c" emissiveIntensity={1.0} metalness={1} roughness={0} transparent opacity={0.4} />
      </Torus>
    </group>
  );
}

function GalaxyParticles() {
  const group = useRef();
  const COUNT = 3200;

  const [positions, colors] = useMemo(() => {
    if (!CIRCLE_SPRITE) CIRCLE_SPRITE = makeCircleSprite();
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r      = Math.random() * 12 + 1.5;
      const spin   = r * 0.9;
      const branch = ((i % 3) / 3) * Math.PI * 2;
      const rx = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (2.5 - r * 0.06);
      const ry = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.7;
      const rz = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (4 - r * 0.1);
      pos[i * 3]     = Math.cos(branch + spin) * r + rx;
      pos[i * 3 + 1] = ry;
      pos[i * 3 + 2] = Math.sin(branch + spin) * r + rz;
      const t = Math.min(r / 18, 1);
      col[i * 3]     = 1.0 - t * 0.55;
      col[i * 3 + 1] = 0.42 * (1 - t) + t * 0.35;
      col[i * 3 + 2] = 0.04 + t * 0.55;
    }
    return [pos, col];
  }, []);

  const HOT = 120;
  const hotPos = useMemo(() => {
    const arr = new Float32Array(HOT * 3);
    for (let i = 0; i < HOT; i++) {
      const r = 3 + Math.random() * 12;
      const a = Math.random() * Math.PI * 2;
      arr[i * 3]     = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, []);

  useFrame((s) => {
    if (group.current) {
      const p = hs.p;
      group.current.rotation.y = s.clock.elapsedTime * (0.025 + p * 0.012);
      group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.06) * 0.04;
    }
  });

  const sprite = CIRCLE_SPRITE || makeCircleSprite();

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color"    count={COUNT} array={colors}    itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} map={sprite} vertexColors transparent opacity={0.65} alphaTest={0.01} sizeAttenuation depthWrite={false} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={HOT} array={hotPos} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.11} map={sprite} color="#f9840c" transparent opacity={0.88} alphaTest={0.01} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  );
}

function CameraRig() {
  useFrame(({ camera }) => {
    const p = hs.p;
    camera.position.z = 7.5 - p * 3.0;
    camera.position.y = -p * 1.2;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  useEffect(() => scrollYProgress.on("change", (v) => { hs.p = v; }), [scrollYProgress]);

  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 22 });

  const act1Opacity = useTransform(smooth, [0, 0.22, 0.38], [1, 1, 0]);
  const act1Y       = useTransform(smooth, [0, 0.22, 0.38], [0, 0, -65]);
  const act2Opacity = useTransform(smooth, [0.28, 0.42, 0.60, 0.72], [0, 1, 1, 0]);
  const imgOpacity  = useTransform(smooth, [0.28, 0.42, 0.60, 0.72], [0, 1, 1, 0]);
  const imgScale    = useTransform(smooth, [0.28, 0.45], [0.72, 1]);
  const act3Opacity = useTransform(smooth, [0.65, 0.78], [0, 1]);
  const act3Y       = useTransform(smooth, [0.65, 0.78], [50, 0]);
  const hintOpacity = useTransform(smooth, [0, 0.07], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: "280vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-primary">

        <div className="absolute inset-0">
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 7.5], fov: 38 }}
            gl={{ antialias: true, toneMapping: 4, toneMappingExposure: 1.35 }}
          >
            <ambientLight intensity={0.08} />
            <pointLight position={[5, 5, 5]}   intensity={6}   color="#f9840c" />
            <pointLight position={[-5, -3, -5]} intensity={2.0} color="#ffac50" />
            <pointLight position={[0, -5, 3]}   intensity={1.2} color="#ff6600" />
            <CameraRig />
            <Suspense fallback={null}>
              <Float speed={1.0} rotationIntensity={0.18} floatIntensity={0.35}>
                <OrbitalRings />
              </Float>
              <GalaxyParticles />
            </Suspense>
            <Preload all />
            <EffectComposer multisampling={8}>
              <Vignette eskil={false} offset={0.12} darkness={0.6} blendFunction={BlendFunction.NORMAL} />
            </EffectComposer>
          </Canvas>
        </div>

        <AnimatedGrid opacity={0.55} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_-5%,_rgba(249,132,12,0.14),_transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_115%,_rgba(249,132,12,0.08),_transparent)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary to-transparent z-20" />

        {/* ACT 1 */}
        <motion.div
          style={{ opacity: act1Opacity, y: act1Y }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6 flex items-center gap-3">
            <span className="h-px w-14 bg-orange/60" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-orange">Horten, Norway · Since {brand.founded}</span>
            <span className="h-px w-14 bg-orange/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.45, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1200 }}
            className="text-8xl font-black leading-[0.95] tracking-tight text-white sm:text-[10rem] xl:text-[11rem]"
          >
            Control<br /><span className="gradient-text">at sea.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-6 text-xl text-secondary sm:text-2xl">
            And beyond.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-5 max-w-sm text-sm text-secondary/60">
            Precision control levers & joysticks trusted by{" "}
            <span className="text-white/80 font-semibold">Kongsberg</span>,{" "}
            <span className="text-white/80 font-semibold">Wärtsilä</span> &{" "}
            <span className="text-white/80 font-semibold">CERN</span>.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["Kongsberg Maritime", "Wärtsilä", "CERN"].map((n, i) => (
              <motion.span key={n} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 + i * 0.1 }}
                className="rounded-full border border-orange/20 bg-orange/8 px-4 py-1.5 text-xs font-semibold text-secondary/80 backdrop-blur-sm">
                {n}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* ACT 2 — product image */}
        <motion.div style={{ opacity: imgOpacity, scale: imgScale }} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <img src={images.l01} alt="Lilaas L01 control lever" className="h-[44vh] w-auto object-contain select-none"
            style={{ marginBottom: "12vh", filter: "drop-shadow(0 0 100px rgba(249,132,12,0.70))" }} draggable={false} />
        </motion.div>

        <motion.div style={{ opacity: act2Opacity }} className="pointer-events-none absolute inset-x-0 bottom-[14%] z-10 flex flex-col items-center text-center px-6">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.35em] text-orange">Flagship product</p>
          <h2 className="text-3xl font-black text-white sm:text-4xl">L01 Control Lever</h2>
          <p className="mt-2 max-w-xs text-sm text-secondary/60">Precision-crafted in Horten. On thousands of vessels worldwide.</p>
        </motion.div>

        <motion.div style={{ opacity: act2Opacity }} className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute top-[22%] left-[8%] sm:left-[12%] rounded-full border border-orange/35 bg-primary/80 px-3.5 py-1.5 text-[11px] font-bold text-orange backdrop-blur-md shadow-orange">CAN-bus · AESS</div>
          <div className="absolute top-[28%] right-[8%] sm:right-[12%] rounded-full border border-orange/35 bg-primary/80 px-3.5 py-1.5 text-[11px] font-bold text-orange backdrop-blur-md shadow-orange">IP66 · DNV</div>
          <div className="absolute top-[45%] right-[6%] sm:right-[10%] rounded-full border border-orange/25 bg-primary/70 px-3 py-1 text-[10px] font-semibold text-orange/80 backdrop-blur-md">−40 °C to +70 °C</div>
        </motion.div>

        {/* ACT 3 */}
        <motion.div style={{ opacity: act3Opacity, y: act3Y }} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-orange">World-class precision</p>
          <h2 className="text-5xl font-black text-white sm:text-6xl xl:text-7xl mb-3">
            From Horten<br /><span className="gradient-text">to the world.</span>
          </h2>
          <p className="mb-12 max-w-md text-sm text-secondary/70">
            Lilaas control systems are installed on thousands of ships globally — delivered through leading system integrators.
          </p>

          <div className="mb-12 flex gap-8 sm:gap-16">
            {[{ n: "60+", l: "Years of precision" }, { n: "60", l: "Expert employees" }, { n: "50%", l: "Exported globally" }].map(({ n, l }) => (
              <div key={l} className="text-center">
                <p className="text-5xl font-black gradient-text sm:text-6xl">{n}</p>
                <p className="mt-1.5 text-[11px] uppercase tracking-widest text-secondary/50">{l}</p>
              </div>
            ))}
          </div>

          <div className="pointer-events-auto flex flex-wrap justify-center gap-3">
            <a href="#products" className="group relative overflow-hidden rounded-full bg-orange px-9 py-3.5 text-sm font-bold text-white shadow-orange transition-all duration-300 hover:scale-105 hover:shadow-orange-lg">
              <span className="relative z-10">View products →</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-dark to-orange-light transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a href="#contact" className="rounded-full border border-orange/30 px-9 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-orange hover:bg-orange/10">
              Get in touch
            </a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-secondary/35">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-orange/30 pt-1.5">
            <div className="h-1.5 w-0.5 rounded-full bg-orange" />
          </motion.div>
        </motion.div>

        {/* Corner brackets */}
        <div className="pointer-events-none absolute top-6 right-6 z-20 h-10 w-10 border-t border-r border-orange/25" />
        <div className="pointer-events-none absolute top-6 left-6 z-20 h-10 w-10 border-t border-l border-orange/25" />
        <div className="pointer-events-none absolute bottom-16 left-6 z-20 h-10 w-10 border-b border-l border-orange/25" />
        <div className="pointer-events-none absolute bottom-16 right-6 z-20 h-10 w-10 border-b border-r border-orange/25" />
      </div>
    </div>
  );
};

export default Hero;
