# Niagara Jr Elite — Next.js + Bootstrap

This is the Next.js conversion of the modern parallax site.

## Install & run
```bash
npm install
npm run dev
```

## Static export (GitHub Pages / Netlify)
```bash
npm run export
```
Output: `out/`

## Notes
- Bootstrap CSS is imported in `app/layout.tsx`.
- Bootstrap JS bundle is loaded via CDN (for navbar collapse, carousel, accordion, modal).
- Parallax overlay movement uses `data-parallax` + a small client script.
- All images live in `/public/images/` (placeholders).
