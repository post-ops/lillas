import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";

const INDUSTRIES = [
  {
    n: "01",
    title: "Maritime & Offshore",
    share: "75% of revenue",
    copy:
      "Control levers and joysticks on fishing boats, ferries, offshore supply vessels, tankers, and cruise ships — through the world's leading shipyards and system integrators.",
    cert: "DNV · CRS",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3v15" strokeLinecap="round" />
        <circle cx="12" cy="5" r="1.5" />
        <path d="M5 10l7 2 7-2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 15c2 3 5 5 8 5s6-2 8-5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Defence",
    share: "Military-certified",
    copy: "Precision components with the strictest reliability and documentation requirements. Delivered to defence primes across Europe.",
    cert: "ISO 9001",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Medical",
    share: "Traceable quality",
    copy: "Precision mechanics for medical equipment with full traceability and ISO-13485 quality documentation.",
    cert: "ISO 13485",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 6v12M6 12h12" strokeLinecap="round" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Science & Research",
    share: "CERN-verified",
    copy: "Precision components for the Large Hadron Collider at CERN, where Lilaas parts have been operational for over a decade.",
    cert: "CERN",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative border-t border-border py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-0 mesh-gradient" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
            Industries
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-[72px]">
            Four industries.<br />
            <span className="gradient-text">One engineering team.</span>
          </h2>
        </Reveal>

        <RevealStagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((i) => (
            <RevealItem key={i.title}>
              <div className="glass glow-border group flex h-full flex-col gap-5 rounded-2xl p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-[0.22em] text-orange">
                    ({i.n})
                  </span>
                  <span className="rounded-md border border-orange/15 bg-orange/8 px-2 py-0.5 text-[10px] font-bold tracking-widest text-orange-light">
                    {i.cert}
                  </span>
                </div>
                <div className="h-10 w-10 text-orange">{i.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-paper">{i.title}</h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">
                    {i.share}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-paper-soft">{i.copy}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
