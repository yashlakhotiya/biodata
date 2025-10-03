// Family Details Component JavaScript
class FamilyDetails {
  constructor() {
    this.detailsContainer = null;
    this.biodataData = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadFamilyDetails());
    } else {
      await this.loadFamilyDetails();
    }
  }

  async loadFamilyDetails() {
    this.detailsContainer = document.getElementById('family-details-container');
    if (!this.detailsContainer) return;

    try {
      // Fetch the family details HTML
      const response = await fetch('components/family-details.html');
      const html = await response.text();

      // Insert the family details HTML
      this.detailsContainer.innerHTML = html;

      // Load biodata data and populate
      await this.loadBiodataData();
      this.populateFamilyDetails();
    } catch (error) {
      console.error('Error loading family details component:', error);
    }
  }

  async loadBiodataData() {
    try {
      // In a real application, you might fetch this from an API
      // For now, we'll assume biodataData is already loaded globally
      if (typeof biodataData !== 'undefined') {
        this.biodataData = biodataData;
      } else {
        // Fallback: try to load biodataData.js
        await this.loadScript('assets/biodataData.js');
        this.biodataData = biodataData;
      }
    } catch (error) {
      console.error('Error loading biodata data:', error);
    }
  }

  async loadScript(src) {
    console.debug('loadScript called with src:', src);
    if (!src) {
      console.error('loadScript called with undefined or empty src!');
      return;
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  populateFamilyDetails() {
    if (!this.biodataData || !this.biodataData.familyDetails) {
      console.error('Family details data not found');
      return;
    }

    const infoGrid = document.querySelector('#family-details-container .info-grid');
    if (!infoGrid) {
      console.error('Info grid not found in family details container');
      return;
    }

    // Populate with family details data using shared helper
    if (window.InfoItems) {
      InfoItems.renderGrid(infoGrid, this.biodataData.familyDetails.items);
    } else {
      // Fallback
      infoGrid.innerHTML = '';
      this.biodataData.familyDetails.items.forEach(item => {
        const infoItem = this.createInfoItem(item);
        infoGrid.appendChild(infoItem);
      });
    }
  }

  createInfoItem(item) {
    const infoItem = document.createElement('div');
    infoItem.className = 'info-item';
    infoItem.innerHTML = `
      <div class="info-label">${item.label}</div>
      <div class="info-value">${item.value}</div>
    `;
    return infoItem;
  }

  // Public API methods
  updateItem(itemId, newValue) {
    if (!this.biodataData || !this.biodataData.familyDetails) return false;

    const item = this.biodataData.familyDetails.items.find(item => item.id === itemId);
    if (!item) return false;

    item.value = newValue;
    this.populateFamilyDetails(); // Refresh the display
    return true;
  }

  addItem(item) {
    if (!this.biodataData || !this.biodataData.familyDetails) return false;

    this.biodataData.familyDetails.items.push(item);
    this.populateFamilyDetails(); // Refresh the display
    return true;
  }

  removeItem(itemId) {
    if (!this.biodataData || !this.biodataData.familyDetails) return false;

    const index = this.biodataData.familyDetails.items.findIndex(item => item.id === itemId);
    if (index === -1) return false;

    this.biodataData.familyDetails.items.splice(index, 1);
    this.populateFamilyDetails(); // Refresh the display
    return true;
  }
}

// Initialize family details when script loads
new FamilyDetails();
