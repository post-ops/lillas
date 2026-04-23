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
    <section id="clients" className="border-t border-white/5 bg-[#0b0e14] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            Clients
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Trusted by leading marine and science companies.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Lilaas' levers serve the world's top system integrators, shipyards,
            and research institutions — on vessels in every major flag state,
            and on instruments at CERN.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/5 bg-white/5 sm:grid-cols-4">
          {CLIENTS.map((name) => (
            <li
              key={name}
              className="flex h-24 items-center justify-center bg-[#0b0e14] px-6 text-center text-base font-semibold text-white/75 transition-colors hover:text-white"
            >
              {name}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-white/40">
          Non-exhaustive list. References available on request.
        </p>
      </div>
    </section>
  );
}
