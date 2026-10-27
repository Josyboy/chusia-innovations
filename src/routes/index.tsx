import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import heroWebm from "../assets/hero.webm.asset.json";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chusia Innovations — Digital Experiences That Convert" },
      { name: "description", content: "Chusia Innovations designs and builds websites, brands and digital products that turn visitors into clients." },
      { property: "og:title", content: "Chusia Innovations — Digital Experiences That Convert" },
      { property: "og:description", content: "Websites, brands and digital products that turn visitors into clients." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

const ease = [0.16, 1, 0.3, 1] as const;
const EMAIL = "chusiainnovation@gmail.com";
const HERO_VIDEO = "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/cloudinarry%20to%20cloudflare/202606021731-e_hqa6sn.mp4";

function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 40 44">
      <circle cx="13" cy="9" r="8" className="fill-violet" /><circle cx="27" cy="9" r="8" className="fill-violet" />
      <circle cx="11" cy="25" r="6.5" className="fill-rose" /><circle cx="20" cy="22" r="6.5" className="fill-rose" /><circle cx="29" cy="25" r="6.5" className="fill-rose" />
      <circle cx="20" cy="38" r="5.5" className="fill-sun" />
    </svg>
  );
}

function Nav({ progress }: { progress: MotionValue<number> }) {
  return (
    <motion.nav initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-background/70 px-4 py-4 backdrop-blur-md md:px-8">
      <a href="#top" className="flex items-center gap-2">
        <Mark />
        <span className="font-display text-lg font-bold tracking-tight">Chusia<span className="text-muted-foreground font-medium"> Innovations</span></span>
      </a>
      <div className="hidden gap-6 text-[13px] md:flex">
        <a href="#services">Services</a><a href="#work">Work</a><a href="#process">Process</a><a href="#contact">Contact</a>
      </div>
      <a href="#enquire" className="rounded-full bg-ink px-4 py-2 text-[12px] text-paper">Start a project</a>
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-violet via-rose to-sun" />
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const s1 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const s2 = useTransform(scrollYProgress, [0, 1], [1, 14]);
  const s3 = useTransform(scrollYProgress, [0, 1], [1, 22]);
  const x1 = useTransform(scrollYProgress, [0, 1], ["0vw", "-30vw"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0vw", "30vw"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src={HERO_VIDEO} type="video/mp4" />
          <source src={heroWebm.url} type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-paper/55" />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center gap-[6vw] pb-[14vh] opacity-90">
          <motion.div style={{ scale: s1, x: x1 }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }} className="h-[9vw] w-[9vw] rounded-full bg-violet" />
          <motion.div style={{ scale: s2 }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 1.2, ease }} className="h-[6vw] w-[6vw] rounded-full bg-rose" />
          <motion.div style={{ scale: s3, x: x3 }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.2, ease }} className="h-[4vw] w-[4vw] rounded-full bg-sun" />
        </div>
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 px-4 text-center text-ink">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-6 text-[13px] uppercase tracking-[0.3em]">Web · Brand · Digital Product</motion.p>
          <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 1, ease }}
            className="text-[clamp(3rem,11vw,10rem)] font-extrabold leading-[0.88] tracking-[-0.04em]">
            Make them<br />stay.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mx-auto mt-8 max-w-md text-[15px]">
            A full-service digital agency helping businesses, startups and organisations stand out with strong digital identities built for growth.
          </motion.p>
        </motion.div>
        <motion.span style={{ opacity: fade }} className="absolute bottom-8 text-[12px] text-muted-foreground">Scroll ↓</motion.span>
      </div>
    </section>
  );
}

function Word({ word, i, total, progress }: { word: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = Math.min(i / total, 0.98);
  const end = Math.min(start + 1 / total, 1);
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const accent = ["messy", "lost", "clients."].includes(word);
  return <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${accent ? "text-rose" : ""}`}>{word}</motion.span>;
}

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] });
  const words = "Is your brand giving premium, or please manage? An outdated website, messy visuals and hard-to-read posts mean a lost sale. We combine creative design and technical development to turn your presence into clients.".split(" ");
  return (
    <section ref={ref} className="mx-auto max-w-5xl px-4 py-40 md:px-8">
      <p className="mb-8 flex items-center gap-2 text-[13px] text-muted-foreground"><span className="h-2 w-2 rounded-full bg-violet" />Why Chusia</p>
      <p className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
        {words.map((w, i) => <Word key={i} word={w} i={i} total={words.length} progress={scrollYProgress} />)}
      </p>
    </section>
  );
}

const services = [
  { n: "01", t: "Web Design", d: "Sites that load fast, look sharp and guide visitors to act.", c: "bg-violet text-primary-foreground" },
  { n: "02", t: "Brand Identity", d: "Logos, colour and voice that make you instantly recognisable.", c: "bg-rose text-primary-foreground" },
  { n: "03", t: "Web & Mobile Apps", d: "Responsive websites and mobile applications for clients across different industries.", c: "bg-sun text-ink" },
  { n: "04", t: "Graphic Design", d: "Consistent, premium visuals and easy-to-read posts across every digital channel.", c: "bg-ink text-paper" },
  { n: "05", t: "Digital Presence", d: "A compelling, joined-up presence that helps startups and organisations grow.", c: "bg-violet text-primary-foreground" },
];

function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 360]);
  return (
    <section id="services" ref={ref} className="relative h-[400vh] bg-muted">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mb-10 flex items-end justify-between px-4 md:px-8">
          <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.04em]">What we do</h2>
          <motion.div style={{ rotate: rot }}><Mark size={44} /></motion.div>
        </div>
        <motion.div style={{ x }} className="flex gap-6 px-4 md:px-8">
          {services.map((s) => (
            <div key={s.n} className={`flex h-[55vh] w-[80vw] shrink-0 flex-col justify-between rounded-[2rem] p-8 md:w-[36vw] ${s.c}`}>
              <div className="flex justify-between text-[13px] opacity-70"><span>{s.n}</span><ArrowUpRight size={20} /></div>
              <div>
                <h3 className="mb-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">{s.t}</h3>
                <p className="max-w-sm text-[15px] opacity-80">{s.d}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const projects = [
  {
    n: "01",
    t: "Ground Control Station",
    sub: "Real-time robot command & monitoring",
    problem: "Operators needed one secure place to watch a virtual robot live, send it commands, and keep a trustworthy record of who did what — without giving every user full control.",
    features: [
      "Live dashboard: battery, position and movement state",
      "Move and reset controls via a REST robot API",
      "Map, sensor and LiDAR scan summaries",
      "Commander / Viewer role-based access",
      "Paginated mission audit logs for every action",
      "JWT sign-up, sign-in and user role management",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT"],
    url: "https://github.com/Josyboy/CMP9134-Assessment1",
    c: "bg-violet text-primary-foreground",
  },
  {
    n: "02",
    t: "Health Connect Equity",
    sub: "Fairer access to healthcare",
    problem: "Many people struggle to find the care and health information they need. This app sets out to make that access simpler and more equal.",
    features: [
      "Clean, accessible interface for all users",
      "Fast, responsive experience on any device",
      "Built on a modern component system",
    ],
    tags: ["React", "TypeScript", "Vite", "shadcn-ui", "Tailwind CSS"],
    url: "https://github.com/Josyboy/health-connect-equity",
    c: "bg-rose text-primary-foreground",
  },
];

function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-40 md:px-8">
      <p className="mb-8 flex items-center gap-2 text-[13px] text-muted-foreground"><span className="h-2 w-2 rounded-full bg-rose" />Case studies</p>
      <h2 className="mb-16 text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.04em]">Built, shipped,<br /><span className="text-muted-foreground">on GitHub.</span></h2>
      <div className="flex flex-col gap-10">
        {projects.map((p, i) => (
          <motion.article key={p.n}
            initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, duration: 0.9, ease }}
            className={`grid gap-10 rounded-[2rem] p-8 md:grid-cols-[1fr_1.2fr] md:p-12 ${p.c}`}>
            <div className="flex flex-col justify-between gap-8">
              <div>
                <span className="text-[13px] opacity-70">Case study {p.n}</span>
                <h3 className="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">{p.t}</h3>
                <p className="mt-2 text-[15px] opacity-80">{p.sub}</p>
              </div>
              <a href={p.url} target="_blank" rel="noreferrer" className="group inline-flex w-fit items-center gap-2 rounded-full border border-current/40 px-5 py-3 text-[13px]">
                View on GitHub <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.25em] opacity-70">The problem</p>
                <p className="text-[15px] leading-relaxed">{p.problem}</p>
              </div>
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.25em] opacity-70">Key features</p>
                <ul className="grid gap-2 text-[14px] sm:grid-cols-2">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />{f}</li>)}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.25em] opacity-70">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => <span key={t} className="rounded-full border border-current/30 px-3 py-1 text-[11px]">{t}</span>)}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.a href="https://github.com/Josyboy" target="_blank" rel="noreferrer"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] text-paper">
        See everything on GitHub <ArrowUpRight size={14} />
      </motion.a>
    </section>
  );
}

function Stat({ value, suffix, label, progress, range, color }: { value: number; suffix: string; label: string; progress: MotionValue<number>; range: [number, number]; color: string }) {
  const n = useTransform(progress, range, [0, value]);
  const rounded = useTransform(n, (v) => Math.round(v) + suffix);
  const y = useTransform(progress, range, [60, 0]);
  return (
    <motion.div style={{ y }} className="border-t-[3px] pt-6" >
      <span className={`mb-4 block h-3 w-3 rounded-full ${color}`} />
      <motion.div className="font-display text-[clamp(3rem,8vw,7rem)] font-extrabold leading-none tracking-[-0.05em]">{rounded}</motion.div>
      <p className="mt-3 text-[13px] text-muted-foreground">{label}</p>
    </motion.div>
  );
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  return (
    <section ref={ref} className="grid gap-10 px-4 py-40 md:grid-cols-3 md:px-8">
      <Stat value={2023} suffix="" label="Founded — building since December" progress={scrollYProgress} range={[0, 0.8]} color="bg-violet" />
      <Stat value={5} suffix="" label="Core services under one roof" progress={scrollYProgress} range={[0.1, 0.9]} color="bg-rose" />
      <Stat value={2} suffix="" label="Platforms: web & mobile" progress={scrollYProgress} range={[0.2, 1]} color="bg-sun" />
    </section>
  );
}

const steps = ["Discover", "Design", "Build", "Launch"];
const stepColors = ["bg-violet", "bg-rose", "bg-sun", "bg-ink"];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const idx = useTransform(scrollYProgress, (v) => Math.min(steps.length - 1, Math.floor(v * steps.length)));
  const y = useTransform(idx, (i) => `${-i * 100}%`);
  return (
    <section id="process" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 grid h-screen items-center gap-10 px-4 md:grid-cols-2 md:px-8">
        <div className="relative mx-auto aspect-square w-[70vw] max-w-[440px] overflow-hidden rounded-full">
          <motion.div style={{ y }} transition={{ type: "spring" }} className="absolute inset-0 transition-transform duration-700">
            {stepColors.map((c, i) => <div key={i} className={`h-full w-full ${c}`} />)}
          </motion.div>
          <div className="dots-pattern absolute inset-[30%] rounded-full opacity-40 mix-blend-overlay" />
        </div>
        <div className="flex flex-col gap-2">
          {steps.map((s, i) => <Step key={s} label={s} i={i} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}

function Step({ label, i, progress }: { label: string; i: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, (v) => (Math.min(steps.length - 1, Math.floor(v * steps.length)) === i ? 1 : 0.15));
  const x = useTransform(opacity, (o) => (o === 1 ? 0 : -20));
  return (
    <motion.div style={{ opacity, x }} className="flex items-baseline gap-6 transition-all duration-500">
      <span className="text-[13px] text-muted-foreground">0{i + 1}</span>
      <span className="font-display text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.05em]">{label}</span>
    </motion.div>
  );
}

function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "5%"]);
  return (
    <section id="contact" ref={ref} className="overflow-hidden bg-ink py-32 text-paper">
      <motion.div style={{ x: x1 }} className="font-display whitespace-nowrap text-[clamp(4rem,14vw,13rem)] font-extrabold leading-none tracking-[-0.05em]">
        Let's build it · <span className="text-violet">Let's build it</span> ·
      </motion.div>
      <motion.div style={{ x: x2 }} className="font-display whitespace-nowrap text-[clamp(4rem,14vw,13rem)] font-extrabold leading-none tracking-[-0.05em]">
        <span className="text-rose">with Chusia</span> · <span className="text-sun">with Chusia</span> ·
      </motion.div>
      <div className="mt-20 flex flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-end md:px-8">
        <p className="max-w-md text-[15px] opacity-70">Losing customers before they even consider buying? Let's fix that for you — tell us about your project.</p>
        <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 rounded-full bg-paper px-6 py-4 text-[13px] text-ink">
          {EMAIL} <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="mt-24 flex justify-between border-t border-paper/15 px-4 pt-6 text-[11px] opacity-50 md:px-8">
        <span>© 2026 Chusia Innovations · Founded by Josiah Nwarungwa</span>
        <span className="flex gap-4">
          <a href="https://linkedin.com/company/chusia-innovations" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/chusia_i/" target="_blank" rel="noreferrer">@chusia_i</a>
        </span>
      </div>
    </section>
  );
}

function Index() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <main className="bg-background">
      <Nav progress={progress} />
      <Hero />
      <Manifesto />
      <Services />
      <Work />
      <Stats />
      <Process />
      <ContactForm />
      <CTA />
    </main>
  );
}
