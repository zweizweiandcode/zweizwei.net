import { auth, db } from "../firebase.js";
import { onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { collection, doc, onSnapshot, runTransaction, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const message = document.querySelector(".reservation-message");
const cards = Array.from(document.querySelectorAll(".grid > article[data-item-id]"));
const reservations = new Map();
const pending = new Set();
const buttons = new Map();
let currentUser = null;
let ready = false;
let failed = false;
let unsubscribe = () => {};

function render() {
    for (const card of cards) {
        const id = card.dataset.itemId;
        const owner = reservations.get(id);
        const mine = currentUser && owner === currentUser.uid;
        const busy = pending.has(id);
        const button = buttons.get(id);
        const state = !ready ? "loading" : owner ? (mine ? "mine" : "reserved") : "available";
        card.dataset.reservation = state;
        card.setAttribute("aria-busy", String(busy));
        button.disabled = !ready || busy || state === "reserved";
        button.textContent = busy ? "Сохраняем…" : !ready
            ? (failed ? "Бронирование недоступно" : "Загружаем бронирования…")
            : mine ? "Ваша бронь · нажмите, чтобы отменить"
            : owner ? "Уже забронировано" : "Забронировать";
        button.setAttribute("aria-label", `${card.querySelector("h2").textContent}: ${button.textContent}`);
    }
}

function reportError(error) {
    console.error("Wishlist reservation:", error);
    message.textContent = "Не удалось подключиться к бронированиям. Проверьте соединение и обновите страницу.";
}

async function toggleReservation(card) {
    const id = card.dataset.itemId;
    if (!ready || !currentUser || pending.has(id)) return;
    const uid = currentUser.uid;
    const owner = reservations.get(id);
    if (owner && owner !== uid) return;
    // Capture intent outside the callback: Firestore may retry the transaction.
    const cancelling = owner === uid;
    pending.add(id);
    message.textContent = "";
    render();
    try {
        const reservation = doc(db, "reservations", id);
        const outcome = await runTransaction(db, async (transaction) => {
            const snapshot = await transaction.get(reservation);
            if (cancelling) {
                if (snapshot.exists() && snapshot.data().ownerId === uid) {
                    transaction.delete(reservation);
                    return "cancelled";
                }
                return "changed";
            }
            if (snapshot.exists()) return "taken";
            transaction.set(reservation, { ownerId: uid, claimedAt: serverTimestamp() });
            return "claimed";
        });
        message.textContent = outcome === "claimed" ? "Подарок забронирован вами."
            : outcome === "cancelled" ? "Бронь отменена."
            : "Бронь уже изменилась. Проверьте статус карточки.";
    } catch (error) {
        console.error("Wishlist reservation:", error);
        message.textContent = "Не удалось сохранить изменение. Проверьте соединение и попробуйте ещё раз.";
    } finally {
        pending.delete(id);
        render();
    }
}

for (const card of cards) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "reservation-button";
    buttons.set(card.dataset.itemId, button);
    card.append(button);
    button.addEventListener("click", () => toggleReservation(card));
    card.addEventListener("click", (event) => {
        // Preserve links and other interactive elements inside each card.
        if (event.defaultPrevented || event.target.closest("a, button, input, select, textarea, label, summary, [role='button'], [contenteditable]")) return;
        if (window.getSelection()?.toString()) return;
        toggleReservation(card);
    });
}
render();

onAuthStateChanged(auth, async (user) => {
    unsubscribe();
    currentUser = user;
    ready = false;
    failed = false;
    reservations.clear();
    render();
    if (!user) {
        try {
            await signInAnonymously(auth);
        } catch (error) {
            failed = true;
            reportError(error);
            render();
        }
        return;
    }
    unsubscribe = onSnapshot(collection(db, "reservations"), { includeMetadataChanges: true }, (snapshot) => {
        reservations.clear();
        snapshot.forEach((reservation) => reservations.set(reservation.id, reservation.data().ownerId));
        // Do not present an empty local cache as confirmed availability.
        ready = !snapshot.metadata.fromCache;
        render();
    }, (error) => {
        ready = false;
        failed = true;
        reportError(error);
        render();
    });
}, (error) => {
    ready = false;
    failed = true;
    reportError(error);
    render();
});
