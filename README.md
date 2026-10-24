# Horizon Wealth Planning

[![CI](https://github.com/bukitbrown/horizon-wealth-planning/actions/workflows/ci.yml/badge.svg)](https://github.com/bukitbrown/horizon-wealth-planning/actions/workflows/ci.yml)
[![Deploy](https://github.com/bukitbrown/horizon-wealth-planning/actions/workflows/deploy.yml/badge.svg)](https://github.com/bukitbrown/horizon-wealth-planning/actions/workflows/deploy.yml)

Marketing site for a Singapore financial planner aimed at people starting their first job. It aims to make visitors more money-aware and to get them to book a free chat.

**Live site:** https://bukitbrown.github.io/horizon-wealth-planning/

## Features

- **Payslip planner**: enter a salary and see CPF, estimated income tax, take-home pay, a needs/wants/savings split, an emergency-fund target and the CPF OA/SA/MA breakdown.
- **Cost of waiting** chart: what a monthly saving grows to by age 65 depending on the age you start.
- Singapore context throughout: CPF, resident tax, MediShield Life, HDB, CPF LIFE, S$ amounts.
- Responsive layout, scroll entrances, switch bands, FAQ index, slow photo crossfade and a looping video tile.
- Validated enquiry form (digits-only mobile number) and a Singapore time tile.

## Tech stack

Vanilla HTML, CSS and JavaScript in a single `index.html`. No framework, build step or package manager. Media lives in `assets/`.

## Run locally

Open `index.html` in a browser. Fonts load from Google Fonts.

## Structure

```
index.html   page, styles and scripts
assets/      photos, video loop and credits.json
.github/     CI (HTML validation, secret scan) and GitHub Pages deploy
```

## Notes

- The enquiry form has **no backend**: submissions are only logged to the browser console.
- Contact details, address and the sample plan card are placeholders.
- The planner is an illustration, not financial advice. CPF rates and tax bands are 2026 figures coded in the script; check them against CPF Board and IRAS before relying on them.
- Photos and the video are CC-licensed from Wikimedia Commons; credits are in the page footer and `assets/credits.json`.
