import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "motion/react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Row({ text, baseVelocity }: { text: string; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap overflow-hidden">
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="font-anton text-[8vw] uppercase leading-none tracking-tight text-[#F4F4F4] md:text-[5vw]">
              {text}
            </span>
            <span className="mx-6 text-[5vw] text-[#B6FF1E] md:mx-10 md:text-[3vw]">&#10022;</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="w-full border-y border-white/10 bg-[#070707] py-6 md:py-10" aria-hidden="true">
      <Row text="Hit Me Hard and Soft" baseVelocity={2} />
    </section>
  );
}
