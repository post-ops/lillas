'use client';
import React, { Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, extend, useThree, useLoader } from "@react-three/fiber";
import { Stars, Preload, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky }   from "three/examples/jsm/objects/Sky.js";

extend({ Water, Sky });

function makeCircleSprite() {
  const c = document.createElement("canvas");
  c.width = 64; c.height = 64;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0,   "rgba(255,255,255,1)");
  g.addColorStop(0.5, "rgba(255,255,255,0.7)");
  g.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
let CIRCLE_SPRITE = null;

function OceanWater({ sunDir }) {
  const ref = useRef();
  const waterNormals = useLoader(THREE.TextureLoader, "https://threejs.org/examples/textures/waternormals.jpg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geom   = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(() => ({
    textureWidth:  512,
    textureHeight: 512,
    waterNormals,
    sunDirection:  sunDir.clone(),
    sunColor:      0xffdd99,
    waterColor:    0x001428,
    distortionScale: 5.5,
    fog:           false,
  }), [waterNormals, sunDir]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.material.uniforms["time"].value += dt * 0.5;
  });

  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}

function SkyDome({ onSun }) {
  const skyRef = useRef();
  const { gl, scene } = useThree();

  useEffect(() => {
    if (!skyRef.current) return;
    const sky = skyRef.current;
    sky.scale.setScalar(450000);

    const sun = new THREE.Vector3();
    const phi   = THREE.MathUtils.degToRad(88.5);
    const theta = THREE.MathUtils.degToRad(180);
    sun.setFromSphericalCoords(1, phi, theta);

    sky.material.uniforms["sunPosition"].value.copy(sun);
    sky.material.uniforms["turbidity"].value    = 10;
    sky.material.uniforms["rayleigh"].value     = 2;
    sky.material.uniforms["mieCoefficient"].value      = 0.005;
    sky.material.uniforms["mieDirectionalG"].value     = 0.8;

    onSun(sun);

    const pmrem = new THREE.PMREMGenerator(gl);
    const tmp   = new THREE.Scene();
    tmp.add(sky);
    scene.environment = pmrem.fromScene(tmp, 0.04).texture;
    tmp.remove(sky);
    pmrem.dispose();
  }, [gl, scene, onSun]);

  return <sky ref={skyRef} />;
}

class ShipErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? this.props.fallback : this.props.children; }
}

function GLBOrFallback() {
  return (
    <ShipErrorBoundary fallback={<Ship />}>
      <Suspense fallback={<Ship />}>
        <TankerModel />
      </Suspense>
    </ShipErrorBoundary>
  );
}

function TankerModel() {
  const { scene } = useGLTF("/ship.glb");
  const ref = useRef();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const targetLen = 18;
    const longestAxis = Math.max(size.x, size.y, size.z);
    const s = targetLen / longestAxis;
    scene.scale.setScalar(s);
    box.setFromObject(scene);
    const centre = new THREE.Vector3();
    box.getCenter(centre);
    scene.position.set(-centre.x, -box.min.y, -centre.z);
  }, [scene]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t  = clock.elapsedTime;
    const ω  = (2 * Math.PI) / 55;
    const θ  = ω * t;
    const Rx = 13;
    const Rz = 5;
    const x  = Rx * Math.sin(θ);
    const z  = -Rz * (1 - Math.cos(θ));
    const vx = Rx * ω * Math.cos(θ);
    const vz = Rz * ω * Math.sin(θ);
    ref.current.position.set(x, 0.3 + Math.sin(t * 0.55) * 0.10, z);
    ref.current.rotation.y = Math.atan2(vx, vz) + Math.PI;
    ref.current.rotation.z = Math.sin(t * 0.55) * 0.011;
    ref.current.rotation.x = Math.cos(t * 0.50) * 0.007;
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
      <pointLight position={[0, 10, 8]}  color="#ffdd99" intensity={8}  distance={50} decay={2} />
      <pointLight position={[0, 10, -8]} color="#ffdd99" intensity={6}  distance={50} decay={2} />
      <pointLight position={[8, 6, 0]}   color="#ffcc88" intensity={5}  distance={30} decay={2} />
      <pointLight position={[-8, 6, 0]}  color="#ffcc88" intensity={5}  distance={30} decay={2} />
      <pointLight position={[0, 4, 0]}   color="#f9840c" intensity={2}  distance={20} decay={2} />
    </group>
  );
}

function Ship() {
  const group = useRef();
  const DURATION = 20;

  const HL  = 22;
  const HH  = 2.4;
  const HW  = 4.2;
  const BL  = 3.0;
  const HH2 = HH / 2;
  const HW2 = HW / 2;
  const dY  = HH2 + 0.08;

  const bowGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = new Float32Array([
      BL,  HH2,   0,   BL, -HH2,   0,
       0,  HH2,  HW2,   0, -HH2,  HW2,
       0,  HH2, -HW2,   0, -HH2, -HW2,
    ]);
    const idx = new Uint16Array([0,3,2, 0,1,3, 0,5,4, 0,1,5, 0,4,2, 1,3,5, 2,5,3, 2,4,5]);
    geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    geo.computeVertexNormals();
    return geo;
  }, []);

  const mat = useMemo(() => ({
    hull:   new THREE.MeshStandardMaterial({ color: "#0a1628", metalness: 0.80, roughness: 0.30 }),
    blue:   new THREE.MeshStandardMaterial({ color: "#1a3a6a", metalness: 0.60, roughness: 0.45 }),
    white:  new THREE.MeshStandardMaterial({ color: "#e8e4de", metalness: 0.15, roughness: 0.70 }),
    wdark:  new THREE.MeshStandardMaterial({ color: "#d0ccc4", metalness: 0.18, roughness: 0.65 }),
    deck:   new THREE.MeshStandardMaterial({ color: "#5a5446", metalness: 0.20, roughness: 0.90 }),
    mast:   new THREE.MeshStandardMaterial({ color: "#c0bdb8", metalness: 0.92, roughness: 0.08 }),
    orange: new THREE.MeshStandardMaterial({ color: "#f9840c", emissive: "#f9840c", emissiveIntensity: 1.0, metalness: 0.70, roughness: 0.25 }),
    dark:   new THREE.MeshStandardMaterial({ color: "#0a0d14", metalness: 0.80, roughness: 0.22 }),
    glow:   new THREE.MeshStandardMaterial({ color: "#ffe8a0", emissive: "#ffe8a0", emissiveIntensity: 3.0, transparent: true, opacity: 0.95 }),
    glowB:  new THREE.MeshStandardMaterial({ color: "#a8d8ff", emissive: "#a8d8ff", emissiveIntensity: 2.0, transparent: true, opacity: 0.85 }),
    red:    new THREE.MeshStandardMaterial({ color: "#7a1a08", metalness: 0.40, roughness: 0.75 }),
  }), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t    = clock.elapsedTime;
    const frac = (t % DURATION) / DURATION;
    group.current.position.x = 30 - frac * 62;
    group.current.position.y = 0.25 + Math.sin(t * 0.55) * 0.12 + Math.sin(t * 0.9 + 1.1) * 0.05;
    group.current.rotation.z = Math.sin(t * 0.55) * 0.013;
    group.current.rotation.x = Math.cos(t * 0.5)  * 0.007;
  });

  return (
    <group ref={group} position={[30, 0.25, 0]} rotation={[0, Math.PI, 0]}>
      <mesh material={mat.hull}><boxGeometry args={[HL, HH, HW]} /></mesh>
      <mesh material={mat.hull} geometry={bowGeo} position={[HL / 2, 0, 0]} />
      <mesh material={mat.hull} position={[-HL / 2 - 0.2, 0, 0]}><boxGeometry args={[0.40, HH - 0.2, HW - 0.3]} /></mesh>
      <mesh material={mat.red} position={[0, -HH2 + 0.28, 0]}><boxGeometry args={[HL, 0.58, HW + 0.01]} /></mesh>
      <mesh material={mat.blue} position={[0, HH2 - 0.32, 0]}><boxGeometry args={[HL + 0.01, 0.66, HW + 0.01]} /></mesh>
      <mesh material={mat.deck} position={[0, dY, 0]}><boxGeometry args={[HL + 0.1, 0.12, HW + 0.1]} /></mesh>

      {/* Superstructure levels */}
      <mesh material={mat.white} position={[0.5, dY + 0.44, 0]}><boxGeometry args={[17.0, 0.88, HW - 0.05]} /></mesh>
      <mesh material={mat.wdark} position={[0.5, dY + 0.91, 0]}><boxGeometry args={[17.2, 0.07, HW + 0.10]} /></mesh>
      <mesh material={mat.white} position={[0.0, dY + 1.37, 0]}><boxGeometry args={[16.5, 0.82, HW - 0.10]} /></mesh>
      <mesh material={mat.wdark} position={[0.0, dY + 1.81, 0]}><boxGeometry args={[16.7, 0.07, HW + 0.08]} /></mesh>
      <mesh material={mat.white} position={[-0.5, dY + 2.25, 0]}><boxGeometry args={[15.8, 0.80, HW - 0.20]} /></mesh>
      <mesh material={mat.wdark} position={[-0.5, dY + 2.68, 0]}><boxGeometry args={[16.0, 0.07, HW + 0.06]} /></mesh>
      <mesh material={mat.white} position={[-1.2, dY + 3.12, 0]}><boxGeometry args={[14.5, 0.78, HW - 0.45]} /></mesh>
      <mesh material={mat.wdark} position={[-1.2, dY + 3.54, 0]}><boxGeometry args={[14.8, 0.07, HW + 0.04]} /></mesh>
      <mesh material={mat.white} position={[-2.5, dY + 3.97, 0]}><boxGeometry args={[11.0, 0.74, HW - 0.90]} /></mesh>
      <mesh material={mat.wdark} position={[-2.5, dY + 4.37, 0]}><boxGeometry args={[11.2, 0.07, HW - 0.70]} /></mesh>
      <mesh material={mat.white} position={[-4.0, dY + 4.74, 0]}><boxGeometry args={[8.0, 0.52, HW - 1.40]} /></mesh>

      {/* Windows — port */}
      {Array.from({ length: 16 }, (_, i) => 8.0 - i * 1.0).map((x, i) => (
        <mesh key={`w1p-${i}`} material={mat.glow} position={[x, dY + 0.44, HW2 - 0.02]}><boxGeometry args={[0.38, 0.36, 0.03]} /></mesh>
      ))}
      {Array.from({ length: 15 }, (_, i) => 7.5 - i * 1.0).map((x, i) => (
        <mesh key={`w2p-${i}`} material={mat.glow} position={[x, dY + 1.37, HW2 - 0.04]}><boxGeometry args={[0.38, 0.34, 0.03]} /></mesh>
      ))}
      {Array.from({ length: 14 }, (_, i) => 7.0 - i * 1.0).map((x, i) => (
        <mesh key={`w3p-${i}`} material={mat.glow} position={[x, dY + 2.25, HW2 - 0.09]}><boxGeometry args={[0.36, 0.32, 0.03]} /></mesh>
      ))}
      {Array.from({ length: 12 }, (_, i) => 6.0 - i * 1.1).map((x, i) => (
        <mesh key={`w4p-${i}`} material={mat.glow} position={[x, dY + 3.12, HW2 - 0.21]}><boxGeometry args={[0.36, 0.30, 0.03]} /></mesh>
      ))}
      {Array.from({ length: 9 }, (_, i) => 4.0 - i * 1.1).map((x, i) => (
        <mesh key={`w5p-${i}`} material={mat.glowB} position={[x, dY + 3.97, HW2 - 0.43]}><boxGeometry args={[0.55, 0.42, 0.03]} /></mesh>
      ))}

      {/* Windows — starboard */}
      {Array.from({ length: 16 }, (_, i) => 8.0 - i * 1.0).map((x, i) => (
        <mesh key={`w1s-${i}`} material={mat.glow} position={[x, dY + 0.44, -(HW2 - 0.02)]}><boxGeometry args={[0.38, 0.36, 0.03]} /></mesh>
      ))}
      {Array.from({ length: 15 }, (_, i) => 7.5 - i * 1.0).map((x, i) => (
        <mesh key={`w2s-${i}`} material={mat.glow} position={[x, dY + 1.37, -(HW2 - 0.04)]}><boxGeometry args={[0.38, 0.34, 0.03]} /></mesh>
      ))}
      {Array.from({ length: 14 }, (_, i) => 7.0 - i * 1.0).map((x, i) => (
        <mesh key={`w3s-${i}`} material={mat.glow} position={[x, dY + 2.25, -(HW2 - 0.09)]}><boxGeometry args={[0.36, 0.32, 0.03]} /></mesh>
      ))}
      {Array.from({ length: 12 }, (_, i) => 6.0 - i * 1.1).map((x, i) => (
        <mesh key={`w4s-${i}`} material={mat.glow} position={[x, dY + 3.12, -(HW2 - 0.21)]}><boxGeometry args={[0.36, 0.30, 0.03]} /></mesh>
      ))}
      {Array.from({ length: 9 }, (_, i) => 4.0 - i * 1.1).map((x, i) => (
        <mesh key={`w5s-${i}`} material={mat.glowB} position={[x, dY + 3.97, -(HW2 - 0.43)]}><boxGeometry args={[0.55, 0.42, 0.03]} /></mesh>
      ))}

      <pointLight position={[2, dY + 1.5, 0]} color="#ffe8b0" intensity={5} distance={14} decay={2} />
      <pointLight position={[-4, dY + 3.5, 0]} color="#a8d8ff" intensity={4} distance={10} decay={2} />

      {/* Funnel */}
      <mesh material={mat.dark} position={[-9.5, dY + 1.80, 0]}><cylinderGeometry args={[0.85, 1.10, 3.62, 20]} /></mesh>
      <mesh material={mat.orange} position={[-9.5, dY + 3.28, 0]}><cylinderGeometry args={[0.87, 0.87, 0.70, 20]} /></mesh>
      <mesh material={mat.dark} position={[-9.5, dY + 3.90, 0]}><cylinderGeometry args={[0.80, 0.87, 0.52, 18]} /></mesh>
      <pointLight position={[-9.5, dY + 4.5, 0]} color="#f9840c" intensity={8} distance={10} decay={2} />

      {[0, 1, 2, 3, 4].map(i => (
        <mesh key={i} position={[-9.5 + i * 0.1, dY + 4.7 + i * 0.6, i * 0.08]}>
          <sphereGeometry args={[0.22 + i * 0.20, 7, 6]} />
          <meshStandardMaterial color="#252535" transparent opacity={Math.max(0, 0.18 - i * 0.032)} />
        </mesh>
      ))}

      {/* Mast */}
      <mesh material={mat.mast} position={[-3.0, dY + 5.38, 0]}><cylinderGeometry args={[0.032, 0.052, 1.60, 7]} /></mesh>
      <mesh material={mat.white} position={[-3.0, dY + 6.25, 0]}><sphereGeometry args={[0.28, 12, 10]} /></mesh>
      <mesh material={mat.mast} position={[-3.0, dY + 5.95, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.020, 0.020, 1.60, 6]} /></mesh>
      <mesh material={mat.mast} position={[10.0, dY + 0.80, 0]}><cylinderGeometry args={[0.030, 0.058, 2.40, 8]} /></mesh>
      <mesh material={mat.glow} position={[10.0, dY + 2.05, 0]}><sphereGeometry args={[0.07, 8, 8]} /></mesh>
      <pointLight position={[10.0, dY + 2.07, 0]} color="#ffffff" intensity={1.5} distance={3} decay={2} />

      <BowSpray />
    </group>
  );
}

function BowSpray() {
  const ref = useRef();
  if (!CIRCLE_SPRITE) CIRCLE_SPRITE = makeCircleSprite();

  const pos = useMemo(() => {
    const arr = new Float32Array(160 * 3);
    for (let i = 0; i < 160; i++) {
      const a = (Math.random() - 0.5) * 1.6;
      const d = Math.random() * 4.0;
      arr[i * 3]     = 12.0 + Math.cos(a) * d;
      arr[i * 3 + 1] = 0.35 + Math.abs(Math.sin(a)) * d * 0.85;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = 0.48 + Math.sin(clock.elapsedTime * 2.6) * 0.13;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={160} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.17} map={CIRCLE_SPRITE} color="#cce8ff" transparent opacity={0.52} alphaTest={0.01} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function WakeTrail() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t    = clock.elapsedTime;
    const frac = (t % 20) / 20;
    group.current.position.x = 30 - frac * 62;
  });
  return (
    <group ref={group} position={[0, 0.05, 0]}>
      {Array.from({ length: 10 }).map((_, i) => {
        const f = (i + 1) / 10;
        return (
          <group key={i}>
            <mesh position={[-f * 7, 0, f * 2.2]} rotation={[0, -Math.atan2(2.2, 7), 0]}>
              <boxGeometry args={[f * 3.5, 0.06, 0.1]} />
              <meshStandardMaterial color="#c8e8ff" transparent opacity={(1 - f) * 0.4} />
            </mesh>
            <mesh position={[-f * 7, 0, -f * 2.2]} rotation={[0, Math.atan2(2.2, 7), 0]}>
              <boxGeometry args={[f * 3.5, 0.06, 0.1]} />
              <meshStandardMaterial color="#c8e8ff" transparent opacity={(1 - f) * 0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Scene() {
  const sunRef = useRef(new THREE.Vector3());
  const handleSun = (sun) => { sunRef.current.copy(sun); };

  return (
    <>
      <fogExp2 color="#060d1a" density={0.022} />
      <color attach="background" args={["#060d1a"]} />
      <ambientLight intensity={0.18} color="#2a4a7a" />
      <directionalLight position={[-20, 5, -10]} intensity={3.0} color="#ffcc88" castShadow />
      <directionalLight position={[10, 15, 8]}  intensity={0.5} color="#8ab0d8" />
      <Stars radius={300} depth={60} count={4000} factor={3} saturation={0.1} fade speed={0.3} />
      <SkyDome onSun={handleSun} />
      <Suspense fallback={null}>
        <OceanWater sunDir={sunRef.current} />
        <GLBOrFallback />
        <WakeTrail />
      </Suspense>
      <Preload all />
      <EffectComposer multisampling={4}>
        <Bloom intensity={2.4} luminanceThreshold={0.15} luminanceSmoothing={0.88} radius={0.92} blendFunction={BlendFunction.ADD} />
        <Vignette eskil={false} offset={0.08} darkness={0.72} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  );
}

export default function BoatAnimation() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 420, background: "#080e1a" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#08090f] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#08090f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#080e1a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#080e1a] to-transparent" />

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 4.5, 20], fov: 52, near: 0.1, far: 2000 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
      >
        <Scene />
      </Canvas>

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2.5">
        <span className="h-px w-10 bg-orange/25" />
        <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-orange/40">Lilaas at sea</span>
        <span className="h-px w-10 bg-orange/25" />
      </div>
    </div>
  );
}
