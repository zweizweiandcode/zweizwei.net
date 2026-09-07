document.addEventListener("DOMContentLoaded", function () {
    let resizeTimeout;

    const cards = Array.from(document.querySelectorAll(".gallery-item"));
    // Separate angle ranges keep every overlay distinct; shuffle their order.
    const angles = cards.map((_, index) =>
        (index + 0.2 + Math.random() * 0.6) * 360 / cards.length
    );
    for (let i = angles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [angles[i], angles[j]] = [angles[j], angles[i]];
    }
    cards.forEach((card, index) => {
        card.style.setProperty("--overlay-angle", `${angles[index]}deg`);
    });

    function updateGallerySize() {
        const gallery = document.querySelector(".gallery");
        if (!gallery) return;

        gallery.style.gridTemplateColumns = `repeat(5, 1fr)`; // Пересчёт колонок (если нужно)
    }

    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateGallerySize, 1000); // Троттлинг в 1 сек
    });

    updateGallerySize(); // Вызываем один раз при загрузке
});
