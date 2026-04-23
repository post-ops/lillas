import Image from "next/image";
import { brand, images } from "@/lib/config";

const CERTS = ["DNV", "CRS", "IP66", "CE", "CAN J1939"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0e14] pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            Est. 1961 · Horten, Norway
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[56px]">
            Maritime control levers and bridge systems.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Designed, engineered, and manufactured in Horten since {brand.founded}.
            On thousands of vessels worldwide — through Kongsberg Maritime,
            Wärtsilä, and the world's leading system integrators.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
            >
              Request a quote
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              See the range
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/5 pt-6">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/40">
              Certified
            </span>
            {CERTS.map((c) => (
              <span key={c} className="text-sm font-medium text-white/70">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange/10 via-transparent to-transparent blur-2xl" />
          <Image
            src={images.hero}
            alt="Lilaas L01 control lever on a maritime bridge"
            width={960}
            height={720}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full rounded-xl border border-white/5"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
