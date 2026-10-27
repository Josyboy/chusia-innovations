import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

import heroWebm from "@/assets/hero.webm.asset.json";
import { SITE } from "@/content/site";
import { EASE_OUT, useHydratedReducedMotion } from "./motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const s1 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const s2 = useTransform(scrollYProgress, [0, 1], [1, 14]);
  const s3 = useTransform(scrollYProgress, [0, 1], [1, 22]);
  const x1 = useTransform(scrollYProgress, [0, 1], ["0vw", "-30vw"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0vw", "30vw"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) video.pause();
    else void video.play().catch(() => {});
  }, [reduceMotion]);

  const orb = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 1.2, ease: EASE_OUT },
  });

  return (
    <section id="top" ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={SITE.heroVideoMp4} type="video/mp4" />
          <source src={heroWebm.url} type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-paper/55" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-end justify-center gap-[6vw] pb-[14vh] opacity-90"
        >
          <motion.div
            style={reduceMotion ? {} : { scale: s1, x: x1 }}
            {...orb(0)}
            className="h-[9vw] w-[9vw] rounded-full bg-violet"
          />
          <motion.div
            style={reduceMotion ? {} : { scale: s2 }}
            {...orb(0.15)}
            className="h-[6vw] w-[6vw] rounded-full bg-rose"
          />
          <motion.div
            style={reduceMotion ? {} : { scale: s3, x: x3 }}
            {...orb(0.3)}
            className="h-[4vw] w-[4vw] rounded-full bg-sun"
          />
        </div>
        <motion.div
          style={reduceMotion ? {} : { y: textY, opacity: fade }}
          className="relative z-10 px-4 text-center text-ink"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-6 text-[13px] uppercase tracking-[0.3em]"
          >
            Web · Brand · Digital Product
          </motion.p>
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1, ease: EASE_OUT }}
            className="text-[clamp(3rem,11vw,10rem)] font-extrabold leading-[0.88] tracking-[-0.04em]"
          >
            Make them
            <br />
            stay.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mx-auto mt-8 max-w-md text-[15px]"
          >
            A full-service digital agency helping businesses, startups and organisations stand out
            with strong digital identities built for growth.
          </motion.p>
        </motion.div>
        <motion.span
          aria-hidden="true"
          style={{ opacity: fade }}
          className="absolute bottom-8 text-[12px] text-muted-foreground"
        >
          Scroll ↓
        </motion.span>
      </div>
    </section>
  );
}
