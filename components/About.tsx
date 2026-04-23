import Image from "next/image";
import { brand, images, stats } from "@/lib/config";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";

export default function About() {
  return (
    <section id="about" className="relative border-t border-border py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-0 mesh-gradient" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
            About Lilaas
          </p>
          <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-[72px]">
            Sixty-five years of <span className="gradient-text">maritime control</span> engineering.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal delay={0.05} className="lg:col-span-7">
            <div className="space-y-5 text-[17px] leading-[1.75] text-paper-soft">
              <p>
                Lilaas was founded in {brand.founded} by Jan Lilaas in Horten, Norway.
                Today the company employs {brand.employees} people across mechanics,
                electronics, and software — all disciplines under one roof.
                Roughly {brand.exportShare}% of production is exported, most of
                it through the world's leading system integrators and shipyards.
              </p>
              <p>
                The business is split across {brand.revenueShare.maritime}% maritime
                — control levers, joysticks, and bridge consoles — and{" "}
                {brand.revenueShare.precision}% precision mechanics for defence,
                medical, and scientific equipment. We solve problems other
                suppliers cannot.
              </p>
            </div>

            <div className="mt-10 glass glow-border rounded-2xl p-8">
              <p className="text-[19px] italic leading-relaxed text-paper">
                "{brand.ceoQuote}"
              </p>
              <p className="mt-4 text-sm text-mute">
                — {brand.ceo}, Managing Director
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <Image
                src={images.factory}
                alt="Lilaas production floor in Horten, Norway"
                width={1024}
                height={683}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-auto w-full"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-light">
                  Kongeveien 75, Horten
                </p>
                <p className="text-sm text-paper/85">Production floor.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <RevealStagger className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div className="glass glow-border rounded-xl p-6">
                <div className="text-4xl font-black text-paper">
                  {s.value}
                  {s.label === "Exported globally" && <span className="text-orange">%</span>}
                </div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-mute">
                  {s.label}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
