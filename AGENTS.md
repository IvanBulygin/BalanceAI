# AGENTS.md

## Cursor Cloud specific instructions

This is a zero-dependency static HTML/CSS/JS landing page (BalanceAI). There is no build step, no package manager, no backend, and no test framework.

### Running the dev server

Serve the site with any static file server from the repo root:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080/` in Chrome. The page loads `index.html`, `styles.css`, and `script.js` directly — no transpilation or bundling.

### Key notes

- **No dependencies to install.** No `package.json`, `requirements.txt`, or similar exists.
- **Google Fonts are loaded from CDN.** Without internet the page still works but falls back to system fonts.
- **No automated tests exist.** Manual browser testing is the only verification method. Core interactions to check: scroll animations, character eye tracking, mobile menu toggle, and the CTA email form submission (button text should change to "Welcome aboard!" on submit).
- **No linting or type checking** is configured.
