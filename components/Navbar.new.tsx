"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { brand, images, navLinks } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? "border-b border-white/5 bg-[#0b0e14]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={images.logo}
            alt="Lilaas"
            width={120}
            height={28}
            className="h-7 w-auto brightness-110"
            unoptimized
          />
          <span className="text-base font-semibold text-white">Lilaas</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
            className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white md:inline"
          >
            {brand.phone}
          </a>
          <a
            href="#contact"
            className="hidden rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-dark md:inline-flex"
          >
            Request a quote
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex flex-col gap-1.5 rounded-md border border-white/10 bg-white/5 p-2.5 lg:hidden"
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-[#0b0e14] px-6 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-orange px-3 py-3 text-center text-sm font-semibold text-white"
            >
              Request a quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
