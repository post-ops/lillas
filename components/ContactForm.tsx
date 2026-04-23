"use client";
import { useState, type FormEvent } from "react";
import { brand } from "@/lib/config";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) || "";
    const company = (data.get("company") as string) || "";
    const email = (data.get("email") as string) || "";
    const message = (data.get("message") as string) || "";

    const subject = `Inquiry from ${name}${company ? ` (${company})` : ""}`;
    const body = [
      `From: ${name}`,
      company ? `Company: ${company}` : null,
      `Email: ${email}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-border bg-ink/60 px-4 py-3.5 text-sm text-paper placeholder-mute outline-none backdrop-blur-md transition-colors focus:border-orange/60 focus:bg-ink-2";
  const labelCls = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-orange/80";

  return (
    <form onSubmit={handleSubmit} className="glass glow-border space-y-5 rounded-2xl p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Company
          </label>
          <input id="company" name="company" type="text" className={field} placeholder="Your company" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className={labelCls}>
          Email
        </label>
        <input id="email" name="email" type="email" required className={field} placeholder="you@company.com" />
      </div>
      <div>
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={field + " resize-none"}
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-bold text-ink shadow-orange-lg transition-transform hover:scale-[1.03]"
      >
        Send inquiry
        <span aria-hidden="true">→</span>
      </button>
      {sent && (
        <p className="text-sm text-paper-soft">
          Your email client should open. If nothing happens, write to{" "}
          <a href={`mailto:${brand.email}`} className="text-orange hover:underline">
            {brand.email}
          </a>.
        </p>
      )}
    </form>
  );
}
