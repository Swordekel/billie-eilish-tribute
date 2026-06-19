import { useEffect, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

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

    const elements = containerRef.current.querySelectorAll('.gallery-item');
    
    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0 },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="gallery" className="w-full bg-[#0C0C0C] py-32 px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]" ref={containerRef}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
          <Masonry gutter="2rem">
            {images.map((src, i) => (
              <div key={i} className="gallery-item overflow-hidden bg-[#070707]">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className="h-full w-full"
                >
                  <img
                    src={src}
                    alt={`Billie Eilish ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="block w-full mix-blend-luminosity transition-all duration-500 hover:mix-blend-normal"
                  />
                </motion.div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}
