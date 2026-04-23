import { Reveal } from "./ui/Reveal";

const CLIENTS = [
  "Kongsberg Maritime",
  "Wärtsilä",
  "CERN",
  "DNV",
  "Rolls-Royce Marine",
  "ABB Marine",
  "Ulstein Group",
  "Havyard",
  "Siemens Energy",
  "Schottel",
];

export default function Clients() {
  return (
    <section id="clients" className="relative overflow-hidden border-t border-border py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-0 mesh-gradient" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
            Clients & partners
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-[72px]">
            Trusted by the <span className="gradient-text">world's leading</span> integrators.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-paper-soft">
            Lilaas levers serve the world's top system integrators, shipyards,
            and research institutions — on vessels in every major flag state,
            and on instruments at CERN.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="relative mt-16">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink to-transparent" />
          <div className="marquee flex w-max items-center gap-14 py-6">
            {[...CLIENTS, ...CLIENTS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-3xl font-black tracking-tight text-paper/55 transition-colors hover:text-paper lg:text-5xl"
              >
                {name}
                <span className="ml-14 text-orange/40">·</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
