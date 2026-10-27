import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { PROCESS_STEPS } from "@/content/site";

const lastIndex = PROCESS_STEPS.length - 1;
const activeStep = (progress: number) =>
  Math.min(lastIndex, Math.floor(progress * PROCESS_STEPS.length));

function Step({
  label,
  index,
  progress,
}: {
  label: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, (v) => (activeStep(v) === index ? 1 : 0.15));
  const x = useTransform(opacity, (o) => (o === 1 ? 0 : -20));
  return (
    <motion.li
      style={{ opacity, x }}
      className="flex items-baseline gap-6 transition-all duration-500"
    >
      <span className="text-[13px] text-muted-foreground">0{index + 1}</span>
      <span className="font-display text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.05em]">
        {label}
      </span>
    </motion.li>
  );
}

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, (v) => `${-activeStep(v) * 100}%`);

  return (
    <section id="process" ref={ref} aria-label="Our process" className="relative h-[300vh]">
      <div className="sticky top-0 grid h-screen items-center gap-10 px-4 md:grid-cols-2 md:px-8">
        <div
          aria-hidden="true"
          className="relative mx-auto aspect-square w-[70vw] max-w-[440px] overflow-hidden rounded-full"
        >
          <motion.div style={{ y }} className="absolute inset-0 transition-transform duration-700">
            {PROCESS_STEPS.map((s) => (
              <div key={s.label} className={`h-full w-full ${s.className}`} />
            ))}
          </motion.div>
          <div className="dots-pattern absolute inset-[30%] rounded-full opacity-40 mix-blend-overlay" />
        </div>
        <ol className="flex flex-col gap-2">
          {PROCESS_STEPS.map((s, i) => (
            <Step key={s.label} label={s.label} index={i} progress={scrollYProgress} />
          ))}
        </ol>
      </div>
    </section>
  );
}
