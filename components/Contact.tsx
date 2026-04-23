import { brand } from "@/lib/config";
import ContactForm from "./ContactForm";
import { Reveal } from "./ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-border py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-0 mesh-ocean" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
            Contact
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-[72px]">
            Talk to our <span className="gradient-text">engineering team.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-paper-soft">
            Ask about specs, request a quote, or arrange a visit to our Horten facility.
            Typical reply within one business day.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal delay={0.05} className="lg:col-span-5">
            <div className="space-y-5">
              <div className="glass glow-border rounded-2xl p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
                  Office
                </div>
                <div className="mt-2 text-base text-paper">{brand.location}</div>
              </div>
              <div className="glass glow-border rounded-2xl p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
                  Phone
                </div>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="mt-2 inline-block text-base text-paper transition-colors hover:text-orange"
                >
                  {brand.phone}
                </a>
                <span className="ml-3 text-sm text-mute">({brand.phoneHours})</span>
              </div>
              <div className="glass glow-border rounded-2xl p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
                  Email
                </div>
                <a
                  href={`mailto:${brand.email}`}
                  className="mt-2 inline-block text-base text-paper transition-colors hover:text-orange"
                >
                  {brand.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
