import { brand } from "@/lib/config";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-white/5 bg-[#0b0e14] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Get in touch with our engineering team.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Ask about specs, request a quote, or arrange a visit to our Horten facility.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <address className="not-italic">
            <dl className="space-y-8">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Office
                </dt>
                <dd className="mt-2 text-base text-white/85">{brand.location}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${brand.phone.replace(/\s/g, "")}`}
                    className="text-base text-white/85 transition-colors hover:text-orange"
                  >
                    {brand.phone}
                  </a>
                  <span className="ml-3 text-sm text-white/50">({brand.phoneHours})</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-base text-white/85 transition-colors hover:text-orange"
                  >
                    {brand.email}
                  </a>
                </dd>
              </div>
            </dl>
          </address>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
