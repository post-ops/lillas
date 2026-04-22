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
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", company: "", message: "" });
    }, 1500);
  };

  const inputClass =
    "w-full rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-secondary/40 outline-none backdrop-blur-sm transition-all duration-200 focus:border-orange/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-orange/20";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28"
      style={{ background: "linear-gradient(160deg, #0c0e15 0%, #0e1020 50%, #0c0e15 100%)" }}
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-orange/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-[400px] w-[400px] rounded-full bg-orange/4 blur-[100px]" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange">Contact</p>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            Let us solve your{" "}
            <span className="gradient-text">technical challenge.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-secondary">
            Need control systems, precision components or custom solutions?
            We specialise in solving what others can&apos;t.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              {[
                { icon: "📍", label: "Address", value: brand.location },
                { icon: "📧", label: "Email",   value: brand.email },
                { icon: "📞", label: "Phone",   value: `${brand.phone}  (${brand.phoneHours})` },
              ].map(({ icon, label, value }) => (
                <div key={label} className="glass glow-border flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:border-orange/30">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange/20 bg-orange/10 text-lg">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-secondary/50">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/5 relative group">
              <img
                src={images.press}
                alt="Lilaas Finansavisen"
                className="h-52 w-full object-cover brightness-[0.6] transition-all duration-700 group-hover:brightness-[0.75] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-xs font-bold uppercase tracking-wider text-orange/70">As seen in</p>
                <p className="text-sm font-semibold text-white">Finansavisen</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🏭", text: "In-house production" },
                { icon: "🎯", text: "Since 1961" },
                { icon: "🌍", text: "50% exported" },
              ].map(({ icon, text }) => (
                <div key={text} className="glass rounded-xl p-3 text-center">
                  <p className="text-xl">{icon}</p>
                  <p className="mt-1 text-[10px] font-semibold text-secondary/60">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="relative overflow-hidden rounded-3xl p-8"
              style={{
                background: "rgba(22, 25, 38, 0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-orange/6 blur-3xl" />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-20 text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-orange/30 bg-orange/10 text-4xl">✅</div>
                  <h3 className="text-2xl font-bold text-white">Message sent!</h3>
                  <p className="text-secondary">We&apos;ll get back to you shortly.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 rounded-full border border-orange/30 px-6 py-2 text-sm font-semibold text-orange transition-all hover:bg-orange/10"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                  <div className="mb-6">
                    <p className="text-lg font-bold text-white">Send us a message</p>
                    <p className="mt-1 text-xs text-secondary/50">We typically respond within 24 hours.</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-secondary/50">Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required className={inputClass} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-secondary/50">Company</label>
                      <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Ltd" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-secondary/50">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required className={inputClass} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-secondary/50">What do you need? *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe your project or enquiry..." required rows={5} className={inputClass + " resize-none"} />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative w-full overflow-hidden rounded-xl bg-orange py-4 text-sm font-bold text-white shadow-orange transition-all hover:bg-orange-dark hover:shadow-orange-lg disabled:opacity-60"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending...
                        </>
                      ) : "Send message →"}
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-dark to-orange-light transition-transform duration-500 group-hover:translate-x-0" />
                  </motion.button>

                  <p className="text-center text-xs text-secondary/40">
                    Or call us directly:{" "}
                    <a href={`tel:${brand.phone}`} className="text-secondary hover:text-orange transition-colors">{brand.phone}</a>
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
