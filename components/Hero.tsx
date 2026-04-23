import Image from "next/image";
import { images } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[88svh] min-h-[600px] w-full overflow-hidden">
        <Image
          src={images.hero}
          alt="Lilaas control lever on a maritime bridge"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/60" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 lg:px-12 lg:pb-16">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-paper/85">
              Est. 1961 · Horten, Norway
            </p>
            <h1 className="font-display mt-5 max-w-5xl text-[44px] font-normal leading-[0.98] tracking-[-0.02em] text-paper sm:text-6xl lg:text-[104px]">
              Maritime control,<br />
              <em className="italic text-paper">engineered in Horten.</em>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-b border-paper pb-0.5 text-base font-medium text-paper transition-opacity hover:opacity-80"
              >
                Request a quote
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 text-base text-paper/85 transition-colors hover:text-paper"
              >
                See the range
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
