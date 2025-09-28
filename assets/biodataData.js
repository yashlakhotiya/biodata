// ==================== BIODATA DATA STRUCTURE ====================
// Database-like structure for biodata information
// This replaces the need for separate JSON loading and provides a more modular approach

const biodataData = {
    personalDetails: {
        title: "Personal Details",
        items: [
            {
                id: "dob",
                label: "Date of Birth",
                value: "15 April 1999",
                category: "basic"
            },
            {
                id: "tob",
                label: "Time of Birth",
                value: "[HH:MM AM/PM]",
                category: "basic"
            },
            {
                id: "pob",
                label: "Place of Birth",
                value: "Bundi, Rajasthan",
                category: "basic"
            },
            {
                id: "height",
                label: "Height",
                value: "5'8\"",
                category: "physical"
            },
            {
                id: "complexion",
                label: "Complexion",
                value: "Wheatish",
                category: "physical"
            },
            {
                id: "blood_group",
                label: "Blood Group",
                value: "B+",
                category: "health"
            },
            {
                id: "rashi",
                label: "Rashi (Moon Sign)",
                value: "[Your Rashi]",
                category: "astrological"
            },
            {
                id: "nakshatra",
                label: "Nakshatra",
                value: "[Your Nakshatra]",
                category: "astrological"
            },
            {
                id: "gotra",
                label: "Gotra",
                value: "Phaphadansh",
                category: "traditional"
            },
            {
                id: "manglik",
                label: "Manglik",
                value: "No",
                category: "astrological"
            },
            {
                id: "habits",
                label: "Habits",
                value: "Non-drinker, Non-smoker",
                category: "lifestyle"
            }
        ]
    },

    familyDetails: {
        title: "Family Details",
        items: [
            {
                id: "father_name",
                label: "Father's Name",
                value: "Shailendra Lakhotiya",
                category: "parents"
            },
            {
                id: "father_occupation",
                label: "Father's Occupation",
                value: "Business",
                category: "parents"
            },
            {
                id: "mother_name",
                label: "Mother's Name",
                value: "Uma Maheshwari",
                category: "parents"
            },
            {
                id: "mother_occupation",
                label: "Mother's Occupation",
                value: "Vice Principal",
                category: "parents"
            },
            {
                id: "brothers",
                label: "Brothers",
                value: "1 - Married",
                category: "siblings"
            },
            {
                id: "family_type",
                label: "Family Type",
                value: "Joint",
                category: "structure"
            },
            {
                id: "native_place",
                label: "Native Place",
                value: "Bundi, Rajasthan",
                category: "origin"
            }
        ]
    },

    educationProfession: {
        title: "Education & Professional Details",
        items: [
            {
                id: "education",
                label: "Highest Education",
                value: "B.Tech in Computer Science and Engineering",
                category: "education"
            },
            {
                id: "college",
                label: "College/University",
                value: "Manipal Institute of Technology",
                category: "education"
            },
            {
                id: "occupation",
                label: "Occupation",
                value: "Software Engineer",
                category: "professional"
            },
            {
                id: "company",
                label: "Company",
                value: "Angelone Broking",
                category: "professional"
            },
            {
                id: "designation",
                label: "Designation",
                value: "SDE-2",
                category: "professional"
            },
            {
                id: "work_location",
                label: "Work Location",
                value: "Bangalore - Remote",
                category: "professional"
            },
            {
                id: "annual_income",
                label: "Annual Income",
                value: "25-40 LPA",
                category: "professional"
            }
        ]
    },

    partnerPreferences: {
        title: "Partner Preferences",
        items: [
            {
                id: "age_pref",
                label: "Age",
                value: "23-26 years",
                category: "basic"
            },
            {
                id: "height_pref",
                label: "Height",
                value: "[5'2\" - 5'7\"]",
                category: "physical"
            },
            {
                id: "education_pref",
                label: "Education",
                value: "Graduate / Post-Graduate",
                category: "education"
            },
            {
                id: "occupation_pref",
                label: "Occupation",
                value: "[Any / Working Professional preferred]",
                category: "professional"
            },
            {
                id: "family_background_pref",
                label: "Family Background",
                value: "Cultured and educated family",
                category: "family"
            },
            {
                id: "values_pref",
                label: "Values",
                value: "Traditional with modern outlook",
                category: "personality"
            },
            {
                id: "location_pref",
                label: "Location Preference",
                value: "[Any metropolitan city in India]",
                category: "location"
            },
            {
                id: "other_pref",
                label: "Other Preferences",
                value: "Understanding, caring, and family-oriented",
                category: "personality"
            },
            {
                id: "habits_pref",
                label: "Habits",
                value: "Prefers a non-smoker and non-drinker.",
                category: "lifestyle"
            }
        ]
    },

    hobbiesInterests: {
        title: "Hobbies & Interests",
        items: [
            {
                id: "photography",
                label: "Photography",
                value: "Wildlife, landscape, and astrophotography (deep sky, moon/sun alignments)",
                category: "creative"
            },
            {
                id: "music",
                label: "Music",
                value: "Cinematic storytelling and producing EDM music",
                category: "creative"
            },
            {
                id: "instruments",
                label: "Instruments",
                value: "Playing flute, guitar, and piano; aspiring to learn Indian classical music",
                category: "creative"
            },
            {
                id: "other_interests",
                label: "Other Interests",
                value: "Passionate about understanding animal behaviour and stargazing",
                category: "nature"
            }
        ]
    }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get biodata section by ID
 * @param {string} sectionId - The ID of the section to retrieve
 * @returns {object|null} - The section object or null if not found
 */
function getBiodataSection(sectionId) {
    return biodataData[sectionId] || null;
}

/**
 * Get all biodata sections
 * @returns {object} - All biodata sections
 */
function getAllBiodataSections() {
    return biodataData;
}

/**
 * Get items by category across all sections
 * @param {string} category - The category to filter by
 * @returns {array} - Array of items matching the category
 */
function getItemsByCategory(category) {
    const items = [];
    Object.values(biodataData).forEach(section => {
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
 * Update a specific biodata item
 * @param {string} sectionId - The section containing the item
 * @param {string} itemId - The ID of the item to update
 * @param {string} newValue - The new value for the item
 * @returns {boolean} - True if updated successfully, false otherwise
 */
function updateBiodataItem(sectionId, itemId, newValue) {
    const section = biodataData[sectionId];
    if (!section || !section.items) return false;

    const item = section.items.find(item => item.id === itemId);
    if (!item) return false;

    item.value = newValue;
    return true;
}
