# Be Healthy — Nutrition Plan Landing Page

**[Live Demo →](https://testpage-for-behealthy.netlify.app)**

Commercial landing page for **behealthyplan.ru** — a personalized nutrition plan service.  
Conversion funnel: **Hero → 7-step quiz → Processing screen → Offer + payment**.

---

## Stack

| Layer | Tools |
|---|---|
| Build | Gulp 4, Webpack 5, BrowserSync |
| Styles | SCSS, autoprefixer, gulp-group-css-media-queries, gulp-clean-css |
| Scripts | Vanilla JS (ES6 modules), Babel (`@babel/preset-env`), Terser |
| Templating | gulp-file-include (HTML partials) |
| Images | gulp-webp, gulp-image, gulp-svg-sprite |
| Runtime deps | swiper, just-validate, inputmask, choices.js, nouislider, tippy.js |

---

## Highlights

**Multi-step quiz engine** — 7-step wizard built in vanilla JS. State is tracked per step via `data-*` attributes; answers accumulate in a plain `quizResults` object ready for API submission. Supports back-navigation and a clickable progress bar that jumps to any arbitrary step.

**Custom `ModalConstructor` class** — zero-dependency modal system with configurable CSS class names, `animTime`, dynamic `innerHTML` injection, optional overlay/Escape close, and static vs. dynamic render modes. Used for auth, unsubscribe, and redirect confirmation flows.

**Two-step cancellation flow** — churn-reduction UX: a pre-cancel survey modal (radio + textarea) gates the actual CloudPayments redirect behind an explicit confirmation modal. Both modals are wired through `ModalConstructor` chains.

**Image pipeline** — all raster assets built to WebP with JPG/PNG `<picture>` fallback; `loading="lazy"` on all below-fold images; two separate SVG sprite tasks (monochrome UI icons + color sprites).

**Build modes** — `gulp` for dev (sourcemaps, live-reload) and `gulp build --build` for production (minified CSS/JS/HTML, no sourcemaps). Webpack handles ES module bundling inside the Gulp pipeline via `webpack-stream`.

---

## Project Structure

```
src/
├── index.html / registration.html
├── html-parts/
│   └── sections/           # Partials: hero, quiz, processing, offer, modals
├── js/
│   └── components/
│       ├── parts/           # Per-section logic modules
│       └── vendor/          # ModalConstructor
├── scss/                    # SCSS split by block/section
└── img/ resources/
gulp/
├── configs/                 # Paths, shared plugins
└── tasks/                   # html, scss, js, images, sprite, copy, server
```

---

## Getting Started

```bash
npm install

npm run dev      # dev server with live-reload
npm run build    # production build → dist/
```

