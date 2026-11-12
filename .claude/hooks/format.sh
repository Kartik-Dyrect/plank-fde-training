#!/usr/bin/env bash
# PostToolUse hook: run Prettier on any file Claude just edited or wrote.
# Never blocks the edit: formatting problems are reported, not fatal.
set -u

file="$(jq -r '.tool_input.file_path // empty')"
[ -n "$file" ] && [ -f "$file" ] || exit 0

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
case "$file" in
  "$root"/*) ;;
  *) exit 0 ;;
esac
case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.json|*.css|*.md|*.yml|*.yaml) ;;
  *) exit 0 ;;
esac

cd "$root" || exit 0
# Prettier honours .prettierignore, so ignored files are left alone.
npx --no-install prettier --write --log-level warn "$file" >&2 || true
exit 0
