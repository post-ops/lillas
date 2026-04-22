'use client';
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

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

function latLonToVec3(lat, lon, r = 1) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

function Earth() {
  const core = useRef();
  useFrame((s) => {
    if (core.current) {
      core.current.rotation.y = s.clock.elapsedTime * 0.08;
      core.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.12) * 0.03;
    }
  });

  return (
    <group ref={core}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 72, 72]} />
        <meshStandardMaterial color="#0a1020" emissive="#1a0800" emissiveIntensity={0.2} metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Wireframe continents stand-in */}
      <mesh scale={1.001}>
        <sphereGeometry args={[1.8, 28, 28]} />
        <meshBasicMaterial color="#f9840c" wireframe transparent opacity={0.15} toneMapped={false} />
      </mesh>
      {/* Inner halo */}
      <mesh scale={1.12}>
        <sphereGeometry args={[1.8, 40, 40]} />
        <meshBasicMaterial color="#f9840c" transparent opacity={0.045} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Outer halo */}
      <mesh scale={1.26}>
        <sphereGeometry args={[1.8, 40, 40]} />
        <meshBasicMaterial color="#ff9a3a" transparent opacity={0.055} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Ports */}
      {PORTS.map((p) => <PortMarker key={p.name} lat={p.lat} lon={p.lon} />)}
      <PortMarker lat={HQ.lat} lon={HQ.lon} isHQ />

      {/* Arcs */}
      {PORTS.map((p, i) => (
        <ShippingArc key={`arc-${p.name}`} from={HQ} to={p} offset={i * 0.07} />
      ))}
    </group>
  );
}

function PortMarker({ lat, lon, isHQ = false }) {
  const pos  = useMemo(() => latLonToVec3(lat, lon, 1.82), [lat, lon]);
  const halo = useRef();

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (halo.current) {
      const pulse = isHQ ? 0.9 + Math.sin(t * 2.4) * 0.35 : 0.6 + Math.sin(t * 2 + pos.x) * 0.3;
      halo.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[isHQ ? 0.045 : 0.028, 12, 12]} />
        <meshBasicMaterial color={isHQ ? "#ffd49a" : "#f9840c"} toneMapped={false} />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[isHQ ? 0.08 : 0.05, 14, 14]} />
        <meshBasicMaterial color={isHQ ? "#ffd49a" : "#f9840c"} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function ShippingArc({ from, to, offset }) {
  const { line, curve } = useMemo(() => {
    const a = latLonToVec3(from.lat, from.lon, 1.82);
    const b = latLonToVec3(to.lat,   to.lon,   1.82);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const dist = a.distanceTo(b);
    const arcH = Math.min(1.1, 0.35 + dist * 0.35);
    mid.normalize().multiplyScalar(1.82 + arcH);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const geom  = new THREE.BufferGeometry().setFromPoints(curve.getPoints(56));
    const mat   = new THREE.LineBasicMaterial({
      color: 0xf9840c,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    return { line: new THREE.Line(geom, mat), curve };
  }, [from, to]);

  const dot = useRef();
  useFrame((s) => {
    const t = ((s.clock.elapsedTime * 0.22) + offset) % 1;
    if (dot.current) {
      const p = curve.getPointAt(t);
      dot.current.position.copy(p);
    }
  });

  return (
    <group>
      <primitive object={line} />
      <mesh ref={dot}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshBasicMaterial color="#ffd49a" toneMapped={false} />
      </mesh>
    </group>
  );
}

function Stars() {
  const ref = useRef();
  const { positions, count } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions, count };
  }, []);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.01; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#ffffff" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function GlobeScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
    >
      <color attach="background" args={["#04060c"]} />
      <fogExp2 attach="fog" args={["#04060c", 0.08]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 3, 5]}  intensity={3.0} color="#f9840c" />
      <pointLight position={[-5, -3, -5]} intensity={1.0} color="#ffac50" />
      <pointLight position={[0, 5, -5]}  intensity={0.7} color="#5aa8ff" />
      <Earth />
      <Stars />
      <EffectComposer multisampling={2}>
        <Bloom intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.9} radius={0.75} blendFunction={BlendFunction.ADD} />
      </EffectComposer>
    </Canvas>
  );
}
