/**
 * Biodata Generator Module
 * Dynamically generates biodata sections from JSON data
 */

class BiodataGenerator {
    constructor() {
        this.biodataData = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready, then load data and generate
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadData();
            });
        } else {
            this.loadData();
        }
    }

    async loadData() {
        try {
            // For now, we'll use a simpler approach with inline data
            // In production, you could fetch from an API endpoint
            this.biodataData = this.getBiodataData();
            this.generateAllSections();
        } catch (error) {
            console.error('Error loading biodata data:', error);
        }
    }

    getBiodataData() {
        // Try to get data from the loaded JSON script
        // If JSON is loaded as a script tag, it might be available globally
        if (typeof window !== 'undefined' && window.biodataData) {
            return window.biodataData;
        }
        
        // Fallback to inline data if JSON not available
        console.warn('JSON data not found, using fallback data');
        return this.getFallbackData();
    }

    getFallbackData() {
        // Return the biodata data directly as fallback
        return {
            "personalDetails": {
                "title": "Personal Details",
                "items": [
                    {
                        "label": "Date of Birth",
                        "value": "15 April 1999"
                    },
                    {
                        "label": "Time of Birth",
                        "value": "[HH:MM AM/PM]"
                    },
                    {
                        "label": "Place of Birth",
                        "value": "Bundi, Rajasthan"
                    },
                    {
                        "label": "Height",
                        "value": "5'8\""
                    },
                    {
                        "label": "Complexion",
                        "value": "Wheatish"
                    },
                    {
                        "label": "Blood Group",
                        "value": "B+"
                    },
                    {
                        "label": "Rashi (Moon Sign)",
                        "value": "[Your Rashi]"
                    },
                    {
                        "label": "Nakshatra",
                        "value": "[Your Nakshatra]"
                    },
                    {
                        "label": "Gotra",
                        "value": "Phaphadansh"
                    },
                    {
                        "label": "Manglik",
                        "value": "No"
                    },
                    {
                        "label": "Habits",
                        "value": "Non-drinker, Non-smoker"
                    }
                ]
            },
            "familyDetails": {
                "title": "Family Details",
                "items": [
                    {
                        "label": "Father's Name",
                        "value": "Shailendra Lakhotiya"
                    },
                    {
                        "label": "Father's Occupation",
                        "value": "Business"
                    },
                    {
                        "label": "Mother's Name",
                        "value": "Uma Maheshwari"
                    },
                    {
                        "label": "Mother's Occupation",
                        "value": "Vice Principal"
                    },
                    {
                        "label": "Brothers",
                        "value": "1 - Married"
                    },
                    {
                        "label": "Family Type",
                        "value": "Joint"
                    },
                    {
                        "label": "Native Place",
                        "value": "Bundi, Rajasthan"
                    }
                ]
            },
            "educationProfession": {
                "title": "Education & Professional Details",
                "items": [
                    {
                        "label": "Highest Education",
                        "value": "B.Tech in Computer Science and Engineering"
                    },
                    {
                        "label": "College/University",
                        "value": "Manipal Institute of Technology"
                    },
                    {
                        "label": "Occupation",
                        "value": "Software Engineer"
                    },
                    {
                        "label": "Company",
                        "value": "Angelone Broking"
                    },
                    {
                        "label": "Designation",
                        "value": "SDE-2"
                    },
                    {
                        "label": "Work Location",
                        "value": "Bangalore - Remote"
                    },
                    {
                        "label": "Annual Income",
                        "value": "25-40 LPA"
                    }
                ]
            },
            "partnerPreferences": {
                "title": "Partner Preferences",
                "items": [
                    {
                        "label": "Age",
                        "value": "23-26 years"
                    },
                    {
                        "label": "Height",
                        "value": "[5'2\" - 5'7\"]"
                    },
                    {
                        "label": "Education",
                        "value": "Graduate / Post-Graduate"
                    },
                    {
                        "label": "Occupation",
                        "value": "[Any / Working Professional preferred]"
                    },
                    {
                        "label": "Family Background",
                        "value": "Cultured and educated family"
                    },
                    {
                        "label": "Values",
                        "value": "Traditional with modern outlook"
                    },
                    {
                        "label": "Location Preference",
                        "value": "[Any metropolitan city in India]"
                    },
                    {
                        "label": "Other Preferences",
                        "value": "Understanding, caring, and family-oriented"
                    },
                    {
                        "label": "Habits",
                        "value": "Prefers a non-smoker and non-drinker."
                    }
                ]
            },
            "hobbiesInterests": {
                "title": "Hobbies & Interests",
                "items": [
                    {
                        "label": "Photography",
                        "value": "Wildlife, landscape, and astrophotography (deep sky, moon/sun alignments)."
                    },
                    {
                        "label": "Music",
                        "value": "Cinematic storytelling and producing EDM music."
                    },
                    {
                        "label": "Instruments",
                        "value": "Playing flute, guitar, and piano; aspiring to learn Indian classical music."
                    },
                    {
                        "label": "Other Interests",
                        "value": "Passionate about understanding animal behaviour and stargazing."
                    }
                ]
            }
        };
    }

    generateAllSections() {
        if (!this.biodataData) return;

        // Generate each section
        this.generateSection('personal-details', this.biodataData.personalDetails);
        this.generateSection('family-details', this.biodataData.familyDetails);
        this.generateSection('education-profession', this.biodataData.educationProfession);
        this.generateSection('partner-preferences', this.biodataData.partnerPreferences);
        this.generateSection('hobbies-interests', this.biodataData.hobbiesInterests);
    }

    generateSection(sectionId, sectionData) {
        const section = document.getElementById(sectionId);
        if (!section) {
            console.error('Section not found:', sectionId);
            return;
        }

        // Check if this section uses info-grid or preferences-list
        let contentContainer = section.querySelector('.info-grid');
        let isPreferencesList = false;
        
        if (!contentContainer) {
            contentContainer = section.querySelector('.preferences-list');
            isPreferencesList = true;
        }
        
        if (!contentContainer) {
            console.error('Content container not found in section:', sectionId);
            return;
        }

        console.log('Generating section:', sectionId, 'with', sectionData.items.length, 'items');
        contentContainer.innerHTML = '';

        // Generate items based on container type
        if (isPreferencesList) {
            this.generatePreferencesList(contentContainer, sectionData.items);
        } else {
            this.generateInfoGrid(contentContainer, sectionData.items);
        }
    }

    generateInfoGrid(container, items) {
        items.forEach(item => {
            const infoItem = this.createInfoItem(item);
            container.appendChild(infoItem);
        });
    }

    generatePreferencesList(container, items) {
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.value; // For preferences, just use the value
            container.appendChild(listItem);
        });
    }

    createInfoItem(itemData) {
        const infoItem = document.createElement('div');
        infoItem.className = 'info-item';

        const label = document.createElement('div');
        label.className = 'info-label';
        label.textContent = itemData.label;

        const value = document.createElement('div');
        value.className = 'info-value';
        value.textContent = itemData.value;

        infoItem.appendChild(label);
        infoItem.appendChild(value);

        return infoItem;
    }

    // Method to update specific section data
    updateSectionData(sectionId, newData) {
        if (!this.biodataData) return;

        // Update the data
        if (this.biodataData[sectionId.replace('-', '')]) {
            this.biodataData[sectionId.replace('-', '')].items = newData;
            this.generateSection(sectionId, this.biodataData[sectionId.replace('-', '')]);
        }
    }

    // Method to get current data
    getData() {
        return this.biodataData;
    }
}

// Export for use in other modules
window.BiodataGenerator = BiodataGenerator;
