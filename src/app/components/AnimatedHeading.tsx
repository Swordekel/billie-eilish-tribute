import { motion, type Variants } from "motion/react";

type Part = { text: string; accent?: boolean };

// Character-by-character clip reveal, driven from the parent container so every
// char reveals reliably together. Accent parts render in Billie green.
export function AnimatedHeading({
  parts,
  className,
  once = true,
}: {
  parts: Part[];
  className?: string;
  once?: boolean;
}) {
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.035 } },
  };
  const item: Variants = {
    hidden: { y: "110%" },
    visible: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className ?? ""}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
    >
      {parts.map((part, pi) =>
        part.text.split("").map((char, ci) => (
          <span key={`${pi}-${ci}`} className="inline-flex overflow-hidden">
            <motion.span
              className={`inline-block ${part.accent ? "text-[#B6FF1E]" : ""}`}
              variants={item}
            >
              {char === " " ? <>&nbsp;</> : char}
            </motion.span>
          </span>
        ))
      )}
    </motion.span>
  );
}
