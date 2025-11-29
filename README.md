# DevOps → AI Roadmap Tracker

## What this is
A lightweight client-side web app to track your DevOps → AI learning roadmap:
- Home timeline (multi-row, phase headers)
- Topic detail view (concepts, skills, resources, POC)
- Progress overview (completed vs pending)
- Export / Import progress (JSON & CSV)
- Light/Dark theme, persisted

## How to run
1. Save files as shown in the project structure.
2. Open `index.html` in a browser (Chrome/Edge/Firefox).
3. Interact: click nodes, mark complete, export/import progress.

## Export / Import
- **Export JSON** produces `{ savedAt, done }`.
- **Export CSV** produces rows: `id,title,phase,week,done`.
- Import accepts either JSON (same shape) or CSV with `id` and `done` columns.

## Notes
- All data is stored in `localStorage` under key `roadmap_done`.
- You can edit `assets/script.js` to customize roadmap topics, weeks, deadlines, and POCs.

## Next steps (optional)
- Zip & download (I can generate zip for you)
- Split into React / Vue app for stateful server sync
- Add user auth and cloud sync
