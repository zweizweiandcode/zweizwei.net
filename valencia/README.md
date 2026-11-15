# Casa Alboraya

Static HTML/CSS/JavaScript site. Serve the repository root and open `/valencia/`; no build or package installation is required.

- `/valencia/`: four personal introduction blocks and confirmed amenities.
- `/valencia/gallery/`: square photo previews with titles; each opens a native modal dialog with the full uncropped image and its approved room description. Eleven photo cards cover the nine room/amenity descriptions.
- `/valencia/dates/`: original demo calendar and form.
- `/valencia/area/`: general Valencia and seaside copy without precise location details.
- `/valencia/guide/`: public, noindex guest notes; private arrival and access information is shared separately.

Copy follows `content.ru-en.json` in the supplied `valencia_codex_air_ready.zip` package. Each page has an initial Russian render and `page-ru` / `page-en` templates. Keep all three synchronized. The existing language switch stores `apt_site_lang` in localStorage.

Photos and GIFs live in repository-root `images/valencia/`. Home paths use `../images/valencia/`; nested gallery paths use `../../images/valencia/`. Preserve exact filenames and capitalization. `assets/stills/` contains first-frame PNG fallbacks for the three home GIFs, selected via `prefers-reduced-motion`. Below-fold images load lazily, have intrinsic dimensions, and retain their full aspect ratios.

The utility balcony uses the owner-supplied `gpt-balcony.png`. The pool/beach card uses the owner-supplied `pool - color corrected.png`; the approved pool GIF appears on the home page. The two unapproved example balcony images are not used.

The October 2026 calendar retains its fixed demo dates. The form does not send or store requests and does not confirm a booking. Calendar JavaScript and Dates HTML were left unchanged by this content update. Contact details, check-in/out rules and appliance instructions remain unconfirmed; do not invent them or publish private access information.

## Verification of this content update

- All four home blocks and all nine gallery descriptions match the approved JSON in both languages.
- Initial Russian markup matches the Russian template on all five pages.
- All 201 local HTML resource/navigation references resolve, including reduced-motion fallbacks.
- HTML tags are balanced, image alt text and intrinsic dimensions are present, and English visible copy contains no leftover Russian text.
- No precise neighborhood names, map links, coordinates, capacity claims, prices or grill descriptions were added to the pages.
- PNG files have no EXIF chunks or detected GPS location tags; existing C2PA provenance was retained. GIF metadata contains no detected GPS tags or location URLs.
- `node --check valencia/assets/site.js` passes; Dates HTML and site.js match the original Git version byte for byte.
- Browser preview, console, interactive switching and mobile visual checks were not run: the bundled Chrome DevTools daemon timed out on startup. The owner requested completion with checks without a browser.

The approved balcony/pool visuals show surrounding buildings. Removing location text and checking metadata does not make those views anonymous. Source images were retained as instructed.

## Gallery modal update

`assets/gallery.js` handles the gallery independently of calendar code. Dialogs close with Escape, the close button or a backdrop click and restore focus to the triggering card. On narrow screens, descriptions appear below the image. Both language templates and initial Russian markup include identical card structures. All approved RU/EN descriptions and original image paths were checked, along with JavaScript syntax and HTML nesting. Interactive browser verification was not performed.

## Local typography

All five RU/EN pages load `assets/typography.css`. Manrope is used for body text (18px / 1.6 / 400), navigation (18px / 600), headings (36px desktop, 28px mobile) and photo captions/descriptions (17px). The hero retains its larger responsive title. The Casa Alboraya logo retains Caveat. Local variable TTFs and their SIL OFL licenses are in `assets/fonts/`; there are no Google Fonts stylesheet requests. Both fonts include Latin and Cyrillic.

Home section padding is 48px above/below on desktop and 32px on mobile. The Valencia story has 24px above on desktop and 20px on mobile. Content, colors, photos, components, JavaScript and place data were preserved.

Browser checks covered all five pages in RU and EN at 1440px, 390px and 320px: local fonts loaded, no previous font families or Google Fonts requests, and no horizontal document overflow. Desktop/home and mobile/home/gallery-dialog screenshots were inspected. Gallery modal descriptions render at 17px and the tested browser console had no errors. Static comparisons also confirmed unchanged text, image/component attributes and non-typographic inline styles.
