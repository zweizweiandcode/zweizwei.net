# Website image optimization

Live pages use JPEG for photographs and the original GIF animations. PNG source assets remain in the repository. Generated WebP variants were removed, and no active HTML, CSS or place-data references use WebP or AVIF.

All 57 distinct image resources total about 10 MiB, compared with 48.5 MiB before optimization (about 79% less). Apartment and main-gallery photographs retain their pixel dimensions. Wishlist product images are limited to 640px on the longest side. JPEGs use quality 82, progressive encoding and optimized Huffman tables, while retaining source colour profiles. Source assets and original GIF timings remain available.

Every image URL and full-size gallery popup is checked against the filesystem and the Git commit before publication. The static-export directory is a separate old local export and is not part of the deployed site.
