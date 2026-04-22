'use client';
import { brand, navLinks, images } from "@/lib/config";

const Footer = () => (
  <footer
    className="relative overflow-hidden border-t border-white/5 py-14"
    style={{ background: "linear-gradient(180deg, #0a0c12 0%, #080a10 100%)" }}
  >
    <div className="dot-grid pointer-events-none absolute inset-0 opacity-15" />
    <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-40 w-2/3 bg-orange/5 blur-[80px]" />

    <div className="relative mx-auto max-w-7xl px-6 sm:px-16">
      <div className="grid gap-8 sm:grid-cols-3 sm:gap-12">

        <div>
          <div className="mb-4">
            <img src={images.logo} alt="Lilaas" className="h-7 w-auto" />
          </div>
          <p className="text-xs leading-relaxed text-secondary/50">
            World-leading control levers and joysticks for maritime vessels.
            Manufactured in Horten since 1961.
          </p>
          <div className="mt-5 flex gap-3">
            {["DNV", "IP66", "CAN"].map((b) => (
              <span key={b} className="rounded-md border border-orange/15 bg-orange/8 px-2.5 py-1 text-[10px] font-bold text-orange/70">
                {b}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-secondary/30">Navigation</p>
          <nav className="flex flex-col gap-2.5">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex w-fit items-center gap-2 text-sm text-secondary/60 transition-colors hover:text-orange"
              >
                <span className="h-px w-0 bg-orange transition-all duration-300 group-hover:w-3" />
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-secondary/30">Contact</p>
          <div className="space-y-2 text-sm text-secondary/60">
            <p>{brand.location}</p>
            <a href={`tel:${brand.phone}`} className="block hover:text-orange transition-colors">
              {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`} className="block hover:text-orange transition-colors">
              {brand.email}
            </a>
          </div>
          <a
            href="/#contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-orange/25 bg-orange/8 px-4 py-2 text-xs font-bold text-orange transition-all hover:bg-orange/15 hover:border-orange/40"
          >
            Get in touch →
          </a>
        </div>
      </div>

      <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      <p className="mt-6 text-center text-[11px] text-secondary/25">
        © {new Date().getFullYear()} {brand.name} AS · Org.nr. 997 346 912 · Founded {brand.founded}
      </p>
    </div>
  </footer>
);

export default Footer;
