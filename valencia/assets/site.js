(() => {
  const app = document.querySelector('#app');
  let lang = 'ru';
  try { if (localStorage.getItem('apt_site_lang') === 'en') lang = 'en'; } catch {}
  const selected = new Set();
  const booked = new Set([3,4,5,14,15,22,23]);
  const fields = { name: '', contact: '', message: '' };
  let submitted = false;
  const photos = new Map();
  const labels = {
    ru: {available:'можно запросить',booked:'занято',selected:'выбрано',pending:'ждёт ответа',none:'пока не выбраны',prefix:'Выбранные даты:',month:'окт',photo:'Выбрать фото для предпросмотра'},
    en: {available:'can request',booked:'booked',selected:'selected',pending:'awaiting reply',none:'none yet',prefix:'Selected dates:',month:'Oct',photo:'Choose a photo to preview'}
  };
  function updateDates() {
    const calendar = app.querySelector('[data-calendar]');
    if (!calendar) return;
    const t = labels[lang];
    calendar.className = 'calendar-grid';
    calendar.replaceChildren();
    for (let i = 0; i < 3; i++) calendar.append(document.createElement('span'));
    for (let day = 1; day <= 31; day++) {
      const button = document.createElement('button');
      const state = booked.has(day) ? 'booked' : selected.has(day) ? (submitted ? 'pending' : 'selected') : 'available';
      button.type = 'button'; button.className = 'daybtn'; button.dataset.day = day;
      button.dataset.state = state; button.textContent = day;
      button.disabled = booked.has(day) || submitted;
      button.setAttribute('aria-pressed', String(selected.has(day)));
      button.setAttribute('aria-label', `${day} ${t.month} 2026: ${t[state]}`);
      calendar.append(button);
    }
    app.querySelector('[data-panel="submitted"]').hidden = !submitted;
    app.querySelector('[data-panel="notSubmitted"]').hidden = submitted;
    const submit = app.querySelector('[data-action="onSubmit"]');
    submit.disabled = selected.size === 0;
    submit.style.background = selected.size ? '#ef8a3d' : '#c9c2b2';
    submit.style.cursor = selected.size ? 'pointer' : 'not-allowed';
    submit.previousElementSibling.textContent = `${t.prefix} ${selected.size ? [...selected].sort((a,b)=>a-b).map(d=>`${d} ${t.month}`).join(', ') : t.none}`;
  }
  function setupPhotos() {
    app.querySelectorAll('.photo-placeholder').forEach((slot,index) => {
      const key = `${document.body.dataset.page}-${index}`;
      const show = url => {
        let img = slot.querySelector('img');
        if (!img) { img = document.createElement('img'); img.alt = slot.getAttribute('aria-label'); slot.append(img); }
        img.src = url;
      };
      const load = file => {
        if (!file || !file.type.startsWith('image/')) return;
        if (photos.has(key)) URL.revokeObjectURL(photos.get(key));
        const url = URL.createObjectURL(file); photos.set(key,url); show(url);
      };
      const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
      input.setAttribute('aria-label', `${labels[lang].photo}: ${slot.getAttribute('aria-label')}`);
      input.addEventListener('change',()=>load(input.files[0])); slot.append(input);
      slot.addEventListener('dragover',event=>event.preventDefault());
      slot.addEventListener('drop',event=>{ event.preventDefault(); load(event.dataTransfer.files[0]); });
      if (photos.has(key)) show(photos.get(key));
    });
  }
  function render() {
    app.replaceChildren(document.querySelector(`#page-${lang}`).content.cloneNode(true));
    document.documentElement.lang = lang;
    document.title = `${app.querySelector('h1')?.textContent || 'Casa Alboraya'} — Casa Alboraya`;
    app.querySelectorAll('[data-field]').forEach(input => { input.value = fields[input.dataset.field]; });
    updateDates(); setupPhotos();
  }
  app.addEventListener('input', event => { if (event.target.dataset.field) fields[event.target.dataset.field] = event.target.value; });
  app.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.dataset.day) {
      const day = Number(button.dataset.day);
      if (submitted || booked.has(day)) return;
      selected.has(day) ? selected.delete(day) : selected.add(day);
      updateDates(); app.querySelector(`[data-day="${day}"]`).focus(); return;
    }
    switch (button.dataset.action) {
      case 'toggleLang':
        lang = lang === 'ru' ? 'en' : 'ru';
        try { localStorage.setItem('apt_site_lang',lang); } catch {}
        render(); app.querySelector('[data-action="toggleLang"]').focus(); break;
      case 'toggleMenu': {
        const panel = app.querySelector('[data-panel="menuOpen"]'); panel.hidden = !panel.hidden;
        button.setAttribute('aria-expanded',String(!panel.hidden)); break;
      }
      case 'onSubmit':
        if (!selected.size) return;
        for (const input of app.querySelectorAll('input[required]')) if (!input.reportValidity()) return;
        submitted = true; updateDates(); app.querySelector('[data-action="resetForm"]').focus(); break;
      case 'resetForm':
        submitted = false; selected.clear(); updateDates(); app.querySelector('[data-day="1"]').focus(); break;
    }
  });
  render();
})();
