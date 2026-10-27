import { useState } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SERVICES = ["Web Design", "Brand Identity", "Web & Mobile Apps", "Graphic Design", "Digital Presence", "Not sure yet"];
const BUDGETS = ["Under £1k", "£1k – £3k", "£3k – £7k", "£7k+"];
const TIMELINES = ["ASAP", "1 – 2 months", "3 – 6 months", "Flexible"];

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  service: z.string().min(1, "Choose a service"),
  budget: z.string().min(1, "Choose a budget"),
  timeline: z.string().min(1, "Choose a timeline"),
  details: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
});

function Chips({ options, value, onChange, color }: { options: string[]; value: string; onChange: (v: string) => void; color: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button type="button" key={o} onClick={() => onChange(o)}
          className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${value === o ? `${color} border-transparent` : "border-border hover:border-foreground"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", service: "", budget: "", timeline: "", details: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setState("sending");
    const { error } = await supabase.from("contact_submissions").insert(r.data);
    setState(error ? "error" : "done");
  }

  const label = "mb-3 block text-[11px] uppercase tracking-[0.25em] text-muted-foreground";
  const input = "w-full border-b-2 border-border bg-transparent py-3 text-lg outline-none focus:border-violet";
  const err = (k: string) => errors[k] && <p className="mt-2 text-[12px] text-rose">{errors[k]}</p>;

  return (
    <section id="enquire" className="mx-auto max-w-5xl px-4 py-32 md:px-8">
      <p className="mb-8 flex items-center gap-2 text-[13px] text-muted-foreground"><span className="h-2 w-2 rounded-full bg-sun" />Start a project</p>
      <h2 className="mb-16 text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.04em]">Tell us what<br /><span className="text-violet">you're building.</span></h2>
      {state === "done" ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] bg-violet p-10 text-primary-foreground">
          <h3 className="text-3xl font-bold">Thanks, {f.name.split(" ")[0]}!</h3>
          <p className="mt-3 opacity-80">Your project details have reached Chusia. We'll be in touch at {f.email}.</p>
        </motion.div>
      ) : (
        <form onSubmit={submit} className="grid gap-12" noValidate>
          <div className="grid gap-10 md:grid-cols-2">
            <div><label className={label} htmlFor="cf-name">Your name</label><input id="cf-name" className={input} value={f.name} maxLength={100} onChange={(e) => set("name")(e.target.value)} />{err("name")}</div>
            <div><label className={label} htmlFor="cf-email">Email</label><input id="cf-email" type="email" className={input} value={f.email} maxLength={255} onChange={(e) => set("email")(e.target.value)} />{err("email")}</div>
          </div>
          <div><span className={label}>Service</span><Chips options={SERVICES} value={f.service} onChange={set("service")} color="bg-violet text-primary-foreground" />{err("service")}</div>
          <div className="grid gap-10 md:grid-cols-2">
            <div><span className={label}>Budget</span><Chips options={BUDGETS} value={f.budget} onChange={set("budget")} color="bg-rose text-primary-foreground" />{err("budget")}</div>
            <div><span className={label}>Timeline</span><Chips options={TIMELINES} value={f.timeline} onChange={set("timeline")} color="bg-sun text-ink" />{err("timeline")}</div>
          </div>
          <div><label className={label} htmlFor="cf-details">Project details</label><textarea id="cf-details" rows={4} className={`${input} resize-none`} value={f.details} maxLength={2000} onChange={(e) => set("details")(e.target.value)} />{err("details")}</div>
          <div className="flex items-center gap-6">
            <button type="submit" disabled={state === "sending"} className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[14px] text-paper disabled:opacity-60">
              {state === "sending" ? "Sending…" : "Send project details"} <ArrowUpRight size={16} />
            </button>
            {state === "error" && <p className="text-[13px] text-rose">Something went wrong — please try again.</p>}
          </div>
        </form>
      )}
    </section>
  );
}
