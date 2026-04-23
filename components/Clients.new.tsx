import Image from "next/image";

const CLIENTS = [
  { name: "Kongsberg Maritime", file: "/logos/kongsberg.svg" },
  { name: "Wärtsilä", file: "/logos/wartsila.svg" },
  { name: "CERN", file: "/logos/cern.svg" },
  { name: "DNV", file: "/logos/dnv.svg" },
  { name: "Rolls-Royce", file: "/logos/rolls-royce.svg" },
  { name: "ABB", file: "/logos/abb.svg" },
  { name: "Ulstein", file: "/logos/ulstein.svg" },
  { name: "Havyard", file: "/logos/havyard.svg" },
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
            Lilaas' levers have served the world's top system integrators,
            shipyards, and research institutions since 1961.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/5 bg-white/5 sm:grid-cols-4">
          {CLIENTS.map((c) => (
            <div
              key={c.name}
              className="flex h-24 items-center justify-center bg-[#0b0e14] p-6 grayscale opacity-60 transition hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={c.file}
                alt={c.name}
                width={140}
                height={40}
                className="h-8 w-auto max-w-full object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
