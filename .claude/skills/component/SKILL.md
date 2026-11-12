---
name: component
description: Create a React component from the shadcn primitives, with a render test beside it. Use when asked to add or scaffold a component.
argument-hint: <Name>
disable-model-invocation: true
---

Create a component named `$ARGUMENTS`.

## Pattern to match

Read these two files first and mirror their shape exactly:

- `src/components/site-header.tsx`: a named export, a Server Component (no
  `"use client"`), `next/link` for links, Tailwind classes using design tokens
  such as `text-muted-foreground`.
- `src/components/site-header.test.tsx`: renders the component with
  `renderToStaticMarkup` from `react-dom/server` and asserts on the markup with
  Vitest. It imports through the `@/` alias.

Also skim `AGENTS.md`: Server Components by default, `"use client"` only when
the component needs state, effects, handlers or browser APIs.

## Files

Turn `$ARGUMENTS` into PascalCase for the component and kebab-case for the file
(`Notice` -> `notice.tsx`, `UserCard` -> `user-card.tsx`). If it is empty, ask
for a name.

1. `src/components/<kebab-name>.tsx`: build it from the shadcn primitives in
   `src/components/ui/` (`Card`, `Button` and so on) rather than raw markup.
   Import them as `@/components/ui/...`. Render real content for the name,
   not lorem ipsum.
2. `src/components/<kebab-name>.test.tsx`: beside it. Render with
   `renderToStaticMarkup` and assert the visible text.

If either file exists, stop and say so; do not overwrite.

## No barrel file

This project imports components by path (`@/components/site-header`) and has no
`index.ts` barrel files. Do not create one and do not add an export anywhere.

## Finish

Run `npx vitest run src/components/<kebab-name>.test.tsx` and
`npm run typecheck`. Report the two files and the test result.
