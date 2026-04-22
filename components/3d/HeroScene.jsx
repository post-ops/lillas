'use client';
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* ─── Reusable materials (built once) ──────────────────────────────────── */
function useMaterials() {
  return useMemo(() => ({
    anodised: new THREE.MeshStandardMaterial({ color: "#16181f", metalness: 0.9,  roughness: 0.3 }),
    brushed:  new THREE.MeshStandardMaterial({ color: "#c6c0b8", metalness: 0.95, roughness: 0.18 }),
    rubber:   new THREE.MeshStandardMaterial({ color: "#0b0d13", metalness: 0.15, roughness: 0.9 }),
    plate:    new THREE.MeshStandardMaterial({ color: "#0a0c14", metalness: 0.8,  roughness: 0.35 }),
    bevel:    new THREE.MeshStandardMaterial({ color: "#f9840c", emissive: "#f9840c", emissiveIntensity: 1.6, metalness: 0.8, roughness: 0.2 }),
    led:      new THREE.MeshBasicMaterial({ color: "#ffb066", toneMapped: false }),
    ledInner: new THREE.MeshBasicMaterial({ color: "#ffd49a", toneMapped: false }),
  }), []);
}

/* ─── One physical lever (pivot at base, animates with mouse/scroll) ───── */
function LeverUnit({ mat, pointer, bias = 0, ledRef }) {
  const arm = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = pointer.current.x;
    const py = pointer.current.y;
    if (arm.current) {
      arm.current.rotation.x = (py * 0.45) + Math.sin(t * 1.1 + bias) * 0.05 + bias * 0.2;
      arm.current.rotation.z = (px * 0.18) + Math.cos(t * 0.7 + bias) * 0.03;
    }
    if (ledRef?.current) {
      const v = 0.6 + (Math.sin(t * 2.2 + bias) + 1) * 0.25;
      ledRef.current.material.color.setRGB(1, 0.55 + v * 0.3, 0.2 + v * 0.3);
    }
  });
  return (
    <group>
      {/* Base housing */}
      <mesh material={mat.anodised} position={[0, 0.15, 0]}>
        <boxGeometry args={[0.9, 0.5, 0.9]} />
      </mesh>
      {/* Aluminium bevel */}
      <mesh material={mat.brushed} position={[0, 0.4, 0]}>
        <boxGeometry args={[0.87, 0.025, 0.87]} />
      </mesh>
      {/* Pivot dome */}
      <mesh material={mat.anodised} position={[0, 0.43, 0]}>
        <sphereGeometry args={[0.28, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      {/* Emissive LED ring */}
      <mesh ref={ledRef} position={[0, 0.425, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.31, 0.02, 14, 64]} />
        <meshBasicMaterial color="#ffb066" toneMapped={false} />
      </mesh>

      {/* Lever arm (pivots from base) */}
      <group ref={arm} position={[0, 0.43, 0]}>
        {/* Shaft */}
        <mesh material={mat.brushed} position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 1.1, 16]} />
        </mesh>
        {/* Ribbed rubber grip */}
        <mesh material={mat.rubber} position={[0, 1.12, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.4, 22]} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} material={mat.anodised} position={[0, 0.98 + i * 0.075, 0]}>
            <torusGeometry args={[0.113, 0.006, 6, 24]} />
          </mesh>
        ))}
        {/* Pommel */}
        <mesh material={mat.brushed} position={[0, 1.38, 0]}>
          <sphereGeometry args={[0.12, 24, 20]} />
        </mesh>
        {/* Trigger button (orange) */}
        <mesh position={[0, 1.06, 0.118]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.02, 16]} />
          <meshBasicMaterial color="#ffb066" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Console plate + dual levers + bolts ──────────────────────────────── */
function ConsolePanel({ pointer, scroll }) {
  const mat = useMaterials();
  const root = useRef();
  const leftLed = useRef();
  const rightLed = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const sp = scroll.current;
    if (root.current) {
      root.current.rotation.y = pointer.current.x * 0.25 + Math.sin(t * 0.2) * 0.03;
      root.current.rotation.x = -0.12 - pointer.current.y * 0.1 + sp * 0.3;
      root.current.position.y = -0.6 + Math.sin(t * 0.6) * 0.05;
    }
  });

  return (
    <group ref={root}>
      {/* Console base */}
      <mesh material={mat.plate} position={[0, -0.8, 0]}>
        <boxGeometry args={[4.2, 0.14, 2.0]} />
      </mesh>
      <mesh material={mat.bevel} position={[0, -0.73, 0]}>
        <boxGeometry args={[4.15, 0.015, 1.96]} />
      </mesh>
      {/* Bolts */}
      {[[-1.9, -0.71, -0.85], [1.9, -0.71, -0.85], [-1.9, -0.71, 0.85], [1.9, -0.71, 0.85]].map((p, i) => (
        <mesh key={i} material={mat.brushed} position={p}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 10]} />
        </mesh>
      ))}
      {/* Lever port */}
      <group position={[-1.1, -0.8, 0]}>
        <LeverUnit mat={mat} pointer={pointer} bias={0.1}  ledRef={leftLed} />
      </group>
      {/* Lever starboard */}
      <group position={[1.1, -0.8, 0]}>
        <LeverUnit mat={mat} pointer={pointer} bias={-0.1} ledRef={rightLed} />
      </group>
    </group>
  );
}

/* ─── Spinning outer ring ──────────────────────────────────────────────── */
function Rings() {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * 0.06;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.18) * 0.05;
  });
  return (
    <group ref={ref} position={[0, 0.2, -2.2]}>
      <mesh>
        <torusGeometry args={[3.8, 0.008, 10, 160]} />
        <meshBasicMaterial color="#f9840c" transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh rotation={[0.3, 0.6, 0]}>
        <torusGeometry args={[4.2, 0.004, 8, 140]} />
        <meshBasicMaterial color="#ffac50" transparent opacity={0.38} toneMapped={false} />
      </mesh>
      <mesh rotation={[-0.5, 1.1, 0.4]}>
        <torusGeometry args={[4.6, 0.003, 8, 140]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.22} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ─── Dust particles ───────────────────────────────────────────────────── */
function Dust() {
  const ref = useRef();
  const { positions, count } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.45;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions, count };
  }, []);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.015; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#ffb066" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─── Reflective floor plane ───────────────────────────────────────────── */
function Floor() {
  return (
    <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#05070d" metalness={0.9} roughness={0.4} />
    </mesh>
  );
}

/* ─── Main exported Canvas ─────────────────────────────────────────────── */
export default function HeroScene({ pointer, scroll }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.5, 5.2], fov: 44, near: 0.1, far: 40 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      frameloop="always"
    >
      <color attach="background" args={["#05070d"]} />
      <fogExp2 attach="fog" args={["#05070d", 0.045]} />

      <ambientLight intensity={0.18} color="#2a3a55" />
      <hemisphereLight args={["#5aa8ff", "#f9840c", 0.25]} />
      <pointLight position={[ 4,  3.5,  2.5]} intensity={3.5} color="#f9840c" distance={20} />
      <pointLight position={[-4,  2.5, -3  ]} intensity={1.8} color="#5aa8ff" distance={18} />
      <pointLight position={[ 0, -0.5,  3  ]} intensity={1.2} color="#ffb066" distance={10} />
      <spotLight
        position={[0, 6, 0]}
        angle={0.55}
        penumbra={0.85}
        intensity={2.0}
        color="#ffd49a"
      />

      <Floor />
      <Rings />
      <Dust />
      <ConsolePanel pointer={pointer} scroll={scroll} />

      <EffectComposer multisampling={2}>
        <Bloom intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.9} radius={0.7} blendFunction={BlendFunction.ADD} />
        <Vignette offset={0.15} darkness={0.68} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </Canvas>
  );
}
