import { brand } from "@/lib/config";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-40">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
          Contact
        </p>
        <h2 className="font-display mt-6 max-w-4xl text-4xl font-normal leading-[1.02] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[72px]">
          Talk to our<br />
          <em className="italic">engineering team.</em>
        </h2>

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-24">
          <address className="not-italic lg:col-span-5">
            <dl className="space-y-10">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-ink/55">
                  Office
                </dt>
                <dd className="mt-3 text-lg text-ink">{brand.location}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-ink/55">
                  Phone
                </dt>
                <dd className="mt-3 text-lg">
                  <a
                    href={`tel:${brand.phone.replace(/\s/g, "")}`}
                    className="text-ink transition-opacity hover:opacity-70"
                  >
                    {brand.phone}
                  </a>
                  <span className="ml-3 text-sm text-mute">({brand.phoneHours})</span>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-ink/55">
                  Email
                </dt>
                <dd className="mt-3 text-lg">
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-ink transition-opacity hover:opacity-70"
                  >
                    {brand.email}
                  </a>
                </dd>
              </div>
            </dl>
          </address>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
