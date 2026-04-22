'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, brand, images } from "@/lib/config";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.1, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-orange/10 bg-[#05070d]/90 backdrop-blur-xl shadow-[0_4px_40px_rgba(249,132,12,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        {/* Logo + LED indicator */}
        <a
          href="/"
          className="group flex items-center gap-3"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActive("");
            }
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-orange opacity-75" />
            <span className="h-2 w-2 rounded-full bg-orange shadow-orange" />
          </span>
          <div className="flex items-center">
            <img
              src={images.logo}
              alt="Lilaas"
              className="h-7 w-auto brightness-110"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange shadow-orange">
                <span className="text-sm font-black text-white">L</span>
              </span>
              <span className="text-xl font-bold text-white">{brand.name}</span>
            </div>
          </div>
          <span className="mono hidden text-[10px] tracking-[0.25em] text-orange/50 transition-colors group-hover:text-orange md:inline">
            · AS · NO
          </span>
        </a>

        {/* Nav links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/5 bg-[#0a0d14]/80 px-2 py-1.5 backdrop-blur-md lg:flex">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setActive(id)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                  active === id
                    ? "text-white"
                    : "text-secondary hover:text-white"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-orange/20 border border-orange/40"
                    transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  />
                )}
                <span className="relative">{label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <span className="mono hidden text-[10px] tracking-[0.3em] text-orange/50 md:inline">
            +47 416 33 000
          </span>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-xs font-bold text-white shadow-orange transition-all hover:bg-orange-dark hover:shadow-orange-lg hover:scale-[1.04]"
          >
            Get in touch
          </a>

          {/* Mobile toggle */}
          <button
            className="flex flex-col gap-1.5 rounded-full border border-white/10 bg-[#0a0d14]/70 p-3 backdrop-blur-md lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              className="block h-0.5 w-5 bg-white origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block h-0.5 w-5 bg-white"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              className="block h-0.5 w-5 bg-white origin-center"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/5 bg-[#05070d]/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-5">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => { setActive(id); setMenuOpen(false); }}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      active === id
                        ? "bg-orange/10 text-white"
                        : "text-secondary hover:bg-white/4 hover:text-white"
                    }`}
                  >
                    {label}
                    <span className="mono text-[10px] text-orange/50">→</span>
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full bg-orange px-5 py-3 text-center text-sm font-bold text-white shadow-orange"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
