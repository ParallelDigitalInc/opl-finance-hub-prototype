#!/usr/bin/env python3
"""Inline the desktop SVG icons into dist/desktop.js as OPL.dIcons (one request instead of ~60).
Minifies whitespace and trims decimals, and drops only the ids nothing references:
masks, <use>, gradients and clip paths keep theirs, or the icon renders partly or not at all."""
import glob, json, os, re

REF = re.compile(r'(?:url\(#|href="#)([^)"]+)')

def mini(t):
    t = re.sub(r'\s*\n\s*', ' ', t.strip())
    t = re.sub(r'>\s+<', '><', t)
    refs = set(REF.findall(t))
    t = re.sub(r' id="([^"]*)"', lambda m: m.group(0) if m.group(1) in refs else '', t)
    return re.sub(r'(\d+\.\d{2})\d+', r'\1', t)

icons = {os.path.basename(f)[:-4]: mini(open(f).read()) for f in sorted(glob.glob('assets/lazy/dsk/*.svg'))}
broken = [k for k, v in icons.items() for r in REF.findall(v) if f'id="{r}"' not in v]
if broken:
    raise SystemExit(f"inline-icons: unresolved references in {sorted(set(broken))}")
print('window.OPL=window.OPL||{};OPL.dIcons=' + json.dumps(icons, separators=(',', ':'), ensure_ascii=False) + ';')
