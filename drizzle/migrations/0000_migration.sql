CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  budget text NOT NULL,
  timeline text NOT NULL,
  details text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit" ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (char_length(name) BETWEEN 1 AND 100 AND char_length(email) BETWEEN 3 AND 255 AND char_length(details) BETWEEN 1 AND 2000 AND char_length(service) <= 60 AND char_length(budget) <= 40 AND char_length(timeline) <= 40);