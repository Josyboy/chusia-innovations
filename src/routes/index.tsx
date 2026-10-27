import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig, useScroll, useSpring } from "motion/react";

import { ContactForm } from "@/components/ContactForm";
import { CTA } from "@/components/landing/CTA";
import { Hero } from "@/components/landing/Hero";
import { Manifesto } from "@/components/landing/Manifesto";
import { Nav } from "@/components/landing/Nav";
import { Process } from "@/components/landing/Process";
import { Services } from "@/components/landing/Services";
import { Stats } from "@/components/landing/Stats";
import { Work } from "@/components/landing/Work";

const TITLE = "Chusia Innovations — Digital Experiences That Convert";
const DESCRIPTION =
  "Chusia Innovations designs and builds websites, brands and digital products that turn visitors into clients.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav progress={progress} />
      <main id="main" className="overflow-x-clip bg-background">
        <Hero />
        <Manifesto />
        <Services />
        <Work />
        <Stats />
        <Process />
        <ContactForm />
      </main>
      <CTA />
    </MotionConfig>
  );
}
