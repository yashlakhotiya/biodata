// Partner Preferences Component JavaScript
class PartnerPreferences {
  constructor() {
    this.preferencesContainer = null;
    this.biodataData = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadPartnerPreferences());
    } else {
      await this.loadPartnerPreferences();
    }
  }

  async loadPartnerPreferences() {
    this.preferencesContainer = document.getElementById('partner-preferences-container');
    if (!this.preferencesContainer) return;

    try {
      // Fetch the partner preferences HTML
      const response = await fetch('components/partner-preferences.html');
      const html = await response.text();

      // Insert the partner preferences HTML
      this.preferencesContainer.innerHTML = html;

      // Load biodata data and populate
      await this.loadBiodataData();
      this.populatePartnerPreferences();
    } catch (error) {
      console.error('Error loading partner preferences component:', error);
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

  populatePartnerPreferences() {
    if (!this.biodataData || !this.biodataData.partnerPreferences) {
      console.error('Partner preferences data not found');
      return;
    }

    const preferencesList = document.querySelector('#partner-preferences-container .preferences-list');
    if (!preferencesList) {
      console.error('Preferences list not found in partner preferences container');
      return;
    }

    // Clear existing content
    preferencesList.innerHTML = '';

    // Populate with partner preferences data
    this.biodataData.partnerPreferences.items.forEach(item => {
      const listItem = this.createListItem(item);
      preferencesList.appendChild(listItem);
    });
  }

  createListItem(item) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${item.label}:</strong> ${item.value}
    `;
    return listItem;
  }

  // Public API methods
  updateItem(itemId, newValue) {
    if (!this.biodataData || !this.biodataData.partnerPreferences) return false;

    const item = this.biodataData.partnerPreferences.items.find(item => item.id === itemId);
    if (!item) return false;

    item.value = newValue;
    this.populatePartnerPreferences(); // Refresh the display
    return true;
  }

  addItem(item) {
    if (!this.biodataData || !this.biodataData.partnerPreferences) return false;

    this.biodataData.partnerPreferences.items.push(item);
    this.populatePartnerPreferences(); // Refresh the display
    return true;
  }

  removeItem(itemId) {
    if (!this.biodataData || !this.biodataData.partnerPreferences) return false;

    const index = this.biodataData.partnerPreferences.items.findIndex(item => item.id === itemId);
    if (index === -1) return false;

    this.biodataData.partnerPreferences.items.splice(index, 1);
    this.populatePartnerPreferences(); // Refresh the display
    return true;
  }
}

// Initialize partner preferences when script loads
new PartnerPreferences();
