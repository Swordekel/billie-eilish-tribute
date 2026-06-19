import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "About", id: "about" },
  { label: "Music", id: "music" },
  { label: "Tour", id: "tour" },
  { label: "Gallery", id: "gallery" },
];

type LenisWindow = Window & { __lenis?: { scrollTo: (t: HTMLElement | number, o?: object) => void; stop: () => void; start: () => void } };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as LenisWindow).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: 0 });
  else el.scrollIntoView({ behavior: "smooth" });
}

function MagneticNavLink({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    setPosition({ x: (clientX - (left + width / 2)) * 0.2, y: (clientY - (top + height / 2)) * 0.2 });
  };

  return (
    <motion.a
      ref={ref}
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToId(id);
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative inline-block py-2 px-4 transition-colors hover:text-[#B6FF1E]"
      data-cursor="hover"
    >
      {children}
      <span className="absolute bottom-1 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-[#B6FF1E] transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
    </motion.a>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as LenisWindow).__lenis;
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => scrollToId(id), menuOpen ? 250 : 0);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 z-50 w-full transition-colors duration-500 ${
          scrolled && !menuOpen ? "bg-[#070707]/80 backdrop-blur-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              (window as LenisWindow).__lenis?.scrollTo(0);
            }}
            className="font-anton text-2xl tracking-wider text-[#F4F4F4]"
            data-cursor="hover"
          >
            B<span className="text-[#B6FF1E]">E</span>
          </a>

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-4 font-space-grotesk text-sm font-medium uppercase tracking-widest text-[#F4F4F4]">
              {links.map((link) => (
                <li key={link.id}>
                  <MagneticNavLink id={link.id}>{link.label}</MagneticNavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            className="z-50 flex flex-col gap-[5px] p-2 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-cursor="hover"
          >
            <span className={`block h-[2px] w-7 bg-[#F4F4F4] transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-7 bg-[#F4F4F4] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-7 bg-[#F4F4F4] transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#070707] px-8 md:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  className="font-anton text-6xl uppercase leading-tight text-[#F4F4F4] transition-colors hover:text-[#B6FF1E]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
