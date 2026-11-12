---
name: pr-review
description: Review a pull request with three parallel subagents (bug hunter, performance reviewer, security reviewer) and merge their findings into one review. Given a PR number it reviews that PR, otherwise the current branch. Named pr-review because /review is Claude Code's own bundled review.
argument-hint: "[pr-number]"
allowed-tools: Bash(gh pr diff:*), Bash(gh pr view:*), Bash(git diff:*)
---

Review a pull request. Arguments: `$ARGUMENTS`.

## 1. Pick the diff command

- If `$ARGUMENTS` is a PR number `<n>`, the diff command is `gh pr diff <n>`.
- If it is empty, the diff command is `git diff main...HEAD`, which reviews the
  current branch against `main`.

Run it once yourself to confirm it produces a diff. If it is empty, say there
is nothing to review and stop. With a PR number, also run
`gh pr view <n> --json title,state` for the title and whether it is merged.

## 2. Run the three reviewers in parallel

In **one message**, spawn three subagents with the Agent tool: `bug-hunter`,
`performance-reviewer` and `security-reviewer`. Tell each only the diff command
from step 1 and the PR title. **Each agent runs that command itself**; do not
paste the diff into the prompt, and do not share one agent's output with
another.

## 3. Write one review

Combine the three reports into a single review:

- Group findings by severity under **High**, **Medium** and **Low** headings.
- Merge duplicates: when two reviewers report the same problem, keep one entry
  and note who raised it. Agreement across angles raises confidence.
- Each entry: `file:line`, what is wrong, the one-line fix, and the reviewer(s)
  that raised it. Check the cited line yourself and mark anything you could not
  confirm as _unconfirmed_ instead of dropping it.
- Do not add findings of your own.
- End with a **Verdict**: `approve`, `approve with nits` (only low findings), or
  `changes requested` (any high, or medium that should block).

This skill only reports. Never comment on, approve or merge the PR.
