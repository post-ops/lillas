'use client';
import { Suspense, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* ─── Convert lat/lon (degrees) to Vector3 on unit sphere ──────────────── */
function latLonToVec3(lat, lon, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* ─── Ports Lilaas reaches. Horten is the origin (HQ). ─────────────────── */
const HQ = { name: "Horten", lat: 59.4151, lon: 10.4844 };
const PORTS = [
  { name: "Rotterdam",      lat: 51.9244, lon:  4.4777 },
  { name: "Singapore",      lat:  1.3521, lon: 103.8198 },
  { name: "Shanghai",       lat: 31.2304, lon: 121.4737 },
  { name: "Houston",        lat: 29.7604, lon: -95.3698 },
  { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
  { name: "Cape Town",      lat: -33.9249, lon:  18.4241 },
  { name: "Perth",          lat: -31.9505, lon: 115.8605 },
  { name: "Busan",          lat: 35.1796, lon: 129.0756 },
  { name: "Dubai",          lat: 25.2048, lon:  55.2708 },
  { name: "Hamburg",        lat: 53.5511, lon:  9.9937  },
  { name: "Tokyo",          lat: 35.6762, lon: 139.6503 },
  { name: "Los Angeles",    lat: 34.0522, lon: -118.2437 },
];

/* ─── Earth core ───────────────────────────────────────────────────────── */
function Earth({ scroll }) {
  const group = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const sp = scroll?.get() ?? 0;
    if (group.current) {
      group.current.rotation.y = t * 0.07 + sp * 0.4;
      group.current.rotation.x = Math.sin(t * 0.15) * 0.03;
    }
  });

  return (
    <group ref={group}>
      {/* Dark core */}
      <mesh>
        <sphereGeometry args={[1.8, 96, 96]} />
        <meshStandardMaterial
          color="#0a1020"
          emissive="#1a0800"
          emissiveIntensity={0.18}
          roughness={0.8}
          metalness={0.25}
        />
      </mesh>

      {/* Orange wireframe continents stand-in */}
      <mesh scale={1.001}>
        <sphereGeometry args={[1.8, 30, 30]} />
        <meshBasicMaterial color="#f9840c" wireframe transparent opacity={0.14} />
      </mesh>

      {/* Inner rim glow */}
      <mesh scale={1.12}>
        <sphereGeometry args={[1.8, 48, 48]} />
        <meshBasicMaterial
          color="#f9840c"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer atmospheric halo */}
      <mesh scale={1.25}>
        <sphereGeometry args={[1.8, 48, 48]} />
        <meshBasicMaterial
          color="#ff9a3a"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Port markers (on surface, rotating with Earth) */}
      {PORTS.map((port) => (
        <PortMarker key={port.name} port={port} radius={1.82} />
      ))}
      <PortMarker port={HQ} radius={1.82} isHQ />

      {/* Shipping arcs between HQ and ports */}
      {PORTS.map((port, i) => (
        <ShippingArc key={`arc-${port.name}`} from={HQ} to={port} radius={1.82} offset={i} />
      ))}
    </group>
  );
}

/* ─── Port marker (tiny beacon + pulsing ring) ─────────────────────────── */
function PortMarker({ port, radius, isHQ = false }) {
  const pos = useMemo(() => latLonToVec3(port.lat, port.lon, radius), [port, radius]);
  const outward = useMemo(() => pos.clone().normalize().multiplyScalar(0.05), [pos]);
  const ref = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (ref.current) {
      const pulse = isHQ ? 0.9 + Math.sin(t * 2.5) * 0.35 : 0.6 + Math.sin(t * 2 + pos.x) * 0.25;
      ref.current.scale.setScalar(pulse);
    }
  });
  return (
    <group position={pos}>
      {/* Solid dot */}
      <mesh>
        <sphereGeometry args={[isHQ ? 0.042 : 0.026, 10, 10]} />
        <meshStandardMaterial
          color={isHQ ? "#ffd49a" : "#f9840c"}
          emissive={isHQ ? "#ffd49a" : "#f9840c"}
          emissiveIntensity={isHQ ? 3.5 : 2}
        />
      </mesh>
      {/* Pulsing halo */}
      <mesh ref={ref} position={outward}>
        <sphereGeometry args={[isHQ ? 0.07 : 0.045, 14, 14]} />
        <meshBasicMaterial
          color={isHQ ? "#ffd49a" : "#f9840c"}
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* HQ vertical beam */}
      {isHQ && (
        <mesh position={outward.clone().multiplyScalar(6)}>
          <cylinderGeometry args={[0.008, 0.0005, 0.55, 8]} />
          <meshBasicMaterial
            color="#ffd49a"
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
}

/* ─── Shipping arc: curve between two lat/lon points.
       A glowing line + travelling pulse dot. ────────────────────────────── */
function ShippingArc({ from, to, radius, offset }) {
  const { geometry, curve } = useMemo(() => {
    const a = latLonToVec3(from.lat, from.lon, radius);
    const b = latLonToVec3(to.lat,   to.lon,   radius);
    // Control point lifted above the sphere
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const dist = a.distanceTo(b);
    const arcHeight = Math.min(1.0, 0.35 + dist * 0.35);
    mid.normalize().multiplyScalar(radius + arcHeight);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(60));
    return { geometry, curve };
  }, [from, to, radius]);

  const dotRef = useRef();
  useFrame((s) => {
    const t = (s.clock.elapsedTime * 0.25 + offset * 0.12) % 1;
    if (dotRef.current) {
      const p = curve.getPointAt(t);
      dotRef.current.position.copy(p);
      const next = curve.getPointAt(Math.min(1, t + 0.01));
      dotRef.current.lookAt(next);
    }
  });

  return (
    <group>
      <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0xf9840c,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      }))} />
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#ffb066" />
      </mesh>
    </group>
  );
}

/* ─── Starfield backdrop ───────────────────────────────────────────────── */
function Stars() {
  const ref = useRef();
  const { positions, count } = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions, count };
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.01;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─── Ticker (kept, subtle at top of section) ─────────────────────────── */
const TICKER = [
  "Kongsberg Maritime", "Wärtsilä", "CERN LHC", "DNV Certified",
  "IP66 Rated", "CAN · J1939", "AESS Platform", "Since 1961",
  "~50% Export Share", "12+ Major Ports", "6 Continents", "IP66",
];
function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-orange/10 bg-orange/3 py-3">
      <motion.div
        className="flex gap-14 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {[...TICKER, ...TICKER].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mono text-[11px] tracking-widest text-orange/60">
            <span className="h-1 w-1 rounded-full bg-orange/50" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────── Main component ─────────── */
const Globe = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const globeY = useTransform(smooth, [0, 1], ["40px", "-80px"]);

  const stats = [
    { stat: "~50%", label: "Export share",    sub: "Direct to global customers" },
    { stat: "12+",  label: "Major ports",     sub: "Active service network" },
    { stat: "60+",  label: "Years shipping",  sub: "Founded Horten, 1961" },
    { stat: "IP66", label: "Every product",   sub: "Certified · DNV · CRS" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#04060c]">
      <Ticker />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,_rgba(249,132,12,0.09),_transparent)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange/5 blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 line-grid opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 sm:px-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hud-label mb-4">Global presence · Live network</p>
          <h2 className="mb-6 text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-6xl">
            From{" "}
            <span className="relative inline-block">
              <span className="gradient-text">Horten</span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-orange/50" />
            </span>
            {" "}to every<br />major shipping lane.
          </h2>
          <p className="mb-10 max-w-md text-base leading-relaxed text-secondary">
            Lilaas control systems are in service across every ocean,
            delivered through Kongsberg Maritime, Wärtsilä and the world&apos;s
            leading shipyards. One signal, every port.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ stat, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass glow-border group relative overflow-hidden rounded-xl p-5"
              >
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange/6 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <p className="mono text-2xl font-black gradient-text">{stat}</p>
                <p className="mt-1 text-sm font-semibold text-white">{label}</p>
                <p className="mt-0.5 text-xs text-secondary/70">{sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Globe stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: globeY }}
          className="relative mt-12 h-[520px] lg:mt-0"
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-orange/6 blur-[100px] scale-75" />
          <Canvas
            dpr={[1, 1.8]}
            camera={{ position: [0, 0, 5.5], fov: 42 }}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
          >
            <color attach="background" args={["#04060c"]} />
            <fogExp2 attach="fog" args={["#04060c", 0.08]} />
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 3, 5]} intensity={3.2} color="#f9840c" />
            <pointLight position={[-5, -3, -5]} intensity={1.1} color="#ffac50" />
            <pointLight position={[0, 5, -5]} intensity={0.7} color="#5aa8ff" />
            <Suspense fallback={null}>
              <Earth scroll={smooth} />
              <Stars />
            </Suspense>
            <Preload all />
            <EffectComposer multisampling={4}>
              <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.88} radius={0.8} blendFunction={BlendFunction.ADD} />
            </EffectComposer>
          </Canvas>

          {/* Corner brackets on the globe frame */}
          <div className="hud-bracket-tl" />
          <div className="hud-bracket-tr" />
          <div className="hud-bracket-bl" />
          <div className="hud-bracket-br" />

          {/* HQ callout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="absolute top-4 left-4 rounded-xl border border-orange/30 bg-primary/80 px-4 py-3 backdrop-blur-md shadow-orange"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-orange opacity-75" />
                <span className="h-2.5 w-2.5 rounded-full bg-orange" />
              </span>
              <div>
                <p className="mono text-[10px] tracking-[0.3em] text-orange">HQ · HORTEN</p>
                <p className="text-xs font-bold text-white">59.4151°N · 10.4844°E</p>
              </div>
            </div>
          </motion.div>

          {/* Bottom CERN badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute bottom-4 right-4 rounded-xl border border-orange/20 bg-primary/80 px-4 py-3 backdrop-blur-md"
          >
            <p className="text-xs font-bold text-white">⚛️ Also at CERN</p>
            <p className="mono mt-0.5 text-[10px] tracking-widest text-secondary/70">
              LARGE HADRON COLLIDER
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Globe;
