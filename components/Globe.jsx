'use client';
import { Suspense, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Preload, Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function Earth({ scrollProgress }) {
  const mesh    = useRef();
  const wireRef = useRef();

  useFrame((s) => {
    const sp = scrollProgress?.get() ?? 0;
    const boost = 1 + sp * 3;
    mesh.current.rotation.y    = s.clock.elapsedTime * 0.12 * boost;
    wireRef.current.rotation.y = -s.clock.elapsedTime * 0.06 * boost;
    wireRef.current.rotation.z =  s.clock.elapsedTime * 0.04;
  });

  return (
    <group>
      <mesh ref={mesh}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial color="#1a0800" emissive="#f9840c" emissiveIntensity={0.1} distort={0.09} speed={0.6} roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.82, 28, 28]} />
        <meshStandardMaterial color="#f9840c" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh scale={1.14}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial color="#f9840c" transparent opacity={0.055} side={1} />
      </mesh>
    </group>
  );
}

function Satellites({ scrollProgress }) {
  const group = useRef();
  useFrame((s) => {
    const sp = scrollProgress?.get() ?? 0;
    group.current.rotation.y = s.clock.elapsedTime * (0.4 + sp * 0.8);
    group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.2) * 0.25;
  });
  const dots = [[2.6, 0, 0], [-2.3, 0.8, 0.5], [0.5, 2.5, -0.3], [-0.8, -2.4, 0.6], [1.8, -1.5, 1.2]];
  return (
    <group ref={group}>
      {dots.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.065, 8, 8]} />
          <meshStandardMaterial color="#f9840c" emissive="#f9840c" emissiveIntensity={2.5} />
        </mesh>
      ))}
    </group>
  );
}

function RingParticles() {
  const ref    = useRef();
  const sphere = useMemo(() => random.inSphere(new Float32Array(2400), { radius: 3.6 }), []);
  useFrame((_, d) => {
    ref.current.rotation.y -= d / 18;
    ref.current.rotation.x -= d / 38;
  });
  return (
    <group rotation={[0, 0, Math.PI / 5]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color="#f9840c" size={0.014} sizeAttenuation depthWrite={false} opacity={0.55} />
      </Points>
    </group>
  );
}

const TICKER_ITEMS = [
  "Kongsberg Maritime", "Wärtsilä", "CERN LHC", "DNV Certified",
  "IP66 Rated", "CAN Network", "AESS Technology", "Since 1961",
  "50% Export", "60+ Countries",
];

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-orange/10 bg-orange/3 py-2.5">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange/50">
            <span className="h-1 w-1 rounded-full bg-orange/40" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const Globe = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const globeY = useTransform(smooth, [0, 1], ["40px", "-60px"]);

  const stats = [
    { stat: "~50%", label: "Export share",    sub: "Direct to global customers" },
    { stat: "75%",  label: "Maritime revenue", sub: "Our core business" },
    { stat: "60+",  label: "Years experience", sub: "Founded Horten, 1961" },
    { stat: "IP66", label: "Rated enclosures", sub: "Every product, certified" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#08090f] py-0">
      <Ticker />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,_rgba(249,132,12,0.09),_transparent)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange">Global presence</p>
          <h2 className="mb-6 text-4xl font-black text-white sm:text-5xl lg:text-6xl leading-none">
            Products that <span className="gradient-text">control the world&apos;s vessels</span>
          </h2>
          <p className="mb-10 text-base leading-relaxed text-secondary">
            From Norway&apos;s fjords to the world&apos;s oceans — Lilaas control levers and joysticks
            are installed on thousands of ships, delivered through Kongsberg Maritime, Wärtsilä,
            and other leading integrators.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ stat, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass glow-border group rounded-xl p-4 transition-all duration-300 hover:border-orange/30 hover:shadow-orange cursor-default"
              >
                <p className="text-2xl font-black gradient-text">{stat}</p>
                <p className="mt-0.5 text-sm font-semibold text-white">{label}</p>
                <p className="mt-0.5 text-xs text-secondary">{sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.65, rotateX: 18 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1200, y: globeY }}
          className="relative mt-12 h-[460px] lg:mt-0"
        >
          <div className="absolute inset-0 rounded-full bg-orange/5 blur-[80px] scale-75" />
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 42 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 3, 5]} intensity={3.5} color="#f9840c" />
            <pointLight position={[-5, -3, -5]} intensity={1} color="#ffac50" />
            <Suspense fallback={null}>
              <Earth scrollProgress={smooth} />
              <Satellites scrollProgress={smooth} />
              <RingParticles />
            </Suspense>
            <Preload all />
          </Canvas>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="absolute -bottom-4 -left-4 rounded-xl border border-orange/20 bg-surface/80 px-4 py-3 backdrop-blur-md"
          >
            <p className="text-xs font-bold text-white">⚛️ CERN Large Hadron Collider</p>
            <p className="mt-0.5 text-[10px] text-secondary">Precision supplier</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Globe;
