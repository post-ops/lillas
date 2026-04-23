import Link from "next/link";
import Image from "next/image";
import { brand, images, products } from "@/lib/config";

const CERTS = ["DNV", "CRS", "IP66", "CE", "CAN J1939"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-ink-2 py-16">
      <div className="pointer-events-none absolute inset-0 dot-grid-fine opacity-40" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-40 w-2/3 -translate-x-1/2 bg-orange/5 blur-[80px]" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={images.logo}
                alt="Lilaas"
                width={120}
                height={28}
                className="h-7 w-auto brightness-110"
                unoptimized
              />
              <span className="text-base font-black text-paper">Lilaas</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-paper-soft">
              Maritime control levers, joysticks, and bridge systems.
              Designed and manufactured in Horten, Norway since {brand.founded}.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {CERTS.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-orange/15 bg-orange/8 px-2.5 py-1 text-[10px] font-bold tracking-widest text-orange-light"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange/70">
              Products
            </p>
            <ul className="mt-5 space-y-2.5">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.id}`}
                    className="text-sm text-paper-soft transition-colors hover:text-orange"
                  >
                    {p.title.split(" — ")[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange/70">
              Company
            </p>
            <ul className="mt-5 space-y-2.5">
              <li><a href="#about" className="text-sm text-paper-soft transition-colors hover:text-orange">About</a></li>
              <li><a href="#industries" className="text-sm text-paper-soft transition-colors hover:text-orange">Industries</a></li>
              <li><a href="#clients" className="text-sm text-paper-soft transition-colors hover:text-orange">Clients</a></li>
              <li><a href="#contact" className="text-sm text-paper-soft transition-colors hover:text-orange">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange/70">
              Contact
            </p>
            <address className="mt-5 space-y-2.5 not-italic">
              <p className="text-sm text-paper-soft">{brand.location}</p>
              <p>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="text-sm text-paper-soft transition-colors hover:text-orange"
                >
                  {brand.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-sm text-paper-soft transition-colors hover:text-orange"
                >
                  {brand.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-mute">
            © {new Date().getFullYear()} Lilaas AS · Est. {brand.founded} · Made in Horten, Norway
          </p>
          <p className="text-xs text-mute">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
