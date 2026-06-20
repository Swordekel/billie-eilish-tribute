import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Counter } from "./Counter";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll('.word');
    
    // Set initial opacity
    gsap.set(words, { opacity: 0.1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Pin for 1.5x screen height
        pin: true,
        scrub: 1,
      },
    });

    tl.to(words, {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const text = "A generational voice redefining modern pop. Blending dark, intimate lyricism with experimental production, Billie Eilish creates sonic landscapes that are as haunting as they are beautiful.";
  const words = text.split(" ");

  return (
    <section 
      id="about"
      ref={containerRef} 
      className="relative flex h-screen w-full items-center justify-center bg-[#0C0C0C] px-6 py-24 md:px-24"
    >
      <div className="mx-auto max-w-5xl">
        <p 
          ref={textRef} 
          className="font-space-grotesk text-3xl font-medium leading-tight md:text-5xl lg:text-7xl"
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em] text-[#F4F4F4]">
              {word === "dark," || word === "haunting" ? (
                <span className="text-[#B6FF1E]">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </p>

        {/* Stats counter, could animate based on same scroll trigger */}
        <div className="mt-24 flex flex-wrap gap-12 border-t border-white/10 pt-12">
          {[
            { to: 9, suffix: "", label: "Grammys" },
            { to: 2, suffix: "", label: "Oscars" },
            { to: 50, suffix: "+", label: "Billion Streams" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Counter
                to={stat.to}
                suffix={stat.suffix}
                className="font-anton text-4xl text-[#B6FF1E] md:text-6xl"
              />
              <span className="font-space-grotesk text-sm uppercase tracking-widest text-[#777]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
