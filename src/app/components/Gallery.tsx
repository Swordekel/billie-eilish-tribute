import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Real, CC-licensed Billie Eilish photos (credited in ATTRIBUTIONS.md).
const images = [
  "/images/be-portrait.jpg",
  "/images/be-camera.jpg",
  "/images/be-guitar.jpg",
  "/images/be-birds.png",
  "/images/be-hero.jpg",
  "/images/be-wwimf.png",
];

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".gallery-item");
    const triggers: ScrollTrigger[] = [];

    elements.forEach((el) => {
      const tween = gsap.fromTo(
        el,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0 },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      // Only kill this section's triggers (leave the page pins intact)
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="gallery" className="w-full bg-[#0C0C0C] py-32 px-6 md:px-12">
      <div ref={containerRef} className="mx-auto max-w-[1400px] columns-1 gap-8 md:columns-2 lg:columns-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="gallery-item group mb-8 overflow-hidden break-inside-avoid bg-[#070707]"
            data-cursor="hover"
          >
            <img
              src={src}
              alt={`Billie Eilish ${i + 1}`}
              decoding="async"
              className="block w-full mix-blend-luminosity transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:mix-blend-normal"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
