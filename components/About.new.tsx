import Image from "next/image";
import { brand, images, stats } from "@/lib/config";

export default function About() {
  return (
    <section id="about" className="border-t border-white/5 bg-[#0b0e14] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            About Lilaas
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Sixty years of maritime control engineering, in Horten.
          </h2>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="space-y-5 text-[17px] leading-relaxed text-white/75">
              <p>
                Lilaas was founded in {brand.founded} by Jan Lilaas in Horten, Norway.
                Today the company employs {brand.employees} people across mechanics,
                electronics, and software — all disciplines under one roof. Roughly{" "}
                {brand.exportShare}% of production is exported, most of it through
                the world's leading system integrators and shipyards.
              </p>
              <p>
                The business is split across {brand.revenueShare.maritime}% maritime
                — control levers, joysticks, and bridge consoles — and{" "}
                {brand.revenueShare.precision}% precision mechanics for defence,
                medical, and scientific equipment. Our work is on vessels in every
                major flag state, and on instruments at CERN.
              </p>
            </div>

            <blockquote className="mt-10 border-l-2 border-orange pl-6">
              <p className="text-lg italic leading-relaxed text-white/85">
                "{brand.ceoQuote}"
              </p>
              <footer className="mt-4 text-sm text-white/55">
                — {brand.ceo}, CEO
              </footer>
            </blockquote>
          </div>

          <div className="lg:col-span-2">
            <Image
              src={images.factory}
              alt="Lilaas facility in Horten, Norway"
              width={800}
              height={534}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="h-auto w-full rounded-lg border border-white/5"
              unoptimized
            />
            <p className="mt-3 text-xs text-white/50">
              {brand.location}
            </p>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/5 bg-white/5 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0b0e14] p-6">
              <dt className="text-xs font-medium uppercase tracking-wider text-white/50">
                {s.label}
              </dt>
              <dd className="mt-2 text-3xl font-semibold text-white">
                {s.value}
                {s.label === "Exported globally" && "%"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
