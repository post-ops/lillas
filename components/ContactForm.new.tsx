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
    "w-full rounded-md border border-white/10 bg-[#0b0e14] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-orange/60 focus:bg-[#0f131c]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-white/60">
            Name
          </label>
          <input id="name" name="name" type="text" required className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-white/60">
            Company
          </label>
          <input id="company" name="company" type="text" className={field} placeholder="Your company" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/60">
          Email
        </label>
        <input id="email" name="email" type="email" required className={field} placeholder="you@company.com" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-white/60">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={field}
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-md bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
      >
        Send inquiry
        <span aria-hidden="true">→</span>
      </button>
      {sent && (
        <p className="text-sm text-white/60">
          Your email client should open. If nothing happens, write to{" "}
          <a href={`mailto:${brand.email}`} className="text-orange hover:underline">
            {brand.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
