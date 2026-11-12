---
name: pre-deploy
description: Pre-deployment checklist. Runs the type check and test suite, searches source for console.log, verifies the env vars named in .env.example are set, and reports PASS or FAIL. Use before deploying or merging to main.
disable-model-invocation: true
---

Run these four checks from the repo root. Run all of them even if one fails,
then print one summary. Do not fix anything; report only.

## 1. Type check

Run `npm run typecheck`. It runs `next typegen && tsc --noEmit`; the typegen
step is needed because `LayoutProps` is a generated global and a clean
checkout fails `tsc` without it.

## 2. Tests

Read the `scripts` in `package.json`. If a `test` script exists, run
`npm test`. If there is none, the result is **SKIP (no test runner
configured)**, which is a warning, not a pass. Say so plainly.

## 3. console.log

Run:

```bash
grep -rnE "console\.log\s*\(" src --include=*.ts --include=*.tsx --include=*.js --include=*.jsx
```

Any match is a **FAIL**; list each as `file:line`. `console.error` and
`console.warn` are fine. Ignore matches inside comments only if you read the
line and it is clearly a comment.

## 4. Environment variables

Run `bash .claude/skills/pre-deploy/scripts/check-env.sh`. It reads the
variable names from the uncommented lines of `.env.example` and checks each is
set in the shell environment or in `.env.local`. It prints names only, never
values. Exit code 1 means at least one is missing: **FAIL**, and list them.

## Summary

Print a table, then a one-line verdict:

| Check | Result | Details |
| ----- | ------ | ------- |
| Type check | PASS/FAIL | error count |
| Tests | PASS/FAIL/SKIP | counts or reason |
| console.log | PASS/FAIL | locations |
| Env vars | PASS/FAIL | missing names |

Verdict: **PASS** only if no check is FAIL. A SKIP does not fail the run, but
call it out. Otherwise **FAIL: do not deploy**.
