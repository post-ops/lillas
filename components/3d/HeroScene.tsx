"use client";
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function OrbitalRings() {
  const g = useRef<THREE.Group>(null);
  const m1 = useRef<THREE.MeshStandardMaterial>(null);
  const m2 = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((s) => {
    if (!g.current) return;
    g.current.rotation.y = s.clock.elapsedTime * 0.18;
    g.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.35) * 0.12;
    if (m1.current) m1.current.emissiveIntensity = 2.2 + Math.sin(s.clock.elapsedTime) * 0.3;
    if (m2.current) m2.current.emissiveIntensity = 1.4 + Math.cos(s.clock.elapsedTime * 0.7) * 0.2;
  });

  return (
    <group ref={g}>
      <Torus args={[2.4, 0.038, 24, 220]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial ref={m1} color="#f9840c" emissive="#f9840c" emissiveIntensity={2.2} metalness={1} roughness={0.05} />
      </Torus>
      <Torus args={[3.0, 0.024, 22, 220]} rotation={[1.15, 0.45, 0]}>
        <meshStandardMaterial ref={m2} color="#ffac50" emissive="#ffac50" emissiveIntensity={1.4} metalness={1} roughness={0.05} />
      </Torus>
      <Torus args={[3.55, 0.018, 20, 220]} rotation={[-0.8, 1.0, 0.3]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.1} metalness={1} roughness={0.05} />
      </Torus>
      <Torus args={[4.15, 0.012, 18, 220]} rotation={[0.3, -0.6, 1.1]}>
        <meshStandardMaterial color="#ffd49a" emissive="#ffd49a" emissiveIntensity={0.9} metalness={1} roughness={0.1} />
      </Torus>
    </group>
  );
}

function Particles({ count = 480 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      sizes[i] = Math.random() * 0.04 + 0.015;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffac50"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color="#ffac50" />
      <pointLight position={[-6, -4, -4]} intensity={0.8} color="#f9840c" />
      <hemisphereLight args={["#ffd49a", "#05070d", 0.4]} />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
          <OrbitalRings />
        </Float>
        <Particles count={520} />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.85} luminanceThreshold={0.18} luminanceSmoothing={0.8} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.82} />
      </EffectComposer>
    </Canvas>
  );
}
