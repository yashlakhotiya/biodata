// Education & Professional Details Component JavaScript
class EducationProfessionDetails {
  constructor() {
    this.detailsContainer = null;
    this.biodataData = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadEducationProfessionDetails());
    } else {
      await this.loadEducationProfessionDetails();
    }
  }

  async loadEducationProfessionDetails() {
    this.detailsContainer = document.getElementById('education-profession-container');
    if (!this.detailsContainer) return;

    try {
      // Fetch the education & professional details HTML
      const response = await fetch('components/education-profession.html');
      const html = await response.text();

      // Insert the education & professional details HTML
      this.detailsContainer.innerHTML = html;

      // Load biodata data and populate
      await this.loadBiodataData();
      this.populateEducationProfessionDetails();
    } catch (error) {
      console.error('Error loading education & professional details component:', error);
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

  populateEducationProfessionDetails() {
    if (!this.biodataData || !this.biodataData.educationProfession) {
      console.error('Education & professional details data not found');
      return;
    }

    const infoGrid = document.querySelector('#education-profession-container .info-grid');
    if (!infoGrid) {
      console.error('Info grid not found in education & professional details container');
      return;
    }

    // Populate with education & professional details data using shared helper
    if (window.InfoItems) {
      InfoItems.renderGrid(infoGrid, this.biodataData.educationProfession.items);
    } else {
      // Fallback
      infoGrid.innerHTML = '';
      this.biodataData.educationProfession.items.forEach(item => {
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
    if (!this.biodataData || !this.biodataData.educationProfession) return false;

    const item = this.biodataData.educationProfession.items.find(item => item.id === itemId);
    if (!item) return false;

    item.value = newValue;
    this.populateEducationProfessionDetails(); // Refresh the display
    return true;
  }

  addItem(item) {
    if (!this.biodataData || !this.biodataData.educationProfession) return false;

    this.biodataData.educationProfession.items.push(item);
    this.populateEducationProfessionDetails(); // Refresh the display
    return true;
  }

  removeItem(itemId) {
    if (!this.biodataData || !this.biodataData.educationProfession) return false;

    const index = this.biodataData.educationProfession.items.findIndex(item => item.id === itemId);
    if (index === -1) return false;

    this.biodataData.educationProfession.items.splice(index, 1);
    this.populateEducationProfessionDetails(); // Refresh the display
    return true;
  }
}

// Initialize education & professional details when script loads
new EducationProfessionDetails();
