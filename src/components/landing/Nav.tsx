import { motion, type MotionValue } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { NAV_LINKS, SITE } from "@/content/site";
import { Mark } from "./Mark";
import { EASE_OUT } from "./motion";

export function Nav({ progress }: { progress: MotionValue<number> }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-md"
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-4 px-4 py-4 md:px-8"
      >
        <a href="#top" className="flex items-center gap-2" aria-label={`${SITE.name} — home`}>
          <Mark />
          <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight">
            Chusia
            <span className="hidden font-medium text-muted-foreground min-[380px]:inline">
              {" "}
              Innovations
            </span>
          </span>
        </a>
        <ul className="hidden gap-6 text-[13px] md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-violet">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#enquire"
            className="hidden whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[12px] text-paper sm:inline-block"
          >
            Start a project
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul id="mobile-nav" className="flex flex-col gap-1 px-4 pb-4 text-lg md:hidden">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={close} className="block py-2">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#enquire"
              onClick={close}
              className="mt-2 inline-block rounded-full bg-ink px-5 py-2.5 text-base text-paper"
            >
              Start a project
            </a>
          </li>
        </ul>
      )}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-violet via-rose to-sun"
      />
    </motion.header>
  );
}
