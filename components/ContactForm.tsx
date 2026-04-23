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
    "w-full border-b border-ink/25 bg-transparent px-0 py-3 text-[15px] text-ink placeholder-ink/35 outline-none transition-colors focus:border-ink";
  const labelCls = "mb-2 block text-[11px] uppercase tracking-[0.18em] text-ink/55";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
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
          rows={4}
          className={field + " resize-none"}
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 border-b border-ink pb-0.5 text-base font-medium text-ink transition-opacity hover:opacity-70"
      >
        Send inquiry
        <span aria-hidden="true">→</span>
      </button>
      {sent && (
        <p className="text-sm text-mute">
          Your email client should open. If nothing happens, write to{" "}
          <a href={`mailto:${brand.email}`} className="underline">
            {brand.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
