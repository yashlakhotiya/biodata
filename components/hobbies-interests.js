// Hobbies & Interests Component JavaScript
class HobbiesInterests {
  constructor() {
    this.interestsContainer = null;
    this.biodataData = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadHobbiesInterests());
    } else {
      await this.loadHobbiesInterests();
    }
  }

  async loadHobbiesInterests() {
    this.interestsContainer = document.getElementById('hobbies-interests-container');
    if (!this.interestsContainer) return;

    try {
      // Fetch the hobbies & interests HTML
      const response = await fetch('components/hobbies-interests.html');
      const html = await response.text();

      // Insert the hobbies & interests HTML
      this.interestsContainer.innerHTML = html;

      // Load biodata data and populate
      await this.loadBiodataData();
      this.populateHobbiesInterests();
    } catch (error) {
      console.error('Error loading hobbies & interests component:', error);
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

  populateHobbiesInterests() {
    if (!this.biodataData || !this.biodataData.hobbiesInterests) {
      console.error('Hobbies & interests data not found');
      return;
    }

    const preferencesList = document.querySelector('#hobbies-interests-container .preferences-list');
    if (!preferencesList) {
      console.error('Preferences list not found in hobbies & interests container');
      return;
    }

    // Clear existing content
    preferencesList.innerHTML = '';

    // Populate with hobbies & interests data
    this.biodataData.hobbiesInterests.items.forEach(item => {
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
    if (!this.biodataData || !this.biodataData.hobbiesInterests) return false;

    const item = this.biodataData.hobbiesInterests.items.find(item => item.id === itemId);
    if (!item) return false;

    item.value = newValue;
    this.populateHobbiesInterests(); // Refresh the display
    return true;
  }

  addItem(item) {
    if (!this.biodataData || !this.biodataData.hobbiesInterests) return false;

    this.biodataData.hobbiesInterests.items.push(item);
    this.populateHobbiesInterests(); // Refresh the display
    return true;
  }

  removeItem(itemId) {
    if (!this.biodataData || !this.biodataData.hobbiesInterests) return false;

    const index = this.biodataData.hobbiesInterests.items.findIndex(item => item.id === itemId);
    if (index === -1) return false;

    this.biodataData.hobbiesInterests.items.splice(index, 1);
    this.populateHobbiesInterests(); // Refresh the display
    return true;
  }
}

// Initialize hobbies & interests when script loads
new HobbiesInterests();
