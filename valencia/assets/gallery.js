(() => {
  const app = document.querySelector('#app');
  const dialog = document.createElement('dialog');
  dialog.className = 'gallery-dialog';
  dialog.setAttribute('aria-labelledby', 'gallery-dialog-title');
  dialog.innerHTML = `
    <button type="button" class="gallery-close" autofocus>×</button>
    <div class="gallery-dialog-layout">
      <div class="gallery-dialog-photo"></div>
      <div class="approved-copy gallery-dialog-copy"></div>
    </div>`;
  document.body.append(dialog);
  let trigger = null;
  const close = () => dialog.close();
  dialog.querySelector('.gallery-close').addEventListener('click', close);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('gallery-modal-open');
    dialog.querySelector('.gallery-dialog-photo').replaceChildren();
    if (trigger?.isConnected) trigger.focus();
  });
  app.addEventListener('click', event => {
    const button = event.target.closest('.gallery-trigger');
    if (!button) return;
    trigger = button;
    const card = button.closest('.room-card');
    const photoPanel = dialog.querySelector('.gallery-dialog-photo');
    const copyPanel = dialog.querySelector('.gallery-dialog-copy');
    const image = button.querySelector('img');
    photoPanel.replaceChildren();
    if (image) {
      const full = image.cloneNode();
      full.removeAttribute('loading');
      photoPanel.append(full);
    }
    photoPanel.hidden = !image;
    dialog.querySelector('.gallery-dialog-layout').classList.toggle('text-only', !image);
    copyPanel.replaceChildren(card.querySelector('.gallery-detail').content.cloneNode(true));
    copyPanel.querySelector('h2').id = 'gallery-dialog-title';
    dialog.querySelector('.gallery-close').setAttribute('aria-label',
      document.documentElement.lang === 'en' ? 'Close' : 'Закрыть');
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('gallery-modal-open');
  });
})();
