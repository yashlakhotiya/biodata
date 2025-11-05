// Shared Info Items Helper
// Exposes window.InfoItems with utilities to render info grids consistently
(function(){
    // Helper function to determine gender from name or title
    function getGender(name = '') {
        if (!name) return 'other';

        const femaleTitles = ['Smt.', 'Kumari', 'Mrs.', 'Ms.'];
        const maleTitles = ['Shri', 'Mr.', 'Dr.', 'CA.'];

        const title = name.split(' ')[0];
        if (femaleTitles.includes(title)) return 'female';
        if (maleTitles.includes(title)) return 'male';
        return 'other';
    }

    // Helper to get gender icon
    function getGenderIcon(gender) {
        const icons = {
            'male': 'mars',
            'female': 'venus',
            'other': 'genderless'
        };
        return `<i class="fas fa-${icons[gender]}"></i>`;
    }

    const InfoItems = {
        createItem(item = {}) {
            const el = document.createElement('div');
            el.className = 'info-item';

            const occupationHtml = item.occupation ? `<div class="info-occupation">${item.occupation}</div>` : '';
            const descriptionHtml = item.description ? `<div class="info-description">${item.description}</div>` : '';

            // Create spouse HTML if spouse exists
            let spouseHtml = '';
            if (item.spouse) {
                let spouseGender = item.spouse.gender;
                if (!spouseGender) {  // This handles undefined, null, and empty string
                    spouseGender = getGender(item.spouse.name || '');
                }
                const genderClass = spouseGender;
                const genderIcon = getGenderIcon(spouseGender);

                // Build spouse occupation HTML - with icon only (no ::before duplicate)
                let spouseOccupationHtml = '';
                if (item.spouse.occupation) {
                    spouseOccupationHtml = `
            <div class="spouse-occupation ${genderClass}">
              <i class="fas fa-briefcase"></i>
              ${item.spouse.occupation}
            </div>`;
                }

                // Build native place badge
                const spouseNativePlace = item.spouse.nativePlace ?
                    `<span class="spouse-native">
              <i class="fas fa-map-marker-alt"></i>
              <span>${item.spouse.nativePlace}</span>
            </span>` : '';

                // Build spouse name wrapper
                const spouseNameHtml = `
          <div class="spouse-name-wrapper">
            <span class="spouse-name">
              ${item.spouse.name}
            </span>
            ${spouseNativePlace}
          </div>`;

                // Assemble complete spouse info
                spouseHtml = `
          <div class="spouse-info ${genderClass}">
            <div class="spouse-header">
              <div class="spouse-label">
                ${genderIcon} Spouse
              </div>
            </div>
            ${spouseNameHtml}`;

                // Add occupation and details if they exist
                if (spouseOccupationHtml) {
                    spouseHtml += `
            <div class="spouse-details">
              ${spouseOccupationHtml}
            </div>`;
                }

                spouseHtml += `</div>`;
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