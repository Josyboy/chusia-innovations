import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { PROJECTS, SITE } from "@/content/site";
import { EASE_OUT } from "./motion";
import { SectionEyebrow } from "./SectionEyebrow";

const subLabel = "text-[11px] uppercase tracking-[0.25em] opacity-70";

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-40 md:px-8">
      <SectionEyebrow dot="bg-rose">Case studies</SectionEyebrow>
      <h2 className="mb-16 text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.04em]">
        Built, shipped,
        <br />
        <span className="text-muted-foreground">on GitHub.</span>
      </h2>
      <div className="flex flex-col gap-10">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.n}
            aria-labelledby={`project-${p.n}`}
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, duration: 0.9, ease: EASE_OUT }}
            className={`grid gap-10 rounded-[2rem] p-8 md:grid-cols-[1fr_1.2fr] md:p-12 ${p.className}`}
          >
            <div className="flex flex-col justify-between gap-8">
              <div>
                <span className="text-[13px] opacity-70">Case study {p.n}</span>
                <h3
                  id={`project-${p.n}`}
                  className="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl"
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-[15px] opacity-80">{p.subtitle}</p>
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-current/40 px-5 py-3 text-[13px]"
              >
                View on GitHub
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:rotate-45"
                />
              </a>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <h4 className={`mb-2 ${subLabel}`}>The problem</h4>
                <p className="text-[15px] leading-relaxed">{p.problem}</p>
              </div>
              <div>
                <h4 className={`mb-3 ${subLabel}`}>Key features</h4>
                <ul className="grid gap-2 text-[14px] sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className={`mb-3 ${subLabel}`}>Technologies</h4>
                <ul className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-current/30 px-3 py-1 text-[11px]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.a
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] text-paper"
      >
        See everything on GitHub
        <span className="sr-only"> (opens in a new tab)</span>
        <ArrowUpRight size={14} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
