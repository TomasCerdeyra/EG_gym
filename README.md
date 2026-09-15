# EG Gimnasio — Baradero

Landing page for EG Gimnasio, a gym in Baradero, Buenos Aires.

Brand colours, opening hours and photographs are taken from the gym's public
Instagram account, [@estebangonzalezgym](https://www.instagram.com/estebangonzalezgym/).

## Stack

- React 19 + Vite
- Tailwind CSS v4 (configured in `src/index.css`, no config file)
- GSAP + ScrollTrigger for scroll and intro animations
- TypeScript for newer components, alongside the existing `.jsx` files

## Getting started

```bash
npm install
npm run dev
```

## Before this goes live

- [ ] **Replace the placeholder phone number** in `src/data/site.js` (`GYM.whatsapp`).
      Every call to action on the page points at it.
- [ ] Ask the gym for the original photographs. The images in `src/assets` were
      recompressed by Instagram and are portrait or square, which crops hard in
      the full-viewport sections.
- [ ] Optional: supply a short clip for `REVEAL_VIDEO` in
      `src/components/SpotlightSection.tsx`. Without one the spotlight reveals a
      second copy of the same photograph, which is the intended fallback.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `node scripts/optimize-images.mjs` | Downscale and re-encode `src/assets/eg-*.jpg` |
| `node scripts/asset-sink.mjs` | Local importer for pulling photos out of Instagram |

### Importing photos from Instagram

Instagram's CDN URLs are signed and expire within days, so they cannot be linked
directly. `scripts/asset-sink.mjs` runs a local server on port 7788; the
Instagram tab hands it a list of URLs through the page fragment and Node
downloads them into `src/assets`. Run `optimize-images.mjs` afterwards.

## Notes

- Full-viewport backgrounds are capped at 2400px, gallery thumbnails at 1200px.
  A lower cap made the `100dvh` sections visibly soft.
- Gallery images load eagerly on purpose. See the comment in
  `src/components/Gallery.tsx`.
- The mobile menu panel is a sibling of `<header>`, not a child, because the
  header's `backdrop-filter` would otherwise become the containing block for its
  fixed descendants.
