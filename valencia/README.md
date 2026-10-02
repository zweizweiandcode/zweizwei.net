# Casa Alboraya

Static site recreated from `mockup/design_handoff_apartment_site/README.md` and its five design references. No build or package installation is required. Serve this repository and open `/valencia/`.

- `/valencia/`: home
- `/valencia/gallery/`: gallery
- `/valencia/dates/`: demo calendar and request form
- `/valencia/area/`: neighbourhood
- `/valencia/guide/`: guest guide, linked only from public footers, marked noindex
- `assets/`: styles and native JavaScript

The pages contain regular HTML, with native HTML templates holding RU/EN versions. Language preference uses `apt_site_lang` in localStorage. No Claude runtime is required. Keep both language templates and the initial Russian content in sync when editing copy.

The October 2026 calendar uses the handoff's fixed demo dates. Requests are never sent or stored, and never confirm a booking. A real contact channel and backend/iCal integration still need to be configured separately. Keep iCal URLs and guest data server-side.

There are no apartment photographs or map assets in the handoff. Image placeholders allow local file selection or drag-and-drop for a temporary preview only; reloading clears previews. To publish photos, place them in `assets/images/` (create when needed) and replace the relevant placeholders with ordinary images in both languages.

The guest guide is public via its URL; noindex and absence from the main navigation are not access control. Current content includes only the supplied placeholders, with no address or access credentials.
