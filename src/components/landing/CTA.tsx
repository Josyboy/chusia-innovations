import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { SITE } from "@/content/site";

const marquee =
  "font-display whitespace-nowrap text-[clamp(4rem,14vw,13rem)] font-extrabold leading-none tracking-[-0.05em]";

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "5%"]);

  return (
    <footer id="contact" ref={ref} className="overflow-hidden bg-ink py-32 text-paper">
      <h2 className="sr-only">Let's build it with Chusia</h2>
      <div aria-hidden="true">
        <motion.div style={{ x: x1 }} className={marquee}>
          Let's build it · <span className="text-violet">Let's build it</span> ·
        </motion.div>
        <motion.div style={{ x: x2 }} className={marquee}>
          <span className="text-rose">with Chusia</span> ·{" "}
          <span className="text-sun">with Chusia</span> ·
        </motion.div>
      </div>
      <div className="mt-20 flex flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-end md:px-8">
        <p className="max-w-md text-[15px] opacity-70">
          Losing customers before they even consider buying? Let's fix that for you — tell us about
          your project.
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="flex items-center gap-2 rounded-full bg-paper px-6 py-4 text-[13px] text-ink"
        >
          {SITE.email} <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <div className="mt-24 flex flex-col gap-4 border-t border-paper/15 px-4 pt-6 text-[11px] opacity-70 sm:flex-row sm:justify-between md:px-8">
        <span>
          © {new Date().getFullYear()} {SITE.name} · Founded by {SITE.founder}
        </span>
        <ul className="flex gap-4">
          {SITE.social.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
