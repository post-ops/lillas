import Image from "next/image";
import { brand, images } from "@/lib/config";

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-40">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
          About
        </p>

        <h2 className="font-display mt-8 max-w-5xl text-4xl font-normal leading-[1.02] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[80px]">
          Sixty-five years of<br />
          <em className="italic">maritime control engineering</em>,<br />
          in one workshop in Horten.
        </h2>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-1">
            <div className="space-y-6 text-[17px] leading-[1.7] text-ink-soft">
              <p>
                Lilaas was founded in {brand.founded} by Jan Lilaas. Today we
                are {brand.employees} people — mechanics, electronics engineers,
                and software developers — working under one roof on
                Kongeveien 75 in Horten, forty kilometres south of Oslo.
              </p>
              <p>
                About {brand.exportShare}% of what we make leaves the country.
                Most of it is installed on bridges built by the world's leading
                shipyards and system integrators. The remaining work is
                precision mechanics for defence, medicine, and scientific
                research — including CERN's Large Hadron Collider.
              </p>
              <p>
                We design, engineer, and produce everything in-house. It is
                slower than outsourcing. It is how we solve the problems other
                suppliers cannot.
              </p>
            </div>

            <blockquote className="mt-12 max-w-xl border-l-2 border-brass pl-6">
              <p className="font-display text-2xl italic leading-snug text-ink lg:text-3xl">
                "{brand.ceoQuote}"
              </p>
              <footer className="mt-4 text-sm text-mute">
                — {brand.ceo}, Managing Director
              </footer>
            </blockquote>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Image
              src={images.factory}
              alt="Lilaas production floor in Horten, Norway"
              width={1024}
              height={683}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full"
              unoptimized
            />
            <p className="mt-4 text-sm text-mute">
              Production floor, Kongeveien 75, Horten.
            </p>
          </div>
        </div>
      </div>

      <HeritageStrip />
    </section>
  );
}

function HeritageStrip() {
  const items: { n: string; l: string }[] = [
    { n: "1961", l: "Founded in Horten" },
    { n: "60", l: "Engineers and machinists" },
    { n: "50%", l: "Exported worldwide" },
    { n: "1000s", l: "Vessels under way" },
  ];
  return (
    <div className="border-y border-line bg-paper-2">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-line px-6 lg:grid-cols-4 lg:px-12">
        {items.map((it) => (
          <div key={it.l} className="px-4 py-10 first:pl-0 last:pr-0 lg:py-16">
            <div className="font-display text-5xl font-normal leading-none tracking-[-0.03em] text-ink lg:text-[88px]">
              {it.n}
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.18em] text-ink/55">
              {it.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
