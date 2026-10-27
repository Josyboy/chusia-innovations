-- Defence in depth for the public contact form: the anon key can insert directly,
-- so enforce the same rules as src/lib/contact-schema.ts at the database level.
-- NOT VALID skips existing rows so this can't fail on legacy data; new rows are checked.
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_submissions_email_format
    CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$') NOT VALID,
  ADD CONSTRAINT contact_submissions_details_length
    CHECK (char_length(btrim(details)) BETWEEN 10 AND 2000) NOT VALID,
  ADD CONSTRAINT contact_submissions_service_allowed
    CHECK (service IN ('Web Design', 'Brand Identity', 'Web & Mobile Apps', 'Graphic Design', 'Digital Presence', 'Not sure yet')) NOT VALID,
  ADD CONSTRAINT contact_submissions_budget_allowed
    CHECK (budget IN ('Under £1k', '£1k – £3k', '£3k – £7k', '£7k+')) NOT VALID,
  ADD CONSTRAINT contact_submissions_timeline_allowed
    CHECK (timeline IN ('ASAP', '1 – 2 months', '3 – 6 months', 'Flexible')) NOT VALID;

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON public.contact_submissions (created_at DESC);
