// Navigation Configuration
const navigationConfig = {
    // Main navigation items
    items: [
        {
            text: 'Biodata',
            url: 'biodata.html',
            priority: 1,
            icon: '📜️', // Optional icon
            showInNav: true
        },
        {
            text: 'About Me',
            url: 'about-me.html',
            priority: 2,
            icon: '👤',
            showInNav: true
        },
        // {
        //     text: 'Experience',
        //     url: 'biodata.html#education-profession',
        //     priority: 3,
        //     icon: '💼',
        //     showInNav: true
        // }
        // {
        //     text: 'Interests',
        //     url: 'biodata.html#hobbies-interests',
        //     priority: 4,
        //     icon: '🎯',
        //     showInNav: true
        // },
        {
            text: 'Portfolio',
            url: 'portfolio.html',
            priority: 5,
            icon: '💼️',
            showInNav: true
        },
        // {
        //     text: 'Skills',
        //     url: 'portfolio.html#portfolio-skills-container',
        //     priority: 6,
        //     icon: '🔧',
        //     showInNav: true
        // },
        {
            text: 'Contact',
            url: 'biodata.html#contact',
            priority: 7,
            icon: '📞',
            showInNav: true
        },
        // {
        //     text: 'Compatibility',
        //     url: 'compatibility.html',
        //     priority: 8,
        //     icon: '💑',
        //     showInNav: true
        // }
    ],
    
    // Navigation breakpoints (in pixels)
    breakpoints: {
        mobile: 0,
        tablet: 768,
        desktop: 1200
    },
    
    // Items to show in navbar at different breakpoints
    itemsToShow: {
        mobile: 0,    // All items in hamburger menu
        tablet: 2,    // 2 items in navbar, rest in hamburger
        desktop: 4    // 4 items in navbar, rest in hamburger
    },
    
    // Navigation behavior
    behavior: {
        sticky: true,
        showHamburgerOnDesktop: true,
        smoothScroll: true
    },
    
    // Theme settings
    theme: {
        darkMode: true,
        highlightCurrent: true
    }
};

// Export the configuration for both browser and Node environments
if (typeof window !== 'undefined') {
    window.navigationConfig = navigationConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = navigationConfig;
}
