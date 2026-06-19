import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !imageRef.current) return;

    // Initial reveal animation (after preloader)
    const tl = gsap.timeline({ delay: 2.2 }); // Wait for preloader to finish
    
    // Split text logic manually for lines
    const lines = textRef.current.querySelectorAll('.hero-line');
    
    tl.fromTo(
      lines,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      }
    ).fromTo(
      imageRef.current,
      { scale: 1.1, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 0.8, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
      "-=1"
    );

    // Parallax on scroll
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(textRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#070707]"
    >
      {/* Background Image Parallax */}
      <div 
        ref={imageRef} 
        className="absolute inset-0 z-0 h-[120%] w-full opacity-80"
        style={{ top: "-10%" }}
      >
        <img
          src="/images/be-hero.jpg"
          alt="Billie Eilish performing live"
          className="h-full w-full object-cover object-[50%_35%] mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/30 via-transparent to-[#070707]" />
      </div>

      {/* Main Title */}
      <h1 
        ref={textRef} 
        className="z-10 flex flex-col items-center justify-center text-center font-anton text-[12vw] leading-[0.8] uppercase tracking-tighter text-[#F4F4F4] mix-blend-difference"
      >
        <span className="hero-line block overflow-hidden">
          <span className="block">Billie</span>
        </span>
        <span className="hero-line block overflow-hidden text-[#B6FF1E]">
          <span className="block">Eilish</span>
        </span>
      </h1>

      {/* Scroll Cue */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4 opacity-50 mix-blend-difference">
        <span className="font-space-grotesk text-xs uppercase tracking-widest text-white">Scroll</span>
        <div className="flex h-10 w-px flex-col items-center overflow-hidden bg-white/20">
          <motion.div
            className="h-full w-full bg-[#B6FF1E]"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </div>

      {/* Editorial corner meta */}
      <motion.div
        className="absolute bottom-10 left-6 z-20 hidden sm:block md:left-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8 }}
      >
        <p className="font-space-grotesk text-[10px] uppercase tracking-[0.3em] text-[#777]">Latest album</p>
        <p className="font-space-grotesk text-sm uppercase tracking-widest text-[#F4F4F4]">Hit Me Hard and Soft — 2024</p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-6 z-20 hidden text-right sm:block md:right-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        <p className="font-space-grotesk text-[10px] uppercase tracking-[0.3em] text-[#777]">Fan tribute</p>
        <p className="font-space-grotesk text-sm uppercase tracking-widest text-[#F4F4F4]">Est. Los Angeles '01</p>
      </motion.div>
    </section>
  );
}
