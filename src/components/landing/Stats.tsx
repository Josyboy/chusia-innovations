import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

function Stat({
  value,
  label,
  progress,
  range,
  color,
}: {
  value: number;
  label: string;
  progress: MotionValue<number>;
  range: [number, number];
  color: string;
}) {
  const n = useTransform(progress, range, [0, value]);
  const rounded = useTransform(n, (v) => String(Math.round(v)));
  const y = useTransform(progress, range, [60, 0]);
  return (
    <motion.div style={{ y }} className="border-t-[3px] pt-6">
      <span className={`mb-4 block h-3 w-3 rounded-full ${color}`} aria-hidden="true" />
      {/* Screen readers get the final value, not the animated count. */}
      <p className="sr-only">
        {value} — {label}
      </p>
      <motion.div
        aria-hidden="true"
        className="font-display text-[clamp(3rem,8vw,7rem)] font-extrabold leading-none tracking-[-0.05em]"
      >
        {rounded}
      </motion.div>
      <p className="mt-3 text-[13px] text-muted-foreground" aria-hidden="true">
        {label}
      </p>
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  return (
    <section ref={ref} className="grid gap-10 px-4 py-40 md:grid-cols-3 md:px-8">
      <Stat
        value={2023}
        label="Founded — building since December"
        progress={scrollYProgress}
        range={[0, 0.8]}
        color="bg-violet"
      />
      <Stat
        value={5}
        label="Core services under one roof"
        progress={scrollYProgress}
        range={[0.1, 0.9]}
        color="bg-rose"
      />
      <Stat
        value={2}
        label="Platforms: web & mobile"
        progress={scrollYProgress}
        range={[0.2, 1]}
        color="bg-sun"
      />
    </section>
  );
}
