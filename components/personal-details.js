// Personal Details Component JavaScript
class PersonalDetails {
  constructor() {
    this.detailsContainer = null;
    this.biodataData = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadPersonalDetails());
    } else {
      await this.loadPersonalDetails();
    }
  }

  async loadPersonalDetails() {
    this.detailsContainer = document.getElementById('personal-details-container');
    if (!this.detailsContainer) return;

    try {
      // Fetch the personal details HTML
      const response = await fetch('components/personal-details.html');
      const html = await response.text();

      // Insert the personal details HTML
      this.detailsContainer.innerHTML = html;

      // Load biodata data and populate
      await this.loadBiodataData();
      this.populatePersonalDetails();
    } catch (error) {
      console.error('Error loading personal details component:', error);
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
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  populatePersonalDetails() {
    if (!this.biodataData || !this.biodataData.personalDetails) {
      console.error('Personal details data not found');
      return;
    }

    const infoGrid = document.querySelector('#personal-details-container .info-grid');
    if (!infoGrid) {
      console.error('Info grid not found in personal details container');
      return;
    }

    // Populate with personal details data using shared helper
    if (window.InfoItems) {
      InfoItems.renderGrid(infoGrid, this.biodataData.personalDetails.items);
    } else {
      // Fallback (should not happen if scripts are included correctly)
      infoGrid.innerHTML = '';
      this.biodataData.personalDetails.items.forEach(item => {
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
    if (!this.biodataData || !this.biodataData.personalDetails) return false;

    const item = this.biodataData.personalDetails.items.find(item => item.id === itemId);
    if (!item) return false;

    item.value = newValue;
    this.populatePersonalDetails(); // Refresh the display
    return true;
  }

  addItem(item) {
    if (!this.biodataData || !this.biodataData.personalDetails) return false;

    this.biodataData.personalDetails.items.push(item);
    this.populatePersonalDetails(); // Refresh the display
    return true;
  }

  removeItem(itemId) {
    if (!this.biodataData || !this.biodataData.personalDetails) return false;

    const index = this.biodataData.personalDetails.items.findIndex(item => item.id === itemId);
    if (index === -1) return false;

    this.biodataData.personalDetails.items.splice(index, 1);
    this.populatePersonalDetails(); // Refresh the display
    return true;
  }
}

// Initialize personal details when script loads
new PersonalDetails();
