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
                value: "06:10 PM",
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
                id: "gotra",
                label: "Gotra",
                value: "Lakhotiya and Jhanwar",
                category: "traditional"
            },
            {
                id: "manglik",
                label: "Manglik",
                value: "No",
                category: "astrological"
            }
        ]
    },

    paternalFamilyDetails: {
        title: "Paternal Family Details",
        items: [
            {
                id: "paternal_grandfather",
                label: "Grandfather",
                value: "Late Shri. Nand Kishore Lakhotiya",
                occupation: "PA to DJ, Bundi District Court",
                spouse: {
                    name: "Smt. Prem Lata Lakhotiya",
                    nativePlace: "Bundi"
                },
                category: "grandparents"
            },
            {
                id: "badepapa_elder",
                label: "Bade Papa and Badi Mummy (Elder)",
                value: "Shri Bhagwan Lakhotiya",
                occupation: "Business Firm (Hadoti Rice Mill)",
                spouse: {
                    name: "Smt. Leela Lakhotiya",
                    nativePlace: "Gudha"
                },
                category: "uncle"
            },
            {
                id: "badepapa_younger",
                label: "Bade Papa and Badi Mummy (Younger)",
                value: "Shri Murli Lakhotiya",
                occupation: "Business Firm (Hadoti Rice Mill)",
                spouse: {
                    name: "Smt. Madhu Lakhotiya",
                    nativePlace: "Jaipur"
                },
                category: "uncle"
            },
            {
                id: "father",
                label: "Parents",
                value: "Shailendra Lakhotiya",
                occupation: "Business Firm (Shailuma Enterprises), Dealership in Edible Oil, Hadoti Rice Mill",
                spouse: {
                    name: "Smt. Uma Maheshwari",
                    nativePlace: "Kota",
                    occupation: "Vice Principal @ Government School, Native: Kota"
                },
                category: "parents"
            },
            // Brother and Sister-in-law
            {
                id: "brother-1",
                label: "Brother & Sister-in-law",
                value: "Kartik Lakhotiya",
                occupation: "Pursuing Ph.D. from Cleveland Clinic, USA",
                spouse: {
                    name: "CA. Radhika Maheshwari",
                    occupation: "Chartered Accountant",
                    nativePlace: "Ajmer"
                },
                category: "siblings"
            },
            // Elder Uncle's Family - Son
            {
                id: "cousin_1",
                label: "Cousin Brother and Sister in Law",
                value: "Shri Pankaj Lakhotiya",
                occupation: "Business Firm (Hadoti Rice Mill)",
                spouse: {
                    name: "Smt. Neha Lakhotiya",
                    nativePlace: "Shahpura"
                },
                category: "cousins"
            },
            // Elder Uncle's Family - Daughter
            {
                id: "cousin_2",
                label: "Cousin Brother and Sister in Law",
                value: "Shri Prabal Lakhotiya",
                occupation: "Business Startup, gliped.com",
                spouse: {
                    name: "Shri Neha Lakhotiya",
                    nativePlace: "Jodhpur, Kochi"
                },
                category: "cousins"
            },
            // Younger Uncle's Family - Son
            {
                id: "cousin_3",
                label: "Cousin Sister and Brother in Law",
                value: "Smt. Monika Lahoty",
                spouse: {
                    name: "Shri Pratul Lahoty",
                    occupation: "Plant Head, NPM, Bawal",
                    nativePlace: "Jhalawar"
                },
                category: "cousins"
            },
            // Younger Uncle's Family - Daughter
            {
                id: "cousin_4",
                label: "Cousin Sister and Brother in Law",
                value: "Smt. Megha Maheshwari",
                occupation: "Interior Designer",
                spouse: {
                    name: "Shri Prakhar Maheshwari",
                    occupation: "Business, Jaipur Filling stn., Jaipur tyre house, Riddhi Siddhi Filling stn.",
                    nativePlace: "Jaipur"
                },
                category: "cousins"
            },
            {
                id: "cousin_5",
                label: "Cousin Sister and Brother in Law",
                value: "Smt. Jaya Maheshwari",
                occupation: "Associate, KMK Ventures",
                spouse: {
                    name: "Shri Akshay Birla",
                    occupation: "Manager @ NAV Jaipur",
                    nativePlace: "Bundi"
                },
                category: "cousins"
            },
            {
                id: "cousin_7",
                label: "Cousin",
                value: "Nimish Lakhotiya",
                occupation: "B.Tech. Computer Science",
                category: "cousins"
            },
            {
                id: "bhua",
                label: "Bhua and Fufaji",
                value: "Smt. Vijay Lakshmi",
                spouse: {
                    name: "Dr. K.C. Gagrani",
                    occupation: "Doctor, Child Specialist",
                    nativePlace: "Bundi"
                },
                category: "bhua"
            }
        ]
    },

    maternalFamilyDetails: {
        title: "Maternal Family Details",
        items: [
            {
                id: "maternal_grandfather",
                label: "Nana and Nani Ji",
                value: "Late Shri Brij Mohan Ji Gupta, Kota",
                occupation: "Retd. AAO RAPP, Rawatbhata",
                spouse: {
                    name: 'Smt. Lalita Devi',
                    nativePlace: 'Dehit'
                },
                category: "grandparents"
            },
            {
                id: "mama_ji",
                label: "Mama and Mami Ji",
                value: "Shri Mahesh Gupta",
                occupation: "Contractor, Kota",
                spouse: {
                    name: 'Smt. Meenakshi Maheshwari',
                    nativePlace: 'Chipabarod'
                },
                category: "uncle"
            },
            {
                id: "mausi_1",
                label: "Mausi & Mausa Ji",
                value: "Smt. Nisha Samriya",
                nativePlace: "Chittorgarh",
                occupation: 'Mathematics Teacher @ BSK, Chittorgarh',
                spouse: {
                    name: "Shri Sunil Samriya",
                    nativePlace: 'Chittorgarh',
                    occupation: "Business"
                },
                category: "aunt-uncle"
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
                value: "Manipal Institute of Technology, Udupi, Karnataka",
                category: "education"
            },
            {
                id: "occupation",
                label: "Occupation",
                value: "Software Engineer, (Backend)",
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
