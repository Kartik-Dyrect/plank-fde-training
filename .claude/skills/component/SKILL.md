---
name: component
description: Create a React component, a test file beside it, and a barrel export if the project uses barrels. Use when asked to add or scaffold a component.
argument-hint: <ComponentName>
disable-model-invocation: true
---

Create a component named `$ARGUMENTS`.

## 1. Read the conventions first

- Read `AGENTS.md` (CLAUDE.md imports it). The rules that matter here: Server
  Components by default, `"use client"` only when the component needs state,
  effects, event handlers or browser APIs, `@/*` imports, shared components in
  `src/components/`, shadcn/ui primitives in `src/components/ui/`.
- Read `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  if you are unsure whether the component must be a client component.
- Look at one or two existing files in `src/components/` and match their
  style: named export, props typed inline or with a `Props` type, Tailwind
  classes, tokens such as `text-muted-foreground` rather than raw colours.

## 2. Name and place the files

- Normalise `$ARGUMENTS` to PascalCase for the component and kebab-case for
  the file (`UserCard` -> `user-card.tsx`). If it is empty, ask for a name.
- Component: `src/components/<kebab>.tsx`. If the argument contains a folder
  (`billing/InvoiceRow`), use `src/components/billing/invoice-row.tsx`.
- Do not overwrite an existing file. If one exists, stop and say so.
- Do not put it in `src/components/ui/`; that folder is for generated shadcn
  primitives (`npx shadcn@latest add <name>`).

## 3. Write the component

- Named export, Server Component unless it needs the browser.
- Accept `className` and spread it through `cn` only if sibling components do.
- Keep it small: render real markup for the name, not lorem ipsum.

## 4. Write a test beside it

- `src/components/<kebab>.test.tsx` with one basic render test: render the
  component with minimal props and assert something visible
  (`screen.getByText(...)` or `getByRole(...)`).
- Check `package.json` for a test runner (`vitest` or `jest`) and
  `@testing-library/react`. If they are missing, still write the file, then
  tell the user the test cannot run yet and list what to install. Do not
  install dependencies without asking.
- Async Server Components cannot be rendered by Testing Library. For those,
  keep data fetching in a parent and make this component take props.

## 5. Barrel file

- Look for an `index.ts` or `index.tsx` in the target folder, then in its
  parent folders up to `src/components/`.
- If one exists, add `export { Name } from "./<kebab>";` in alphabetical
  position, matching its existing style.
- If none exists, the project does not use barrels here: do **not** create one.
  Say so in the summary.

## 6. Verify and report

- Run `npm run typecheck` and `npm run lint`. The formatting hook already ran
  Prettier on the files.
- Report the files created, whether a barrel was updated, and whether the test
  could run.
