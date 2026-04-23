"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { brand, images, navLinks } from "@/lib/config";

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
          ? "border-b border-border bg-ink/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src={images.logo}
            alt="Lilaas"
            width={120}
            height={28}
            className="h-7 w-auto brightness-110"
            unoptimized
          />
          <span className="text-base font-black text-paper">Lilaas</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-ink-2/70 px-2 py-1.5 backdrop-blur-md lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-full px-4 py-1.5 text-xs font-semibold text-paper-soft transition-colors hover:bg-white/5 hover:text-paper"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
            className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-orange/60 transition-colors hover:text-orange md:inline"
          >
            {brand.phone}
          </a>
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-xs font-bold text-ink shadow-orange transition-transform hover:scale-[1.04] md:inline-flex"
          >
            Get in touch
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex flex-col gap-1.5 rounded-full border border-border bg-ink-2/70 p-3 backdrop-blur-md lg:hidden"
          >
            <span className="block h-0.5 w-5 bg-paper" />
            <span className="block h-0.5 w-5 bg-paper" />
            <span className="block h-0.5 w-5 bg-paper" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-ink/95 px-6 pb-6 pt-3 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-paper-soft transition-colors hover:bg-white/5 hover:text-paper"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-bold text-ink"
            >
              Get in touch →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
