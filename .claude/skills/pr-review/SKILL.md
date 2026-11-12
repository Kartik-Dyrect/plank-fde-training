---
name: pr-review
description: Review a pull request with three parallel subagents (bug hunter, performance reviewer, security reviewer) and merge their findings into one review. Use when asked to review a PR. Named pr-review because /review is Claude Code's own bundled review.
argument-hint: <pr-number>
disable-model-invocation: true
allowed-tools: Bash(gh pr view:*), Bash(gh pr diff:*), Bash(gh pr checks:*)
---

Review pull request `$ARGUMENTS` (a number; if empty, use the PR for the
current branch via `gh pr view --json number`).

## 1. Gather context

Run `gh pr view <n> --json title,body,baseRefName,headRefName,state,files` and
`gh pr diff <n>`. Note whether the PR is open or already merged; a merged PR is
still reviewable, but say so in the report. If the diff is huge, review by
file list rather than pasting it all.

## 2. Run the trio in parallel

In **one message**, spawn three subagents with the Agent tool, one each of
`bug-hunter`, `performance-reviewer` and `security-reviewer`. Give each the
PR number, title, one-line summary of intent and the list of changed files.
Do not tell them what you think is wrong, and do not share one agent's output
with another: independent reads are the point.

## 3. Merge the findings

- Drop any finding without a `file:line` and a concrete reason.
- Verify each remaining finding yourself by reading the cited lines. Mark
  ones you could not confirm as _unverified_ rather than deleting them.
- Merge duplicates, noting which reviewers raised it (agreement across lenses
  raises confidence). Keep each finding under its lens heading so the author
  can tell a bug from a performance or security concern.
- Rank: high, medium, low.

## 4. Report

Print, in this order: PR title and state; a **verdict** (`approve`,
`approve with nits`, or `changes requested`); the ranked findings, each as
`severity: file:line: problem, why it matters, suggested fix, raised by`; then
anything the reviewers disagreed about. If there are no findings, say so
plainly.

Never post comments, approve or merge on GitHub from this skill; it only
reports. If the user wants comments posted, they will ask.
