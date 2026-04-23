import Link from "next/link";
import Image from "next/image";
import { brand, images, products } from "@/lib/config";

const CERTS = ["DNV", "CRS", "IP66", "CE", "CAN J1939"];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#08090f] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
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
              <span className="text-base font-semibold text-white">Lilaas</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">
              Maritime control levers, joysticks, and bridge systems. Designed
              and manufactured in Horten, Norway since {brand.founded}.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {CERTS.map((c) => (
                <span
                  key={c}
                  className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Products
            </p>
            <ul className="mt-4 space-y-2">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.id}`}
                    className="text-sm text-white/70 transition-colors hover:text-orange"
                  >
                    {p.title.split(" — ")[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Company
            </p>
            <ul className="mt-4 space-y-2">
              <li><a href="#about" className="text-sm text-white/70 transition-colors hover:text-orange">About</a></li>
              <li><a href="#industries" className="text-sm text-white/70 transition-colors hover:text-orange">Industries</a></li>
              <li><a href="#clients" className="text-sm text-white/70 transition-colors hover:text-orange">Clients</a></li>
              <li><a href="#contact" className="text-sm text-white/70 transition-colors hover:text-orange">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Contact
            </p>
            <address className="mt-4 space-y-2 not-italic">
              <p className="text-sm text-white/70">{brand.location}</p>
              <p>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="text-sm text-white/70 transition-colors hover:text-orange"
                >
                  {brand.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-sm text-white/70 transition-colors hover:text-orange"
                >
                  {brand.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Lilaas AS · Est. {brand.founded} · Made in Horten, Norway
          </p>
          <p className="text-xs text-white/40">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
