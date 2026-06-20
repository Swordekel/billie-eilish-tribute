import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Navigation } from "./components/Navigation";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Discography } from "./components/Discography";
import { Featured } from "./components/Featured";
import { Tour } from "./components/Tour";
import { Gallery } from "./components/Gallery";
import { Marquee } from "./components/Marquee";
import { Footer } from "./components/Footer";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = "hidden";
      return;
    } else {
      document.body.style.overflow = "";
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Expose for smooth anchor navigation
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [loading]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-[#070707] min-h-screen text-[#F4F4F4] selection:bg-[#B6FF1E] selection:text-[#070707]">
      <AnimatePresence>
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <NoiseOverlay />
      <Cursor />

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-[#B6FF1E]"
        style={{ scaleX: progress }}
      />

      {!loading && (
        <>
          <Navigation />
          <main>
            <Hero />
            <About />
            <Discography />
            <Featured />
            <Marquee />
            <Tour />
            <Gallery />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
