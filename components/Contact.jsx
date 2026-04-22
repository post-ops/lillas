'use client';
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { brand, images } from "@/lib/config";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Build a mailto so the message always reaches Lilaas, even without a backend.
    const subject = encodeURIComponent(
      `Website enquiry — ${form.company || form.name || "new contact"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.company ? `Company: ${form.company}` : null,
        "",
        form.message,
      ].filter(Boolean).join("\n")
    );
    const mailto = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      window.location.href = mailto;
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", company: "", message: "" });
    }, 600);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-secondary/40 outline-none backdrop-blur-sm transition-all duration-200 focus:border-orange/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-orange/20";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 sm:py-32"
      style={{ background: "linear-gradient(160deg, #05070d 0%, #0a0d18 50%, #05070d 100%)" }}
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-orange/6 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-[400px] w-[400px] rounded-full bg-orange/4 blur-[120px]" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-3xl"
        >
          <p className="hud-label mb-4">Contact · Channel open</p>
          <h2 className="text-4xl font-black leading-[1.02] text-white sm:text-6xl">
            Let us solve your{" "}
            <span className="gradient-text">technical challenge.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base text-secondary">
            Control systems, precision components, or a custom solution —
            our engineers in Horten respond within one business day.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
          {/* LEFT: contact card + facts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            {/* Contact lines */}
            <div className="space-y-3">
              {[
                { icon: "📍", label: "Address", value: brand.location,                                    sub: "Main factory · Headquarters" },
                { icon: "📧", label: "Email",   value: brand.email,                                       sub: "Answered by engineering, not marketing", href: `mailto:${brand.email}` },
                { icon: "📞", label: "Phone",   value: brand.phone,                                       sub: `Mon–Fri ${brand.phoneHours} CET`,          href: `tel:${brand.phone.replace(/\s/g, "")}` },
              ].map(({ icon, label, value, sub, href }) => {
                const Inner = (
                  <div className="glass glow-border group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:border-orange/40">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange/25 bg-orange/10 text-xl transition-transform group-hover:scale-110">
                      {icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="hud-label opacity-70">{label}</p>
                      <p className="mt-0.5 truncate text-sm font-semibold text-white">{value}</p>
                      <p className="mt-0.5 text-[11px] text-secondary/60">{sub}</p>
                    </div>
                    {href && (
                      <span className="mono text-xs text-orange opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">
                        →
                      </span>
                    )}
                  </div>
                );
                return href ? (
                  <a key={label} href={href}>{Inner}</a>
                ) : (
                  <div key={label}>{Inner}</div>
                );
              })}
            </div>

            {/* Press card */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/5">
              <img
                src={images.press}
                alt="Lilaas · Finansavisen"
                className="h-56 w-full object-cover brightness-[0.55] transition-all duration-700 group-hover:brightness-75 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="hud-bracket-tl" style={{ margin: 12 }} />
              <div className="hud-bracket-tr" style={{ margin: 12 }} />
              <div className="hud-bracket-bl" style={{ margin: 12 }} />
              <div className="hud-bracket-br" style={{ margin: 12 }} />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="hud-label opacity-80">As seen in</p>
                  <p className="mt-1 text-base font-bold text-white">Finansavisen</p>
                </div>
                <span className="mono rounded-full border border-orange/30 bg-primary/70 px-3 py-1 text-[10px] tracking-widest text-orange/80">
                  PRESS
                </span>
              </div>
            </div>

            {/* Small fact row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🏭", text: "In-house production" },
                { icon: "📜", text: `Since ${brand.founded}` },
                { icon: "🌍", text: `${brand.exportShare}% exported` },
              ].map(({ icon, text }) => (
                <div key={text} className="glass rounded-xl p-3 text-center">
                  <p className="text-xl">{icon}</p>
                  <p className="mt-1 text-[10px] font-semibold text-secondary/70">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
              style={{
                background: "rgba(12, 16, 28, 0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 30px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="hud-bracket-tl" />
              <div className="hud-bracket-tr" />
              <div className="hud-bracket-bl" />
              <div className="hud-bracket-br" />

              <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-orange/10 blur-3xl" />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-24 text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-orange/30 bg-orange/10 text-4xl">
                    ✅
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message transmitted</h3>
                  <p className="max-w-sm text-sm text-secondary">
                    Your email client should now open with the message addressed
                    to <span className="text-orange">{brand.email}</span>.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 rounded-full border border-orange/30 px-6 py-2 text-sm font-semibold text-orange transition-all hover:bg-orange/10"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="hud-label mb-1">Open channel</p>
                      <p className="text-lg font-bold text-white">Send us a message</p>
                    </div>
                    <span className="mono rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-[10px] tracking-widest text-orange">
                      ≤ 24H REPLY
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="hud-label mb-1.5 block opacity-70">Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" required className={inputClass} />
                    </div>
                    <div>
                      <label className="hud-label mb-1.5 block opacity-70">Company</label>
                      <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company AS" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="hud-label mb-1.5 block opacity-70">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" required className={inputClass} />
                  </div>

                  <div>
                    <label className="hud-label mb-1.5 block opacity-70">What do you need? *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe your vessel, application or enquiry..." required rows={5} className={inputClass + " resize-none"} />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full overflow-hidden rounded-xl bg-orange py-4 text-sm font-bold text-white shadow-orange transition-all hover:bg-orange-dark hover:shadow-orange-lg disabled:opacity-60"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Transmitting...
                        </>
                      ) : "Send message →"}
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-dark via-orange to-orange-light transition-transform duration-500 group-hover:translate-x-0" />
                  </motion.button>

                  <p className="text-center text-xs text-secondary/50">
                    Or call direct:{" "}
                    <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="mono text-secondary transition-colors hover:text-orange">
                      {brand.phone}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
