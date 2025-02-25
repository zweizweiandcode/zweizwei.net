document.addEventListener("DOMContentLoaded", function () {
    let resizeTimeout;

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
