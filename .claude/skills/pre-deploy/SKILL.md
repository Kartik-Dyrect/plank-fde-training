---
name: pre-deploy
description: Pre-deployment checks. Runs the type check, the tests, a console.log search and a missing-env-var check, then reports a pass/fail table and a verdict.
disable-model-invocation: true
allowed-tools: Bash(npm run typecheck:*), Bash(npm test:*), Bash(grep:*), Bash(node:*)
---

## Type check

!`npm run typecheck 2>&1 | tail -n 25; echo "exit code: ${PIPESTATUS[0]}"`

## Tests

!`npm test 2>&1 | tail -n 25; echo "exit code: ${PIPESTATUS[0]}"`

## console.log under src/

!`grep -rnE "console\.log" src; echo "exit code: $? (1 means no matches)"`

## Missing environment variables

!`node -e 'try{process.loadEnvFile(".env.local")}catch{};const n=require("fs").readFileSync(".env.example","utf8").split("\n").map(l=>l.match(/^([A-Z_][A-Z0-9_]*)=/)?.[1]).filter(Boolean);const m=n.filter(k=>!process.env[k]);console.log(m.length?"missing: "+m.join(", "):"none missing ("+n.length+" checked)")'`

## Your task

The four results above already ran. Do not run anything else and do not fix
anything. Reply with exactly:

1. A table with columns Check, Result (PASS or FAIL), Detail, covering type
   check, tests, console.log, env vars. Type check and tests pass on exit code 0. console.log passes only when grep found nothing. Env vars pass only when
   none are missing.
2. One line: **Verdict: PASS** or **Verdict: FAIL**. FAIL if any check fails.

Nothing else.
