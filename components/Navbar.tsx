"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { brand, navLinks } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-paper">
          Lilaas
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`text-sm transition-colors ${
                scrolled ? "text-ink/70 hover:text-ink" : "text-paper/80 hover:text-paper"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
            className={`hidden text-sm transition-colors md:inline ${
              scrolled ? "text-ink/70 hover:text-ink" : "text-paper/80 hover:text-paper"
            }`}
          >
            {brand.phone}
          </a>
          <a
            href="#contact"
            className={`hidden items-center gap-2 border-b pb-0.5 text-sm font-medium transition-opacity hover:opacity-70 md:inline-flex ${
              scrolled ? "border-ink text-ink" : "border-paper text-paper"
            }`}
          >
            Request a quote
            <span aria-hidden="true">→</span>
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex flex-col gap-1.5 lg:hidden"
          >
            <span className={`block h-0.5 w-6 ${scrolled ? "bg-ink" : "bg-paper"}`} />
            <span className={`block h-0.5 w-6 ${scrolled ? "bg-ink" : "bg-paper"}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-6 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center gap-2 self-start border-b border-ink pb-0.5 text-base font-medium text-ink"
            >
              Request a quote →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
