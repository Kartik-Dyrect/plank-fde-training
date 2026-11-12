---
name: api-route
description: Create a Next.js App Router API route handler with Zod validation, correct HTTP error statuses and a types file. Use when asked to add an API endpoint.
argument-hint: <route-name>
disable-model-invocation: true
---

Create an API route named `$ARGUMENTS`.

## 1. Read first

- Read `AGENTS.md`. This Next.js version has breaking changes: read
  `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`
  and `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`
  before writing code.
- Cache Components is enabled, so **do not** `export const dynamic = ...`; the
  build rejects it. A handler that must read request-time data calls
  `await connection()` from `next/server`. See `src/app/api/health/route.ts`.
- Only `src/lib/env.ts` may touch `process.env`. Import from `@/lib/env`.

## 2. Files

For a name like `invoices` (kebab-case it; nested segments are fine):

- `src/app/api/<name>/types.ts`: the types file.
- `src/app/api/<name>/route.ts`: the handler.

Do not overwrite existing files; stop and say so instead.

## 3. Types file

Zod is the source of truth, and the TypeScript types are inferred from it:

```ts
import { z } from "zod";

export const create<Name>Request = z.object({ /* fields */ });
export type Create<Name>Request = z.infer<typeof create<Name>Request>;

export type <Name>Response = { /* what the client receives */ };
export type ErrorResponse = { error: string; details?: unknown };
```

If `zod` is not in `package.json`, run `npm install zod` and say so in the
summary.

## 4. Handler

- Export one function per HTTP method the route supports (`GET`, `POST`, ...).
- Parse the body with `request.json()` inside `try/catch`; malformed JSON is a 400. Validate with `schema.safeParse`; on failure return 400 with
  `{ error: "Invalid request", details: result.error.flatten() }`.
- Status codes:
  - **400** invalid or malformed input
  - **404** the resource the request refers to does not exist
  - **409** the request conflicts with current state (duplicate, stale update)
  - **201** for successful creation, **200** otherwise
  - **500** for anything unexpected: catch it, log server-side, return a
    generic `{ error: "Internal server error" }` and never leak the message.
- Use `Response.json(body, { status })` with the response types from the types
  file. Give the data layer a clear seam (a function in `src/lib/`) and return
  404 or 409 from its typed result rather than string-matching errors. Until
  a real data layer exists, stub it and say it is a stub.

## 5. Verify and report

- Run `npm run typecheck`, `npm run lint` and `npm run build`.
- Report the files, the status codes the route can return, and any stub left.
