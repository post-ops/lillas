'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, brand, images } from "@/lib/config";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0d14]/92 backdrop-blur-md shadow-[0_2px_30px_rgba(249,132,12,0.12)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-16">
        <a
          href="/"
          className="flex items-center"
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
        >
          <img
            src={images.logo}
            alt="Lilaas"
            className="h-8 w-auto brightness-100"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className="hidden items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f9840c]">
              <span className="text-sm font-black text-white">L</span>
            </span>
            <span className="text-xl font-bold text-white">{brand.name}</span>
          </div>
        </a>

        <ul className="hidden md:flex gap-8">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setActive(id)}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  active === id ? "text-orange" : "text-secondary hover:text-white"
                } after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-orange after:transition-all after:duration-300 hover:after:w-full`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white shadow-orange transition-all duration-300 hover:bg-orange-dark hover:shadow-orange-lg hover:scale-105"
        >
          Get in touch
        </a>

        <button
          className="flex md:hidden flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="block h-0.5 w-6 bg-white origin-center" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block h-0.5 w-6 bg-white" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="block h-0.5 w-6 bg-white origin-center" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-[#0a0d14]/96 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`}
                    onClick={() => { setActive(id); setMenuOpen(false); }}
                    className="text-lg font-medium text-secondary hover:text-orange transition-colors">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact"
                  className="inline-block rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white">
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
