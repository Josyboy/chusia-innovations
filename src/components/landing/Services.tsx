import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { SERVICES } from "@/content/site";
import { Mark } from "./Mark";
import { useHydratedReducedMotion } from "./motion";

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref });

  // Translate by exactly the overflow of the card track so the last card always
  // lands in view, regardless of viewport width or number of services.
  const overflow = useMotionValue(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // scrollWidth ignores trailing padding on flex containers, so measure the last card.
    const measure = () => {
      const last = track.lastElementChild as HTMLElement | null;
      if (!last) return;
      const padRight = parseFloat(getComputedStyle(track).paddingRight) || 0;
      overflow.set(Math.max(0, last.offsetLeft + last.offsetWidth + padRight - track.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [overflow]);

  const x = useTransform([scrollYProgress, overflow], ([p, d]) => -(p as number) * (d as number));
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const cards = SERVICES.map((s) => (
    <li
      key={s.n}
      className={`flex h-[55vh] w-[80vw] shrink-0 flex-col justify-between rounded-[2rem] p-8 md:w-[36vw] ${s.className}`}
    >
      <div className="flex justify-between text-[13px] opacity-70" aria-hidden="true">
        <span>{s.n}</span>
        <ArrowUpRight size={20} />
      </div>
      <div>
        <h3 className="mb-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">{s.title}</h3>
        <p className="max-w-sm text-[15px] opacity-80">{s.description}</p>
      </div>
    </li>
  ));

  if (reduceMotion) {
    return (
      <section id="services" ref={ref} className="bg-muted py-32">
        <h2 className="mb-10 px-4 text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.04em] md:px-8">
          What we do
        </h2>
        <ul className="flex snap-x gap-6 overflow-x-auto px-4 pb-4 md:px-8">{cards}</ul>
      </section>
    );
  }

  return (
    <section id="services" ref={ref} className="relative h-[400vh] bg-muted">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mb-10 flex items-end justify-between px-4 md:px-8">
          <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.04em]">
            What we do
          </h2>
          <motion.div style={{ rotate }}>
            <Mark size={44} />
          </motion.div>
        </div>
        <motion.ul ref={trackRef} style={{ x }} className="flex gap-6 px-4 md:px-8">
          {cards}
        </motion.ul>
      </div>
    </section>
  );
}
