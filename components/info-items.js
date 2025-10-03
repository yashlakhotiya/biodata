// Shared Info Items Helper
// Exposes window.InfoItems with utilities to render info grids consistently
(function(){
  const InfoItems = {
    createItem(item) {
      const el = document.createElement('div');
      el.className = 'info-item';
      el.innerHTML = `
        <div class="info-label">${item.label ?? ''}</div>
        <div class="info-value">${item.value ?? ''}</div>
      `;
      return el;
    },
    renderGrid(container, items) {
      if (!container) return;
      container.innerHTML = '';
      if (!Array.isArray(items)) return;
      const frag = document.createDocumentFragment();
      items.forEach(item => frag.appendChild(InfoItems.createItem(item)));
      container.appendChild(frag);
    }
  };

  // expose globally
  window.InfoItems = InfoItems;
})();
