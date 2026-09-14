# Wishlist reservations

The existing cards use stable `data-item-id` values. The shared `../firebase.js`
initializes Firebase and exports App, Auth and Firestore. `reservations.js` handles
wishlist reservations and anonymous sign-in. Firebase modules load directly from
the Firebase CDN; no build step is needed.

## Firebase setup

Before testing, publish the root `firestore.rules` in Firebase Console → Firestore
Database → Rules. GitHub Pages does not deploy Firestore rules. If the database
also serves another app, merge the reservations block into its existing rules;
remove any broad rule granting writes to reservations, as matching allow rules
are additive. These rules allow authenticated reads, creation with the visitor's
UID and a server timestamp, and deletion only by the owner. Updates are denied.

When adding an item, give its article a new unique permanent `data-item-id`.
Keep IDs unchanged when editing titles or reordering. There is no item allowlist
in the rules, so adding items does not require publishing rules again. Authenticated
visitors can create reservations for any document ID, including IDs not on the page;
the owner, field and timestamp checks still apply.

## Test after publishing to GitHub Pages

1. Open `/wishlist/` in a normal browser window and in an incognito session (or a
   separate browser profile). Two windows within the same incognito session may
   share an identity, so use normal + incognito for two distinct visitors.
2. Click an available card in the normal window. It should say “Ваша бронь”; the
   other session should show “Уже забронировано” without reloading.
3. The other visitor must not be able to claim or cancel that item. Click it again
   in the owner's window to cancel; it should become available in both sessions.
4. Click the same available item in both sessions at nearly the same time. Only
   one reservation document should exist at `reservations/{itemId}` with exactly
   `ownerId` and `claimedAt`. Only the winner should be able to cancel it.
5. Reload the owner's window: its reservation should remain owned. Check keyboard
   activation of the reservation button and the existing home link as well.

Anonymous identity is stored in the browser. Clearing site data or ending the
incognito session loses access to cancelling that identity's reservations; remove
any leftover test documents in Firestore Console. Connection or permission errors
are shown on the page, with technical details in the browser console.
