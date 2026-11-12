---
name: api-route
description: Create a Next.js API route in src/app/api/<name>/ with Zod schemas, one handler per HTTP method, and tests. Use when asked to add an API endpoint.
argument-hint: <name> [methods]
disable-model-invocation: true
---

Arguments: `$ARGUMENTS`. The first word is the route name (kebab-case). Any
further words are HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`); with
none given, use `GET`.

## Read first

- `AGENTS.md`, and `src/app/api/health/route.ts` as the existing route to match.
- This Next.js version has breaking changes. Cache Components is on, so do
  **not** `export const dynamic`. A handler that reads request-time data
  awaits `connection()` from `next/server`, as the health route does.
- Only `src/lib/env.ts` may read `process.env`.

## Files: create exactly these three in `src/app/api/<name>/`

Never overwrite existing files; stop and say so.

### `types.ts`

Zod is a library that validates data and infers its TypeScript type. Define a
request schema and a response schema, and export the inferred types:

```ts
import { z } from "zod";

export const <name>Request = z.object({ /* fields */ });
export type <Name>Request = z.infer<typeof <name>Request>;

export const <name>Response = z.object({ /* fields */ });
export type <Name>Response = z.infer<typeof <name>Response>;
```

### `route.ts`

- Export one function per method: `export async function POST(request: Request)`.
- Methods with a body (`POST`, `PUT`, `PATCH`) read `request.json()` inside
  `try/catch` and validate with `<name>Request.safeParse`. On a malformed body
  or a failed parse, answer **400** with
  `Response.json({ error: "Invalid request", issues: result.error.issues }, { status: 400 })`.
- `GET` and `DELETE` take no body; validate query parameters the same way if
  the route uses any.
- On success return `Response.json(<validated response>)` (201 for `POST`).
- Keep the logic a minimal, honest stub and say it is a stub in the report.

### `route.test.ts`

Import the handlers directly and call them with `new Request(...)`:

- one test per exported method, asserting status and body;
- one more test sending invalid input, asserting status 400 and that `issues`
  is present.

## Finish

Run `npx vitest run src/app/api/<name>` and `npm run typecheck`. Report the
three files, the methods, and any stub left in place.
