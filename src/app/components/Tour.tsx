import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeading } from "./AnimatedHeading";

const dates = [
  { date: "SEP 29", city: "Quebec, QC", venue: "Videotron Centre" },
  { date: "OCT 01", city: "Toronto, ON", venue: "Scotiabank Arena" },
  { date: "OCT 02", city: "Toronto, ON", venue: "Scotiabank Arena" },
  { date: "OCT 04", city: "Baltimore, MD", venue: "CFG Bank Arena" },
  { date: "OCT 05", city: "Philadelphia, PA", venue: "Wells Fargo Center" },
  { date: "OCT 09", city: "Newark, NJ", venue: "Prudential Center" },
];

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative flex items-center justify-center overflow-hidden rounded-full border border-[#B6FF1E] px-6 py-3 font-space-grotesk text-sm uppercase tracking-widest text-[#B6FF1E] transition-colors hover:text-[#070707]"
    >
      <span className="relative z-10 flex items-center gap-2">
        {children} <ArrowUpRight size={16} />
      </span>
      <div className="absolute inset-0 z-0 h-full w-full translate-y-[100%] rounded-full bg-[#B6FF1E] transition-transform duration-300 ease-out group-hover:translate-y-0" />
    </motion.button>
  );
}

export function Tour() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.children;

    gsap.fromTo(
      items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section 
      id="tour"
      ref={sectionRef} 
      className="w-full bg-[#070707] py-32 px-6 md:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-20 font-anton text-5xl uppercase tracking-wider text-[#F4F4F4] md:text-8xl">
          <AnimatedHeading parts={[{ text: "Tour " }, { text: "Dates", accent: true }]} />
        </h2>

        <ul ref={listRef} className="flex flex-col border-t border-white/10">
          {dates.map((item, i) => (
            <li 
              key={i} 
              className="group relative flex flex-col items-start justify-between border-b border-white/10 py-8 md:flex-row md:items-center"
            >
              {/* Background fill on hover */}
              <div className="absolute inset-0 z-0 h-full w-full origin-bottom scale-y-0 bg-[#0C0C0C] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-top group-hover:scale-y-100" />
              
              <div className="relative z-10 flex w-full flex-col gap-4 md:flex-row md:items-center md:gap-12">
                <span className="font-space-grotesk text-xl text-[#777] md:w-32">{item.date}</span>
                <span className="font-anton text-3xl uppercase text-[#F4F4F4] md:w-64">{item.city}</span>
                <span className="font-space-grotesk text-lg text-[#F4F4F4]">{item.venue}</span>
              </div>
              
              <div className="relative z-10 mt-6 md:mt-0">
                <MagneticButton>Tickets</MagneticButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
