import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { SectionEyebrow } from "./SectionEyebrow";

const MANIFESTO =
  "Is your brand giving premium, or please manage? An outdated website, messy visuals and hard-to-read posts mean a lost sale. We combine creative design and technical development to turn your presence into clients.";
const ACCENT_WORDS = new Set(["messy", "lost", "clients."]);
const WORDS = MANIFESTO.split(" ");

function Word({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = Math.min(index / WORDS.length, 0.98);
  const end = Math.min(start + 1 / WORDS.length, 1);
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.25em] inline-block ${ACCENT_WORDS.has(word) ? "text-rose" : ""}`}
    >
      {word}
    </motion.span>
  );
}
import { useHydratedReducedMotion } from "./motion";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] });

  return (
    <section ref={ref} className="mx-auto max-w-5xl px-4 py-40 md:px-8">
      <SectionEyebrow dot="bg-violet">Why Chusia</SectionEyebrow>
      {/* The full sentence is exposed once to assistive tech; the animated words are visual only. */}
      <p className="sr-only">{MANIFESTO}</p>
      <p
        aria-hidden="true"
        className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
      >
        {reduceMotion
          ? MANIFESTO
          : WORDS.map((w, i) => <Word key={i} word={w} index={i} progress={scrollYProgress} />)}
      </p>
    </section>
  );
}
