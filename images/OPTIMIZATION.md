# Website image variants

Pages use WebP variants from `webp/` subdirectories alongside the source images. Original files are retained and can be used to regenerate variants. Large, unreferenced source photographs were not recompressed.

This pass converted 52 referenced images. Total bytes for all 57 distinct local images used by the live pages dropped from 50,883,243 to 7,535,076 (85.2%). Converted Casa Alboraya photos, animations and reduced-motion stills dropped from about 35.8 MiB to 3.2 MiB. These figures describe page resources, not repository disk usage; keeping originals adds the new variants alongside them.

Apartment photographs and the main photography gallery retain their original pixel dimensions. Wishlist product images are limited to 640px on the longest side for their small cards. WebP quality is 84 for still images and 82 for animations. Existing colour profiles are preserved, transparency is preserved, and animations keep their frame counts, frame durations and loop settings. Already smaller AVIF/JPEG assets remain in use where conversion did not help.

Updated references cover the main gallery, Wishlist, Casa Alboraya home/gallery, place data and background CSS. Reduced-motion images remain available. Content, layout, JavaScript and indexing settings were unchanged.

Verification: all variants decoded successfully, static image dimensions and alpha channels were checked, and animation timing/loop metadata matched the originals. Browser checks loaded every image on the main site, Wishlist and the edited RU/EN Casa Alboraya pages, including full-size gallery popups and all five place cards. Reduced-motion stills were also loaded successfully. A side-by-side image comparison was inspected.
