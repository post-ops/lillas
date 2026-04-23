import Link from "next/link";
import { brand, products } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-display text-5xl font-normal leading-none tracking-[-0.02em] text-paper lg:text-[88px]">
              Lilaas
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-paper/65">
              Maritime control levers, joysticks, and bridge systems.
              Designed and manufactured in Horten, Norway since {brand.founded}.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-paper/50">
              Products
            </p>
            <ul className="mt-5 space-y-2.5">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.id}`}
                    className="text-sm text-paper/75 transition-colors hover:text-paper"
                  >
                    {p.title.split(" — ")[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-paper/50">
              Company
            </p>
            <ul className="mt-5 space-y-2.5">
              <li><a href="#about" className="text-sm text-paper/75 transition-colors hover:text-paper">About</a></li>
              <li><a href="#industries" className="text-sm text-paper/75 transition-colors hover:text-paper">Industries</a></li>
              <li><a href="#clients" className="text-sm text-paper/75 transition-colors hover:text-paper">Clients</a></li>
              <li><a href="#contact" className="text-sm text-paper/75 transition-colors hover:text-paper">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-paper/50">
              Contact
            </p>
            <address className="mt-5 space-y-2.5 not-italic">
              <p className="text-sm text-paper/75">{brand.location}</p>
              <p>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="text-sm text-paper/75 transition-colors hover:text-paper"
                >
                  {brand.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-sm text-paper/75 transition-colors hover:text-paper"
                >
                  {brand.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-paper/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-paper/45">
            © {new Date().getFullYear()} Lilaas AS · Est. {brand.founded} · Made in Horten, Norway
          </p>
          <p className="text-xs text-paper/45">
            DNV · CRS · IP66 · CE · CAN J1939
          </p>
        </div>
      </div>
    </footer>
  );
}
