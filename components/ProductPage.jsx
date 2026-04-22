'use client';
import { Suspense, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, OrbitControls, Preload, Float } from "@react-three/drei";
import { products, images } from "@/lib/config";
import Tilt3D from "@/components/ui/Tilt3D";

function OrbitalRings() {
  const g = useRef();
  useFrame((s) => {
    g.current.rotation.y = s.clock.elapsedTime * 0.18;
    g.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.35) * 0.12;
  });
  return (
    <group ref={g}>
      <Torus args={[2.5, 0.035, 16, 140]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#f9840c" emissive="#f9840c" emissiveIntensity={1.2} metalness={1} roughness={0} />
      </Torus>
      <Torus args={[3.0, 0.022, 16, 140]} rotation={[1.1, 0.4, 0]}>
        <meshStandardMaterial color="#ffac50" emissive="#ffac50" emissiveIntensity={0.7} metalness={1} roughness={0} />
      </Torus>
      <Torus args={[3.5, 0.016, 16, 140]} rotation={[-0.8, 1.0, 0.3]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.18} metalness={1} roughness={0} />
      </Torus>
      <Torus args={[2.8, 0.012, 16, 140]} rotation={[Math.PI / 2 + 0.4, 0.8, 0.6]}>
        <meshStandardMaterial color="#f9840c" emissive="#f9840c" emissiveIntensity={0.4} metalness={1} roughness={0} transparent opacity={0.5} />
      </Torus>
    </group>
  );
}

function Particles3D() {
  const points = useRef();
  const count = 1400;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
  }
  useFrame((s) => {
    points.current.rotation.y = s.clock.elapsedTime * 0.035;
    points.current.rotation.x = s.clock.elapsedTime * 0.012;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#f9840c" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function AccentDots() {
  const pts = useRef();
  const count = 300;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 2.4 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }
  useFrame((s) => { pts.current.rotation.y = -s.clock.elapsedTime * 0.06; });
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#ffac50" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: "easeOut" } }),
};
const fadeLeft  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } };
const fadeRight = { hidden: { opacity: 0, x:  40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } };

function ScrollIn({ children, variant = fadeUp, custom = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} variants={variant} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={custom} className={className}>
      {children}
    </motion.div>
  );
}

function QuickStat({ label, value }) {
  return (
    <div className="glass flex flex-col items-center rounded-2xl px-6 py-5 text-center">
      <span className="text-xl font-black gradient-text">{value}</span>
      <span className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-secondary/60">{label}</span>
    </div>
  );
}

function RelatedCard({ product, index }) {
  return (
    <Tilt3D intensity={8} scale={1.02}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07 }}
        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface/50 backdrop-blur-sm transition-all duration-300 hover:border-orange/30 hover:shadow-orange"
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(249,132,12,0.12), transparent 60%)" }} />
        <div className="relative h-36 overflow-hidden bg-[#080b14]">
          <img src={product.image} alt={product.title} className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            style={{ filter: "drop-shadow(0 0 20px rgba(249,132,12,0.4))" }} />
        </div>
        <div className="p-4">
          <h4 className="text-sm font-bold text-white">{product.title}</h4>
          <p className="mt-0.5 font-mono text-[10px] text-orange/60">{product.subtitle}</p>
          <Link href={`/product/${product.id}`}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange opacity-0 transition-all duration-300 group-hover:opacity-100">
            View details <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange to-transparent transition-all duration-500 group-hover:w-full" />
      </motion.div>
    </Tilt3D>
  );
}

export default function ProductPage({ id }) {
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-5xl font-black text-white">Product not found</p>
        <p className="text-secondary">No product with id <code className="text-orange">&quot;{id}&quot;</code> exists.</p>
        <Link href="/#products" className="rounded-full bg-orange px-8 py-3 text-sm font-bold text-white hover:bg-orange-dark transition-all">
          ← Back to products
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== id);
  const specEntries = Object.entries(product.technicalSpecs);
  const quickStats = [
    { label: "IP Rating",      value: product.technicalSpecs["Protection rating"] ?? "—" },
    { label: "Certification",  value: product.certifications[0] ?? "—" },
    { label: "Interface",      value: product.technicalSpecs["Interface"] ?? product.technicalSpecs["Output signal"]?.split(" ")[0] ?? "—" },
    { label: "Range / Axes",   value: product.technicalSpecs["Range of motion"] ?? product.technicalSpecs["Axes"] ?? product.technicalSpecs["Fore-aft travel"] ?? "—" },
  ];

  return (
    <>
      {/* 1. HERO */}
      <section className="relative flex min-h-screen w-full items-center overflow-hidden" style={{ background: "#080b12" }}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_0%,_rgba(249,132,12,0.13),_transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_10%_80%,_rgba(249,132,12,0.07),_transparent)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080b12] to-transparent" />
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-16 pt-32 sm:px-16 lg:flex-row lg:items-center lg:justify-between">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex max-w-xl flex-col">
            <Link href="/#products" className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-secondary backdrop-blur-sm transition-all hover:border-orange/30 hover:text-white">
              ← Back to products
            </Link>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-orange" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-orange">{product.subtitle}</span>
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              {product.title.split("—")[0].trim()}
              {product.title.includes("—") && (
                <span className="block gradient-text text-4xl sm:text-5xl">{product.title.split("—")[1].trim()}</span>
              )}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.specs.map((s) => (
                <span key={s} className="rounded-lg border border-orange/20 bg-orange/10 px-3 py-1 text-xs font-bold text-orange">{s}</span>
              ))}
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-secondary">{product.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact-cta" className="group relative overflow-hidden rounded-full bg-orange px-8 py-3.5 text-sm font-bold text-white shadow-orange transition-all duration-300 hover:scale-105 hover:shadow-orange-lg">
                <span className="relative z-10">Request a quote →</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-dark to-orange-light transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a href={product.link} target="_blank" rel="noopener noreferrer"
                className="rounded-full border border-orange/30 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-orange hover:bg-orange/10">
                Official page
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="relative h-[460px] w-full max-w-[560px] shrink-0 lg:h-[600px]">
            <div className="absolute inset-0">
              <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7.5], fov: 38 }}>
                <ambientLight intensity={0.15} />
                <pointLight position={[5, 5, 5]} intensity={4} color="#f9840c" />
                <pointLight position={[-5, -3, -5]} intensity={1.5} color="#ffac50" />
                <pointLight position={[0, -5, 3]} intensity={0.8} color="#ff6600" />
                <Suspense fallback={null}>
                  <Float speed={1.0} rotationIntensity={0.18} floatIntensity={0.35}>
                    <OrbitalRings />
                  </Float>
                  <Particles3D />
                  <AccentDots />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
                <Preload all />
              </Canvas>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.img src={product.image} alt={product.title}
                initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.9 }}
                className="h-[68%] w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 120px rgba(249,132,12,0.75))" }} />
            </div>
            <div className="pointer-events-none absolute top-6 right-6 h-10 w-10 border-t border-r border-orange/30" />
            <div className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b border-l border-orange/30" />
          </motion.div>
        </div>
      </section>

      {/* 2. OVERVIEW BAR */}
      <section className="relative bg-[#080b12] py-10">
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 sm:px-16">
          <ScrollIn>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {quickStats.map((qs) => <QuickStat key={qs.label} {...qs} />)}
            </div>
          </ScrollIn>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/10 to-transparent" />
      </section>

      {/* 3. SPECIFICATIONS */}
      <section className="relative bg-primary py-24 overflow-hidden mesh-gradient">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ScrollIn variant={fadeLeft}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange">Technical overview</p>
              <h2 className="mb-8 text-4xl font-black text-white sm:text-5xl">Technical<br /><span className="gradient-text">Specifications</span></h2>
              {product.longDescription.map((para, i) => (
                <p key={i} className={`${i > 0 ? "mt-5" : ""} text-sm leading-[1.85] text-secondary`}>{para}</p>
              ))}
            </ScrollIn>
            <ScrollIn variant={fadeRight}>
              <div className="overflow-hidden rounded-2xl border border-white/6 backdrop-blur-sm">
                <div className="border-b border-white/6 bg-orange/5 px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange">Spec sheet</p>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {specEntries.map(([key, val], i) => (
                      <tr key={key} className={`border-b border-white/4 transition-colors duration-150 hover:bg-orange/5 ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}`}>
                        <td className="px-6 py-3.5 font-semibold text-secondary/70 w-[48%]">{key}</td>
                        <td className="px-6 py-3.5 font-bold text-white">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollIn>
          </div>
        </div>
      </section>

      {/* 4. CERTIFICATIONS */}
      <section className="relative bg-[#070a10] py-20">
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 sm:px-16">
          <ScrollIn>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange">Compliance</p>
            <h2 className="mb-10 text-3xl font-black text-white sm:text-4xl">Certifications &amp; Standards</h2>
          </ScrollIn>
          <ScrollIn custom={0.1}>
            <div className="flex flex-wrap gap-4">
              {product.certifications.map((cert, i) => (
                <motion.div key={cert} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 rounded-2xl border border-orange/20 bg-orange/8 px-6 py-4 backdrop-blur-sm transition-all hover:border-orange/40 hover:bg-orange/12">
                  <svg className="h-5 w-5 shrink-0 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  <span className="text-sm font-bold text-white">{cert}</span>
                </motion.div>
              ))}
            </div>
          </ScrollIn>
        </div>
      </section>

      {/* 5. APPLICATIONS */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-16">
          <ScrollIn>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange">Use cases</p>
            <h2 className="mb-10 text-3xl font-black text-white sm:text-4xl">Where it&apos;s used</h2>
          </ScrollIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.applications.map((app, i) => (
              <motion.div key={app} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="glass group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:border-orange/30 glow-border">
                <svg className="h-5 w-5 shrink-0 text-orange/60 transition-colors group-hover:text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="3" />
                  <line x1="12" y1="8" x2="12" y2="22" />
                  <path d="M5 16H2a10 10 0 0 0 20 0h-3" />
                </svg>
                <span className="text-sm font-semibold text-secondary transition-colors group-hover:text-white">{app}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RELATED */}
      <section className="relative bg-[#070a10] py-24">
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/15 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 sm:px-16">
          <ScrollIn>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange">Explore more</p>
            <h2 className="mb-10 text-3xl font-black text-white sm:text-4xl">Related Products</h2>
          </ScrollIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {related.map((p, i) => <RelatedCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section id="contact-cta" className="relative overflow-hidden py-28" style={{ background: "linear-gradient(135deg, #0d0f1a 0%, #1a0c00 50%, #0d0f1a 100%)" }}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,_rgba(249,132,12,0.1),_transparent)]" />
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-16">
          <ScrollIn>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-orange/30 bg-orange/10 px-5 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange">Talk to an engineer</span>
            </div>
            <h2 className="mb-5 text-4xl font-black text-white sm:text-5xl">
              Need this product?<span className="block mt-1 gradient-text">Talk to our engineers.</span>
            </h2>
            <p className="mb-10 text-base leading-relaxed text-secondary">
              Our team in Horten, Norway is ready to help you spec the right control system for your vessel.
              We handle everything from single-unit orders to full bridge console integrations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/#contact" className="group relative overflow-hidden rounded-full bg-orange px-10 py-4 text-sm font-bold text-white shadow-orange transition-all duration-300 hover:scale-105 hover:shadow-orange-lg">
                <span className="relative z-10">Contact us →</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-dark to-orange-light transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a href={`mailto:lilaas@lilaas.no?subject=Product inquiry: ${product.title}`}
                className="rounded-full border border-orange/30 px-10 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-orange hover:bg-orange/10">
                Send email
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/8 pt-8">
              {["In-house engineering", "Horten, Norway", "Since 1961"].map((badge) => (
                <span key={badge} className="flex items-center gap-2 text-xs font-semibold text-secondary/50">
                  <span className="h-1 w-1 rounded-full bg-orange/50" />{badge}
                </span>
              ))}
            </div>
          </ScrollIn>
        </div>
      </section>
    </>
  );
}
