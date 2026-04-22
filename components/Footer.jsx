'use client';
import Link from "next/link";
import { brand, navLinks, images } from "@/lib/config";

const Footer = () => (
  <footer
    className="relative overflow-hidden border-t border-white/5 py-16"
    style={{ background: "linear-gradient(180deg, #08090f 0%, #05070d 100%)" }}
  >
    <div className="dot-grid pointer-events-none absolute inset-0 opacity-15" />
    <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-40 w-2/3 bg-orange/5 blur-[80px]" />
    <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />

    <div className="relative mx-auto max-w-7xl px-6 sm:px-16">
      <div className="grid gap-10 sm:grid-cols-4 sm:gap-8 lg:gap-12">
        {/* Brand column */}
        <div className="sm:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-orange opacity-60" />
              <span className="h-2 w-2 rounded-full bg-orange" />
            </span>
            <img src={images.logo} alt="Lilaas" className="h-7 w-auto brightness-110" />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-secondary/60">
            World-leading control levers, joysticks and bridge systems for maritime,
            defence, medicine and scientific research. Engineered in Horten since 1961.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["DNV", "CRS", "IP66", "CE", "CAN · J1939", "AESS"].map((b) => (
              <span key={b} className="rounded-md border border-orange/15 bg-orange/8 px-3 py-1 mono text-[10px] font-bold tracking-widest text-orange/80">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation column */}
        <div>
          <p className="hud-label mb-4 opacity-70">Navigation</p>
          <nav className="flex flex-col gap-2.5">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex w-fit items-center gap-2 text-sm text-secondary/60 transition-colors hover:text-orange"
              >
                <span className="h-px w-0 bg-orange transition-all duration-300 group-hover:w-4" />
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact column */}
        <div>
          <p className="hud-label mb-4 opacity-70">Contact</p>
          <div className="space-y-2 text-sm text-secondary/60">
            <p>{brand.location}</p>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="mono block text-[13px] transition-colors hover:text-orange">
              {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`} className="mono block text-[13px] transition-colors hover:text-orange">
              {brand.email}
            </a>
          </div>
          <Link
            href="/#contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-orange/25 bg-orange/8 px-4 py-2 text-xs font-bold text-orange transition-all hover:bg-orange/15 hover:border-orange/40"
          >
            Get in touch →
          </Link>
        </div>
      </div>

      <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="mono text-[11px] tracking-widest text-secondary/30">
          © {new Date().getFullYear()} {brand.name.toUpperCase()} AS · EST. {brand.founded}
        </p>
        <p className="flex items-center gap-2 text-[11px] text-secondary/40">
          <span>Engineered &amp; manufactured in</span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/8 bg-white/3 px-2 py-1 mono font-semibold tracking-widest text-white/70">
            <span aria-hidden>🇳🇴</span> HORTEN · NORWAY
          </span>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
