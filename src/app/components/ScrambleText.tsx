import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*?/";

// Glitchy "decode" effect — scrambles characters then resolves left-to-right
// once the element scrolls into view. On-brand for Billie's edgy aesthetic.
export function ScrambleText({
  text,
  className,
  speed = 2.2,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView || reduce) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    const tick = () => {
      const revealed = frame / speed;
      setDisplay(
        text
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            if (i < revealed) return text[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      frame++;
      if (revealed < text.length) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, speed, reduce]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
