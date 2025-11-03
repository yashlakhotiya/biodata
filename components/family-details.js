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
    if (!this.biodataData) {
      console.error('Biodata not found');
      return;
    }

    const container = document.getElementById('family-details-container');
    if (!container) {
      console.error('Family details container not found');
      return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Add paternal family section
    if (this.biodataData.paternalFamilyDetails) {
      this.renderFamilySection(container, this.biodataData.paternalFamilyDetails);
    } else {
      console.warn('Paternal family details not found');
    }

    // Add maternal family section
    if (this.biodataData.maternalFamilyDetails) {
      this.renderFamilySection(container, this.biodataData.maternalFamilyDetails);
    } else {
      console.warn('Maternal family details not found');
    }
  }

  renderFamilySection(container, familyData) {
    // Create section container
    const section = document.createElement('div');
    section.className = 'family-section';
    
    // Add section title
    const title = document.createElement('h3');
    title.className = 'section-title';
    title.textContent = familyData.title;
    section.appendChild(title);
    
    // Create info grid
    const infoGrid = document.createElement('div');
    infoGrid.className = 'info-grid';
    
    // Populate the grid
    if (window.InfoItems) {
      InfoItems.renderGrid(infoGrid, familyData.items);
    } else {
      // Fallback
      familyData.items.forEach(item => {
        const infoItem = this.createInfoItem(item);
        infoGrid.appendChild(infoItem);
      });
    }
    
    section.appendChild(infoGrid);
    container.appendChild(section);
  }

  createInfoItem(item) {
    const infoItem = document.createElement('div');
    infoItem.className = 'info-item';
    const occupationHtml = item.occupation ? `<div class="info-occupation">${item.occupation}</div>` : '';
    const descriptionHtml = item.description ? `<div class="info-description">${item.description}</div>` : '';

    infoItem.innerHTML = `
      <div class="info-label">${item.label ?? ''}</div>
      <div class="info-value">${item.value ?? ''}</div>
      ${occupationHtml}
      ${descriptionHtml}
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
