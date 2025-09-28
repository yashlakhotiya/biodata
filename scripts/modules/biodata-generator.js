/**
 * Biodata Generator Module
 * Modular system for populating biodata sections from database-like structure
 */

class BiodataGenerator {
    constructor() {
        this.biodataData = window.biodataData || biodataData;
        this.init();
    }

    init() {
        if (!this.biodataData) {
            console.error('Biodata data not found. Make sure biodataData.js is loaded.');
            return;
        }
        this.populateAllSections();
    }

    populateAllSections() {
        this.populatePersonalDetails();
        this.populateFamilyDetails();
        this.populateEducationProfession();
        this.populatePartnerPreferences();
        this.populateHobbiesInterests();
    }

    populatePersonalDetails() {
        this.populateSection('personal-details', 'personalDetails');
    }

    populateFamilyDetails() {
        this.populateSection('family-details', 'familyDetails');
    }

    populateEducationProfession() {
        this.populateSection('education-profession', 'educationProfession');
    }

    populatePartnerPreferences() {
        this.populateSection('partner-preferences', 'partnerPreferences');
    }

    populateHobbiesInterests() {
        this.populateSection('hobbies-interests', 'hobbiesInterests');
    }

    populateSection(sectionId, dataKey) {
        const section = document.getElementById(sectionId);
        if (!section || !this.biodataData[dataKey]) return;

        const infoGrid = section.querySelector('.info-grid');
        const preferencesList = section.querySelector('.preferences-list');

        if (infoGrid) {
            this.populateInfoGrid(infoGrid, this.biodataData[dataKey].items);
        } else if (preferencesList) {
            this.populatePreferencesList(preferencesList, this.biodataData[dataKey].items);
        }
    }

    populateInfoGrid(container, items) {
        container.innerHTML = ''; // Clear existing content
        items.forEach(item => {
            const infoItem = this.createInfoItem(item);
            container.appendChild(infoItem);
        });
    }

    populatePreferencesList(container, items) {
        container.innerHTML = ''; // Clear existing content
        items.forEach(item => {
            const listItem = this.createListItem(item);
            container.appendChild(listItem);
        });
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

    createListItem(item) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${item.label}:</strong> ${item.value}
        `;
        return listItem;
    }

    // ==================== PUBLIC API METHODS ====================

    /**
     * Get a specific biodata section
     * @param {string} sectionId - The ID of the section to retrieve
     * @returns {object|null} - The section object or null if not found
     */
    getSection(sectionId) {
        return this.biodataData[sectionId] || null;
    }

    /**
     * Get all biodata sections
     * @returns {object} - All biodata sections
     */
    getAllSections() {
        return this.biodataData;
    }

    /**
     * Update a specific biodata item
     * @param {string} sectionId - The section containing the item
     * @param {string} itemId - The ID of the item to update
     * @param {string} newValue - The new value for the item
     * @returns {boolean} - True if updated successfully, false otherwise
     */
    updateItem(sectionId, itemId, newValue) {
        const section = this.biodataData[sectionId];
        if (!section || !section.items) return false;

        const item = section.items.find(item => item.id === itemId);
        if (!item) return false;

        item.value = newValue;
        // Re-populate the section to reflect changes
        this.populateSection(sectionId, sectionId);
        return true;
    }

    /**
     * Add a new item to a section
     * @param {string} sectionId - The section to add the item to
     * @param {object} item - The item object to add
     * @returns {boolean} - True if added successfully, false otherwise
     */
    addItem(sectionId, item) {
        const section = this.biodataData[sectionId];
        if (!section || !section.items) return false;

        section.items.push(item);
        // Re-populate the section to reflect changes
        this.populateSection(sectionId, sectionId);
        return true;
    }

    /**
     * Remove an item from a section
     * @param {string} sectionId - The section containing the item
     * @param {string} itemId - The ID of the item to remove
     * @returns {boolean} - True if removed successfully, false otherwise
     */
    removeItem(sectionId, itemId) {
        const section = this.biodataData[sectionId];
        if (!section || !section.items) return false;

        const index = section.items.findIndex(item => item.id === itemId);
        if (index === -1) return false;

        section.items.splice(index, 1);
        // Re-populate the section to reflect changes
        this.populateSection(sectionId, sectionId);
        return true;
    }

    /**
     * Get items by category across all sections
     * @param {string} category - The category to filter by
     * @returns {array} - Array of items matching the category
     */
    getItemsByCategory(category) {
        const items = [];
        Object.values(this.biodataData).forEach(section => {
            if (section.items) {
                section.items.forEach(item => {
                    if (item.category === category) {
                        items.push(item);
                    }
                });
            }
        });
        return items;
    }

    /**
     * Refresh all sections with current data
     */
    refreshAll() {
        this.populateAllSections();
    }
}

// ==================== UTILITY FUNCTIONS (Global Access) ====================

/**
 * Global function to get biodata generator instance
 * @returns {BiodataGenerator|null} - The biodata generator instance or null
 */
function getBiodataGenerator() {
    return window.biodataGenerator || null;
}

/**
 * Global function to update biodata item
 * @param {string} sectionId - The section containing the item
 * @param {string} itemId - The ID of the item to update
 * @param {string} newValue - The new value for the item
 * @returns {boolean} - True if updated successfully, false otherwise
 */
function updateBiodataItem(sectionId, itemId, newValue) {
    const generator = getBiodataGenerator();
    return generator ? generator.updateItem(sectionId, itemId, newValue) : false;
}

// ==================== INITIALIZATION ====================

// Initialize the biodata generator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.biodataGenerator = new BiodataGenerator();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
    window.biodataGenerator = new BiodataGenerator();
}
