// Shared Info Items Helper
// Exposes window.InfoItems with utilities to render info grids consistently
(function(){
  const InfoItems = {
    createItem(item = {}) {
      const el = document.createElement('div');
      el.className = 'info-item';

      const occupationHtml = item.occupation ? `<div class="info-occupation">${item.occupation}</div>` : '';
      const descriptionHtml = item.description ? `<div class="info-description">${item.description}</div>` : '';
      
      let spouseHtml = '';
      if (item.spouse) {
        const spouseOccupation = item.spouse.occupation ? `
            <div class="spouse-occupation">${item.spouse.occupation}</div>` : '';
        
        const spouseNativePlace = item.spouse.nativePlace ? 
            `<span class="spouse-native">(${item.spouse.nativePlace})</span>` : '';
        
        spouseHtml = `
          <div class="spouse-info">
            <div class="spouse-header">
              <span class="spouse-label">Spouse:</span>
              <div class="spouse-name-wrapper">
                <span class="spouse-name">${item.spouse.name} ${spouseNativePlace}</span>
              </div>
            </div>`;
            
        // Add occupation if it exists
        if (spouseOccupation) {
          spouseHtml += `
            <div class="spouse-details">
              ${spouseOccupation}
            </div>`;
        }
        spouseHtml += `
          </div>`;
      }

      el.innerHTML = `
        <div class="info-label">${item.label ?? ''}</div>
        <div class="info-value">${item.value ?? ''}</div>
        ${occupationHtml}
        ${descriptionHtml}
        ${spouseHtml}
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
