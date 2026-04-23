const INDUSTRIES = [
  {
    title: "Maritime & Offshore",
    share: "75% of revenue",
    description:
      "Control levers and joysticks on fishing boats, ferries, supply vessels, tankers, and cruise ships.",
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
    title: "Defence",
    share: "Military-certified",
    description:
      "Precision components with the strictest reliability and documentation requirements.",
    cert: "ISO 9001",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Medical",
    share: "Traceable quality",
    description:
      "Precision components for medical equipment with full traceability and quality documentation.",
    cert: "ISO 13485",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 6v12M6 12h12" strokeLinecap="round" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
  },
  {
    title: "Science & Research",
    share: "CERN-verified",
    description:
      "Precision components for space and scientific research — including CERN's Large Hadron Collider.",
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
    <section id="industries" className="border-t border-white/5 bg-[#0b0e14] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            Industries
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Four industries. One engineering team.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((i) => (
            <div
              key={i.title}
              className="flex flex-col gap-4 rounded-lg border border-white/5 bg-[#13161f] p-6 transition-colors hover:border-white/15"
            >
              <div className="h-10 w-10 text-orange">{i.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-white">{i.title}</h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-white/45">
                  {i.share}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{i.description}</p>
              <span className="mt-auto inline-block rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/65">
                {i.cert}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
