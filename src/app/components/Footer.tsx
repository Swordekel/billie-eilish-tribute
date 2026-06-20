import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { AnimatedHeading } from "./AnimatedHeading";

// Portfolio credit — set CREATOR_URL to your site (leave "" for no link).
const CREATOR = "Swordekel";
const CREATOR_URL = "https://sword-portfolio.vercel.app/";

// Official Billie Eilish profiles
const socials = [
  { label: "Instagram", href: "https://www.instagram.com/billieeilish/" },
  { label: "Twitter", href: "https://x.com/billieeilish" },
  { label: "Spotify", href: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH" },
  { label: "YouTube", href: "https://www.youtube.com/@BillieEilish" },
];

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#070707] pt-32 pb-12">
      {/* Newsletter CTA */}
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-anton text-6xl uppercase tracking-tighter text-[#F4F4F4] md:text-9xl">
          <AnimatedHeading parts={[{ text: "Stay " }, { text: "Close", accent: true }]} />
        </h2>
        <form 
          className="mx-auto mt-12 flex max-w-lg items-center border-b-2 border-white/20 pb-4 transition-colors focus-within:border-[#B6FF1E]"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="w-full bg-transparent font-space-grotesk text-sm tracking-widest text-[#F4F4F4] outline-none placeholder:text-[#777]"
          />
          <button type="submit" className="text-[#B6FF1E] transition-transform hover:translate-x-2">
            <ArrowRight />
          </button>
        </form>
      </div>

      {/* Infinite Marquee */}
      <div className="mt-32 flex w-full overflow-hidden border-y border-white/10 py-6">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="mx-8 font-anton text-8xl uppercase text-[#F4F4F4] opacity-10"
            >
              BILLIE EILISH
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:gap-0">
        <div className="flex gap-6 font-space-grotesk text-sm uppercase tracking-widest text-[#777]">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Billie Eilish on ${social.label}`}
              className="transition-colors hover:text-[#B6FF1E]"
            >
              {social.label}
            </a>
          ))}
        </div>
        <p className="font-space-grotesk text-xs tracking-widest text-[#777]">
          UNOFFICIAL FAN-MADE PROJECT &copy; {new Date().getFullYear()}
        </p>
      </div>

      {/* Creator credit */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center gap-1.5 border-t border-white/10 px-6 pt-8 text-center">
        <p className="font-space-grotesk text-xs uppercase tracking-[0.25em] text-[#777]">
          Designed &amp; built by{" "}
          {CREATOR_URL ? (
            <a
              href={CREATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#F4F4F4] transition-colors hover:text-[#B6FF1E]"
            >
              {CREATOR}
            </a>
          ) : (
            <span className="font-medium text-[#F4F4F4]">{CREATOR}</span>
          )}
        </p>
        <p className="font-space-grotesk text-[10px] uppercase tracking-[0.3em] text-[#555]">
          Front-end portfolio · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
