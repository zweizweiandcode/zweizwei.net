(() => {
  const app = document.querySelector('#app');
  const dataUrl = new URL('area-places.json', document.currentScript.src);
  const labels = {
    ru: {
      maps: 'Открыть в Google Maps', website: 'Сайт', show: 'Показать на карте',
      unavailable: 'Карта недоступна. Карточки мест и ссылки на Google Maps доступны ниже.',
      tiles: 'Не удалось загрузить часть карты. Можно открыть места в Google Maps ниже.',
      failed: 'Не удалось загрузить места. Попробуйте ещё раз.', retry: 'Повторить',
      zoomIn: 'Приблизить', zoomOut: 'Отдалить', close: 'Закрыть карточку', slide: 'карточка', of: 'из'
    },
    en: {
      maps: 'Open in Google Maps', website: 'Website', show: 'Show on map',
      unavailable: 'The map is unavailable. Place cards and Google Maps links are available below.',
      tiles: 'Some map tiles could not be loaded. You can open the places in Google Maps below.',
      failed: 'Places could not be loaded. Please try again.', retry: 'Try again',
      zoomIn: 'Zoom in', zoomOut: 'Zoom out', close: 'Close popup', slide: 'slide', of: 'of'
    }
  };
  let map = null;
  let generation = 0;
  let cachedData = null;
  const markers = new Map();
  let activeIndex = 0;
  let swipeStart = null;

  function showSlide(index) {
    const slides = [...app.querySelectorAll('[data-area-slide]')];
    if (!slides.length) return;
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== activeIndex; });
    const language = document.documentElement.lang === 'en' ? 'en' : 'ru';
    const t = labels[language];
    app.querySelector('[data-carousel-position]').textContent =
      `${activeIndex + 1} ${t.of} ${slides.length} · ${cachedData.places[activeIndex].name}`;
  }


  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function externalLink(url, text) {
    const link = element('a', '', text);
    link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    return link;
  }
  function popup(place, language, t) {
    const card = element('div', 'area-popup');
    card.append(element('h3', '', place.name), element('p', '', place.description[language]));
    const links = element('div', 'area-place-links');
    links.append(externalLink(place.googleMapsUrl, t.maps), externalLink(place.website, t.website));
    card.append(links);
    return card;
  }
  async function renderArea() {
    const current = ++generation;
    if (map) { map.remove(); map = null; }
    markers.clear();
    const container = app.querySelector('[data-area-map]');
    const list = app.querySelector('[data-area-places]');
    const status = app.querySelector('[data-area-status]');
    if (!container || !list || !status) return;
    const language = document.documentElement.lang === 'en' ? 'en' : 'ru';
    const t = labels[language];
    function message(text) { status.replaceChildren(document.createTextNode(text)); status.hidden = false; }
    list.replaceChildren();
    app.querySelector('[data-carousel-controls]').hidden = true;
    try {
      if (!cachedData) {
        const response = await fetch(dataUrl);
        if (!response.ok) throw new Error('Place data could not be loaded');
        cachedData = await response.json();
      }
      if (current !== generation) return;
      cachedData.places.forEach((place, index) => {
        const item = element('li', 'area-place');
        item.dataset.areaSlide = place.id;
        item.hidden = true;
        item.setAttribute('role', 'group');
        item.setAttribute('aria-roledescription', t.slide);
        item.setAttribute('aria-label', `${index + 1} ${t.of} ${cachedData.places.length}: ${place.name}`);
        item.style.setProperty('--card-tilt', `${[-0.6, 0.5, -0.4, 0.6, -0.5][index]}deg`);
        const photo = element('div', 'area-place-photo');
        const tape = element('span', 'area-tape');
        tape.setAttribute('aria-hidden', 'true');
        const image = element('img');
        image.src = place.image.src;
        image.alt = place.image.alt[language];
        image.width = place.image.width; image.height = place.image.height;
        image.loading = 'lazy'; image.decoding = 'async';
        photo.append(tape, image);
        const copy = element('div', 'area-place-copy');
        const number = element('span', 'area-place-number', String(index + 1));
        number.setAttribute('aria-hidden', 'true');
        const heading = element('h3', '', place.name);
        const show = element('button', 'area-place-button', t.show);
        show.type = 'button'; show.dataset.place = place.id;
        show.setAttribute('aria-label', `${t.show}: ${place.name}`);
        const links = element('div', 'area-place-links');
        links.append(show, externalLink(place.googleMapsUrl, t.maps + ' ↗'));
        copy.append(number, heading, element('p', '', place.description[language]), links);
        item.append(photo, copy); list.append(item);
      });
      app.querySelector('[data-carousel-controls]').hidden = false;
      showSlide(activeIndex);
      if (!window.L) { message(t.unavailable); return; }
      map = L.map(container, { scrollWheelZoom: false, zoomControl: false });
      container.tabIndex = 0;
      L.control.zoom({ zoomInTitle: t.zoomIn, zoomOutTitle: t.zoomOut }).addTo(map);
      // Only the five public venues determine the view. No home or visitor location is used.
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).on('tileerror', () => { if (current === generation) message(t.tiles); }).addTo(map);
      cachedData.places.forEach((place, index) => {
        const icon = L.divIcon({
          className: 'area-map-marker', html: `<span>${index + 1}</span>`,
          iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -36]
        });
        const marker = L.marker(place.coordinates, { icon, title: place.name, alt: place.name })
          .bindTooltip(place.name, { direction: 'top', offset: [0, -36] })
          .bindPopup(popup(place, language, t), { maxWidth: 300, maxHeight: 240 })
          .addTo(map);
        marker.on('click', () => showSlide(index));
        markers.set(place.id, marker);
      });
      map.on('popupopen', event => {
        const close = event.popup.getElement()?.querySelector('.leaflet-popup-close-button');
        if (close) { close.title = t.close; close.setAttribute('aria-label', t.close); }
      });
      map.fitBounds(cachedData.places.map(place => place.coordinates), { padding: [44, 44], maxZoom: 14 });
      status.hidden = true;
    } catch (error) {
      if (current !== generation) return;
      if (list.children.length) { message(t.unavailable); return; }
      message(t.failed);
      const retry = element('button', 'area-retry', t.retry);
      retry.type = 'button'; retry.dataset.areaRetry = '';
      status.append(document.createTextNode(' '), retry);
    }
  }
  app.addEventListener('click', event => {
    if (event.target.closest('[data-area-retry]')) { renderArea(); return; }
    const arrow = event.target.closest('[data-carousel-step]');
    if (arrow) { showSlide(activeIndex + Number(arrow.dataset.carouselStep)); return; }
    const button = event.target.closest('[data-place]');
    const marker = button && markers.get(button.dataset.place);
    if (!map || !marker) return;
    map.setView(marker.getLatLng(), 15, { animate: false });
    marker.openPopup();
    const container = app.querySelector('[data-area-map]');
    container.scrollIntoView({ behavior: 'instant', block: 'center' });
    container.focus({ preventScroll: true });
  });
  app.addEventListener('keydown', event => {
    if (!event.target.closest('[data-area-carousel]') || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    showSlide(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  app.addEventListener('pointerdown', event => {
    swipeStart = null;
    if (event.pointerType !== 'touch' || !event.target.closest('[data-area-carousel]') || event.target.closest('a, button')) return;
    swipeStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
  });
  app.addEventListener('pointerup', event => {
    const start = swipeStart; swipeStart = null;
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) showSlide(activeIndex + (dx < 0 ? 1 : -1));
  });
  app.addEventListener('pointercancel', () => { swipeStart = null; });
  // site.js replaces the app's children when the language changes.
  new MutationObserver(renderArea).observe(app, { childList: true });
  renderArea();
})();
