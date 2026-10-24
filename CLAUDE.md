# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing site for "Horizon Wealth Planning", a Singapore financial planner aimed at young professionals starting their careers. The page is `index.html`: CSS in one `<style>` tag, JS in one `<script>` tag, plus local media in `assets/`. No frameworks, no build tools, no package manager, no tests. Keep it that way (vanilla HTML/CSS/JS only).

Goals of the copy and design: motivate financial awareness (see where your pay goes, the cost of waiting), appeal to first-jobbers, and be Singapore-specific (CPF, resident tax, MediShield Life, HDB, S$ amounts).

## Running

Open `index.html` directly in a browser (no server needed). Fonts load from Google Fonts. Pictures and the Merlion loop are local files in `assets/` (CC-licensed from Wikimedia Commons; credits are in the footer `.credits` paragraph and `assets/credits.json`). If you add or remove a picture, update the credit line.

`.claude/skills/design-taste-frontend/` holds a design skill with `scripts/inspect.mjs` (browser measurements) and `scripts/lint.mjs`; `.taste-skill/` is its working output.

## Architecture

Everything is organised by numbered, commented sections that mirror each other across CSS, HTML and JS:

- **CSS**: design tokens are custom properties in `:root` (white ground, ink `#0F1720`, accent red `#D3202E`, flat fields `--f1`..`--f5`, one `--radius`). Mobile-first; breakpoints at 768px, 900px and 1024px.
- **JS**: independent IIFEs (`initNav`, `initFadeIn`, `initPlanner`, `initWaiting`, `initBands`, `initFaq`, `initCrossfade`, `initCta`, `initForm`, `initClock`, `initToTop`), each wired to element IDs in the markup. Renaming an ID or class in HTML means updating the matching IIFE.

Sections in page order: hero + payslip planner, cost of waiting (bars), how it works, Singapore rules (picture tiles), what we do (switch bands), letter, FAQ, closing tiles, enquiry form, footer tiles.

Non-obvious couplings:

- **Payslip planner** (`initPlanner`): CPF rates (20% employee, 17% employer, OA/SA/MA split 23/6/8 of 37, Ordinary Wage ceiling S$8,000) and the resident tax bands are constants in the JS. They are 2026 figures for Citizens/PRs aged 55 and below; update them when CPF or IRAS change. The same CPF numbers are quoted in copy (feature bands, rule tiles, FAQ).
- **Cost of waiting** (`initWaiting`): bar values come from one future-value function (4% p.a. compounded monthly, to age 65). The "about S$355,000" in the investing band and the S$146k headline depend on the default S$300/month. Bars use `--p` (percent of the tallest); desktop height and mobile width both derive from it, and only bars with `data-m` show on phones.
- **FAQ**: each `.q` button carries its answer in `data-a` (desktop sticky pane) and the same text in `.a-inline` (phone accordion). Keep the two identical.
- **Feature bands**: each `.band` has a `role="switch"` toggle; `.on` fills the band with a field colour chosen by `:nth-child`.
- **Scroll animations**: elements with `.fade-in` get `.visible` from an IntersectionObserver. They are only hidden when `html.js` is set (inline script in `<head>`), so the page still reads without script. Do not put `.fade-in` on very tall blocks (the form card) or the reveal may not fire.
- **Header** hides on scroll down and returns on scroll up so it never covers headings.
- **Enquiry form**: validators are keyed by field ID in the `validators` object; each writes to `#<id>-err` and toggles `.invalid`. Mobile number must be digits only, 8–15. The closing-tile email (`#ctaEmail`) pre-fills `#email` and scrolls to the form. On valid submit, the form is replaced after a 1.5s fake delay, with the data logged via `console.log` (no backend; wire one up before launch).
- Footer year and Singapore time (`#sgTime`, `Asia/Singapore`) are set by JS; the back-to-top button shows after 400px scroll.
- Placeholder details to replace before launch: address, phone, email, and any regulatory statement (e.g. MAS licence) in the footer.
