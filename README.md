# Chusia Innovations

Marketing site for [Chusia Innovations](https://github.com/Josyboy), a digital agency for websites, brands and digital products. It is built with Lovable and kept in sync with this repository.

## Stack

- [TanStack Start](https://tanstack.com/start) + TanStack Router (file-based routes in `src/routes`)
- React 19 and TypeScript (strict)
- Tailwind CSS v4, with theme tokens in `src/styles.css`
- [Motion](https://motion.dev) for scroll and entrance animations
- Supabase stores contact form submissions (`contact_submissions`, insert-only via RLS)
- Zod for validation, Vitest + Testing Library for tests

## Getting started

Requires Node.js 22.12+ or Bun.

```sh
bun install
printf "VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
" > .env  # your Supabase project values
bun run dev
```

## Scripts

| Command             | What it does                     |
| ------------------- | -------------------------------- |
| `bun run dev`       | Start the dev server             |
| `bun run build`     | Production build into `.output/` |
| `bun run lint`      | ESLint (includes Prettier rules) |
| `bun run format`    | Format everything with Prettier  |
| `bun run typecheck` | `tsc --noEmit`                   |
| `npx vitest run`    | Run the test suite               |

## Project layout

```
src/
  routes/               # pages (routeTree.gen.ts is generated, don't edit it)
  components/landing/   # homepage sections (Hero, Services, Work, …)
  components/ContactForm.tsx
  content/site.ts       # all copy, links, services, case studies
  lib/contact-schema.ts # shared contact validation + allowed options
  integrations/supabase # generated Supabase clients (don't edit by hand)
drizzle/migrations/     # SQL migrations for Supabase
```

Most copy changes, such as services, projects, process steps and social links, only need an edit to `src/content/site.ts`.

If you change the service, budget or timeline options in `src/lib/contact-schema.ts`, add a migration that updates the matching CHECK constraints. `src/test/contact-schema.test.ts` fails if the two drift apart.
