export const SITE = {
  name: "Chusia Innovations",
  email: "chusiainnovation@gmail.com",
  founder: "Josiah Nwarungwa",
  github: "https://github.com/Josyboy",
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/company/chusia-innovations" },
    { label: "@chusia_i", href: "https://www.instagram.com/chusia_i/" },
  ],
  heroVideoMp4:
    "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/cloudinarry%20to%20cloudflare/202606021731-e_hqa6sn.mp4",
} as const;

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    n: "01",
    title: "Web Design",
    description: "Sites that load fast, look sharp and guide visitors to act.",
    className: "bg-violet text-primary-foreground",
  },
  {
    n: "02",
    title: "Brand Identity",
    description: "Logos, colour and voice that make you instantly recognisable.",
    className: "bg-rose text-primary-foreground",
  },
  {
    n: "03",
    title: "Web & Mobile Apps",
    description:
      "Responsive websites and mobile applications for clients across different industries.",
    className: "bg-sun text-ink",
  },
  {
    n: "04",
    title: "Graphic Design",
    description: "Consistent, premium visuals and easy-to-read posts across every digital channel.",
    className: "bg-ink text-paper",
  },
  {
    n: "05",
    title: "Digital Presence",
    description: "A compelling, joined-up presence that helps startups and organisations grow.",
    className: "bg-violet text-primary-foreground",
  },
] as const;

export const PROJECTS = [
  {
    n: "01",
    title: "Ground Control Station",
    subtitle: "Real-time robot command & monitoring",
    problem:
      "Operators needed one secure place to watch a virtual robot live, send it commands, and keep a trustworthy record of who did what — without giving every user full control.",
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
    className: "bg-violet text-primary-foreground",
  },
  {
    n: "02",
    title: "Health Connect Equity",
    subtitle: "Fairer access to healthcare",
    problem:
      "Many people struggle to find the care and health information they need. This app sets out to make that access simpler and more equal.",
    features: [
      "Clean, accessible interface for all users",
      "Fast, responsive experience on any device",
      "Built on a modern component system",
    ],
    tags: ["React", "TypeScript", "Vite", "shadcn-ui", "Tailwind CSS"],
    url: "https://github.com/Josyboy/health-connect-equity",
    className: "bg-rose text-primary-foreground",
  },
] as const;

export const PROCESS_STEPS = [
  { label: "Discover", className: "bg-violet" },
  { label: "Design", className: "bg-rose" },
  { label: "Build", className: "bg-sun" },
  { label: "Launch", className: "bg-ink" },
] as const;
