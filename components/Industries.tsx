import Image from "next/image";
import { images } from "@/lib/config";

const INDUSTRIES = [
  {
    n: "01",
    title: "Maritime & Offshore",
    share: "75% of revenue",
    copy:
      "Control levers and joysticks on fishing boats, ferries, offshore supply vessels, tankers, and cruise ships — through the world's leading shipyards and system integrators.",
    image: images.boatAtSea,
  },
  {
    n: "02",
    title: "Defence",
    share: "Military-certified",
    copy:
      "Precision components with the strictest reliability and documentation requirements. Delivered to defence primes in Europe and beyond.",
    image: images.factory,
  },
  {
    n: "03",
    title: "Medical",
    share: "Traceable quality",
    copy:
      "Precision mechanics for medical equipment with full traceability and ISO-13485 quality documentation.",
    image: images.hospitals,
  },
  {
    n: "04",
    title: "Science & Research",
    share: "CERN-verified",
    copy:
      "Precision components for science — including the Large Hadron Collider at CERN, where Lilaas parts have been in operation for over a decade.",
    image: images.precision,
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-40">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
          Industries
        </p>
        <h2 className="font-display mt-6 max-w-4xl text-4xl font-normal leading-[1.02] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[72px]">
          Four industries.<br />
          <em className="italic">One engineering team.</em>
        </h2>

        <ul className="mt-20 divide-y divide-line border-y border-line">
          {INDUSTRIES.map((it) => (
            <li key={it.title}>
              <div className="group grid items-center gap-8 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14">
                <span className="font-display col-span-1 text-sm text-ink/45 lg:col-span-1">
                  ({it.n})
                </span>
                <h3 className="font-display col-span-11 text-3xl font-normal leading-tight text-ink sm:text-4xl lg:col-span-4 lg:text-[44px]">
                  {it.title}
                </h3>
                <p className="col-span-11 text-[15px] leading-[1.7] text-ink-soft lg:col-span-5 lg:col-start-6">
                  {it.copy}
                </p>
                <span className="col-span-11 text-xs uppercase tracking-[0.18em] text-ink/55 lg:col-span-2 lg:text-right">
                  {it.share}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-20 overflow-hidden">
          <Image
            src={images.boatAtSea}
            alt="Maritime operations"
            width={1600}
            height={600}
            sizes="100vw"
            className="h-auto w-full"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
