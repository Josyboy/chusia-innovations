import { z } from "zod";

import { SERVICES } from "@/content/site";

// Keep these lists in sync with the CHECK constraints in
// drizzle/migrations/0001_contact_submission_constraints.sql.
export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Not sure yet"] as const;
export const BUDGET_OPTIONS = ["Under £1k", "£1k – £3k", "£3k – £7k", "£7k+"] as const;
export const TIMELINE_OPTIONS = ["ASAP", "1 – 2 months", "3 – 6 months", "Flexible"] as const;

const oneOf = <T extends string>(options: readonly T[], message: string) =>
  z.string().refine((v): v is T => (options as readonly string[]).includes(v), { message });

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100, "Keep it under 100 characters"),
  email: z.string().trim().email("Enter a valid email").max(255),
  service: oneOf(SERVICE_OPTIONS, "Choose a service"),
  budget: oneOf(BUDGET_OPTIONS, "Choose a budget"),
  timeline: oneOf(TIMELINE_OPTIONS, "Choose a timeline"),
  details: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10+ characters)")
    .max(2000, "Keep it under 2000 characters"),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const CONTACT_FIELDS = Object.keys(contactSchema.shape) as ContactField[];

export function validateContact(
  input: ContactInput,
):
  | { success: true; data: z.output<typeof contactSchema> }
  | { success: false; errors: ContactErrors } {
  const result = contactSchema.safeParse(input);
  if (result.success) return { success: true, data: result.data };

  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { success: false, errors };
}
