import { useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import {
  BUDGET_OPTIONS,
  CONTACT_FIELDS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/contact-schema";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

type Status = "idle" | "sending" | "done" | "error";

const EMPTY: ContactInput = {
  name: "",
  email: "",
  service: "",
  budget: "",
  timeline: "",
  details: "",
};

const fieldId = (field: ContactField) => `cf-${field}`;
const errorId = (field: ContactField) => `cf-${field}-error`;

const labelClass = "mb-3 block text-[11px] uppercase tracking-[0.25em] text-muted-foreground";
const inputClass =
  "w-full border-b-2 border-border bg-transparent py-3 text-lg outline-none focus:border-violet aria-[invalid=true]:border-rose";

function FieldError({ field, errors }: { field: ContactField; errors: ContactErrors }) {
  const message = errors[field];
  if (!message) return null;
  return (
    <p id={errorId(field)} className="mt-2 text-[12px] text-rose">
      {message}
    </p>
  );
}

function ChipGroup({
  field,
  legend,
  options,
  value,
  onChange,
  selectedClass,
  errors,
}: {
  field: ContactField;
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  selectedClass: string;
  errors: ContactErrors;
}) {
  const invalid = Boolean(errors[field]);
  return (
    <fieldset
      id={fieldId(field)}
      tabIndex={-1}
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId(field) : undefined}
      className="outline-none"
    >
      <legend className={labelClass}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = value === o;
          return (
            <button
              type="button"
              key={o}
              aria-pressed={selected}
              onClick={() => onChange(o)}
              className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
                selected
                  ? `${selectedClass} border-transparent`
                  : "border-border hover:border-foreground"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
      <FieldError field={field} errors={errors} />
    </fieldset>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const update = (field: ContactField) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(({ [field]: _removed, ...rest }) => rest);
  };

  const textInputProps = (field: ContactField) => ({
    id: fieldId(field),
    value: values[field],
    onChange: (e: { target: { value: string } }) => update(field)(e.target.value),
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? errorId(field) : undefined,
    className: inputClass,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const result = validateContact(values);
    if (!result.success) {
      setErrors(result.errors);
      const firstInvalid = CONTACT_FIELDS.find((f) => result.errors[f]);
      if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");

    // Bots tend to fill every field; humans never see this one.
    if (honeypotRef.current?.value) {
      setStatus("done");
      return;
    }

    try {
      const { error } = await supabase.from("contact_submissions").insert(result.data);
      if (error) throw error;
      setStatus("done");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      console.error("Contact form submission failed", err);
      setStatus("error");
    }
  }

  const firstName = values.name.trim().split(/\s+/)[0];

  return (
    <section
      id="enquire"
      aria-labelledby="enquire-heading"
      className="mx-auto max-w-5xl px-4 py-32 md:px-8"
    >
      <SectionEyebrow dot="bg-sun">Start a project</SectionEyebrow>
      <h2
        id="enquire-heading"
        className="mb-16 text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.04em]"
      >
        Tell us what
        <br />
        <span className="text-violet">you're building.</span>
      </h2>
      {status === "done" ? (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] bg-violet p-10 text-primary-foreground"
        >
          <h3 ref={successRef} tabIndex={-1} className="text-3xl font-bold outline-none">
            Thanks, {firstName}!
          </h3>
          <p className="mt-3 opacity-80">
            Your project details have reached Chusia. We'll be in touch at {values.email.trim()}.
          </p>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid gap-12"
          noValidate
          aria-busy={status === "sending"}
        >
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor={fieldId("name")}>
                Your name
              </label>
              <input {...textInputProps("name")} autoComplete="name" maxLength={100} />
              <FieldError field="name" errors={errors} />
            </div>
            <div>
              <label className={labelClass} htmlFor={fieldId("email")}>
                Email
              </label>
              <input
                {...textInputProps("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={255}
              />
              <FieldError field="email" errors={errors} />
            </div>
          </div>
          <ChipGroup
            field="service"
            legend="Service"
            options={SERVICE_OPTIONS}
            value={values.service}
            onChange={update("service")}
            selectedClass="bg-violet text-primary-foreground"
            errors={errors}
          />
          <div className="grid gap-10 md:grid-cols-2">
            <ChipGroup
              field="budget"
              legend="Budget"
              options={BUDGET_OPTIONS}
              value={values.budget}
              onChange={update("budget")}
              selectedClass="bg-rose text-primary-foreground"
              errors={errors}
            />
            <ChipGroup
              field="timeline"
              legend="Timeline"
              options={TIMELINE_OPTIONS}
              value={values.timeline}
              onChange={update("timeline")}
              selectedClass="bg-sun text-ink"
              errors={errors}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor={fieldId("details")}>
              Project details
            </label>
            <textarea
              {...textInputProps("details")}
              rows={4}
              maxLength={2000}
              className={`${inputClass} resize-none`}
            />
            <FieldError field="details" errors={errors} />
          </div>
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="cf-website">Website</label>
            <input
              ref={honeypotRef}
              id="cf-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[14px] text-paper disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send project details"}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <p role="alert" className="text-[13px] text-rose">
              {status === "error" &&
                "Something went wrong — please try again, or email us directly."}
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
