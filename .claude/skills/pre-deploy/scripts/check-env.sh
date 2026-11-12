#!/usr/bin/env bash
# Verify every variable named in .env.example is set, either in the shell
# environment or in .env.local. Prints names only, never values.
# Commented-out lines in .env.example are optional and are not checked.
set -u
cd "$(dirname "$0")/../../../.." || exit 2

example=".env.example"
[ -f "$example" ] || { echo "FAIL: $example not found"; exit 2; }

missing=0
checked=0
while IFS= read -r name; do
  checked=$((checked + 1))
  value="${!name:-}"
  if [ -z "$value" ] && [ -f .env.local ]; then
    value="$(grep -E "^${name}=" .env.local | tail -n1 | cut -d= -f2- | tr -d '"'"'" )"
  fi
  if [ -n "$value" ]; then
    echo "set      $name"
  else
    echo "MISSING  $name"
    missing=$((missing + 1))
  fi
done < <(grep -oE '^[A-Za-z_][A-Za-z0-9_]*=' "$example" | tr -d '=')

echo "checked $checked, missing $missing"
[ "$missing" -eq 0 ]
