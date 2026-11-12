# plank-fde-training

WorkBot: an enterprise workflow platform built day by day for Plank's AI FDE
Course. One repository for the whole course, with no per-day folders. It is a
Next.js (App Router) app in TypeScript, styled with Tailwind and shadcn/ui,
with all source under `src/`.

## Commands

- `npm run dev` — start the dev server
- `npm run build` / `npm start` — production build and server
- `npm run lint` — ESLint
- `npm run format` / `npm run format:check` — Prettier, write or check
- `npm run typecheck` — `tsc --noEmit`
- `npm run check` — lint, format check, typecheck and build. CI runs this on
  pushes to `main` and on pull requests, so run it before you commit.
- `npx shadcn@latest add <component>` — add a shadcn/ui component

Use npm. The lockfile is `package-lock.json`.

## Conventions

Every change must follow these.

### Where files go

- Routes, layouts and route handlers: `src/app/`
- Shared components: `src/components/`
- shadcn/ui primitives: `src/components/ui/` (generated; restyle through
  tokens in `globals.css` rather than editing them heavily)
- Helpers, clients and non-UI logic: `src/lib/`
- Import with the `@/*` alias (`@/lib/utils`), not long relative paths.

### Server Components by default

A Server Component renders on the server and sends no JavaScript to the
browser. Every component is one unless it needs not to be.

- Add `"use client"` only when a component needs state, effects, event
  handlers or browser APIs.
- Keep client components small and push them down to the leaves of the tree.
  Fetch data in Server Components and pass it down as props.
- Never import a server-only module into a client component.

### One module reads `process.env`

- `src/lib/env.ts` is the only file that may touch `process.env`. It validates
  and exports typed values; everything else imports from `@/lib/env`.
- Secrets never go in client components or in variables prefixed
  `NEXT_PUBLIC_`.
- Document each new variable in `.env.example`. Never commit `.env*` files
  other than `.env.example`.

(`src/lib/env.ts` does not exist yet. Create it when the first variable is
needed, and do not read `process.env` anywhere else in the meantime.)

### Commits

Keep commits small, with honest messages. The course verifies progress from
them.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
