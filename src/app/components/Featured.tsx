import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Featured() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !captionRef.current) return;

    // Clip path reveal
    gsap.fromTo(
      containerRef.current,
      { clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)" },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      }
    );

    // Image Parallax
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Caption Parallax (moves up faster than image)
    gsap.fromTo(
      captionRef.current,
      { y: 100, opacity: 0 },
      {
        y: -100,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden bg-[#0C0C0C] md:h-screen"
    >
      <div 
        ref={imageRef} 
        className="absolute inset-0 z-0 h-[120%] w-full"
        style={{ top: "-10%" }}
      >
        <img
          src="/images/be-featured.png"
          alt="Billie Eilish performing live under red lights"
          className="h-full w-full object-cover object-center mix-blend-luminosity opacity-60"
        />
        <div className="absolute inset-0 bg-[#B6FF1E] mix-blend-overlay opacity-20" />
      </div>

      <div 
        ref={captionRef} 
        className="z-10 px-6 text-center"
      >
        <h2 className="font-anton text-5xl uppercase leading-[0.8] tracking-tighter text-[#F4F4F4] mix-blend-difference md:text-9xl">
          Raw Emotion
        </h2>
        <p className="mt-6 font-space-grotesk text-lg tracking-widest text-[#B6FF1E]">
          UNFILTERED. UNAPOLOGETIC.
        </p>
      </div>
    </section>
  );
}
