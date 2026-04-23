const CLIENTS = [
  "Kongsberg Maritime",
  "Wärtsilä",
  "CERN",
  "DNV",
  "Rolls-Royce Marine",
  "ABB Marine",
  "Ulstein Group",
  "Havyard",
];

export default function Clients() {
  return (
    <section id="clients" className="relative bg-paper-2">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-40">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
          Clients & partners
        </p>
        <h2 className="font-display mt-6 max-w-4xl text-4xl font-normal leading-[1.02] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[72px]">
          Trusted by the<br />
          <em className="italic">world's leading integrators.</em>
        </h2>

        <ul className="mt-16 grid gap-x-12 gap-y-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((name) => (
            <li
              key={name}
              className="font-display border-b border-line py-6 text-2xl font-normal text-ink/90 lg:text-3xl"
            >
              {name}
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-md text-sm leading-[1.6] text-ink-soft">
          Non-exhaustive list. References and case studies available on request.
        </p>
      </div>
    </section>
  );
}
