# Volker Derksen – Portfolio

Personal portfolio website of **Volker Derksen**, Frontend Developer based in Cologne.  
Built with Angular 21, SCSS, and ngx-translate (DE / EN).

🌐 **Live:** [umgestalt.de](https://umgestalt.de)

---

## About the project

This portfolio showcases selected frontend projects and reflects my approach to building clean, responsive, and accessible web interfaces. The design is custom, the copy is bilingual, and the entire codebase is written in Angular 21 with standalone components.

**Sections:**

- **Home** – Hero / entry point with animated section navigation
- **About** – Short bio, skills dialog, links
- **Tech** – Technology stack overview
- **Work** – Project carousel (El Pollo Loco, Join, DailyDash, …)
- **Testimonials** – Feedback from colleagues and clients
- **Contact** – Validated contact form with success/error feedback
- **Legal** – Imprint & Privacy policy

---

## Tech stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | Angular 21 (standalone components)  |
| Styling   | SCSS with custom design tokens      |
| i18n      | ngx-translate (DE default, EN)      |
| Forms     | Angular template-driven forms       |
| HTTP      | Angular HttpClient → `sendMail.php` |
| Routing   | Angular Router (lazy-loaded home)   |
| Build     | Angular CLI / esbuild               |

---

## Getting started

**Prerequisites:** Node.js ≥ 18, npm ≥ 9

```bash
# Install dependencies
npm install

# Start dev server (opens browser automatically)
npm start

# Production build
npm run build
```

The dev server runs at `http://localhost:4200`.  
The production build output goes to `dist/portfolio/`.

---

## Project structure

```
src/
  app/
    features/       # Page sections (home, about, tech, work, …)
    layout/         # Shell, header, footer, navigation
    shared/         # UI components, services, directives
  styles/           # Global SCSS tokens, mixins, typography
public/
  assets/
    i18n/           # de.json / en.json translation files
    images/         # Icons, project screenshots, logos
    fonts/          # Eczar, Quicksand
```

---

## Contact form

The form POSTs to `https://umgestalt.de/sendMail.php`.  
During local development, set `mailTest = true` in `contact.ts` to suppress actual HTTP requests.

---

## License

This project is personal and not intended for reuse or redistribution.  
© 2026 Volker Derksen
