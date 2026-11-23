#!/usr/bin/env bash
# Loading budget — fails if an asset or the first-load payload is over budget.
# Budgets live here so the guardrail is enforced, not just documented (README → Loading).
set -uo pipefail
cd "$(dirname "$0")/.."
MAX_ASSET_KB=150      # any single image/font
MAX_TOTAL_KB=900      # everything in assets/ (img + icons + fonts) + bundles — the first-load payload
MAX_LAZY_KB=1000      # assets/lazy: loaded only by the screen that shows them (e.g. NeSL portal shots)
MAX_DESKTOP_KB=600    # desktop view: dist/desktop.* + assets/lazy/dsk (top level), fetched when switched to desktop
MAX_DESKTOP_SCREEN_KB=600  # assets/lazy/dsk/<screen>/: fetched only by the desktop screen that shows them (e.g. NeSL)
fail=0
while IFS= read -r f; do
  kb=$(( $(stat -f%z "$f") / 1024 ))
  if (( kb > MAX_ASSET_KB )); then echo "✗ $f is ${kb} KB (max ${MAX_ASSET_KB} KB) — resize to ≤3× its displayed size"; fail=1; fi
done < <(find assets/img assets/icons assets/fonts assets/lazy -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.svg' -o -name '*.woff2' \))
total=$(( $(find assets/img assets/icons assets/fonts dist -type f ! -name 'desktop.*' -print0 | xargs -0 stat -f%z | paste -sd+ - | bc) / 1024 ))
if (( total > MAX_TOTAL_KB )); then echo "✗ total payload ${total} KB (max ${MAX_TOTAL_KB} KB)"; fail=1; fi
lazy=0; [ -d assets/lazy ] && lazy=$(( $(find assets/lazy -type f -not -path 'assets/lazy/dsk/*' -print0 | xargs -0 stat -f%z | paste -sd+ - | bc) / 1024 ))
if (( lazy > MAX_LAZY_KB )); then echo "✗ lazy assets ${lazy} KB (max ${MAX_LAZY_KB} KB)"; fail=1; fi
desk=$(( $( { find assets/lazy/dsk -maxdepth 1 -type f ! -name '*.svg' -print0; find dist -type f -name 'desktop.*' -print0; } 2>/dev/null | xargs -0 stat -f%z | paste -sd+ - | bc) / 1024 ))
if (( desk > MAX_DESKTOP_KB )); then echo "✗ desktop view ${desk} KB (max ${MAX_DESKTOP_KB} KB)"; fail=1; fi
dscr=0; [ -n "$(find assets/lazy/dsk -mindepth 2 -type f 2>/dev/null)" ] && dscr=$(( $(find assets/lazy/dsk -mindepth 2 -type f -print0 | xargs -0 stat -f%z | paste -sd+ - | bc) / 1024 ))
if (( dscr > MAX_DESKTOP_SCREEN_KB )); then echo "✗ desktop screen-only images ${dscr} KB (max ${MAX_DESKTOP_SCREEN_KB} KB)"; fail=1; fi
if grep -rq 'assets/lazy' index.html; then echo "✗ index.html references assets/lazy — lazy assets must not load at boot"; fail=1; fi
if grep -q 'fonts.googleapis.com' index.html; then echo "✗ index.html loads Google Fonts — fonts must be self-hosted (offline-safe)"; fail=1; fi
n_css=$(grep -c '<link rel="stylesheet"' index.html || true); n_js=$(grep -c '<script src=' index.html || true)
if (( n_css > 1 || n_js > 1 )); then echo "✗ index.html loads ${n_css} stylesheets / ${n_js} scripts — use dist/ bundles only"; fail=1; fi
(( fail )) || echo "✓ loading budget ok · ${total} KB first load · ${lazy} KB lazy · ${desk} KB desktop (on demand) + ${dscr} KB desktop screen-only"
exit $fail
