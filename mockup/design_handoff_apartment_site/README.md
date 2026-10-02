# Handoff: Apartment Rental Site (Casa Alboraya)

## Overview
A personal-apartment site (Alboraya, near Valencia) for showing the place to friends/potential guests and collecting *date requests* — no payment, no auto-confirmation. Paper-collage aesthetic: turquoise cutting-mat grid, cutout photos with white "sticker" borders, tape-corner accents, handwritten touches. Bilingual RU/EN via a toggle. Multi-page: Home, Gallery, Dates, Area, plus a separate (unlisted) Guest Guide page.

## About the Design Files
The `.dc.html` files in this bundle are **design references** built in our internal prototyping format (a small custom templating runtime loaded via `support.js`, with `{{ }}` template holes and a JS "logic" class driving state — not React/Vue source). They render correctly as standalone HTML if opened in a browser, so you can see exact layout/behavior, but **do not copy the templating syntax into a real codebase**. Treat them as pixel/behavior references: recreate the same DOM structure, styles, copy, and interactions using the target codebase's existing framework and component patterns (or the best-fit framework if none exists yet).

## Fidelity
**High-fidelity.** Colors, fonts, spacing, and copy are final-intent (though several factual placeholders remain — see "Content placeholders" below). Recreate pixel-close using the values in "Design Tokens".

## Screens / Views

### 1. Home (`Home.dc.html`)
- **Purpose**: First impression — hero photo placeholder, tagline, two CTAs, short "story" copy, quick-facts cards, links into Gallery/Dates/Area.
- **Layout**: Sticky header (logo + nav + lang toggle) → full-width hero section (2-col grid on desktop: copy left, photo right; grid-template-columns `1.1fr 1fr`, gap 40px, max-width 1120px centered) → single-column story section (max-width 760px) → 3 loosely-rotated "sticky note" cards in a wrapping flex row (max-width 1120px) → 3-tile CTA link grid (`repeat(3, 1fr)`) → footer.
- **Hero background**: diagonal 5-stop gradient evoking sky→sea→sand (`linear-gradient(158deg, #aecdc2 0%, #4fa89a 40%, #1c7d78 55%, #d9c69e 78%, #e6d3a0 100%)`) with a faint 36×36px white grid overlay (2 linear-gradients at `rgba(255,255,255,.07)`, 1px lines).
- **Header/footer background**: solid brand teal `#16918c` with a stronger grid overlay (`rgba(255,255,255,.14)`, same 36px grid).
- **Hero photo card**: white padding (10px), 5px radius, big soft shadow, rotated 2°, containing the apartment photo placeholder (4:3). Two small rotated "tape" rectangles (`#7c9a4a` @ 88% opacity) at top-left and bottom-right corners. A small white rotated "sticky note" reading "привет :)" overlaps the bottom-left of the photo.
- **Quick-facts cards** ("Что внутри" / "Терраса" / "Что полезно знать"): off-white cards (`#fffdf6`, border `#e8e2d0`, radius 4px, soft shadow), each slightly rotated (-1.5°/1°/-0.8°), each with one green tape rectangle at the top edge. List items are plain checkmarks; unknown facts show a dashed-underline "уточню/tbd" badge (see Design Tokens).
- **CTA tiles**: 3 solid-color link cards — teal `#16918c` (Gallery), orange `#ef8a3d` (Dates), darker teal `#3a7d78` (Area) — each with a Caveat-script title and small subcopy.
- **Content/copy** (RU, default language): see the `dict.ru` object in the file's logic class for exact strings; EN mirrors it in `dict.en`.

### 2. Gallery (`Gallery.dc.html`)
- **Purpose**: Room-by-room photo placeholders (living room, bedroom, kitchen, balcony, terrace, house pool, house detail) — explicitly marked as mocks, easy to swap for real photos later.
- **Layout**: Header (same as Home, "Galerie" nav item active) → intro (kicker + H1 + one paragraph, max-width 1120px) → responsive card grid (`repeat(auto-fit, minmax(240px,1fr))`, gap 36px/28px) → italic mock-disclaimer note → footer.
- **Room card**: same white-sticker treatment as the hero photo (white padding, radius 5px, shadow, per-card rotation between -1.5° and 1.4°), one tape rectangle per card (colors alternate green `#7c9a4a` / amber `#d7973f`), room name below in Space Grotesk bold 15px.

### 3. Dates (`Dates.dc.html`)
- **Purpose**: Mock month calendar (October 2026, hardcoded demo data) + a date-request form. No payment, no auto-confirmation — copy explicitly states "dates are confirmed after my reply."
- **Layout**: Header → intro + a persistent amber notice banner (`#fff4de` bg, `#6b4c1f` text) restating the confirm-after-reply rule → calendar card (white, radius 8px, shadow) → legend row → italic iCal/Booking.com sync-delay note → request form card (swaps for a demo "submitted" confirmation card after submit).
- **Calendar grid**: 7-column CSS grid, Monday-first weekday header row, one row per week. Each day is a square (`aspect-ratio:1`) button with 4 possible visual states:
  - **Available** (can request): white bg, 2px teal (`#16918c`) border, teal text.
  - **Booked**: flat grey `#d8d4cc` bg, muted `#8a8378` text, no border, `cursor:not-allowed`.
  - **Selected** (user picked, not yet submitted): solid orange `#ef8a3d` bg, white text.
  - **Pending** (selected + submitted): pale amber `#f2c896` bg, brown `#6b4c1f` text, locked.
  - Mock booked days (hardcoded): 3, 4, 5, 14, 15, 22, 23.
- **Legend**: 4 small swatches matching the states above, with labels.
- **Request form fields**: Name (text), "How to reach you" (free text — contact channel intentionally left open/unspecified), Message (textarea, optional). Submit button disabled (grey `#c9c2b2`) until ≥1 date is selected; enabled state is orange `#ef8a3d`.
- **Submit behavior (demo only)**: Clicking Submit does **not** send anything for real — it flips selected days to "pending" and swaps the form for a green demo-confirmation card (`#e7f1e0` bg) explaining this is a prototype and a "Pick different dates (demo)" reset button.
- **iCal note**: explains that a Booking.com calendar can later be wired in via iCal to mark booked dates, but sync can lag, so even a shown-open date is only a request, never a guaranteed booking. The iCal feed URL and guest data must never be exposed client-side when implemented for real.

### 4. Area (`Area.dc.html`)
- **Purpose**: Orient the guest — Alboraya, next to Malva-rosa, near Valencia — with an approximate (not exact) map.
- **Layout**: Header → 2-col intro (copy left, map-photo card right, same white-sticker/tape/rotated-note treatment as the hero) on desktop, stacks on narrow widths → 3-column flex row of plain fact cards (Malva-rosa / Valencia / "feel") → italic disclaimer that beach distance/parking/etc. are unconfirmed → footer.
- Exact address and entry instructions are deliberately **not** on this page (public-safe only).

### 5. Guest Guide (`Guide.dc.html`) — separate, unlisted page
- **Purpose**: Practical checklists for confirmed guests only. Reached by direct link, not in main nav; footer of every public page links to it quietly, no password UI (per product decision).
- **Layout**: Simplified darker-teal header (`#3a7d78`) with a "guest page" pill badge instead of nav → intro + amber address-placeholder notice → two prominent red/coral warning callouts → 5 checklist sections (Before arrival / Turning everything on / In the apartment / Terrace / Before checkout), each a dashed-underline heading + checkbox-style list items.
- **Warning callouts**: pale coral bg `#f6d9d4`, thick left border `#c94b3d` (6px), dark red heading/body text (`#8a2418` / `#5c2117`), each slightly counter-rotated (∓0.4°). One warns the **front door self-locks** (take a key even for a quick errand), the other that the **balcony door can slam shut** in wind.
- **Content**: All checklist items are explicit placeholders ("уточню" / "notes coming here" / "tbd") — no real address, keys, or access info is present anywhere in this bundle.

## Interactions & Behavior
- **Language toggle** (top-right pill button, every page): flips all page copy between `dict.ru` / `dict.en`. Persisted in `localStorage` under key `apt_site_lang` so the choice carries across page navigations.
- **Mobile nav**: below 760px viewport width, the inline nav row is replaced by a ☰ hamburger button that toggles a stacked dropdown nav (plain show/hide, no animation).
- **Gallery/Home/Area photo placeholders**: drag-and-drop image slots (see "Assets" — implemented via a small custom `<image-slot>` web component in this prototype; in the real codebase, replace with your standard image component/CMS field).
- **Dates calendar**: clicking an "available" day toggles it into "selected" (multi-select, no drag-range). Booked/pending days are non-interactive. Submitting requires ≥1 selected day.
- **Dates form submit**: client-side only in this prototype — no network call. Swaps to a confirmation state; "Pick different dates (demo)" clears selection and returns to the form.
- No hover states beyond default link-underline are defined; add conventional hover/focus states (per your design system) when implementing for real.

## State Management
- `lang: 'ru' | 'en'` — per-page component state, initialized from `localStorage`, written back on toggle.
- `menuOpen: boolean` — mobile nav dropdown, Home/Gallery/Dates/Area only.
- Dates page only:
  - `selectedDays: number[]` — currently selected day numbers.
  - `submitted: boolean` — whether the demo "request" has been sent.
  - `name`, `contact`, `message: string` — form field values.
- No page persists calendar selection or form values across reload (demo state only).

## Design Tokens

### Colors
- Page background (paper): `#fbf9f3`
- Brand teal (header/footer/primary links/accents): `#16918c`
- Darker teal tile (Area CTA): `#3a7d78`
- Hero gradient stops (sky → sea → sand): `#aecdc2`, `#4fa89a`, `#1c7d78`, `#d9c69e`, `#e6d3a0`
- Primary CTA orange: `#ef8a3d`
- Tape accents: green `#7c9a4a` (88% opacity), amber `#d7973f` (88% opacity)
- Ink / body text: `#23211d` (headings), `#3a3733` (body)
- Muted text: `#8a8378`
- "TBD" badge: dashed underline `#c9a24a`, text `#a3763a`
- Card surface (off-white): `#fffdf6`, border `#e8e2d0`
- Calendar: available border `#16918c`; booked `#d8d4cc` / text `#8a8378`; selected `#ef8a3d`; pending `#f2c896` / text `#6b4c1f`
- Amber notice banner: bg `#fff4de`, text `#6b4c1f`
- Demo-confirmation banner: bg `#e7f1e0`, text `#3e6b28`
- Warning callout (Guide): bg `#f6d9d4`, border `#c94b3d`, heading `#8a2418`, body `#5c2117`

### Typography
- Headings / nav / buttons: **Space Grotesk**, weights 500/600/700
- Body text: **Nunito Sans**, weights 400/600/700/800
- Handwritten accents (kickers, stickers, brand logo wordmark): **Caveat**, weights 600/700
- Loaded from Google Fonts: `Space+Grotesk:wght@500;600;700`, `Nunito+Sans:wght@400;600;700;800`, `Caveat:wght@600;700`
- Hero H1: `clamp(32px, 5vw, 54px)`, line-height 1.08, weight 700
- Section H1s: `clamp(26–28px, 4vw, 38–42px)`, weight 700
- Body copy: 15–18px, line-height 1.55–1.75
- Small/legend/meta text: 12–14px

### Spacing & shape
- Container max-widths: 760px (single-column text), 900px (Dates), 1120px (wide layouts)
- Card corner radius: 4–5px (photo cards, cards), 6–9px (buttons, banners), 20px (pill badges)
- Grid overlay pattern (repeated everywhere as a background-image, not an image asset): two 1px-line `linear-gradient`s, 36×36px tile, white at 7% opacity (hero) or 14% opacity (header/footer/flat teal sections)

## Assets
- No real photography — every photo is a placeholder via a custom `<image-slot>` element (`image-slot.js`, included in this bundle) that lets someone drag a real image on top later. In your codebase, swap this for your standard image/media component.
- No icons used besides a plain "☰" glyph and "✓"/checkbox-style Unicode-adjacent marks (drawn with CSS borders, not an icon font).
- No externally licensed imagery is referenced anywhere.

## Content placeholders — confirm before real launch
Marked in-page with a dashed "уточню/tbd" badge or an italic note:
- Guest/bed count, air conditioning, Wi-Fi
- Parking, distance to the beach, price, house rules
- Exact address and entry instructions (guide only — intentionally absent from all public pages)
- Contact channel for date requests (the form currently just asks "how to reach you" — no channel was chosen yet)
- Real Booking.com/iCal feed URL (must stay server-side only, never in client code)

## Screenshots
`screenshots/01-home.png`, `02-gallery.png`, `03-dates.png`, `04-area.png`, `05-guide.png` — desktop captures of each page's current state, for quick visual reference alongside the HTML.

## Files
- `Home.dc.html` — landing page
- `Gallery.dc.html` — room photo grid
- `Dates.dc.html` — calendar + request form
- `Area.dc.html` — neighborhood page
- `Guide.dc.html` — unlisted guest checklist page
- `image-slot.js` — placeholder image-drop component used by all of the above
