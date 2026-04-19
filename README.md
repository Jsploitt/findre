# FindRE — Public Frontend (Phase 1)

Boutique real estate in Northern Riyadh. Bilingual (Arabic default, English secondary), mobile-first, WhatsApp-first.

## Stack

- Next.js 15 (App Router) · TypeScript
- Tailwind CSS · `next-intl` (locale-prefixed `/ar`, `/en`)
- `lucide-react` · `zod` · `next/image`

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — redirects to `/ar` by default. Use the header toggle for EN.

## Project layout

```
src/
  app/[locale]/          # pages: /, /properties, /properties/[slug], /about, /contact
  app/api/contact/       # contact form stub
  components/            # ui/, layout/, property/, filters/, home/, forms/
  content/               # properties.ts (sample data), site.ts (contact config)
  i18n/                  # routing, request config, messages/ar.json, messages/en.json
  lib/                   # whatsapp, formatters, filter, cn
  types/property.ts
public/
  brand/                 # logo-primary.svg, logo-white.svg, mark.svg, pattern.svg, favicon.svg
  images/properties/<slug>/   # drop photos here, named 01.jpg, 02.jpg, ...
  images/hero/           # hero.jpg
  images/about/          # story.jpg, a1.jpg, a2.jpg, a3.jpg
```

## How to add / update a property

1. Open `src/content/properties.ts`.
2. Copy an existing entry and change the fields. Required: `id`, `slug`, `title`, `description`, `type`, `status`, `district`, `city`, `area`, `images`, `location`, `createdAt`.
3. Create `public/images/properties/<slug>/` and drop photos as `01.jpg`, `02.jpg`, ... (shoot order).
4. Reference those paths in the `images` array.
5. To mark a property as taken, change `status: "available"` → `"booked"`.

## Swapping photos

Just replace files in `public/images/properties/<slug>/`. No code changes needed.
Missing photos gracefully fall back to a branded gradient tile — safe to launch before the shoot.

## Changing WhatsApp / contact info

Edit `src/content/site.ts` — single source of truth for the FAB, header CTA, footer, contact page, and all WhatsApp message builders.

```ts
export const site = {
  whatsappNumber: "9665XXXXXXXX",   // E.164, no "+" or spaces
  phoneDisplay: "+966 5X XXX XXXX",
  email: "hello@findre.co",
  domain: "findre.co",
  ...
};
```

## Adding / changing a locale

1. Add the locale code in `src/i18n/routing.ts` (`locales` array).
2. Create `src/i18n/messages/<locale>.json` mirroring `en.json`.
3. If RTL, set `dir="rtl"` handling in `src/app/[locale]/layout.tsx` (already handles `ar`).

## Brand assets

Replace files in `public/brand/` keeping the same filenames:
- `logo-primary.svg` (on light) · `logo-white.svg` (on navy) · `mark.svg` (square) · `pattern.svg` (tiling) · `favicon.svg`

## Deploy

Any Next.js 15 host (Vercel recommended). No secrets required in Phase 1 — `/api/contact` is a stub that logs and returns `{ ok: true }`. Wire it to an email/CRM provider when ready.

## Roadmap (post-Phase 1)

- CMS swap: replace `getProperties()` / `getProperty(slug)` in `src/content/properties.ts` — components already consume the typed interface.
- Interactive map (Maps API key).
- Analytics and inquiry routing.
