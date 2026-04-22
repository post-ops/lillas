'use client';
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Lilaas-style bridge control lever, built from primitives.
 * Two units side-by-side (port/starboard) mounted on a console plate.
 * Reacts to mouse pointer (tilt) and scroll progress (lean).
 */
export default function ControlLever({ pointer, scroll }) {
  const root = useRef();
  const leverA = useRef();
  const leverB = useRef();
  const ledA = useRef();
  const ledB = useRef();

  const anodised = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: "#1a1a1f", metalness: 0.85, roughness: 0.28,
    }), []
  );
  const aluminium = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: "#d0ccc4", metalness: 0.95, roughness: 0.12,
    }), []
  );
  const rubber = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: "#0c0e15", metalness: 0.2, roughness: 0.9,
    }), []
  );
  const ledMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: "#ffb066", emissive: "#ff7a0c", emissiveIntensity: 4.5,
      metalness: 0.2, roughness: 0.35, transparent: true, opacity: 0.96,
    }), []
  );
  const plate = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: "#0a0d14", metalness: 0.7, roughness: 0.35,
    }), []
  );
  const bevel = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: "#f9840c", emissive: "#f9840c", emissiveIntensity: 1.8,
      metalness: 0.8, roughness: 0.2,
    }), []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pX = pointer?.current?.x ?? 0;
    const pY = pointer?.current?.y ?? 0;
    const sp = scroll?.current ?? 0;

    if (root.current) {
      root.current.rotation.y = pX * 0.35 + Math.sin(t * 0.3) * 0.015;
      root.current.rotation.x = -pY * 0.15 + sp * 0.4;
      root.current.position.y = -0.2 + Math.sin(t * 0.8) * 0.04;
    }
    // Lever A (port): sway forward + idle breath
    if (leverA.current) {
      leverA.current.rotation.x = -0.15 + pY * 0.5 + Math.sin(t * 1.1) * 0.04;
      leverA.current.rotation.z = pX * 0.25 + Math.sin(t * 0.7) * 0.02;
    }
    // Lever B (starboard): mirrors with offset
    if (leverB.current) {
      leverB.current.rotation.x = 0.10 - pY * 0.45 + Math.cos(t * 0.9) * 0.035;
      leverB.current.rotation.z = pX * 0.18 + Math.cos(t * 0.6) * 0.02;
    }
    // LED pulse
    if (ledA.current) {
      ledA.current.material.emissiveIntensity =
        3.5 + Math.sin(t * 2.2) * 1.1 + sp * 2;
    }
    if (ledB.current) {
      ledB.current.material.emissiveIntensity =
        3.5 + Math.cos(t * 2.2 + 0.5) * 1.1 + sp * 2;
    }
  });

  return (
    <group ref={root} position={[0, -0.2, 0]}>
      {/* Console plate */}
      <mesh material={plate} position={[0, -1.35, 0]}>
        <boxGeometry args={[4.4, 0.12, 2.0]} />
      </mesh>
      <mesh material={bevel} position={[0, -1.29, 0]}>
        <boxGeometry args={[4.35, 0.02, 1.96]} />
      </mesh>

      {/* Bolts */}
      {[[-2.0, -1.24, -0.85], [2.0, -1.24, -0.85], [-2.0, -1.24, 0.85], [2.0, -1.24, 0.85]].map(
        (p, i) => (
          <mesh key={i} material={aluminium} position={p}>
            <cylinderGeometry args={[0.055, 0.055, 0.05, 8]} />
          </mesh>
        )
      )}

      {/* Lever unit A (port) */}
      <group position={[-1.1, -1.3, 0]}>
        <LeverUnit
          anodised={anodised}
          aluminium={aluminium}
          rubber={rubber}
          ledMat={ledMat}
          leverRef={leverA}
          ledRef={ledA}
        />
        <BaseLabel anodised={anodised} text="01" />
      </group>

      {/* Lever unit B (starboard) */}
      <group position={[1.1, -1.3, 0]}>
        <LeverUnit
          anodised={anodised}
          aluminium={aluminium}
          rubber={rubber}
          ledMat={ledMat}
          leverRef={leverB}
          ledRef={ledB}
        />
        <BaseLabel anodised={anodised} text="02" />
      </group>

      {/* Subtle cables */}
      <Cable from={[-1.1, -1.35, -0.7]} to={[0, -1.4, -1.6]} />
      <Cable from={[1.1, -1.35, -0.7]}  to={[0, -1.4, -1.6]} />
    </group>
  );
}

function LeverUnit({ anodised, aluminium, rubber, ledMat, leverRef, ledRef }) {
  return (
    <>
      {/* Base housing (machined block) */}
      <mesh material={anodised} position={[0, 0.12, 0]}>
        <boxGeometry args={[0.85, 0.46, 0.85]} />
      </mesh>
      {/* Beveled top lip */}
      <mesh material={aluminium} position={[0, 0.36, 0]}>
        <boxGeometry args={[0.82, 0.02, 0.82]} />
      </mesh>
      {/* Dome base for lever pivot */}
      <mesh material={anodised} position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.26, 24, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      {/* LED ring */}
      <mesh ref={ledRef} material={ledMat} position={[0, 0.385, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.30, 0.018, 14, 64]} />
      </mesh>

      {/* Lever arm (pivots from base) */}
      <group ref={leverRef} position={[0, 0.4, 0]}>
        {/* Shaft */}
        <mesh material={aluminium} position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.055, 0.075, 1.10, 16]} />
        </mesh>
        {/* Ribbed grip */}
        <mesh material={rubber} position={[0, 1.08, 0]}>
          <cylinderGeometry args={[0.10, 0.10, 0.36, 20]} />
        </mesh>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} material={anodised} position={[0, 0.94 + i * 0.07, 0]}>
            <torusGeometry args={[0.103, 0.006, 6, 24]} />
          </mesh>
        ))}
        {/* Pommel */}
        <mesh material={aluminium} position={[0, 1.31, 0]}>
          <sphereGeometry args={[0.115, 24, 20]} />
        </mesh>
        {/* Orange trigger button */}
        <mesh material={ledMat} position={[0, 1.01, 0.11]}>
          <cylinderGeometry args={[0.028, 0.028, 0.02, 16]} />
        </mesh>
      </group>
    </>
  );
}

function BaseLabel({ anodised, text }) {
  return (
    <group position={[0, -0.04, 0.43]}>
      <mesh material={anodised}>
        <boxGeometry args={[0.24, 0.08, 0.005]} />
      </mesh>
    </group>
  );
}

function Cable({ from, to }) {
  const points = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end   = new THREE.Vector3(...to);
    const mid   = start.clone().lerp(end, 0.5);
    mid.y -= 0.25;
    const curve = new THREE.CatmullRomCurve3([start, mid, end]);
    return curve.getPoints(32);
  }, [from, to]);

  const geom = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 24, 0.022, 8, false);
  }, [points]);

  return (
    <mesh geometry={geom}>
      <meshStandardMaterial color="#0c0e15" metalness={0.1} roughness={0.9} />
    </mesh>
  );
}
