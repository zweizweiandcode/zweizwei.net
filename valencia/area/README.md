# Valencia city map

Serve the repository root and open `/valencia/area/`. This page uses local Leaflet 1.9.4 and OpenStreetMap tiles (internet required for tiles). Attribution remains visible. No apartment coordinates, visitor geolocation or routing are used.

Edit `../assets/area-places.json` to maintain all five venues, coordinates, RU/EN descriptions, local image metadata and external links in one place. Wayco Cabanyal was selected by the owner. Each entry records its website and coordinate source. Venue addresses were checked against their official websites; coordinates come from the referenced public map links/OpenStreetMap. Do not add a home marker or distances/routes from the apartment.

`../assets/area.js` generates the carousel and map from that data. It removes the previous Leaflet instance when the shared language switch replaces the page content. The carousel stays usable when Leaflet or tiles cannot load; a data-loading error offers a retry button.

The YEGO section uses the existing owner-supplied `../../images/valencia/yego-moped.jpeg` (800×600, no EXIF header). No third-party photos were downloaded. Service details link to https://rideyego.com/es/how-it-works/valencia without hardcoded prices or coverage promises.

Checks: JavaScript syntax, HTML nesting, all local resource paths, initial Russian/template equality, bilingual data, five venue coordinates and Google Maps search links. A Node DOM/Leaflet test double exercised marker/list creation, linked-card activation, Russian/English controls and descriptions, map cleanup on language switching, cached data and library/tile/data failures. Browser rendering, live tiles and mobile interaction have not been visually tested; the earlier browser tool failed and the owner selected checks without a browser.

Scope: this page and its dedicated CSS, JS, data and vendored Leaflet assets. Shared scripts and other pages were not changed by this map update.

## Favourite places carousel

The five local venue photos are configured with their RU/EN copy in `area-places.json`. Below the map, one slightly rotated paper card is visible at a time: photograph on the left, full text on the right. On mobile, the photograph sits above the text. Previous/next buttons wrap around; left/right keyboard keys and horizontal touch swipes also work. There is no autoplay. The current card survives language changes, and a marker click selects its matching card. Each card retains a show-on-map button and a Google Maps link.

The owner's personal Russian introduction, five descriptions and YEGO copy were applied verbatim; English translations were updated. All five images are existing local assets. No apartment coordinates or routes were added.

Browser checks covered RU/EN, 1440px, 390px and 320px: all five images decoded, arrows and wrapping, keyboard and synthetic touch swipe, marker/card linkage, language-change state, five markers, no horizontal page overflow and no console errors. Desktop/mobile carousel screenshots were inspected.
