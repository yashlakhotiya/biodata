// Debug logging
console.log('=== Scripts.js loaded ===');
console.log('workData available at load:', typeof workData !== 'undefined' ? workData : 'Not loaded yet');
// ==================== WORK SHOWCASE & GALLERY SETUP ==================== //
let isShowcaseInitialized = false;

const galleryScreen = document.getElementById('work-gallery-screen');
const galleryTrigger = document.getElementById('gallery-trigger');
const closeGalleryBtn = document.getElementById('close-gallery-btn');

// Handle gallery trigger based on current page
if (galleryTrigger) {
    galleryTrigger.addEventListener('click', () => {
        console.log('Gallery trigger clicked on page:', window.location.pathname);
        const isPortfolioPage = window.location.pathname.includes('portfolio');
        console.log('Is portfolio page:', isPortfolioPage);

        if (isPortfolioPage) {
            console.log('Adding swipe-to-biodata class and navigating to biodata.html');
            // From portfolio page - navigate back to biodata with reverse swipe
            document.body.classList.add('swipe-to-biodata', 'user-triggered');
            setTimeout(() => {
                window.location.href = 'biodata.html';
            }, 600); // Match CSS animation duration for smoother transition
        } else {
            console.log('Adding swipe-to-portfolio class and navigating to portfolio.html');
            // From biodata page - navigate to portfolio with swipe
            document.body.classList.add('swipe-to-portfolio', 'user-triggered');
            setTimeout(() => {
                window.location.href = 'portfolio.html';
            }, 600); // Match CSS animation duration for smoother transition
        }
    });
} else {
    console.log('Gallery trigger not found on page:', window.location.pathname);
}

if (closeGalleryBtn) {
    closeGalleryBtn.addEventListener('click', () => galleryScreen.classList.remove('active'));
}

// --- TOUCH/SWIPE & KEYBOARD FOR CAROUSEL ---
document.addEventListener('keydown', (e) => {
    const isPortfolioPage = window.location.pathname.includes('portfolio');

    if (isPortfolioPage) {
        // On portfolio page - handle navigation back to biodata
        if (e.key === 'ArrowLeft') {
            // Navigate back to biodata with reverse swipe animation
            document.body.classList.add('swipe-to-biodata', 'user-triggered');
            setTimeout(() => {
                window.location.href = 'biodata.html';
            }, 450);
        }
        // Right arrow on portfolio page could also navigate back (alternative)
        if (e.key === 'ArrowRight') {
            document.body.classList.add('swipe-to-biodata', 'user-triggered');
            setTimeout(() => {
                window.location.href = 'biodata.html';
            }, 450);
        }
    } else {
    }
});

function populateShowcase() {
    console.log('=== populateShowcase() called ===');
    const showcaseContainer = document.querySelector('.work-items-container');
    const isPortfolioPage = window.location.pathname.includes('portfolio');

    // Only proceed if we're on the portfolio page and have a container
    if (!isPortfolioPage || !showcaseContainer) {
        console.log('Not on portfolio page or container not found');
        return;
    }

    // Clear existing content to ensure fresh render
    showcaseContainer.innerHTML = '';

    if (workData && workData.length > 0) {
        console.log('Initializing Work Items Gallery with', workData.length, 'items');

        // Initialize the gallery
        const gallery = new WorkItemsGallery(showcaseContainer, {
            gap: '20px',
            enableLazyLoading: true
        });

        gallery.initialize(workData);
        isShowcaseInitialized = true;
    } else {
        console.warn('No work data available to populate showcase');
    }
}

// Update the initialization logic at the bottom of scripts.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    // Only run populateShowcase if we're on the portfolio page
    if (window.location.pathname.includes('portfolio')) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            console.log('Running initial populateShowcase');
            populateShowcase();
        });
    }
});

// Update the pageshow event listener
window.addEventListener('pageshow', (event) => {
    console.log('Pageshow event triggered');
    const isPortfolioPage = window.location.pathname.includes('portfolio');

    // Only run if we're on the portfolio page and the showcase isn't already initialized
    if (isPortfolioPage && !isShowcaseInitialized) {
        console.log('Initializing portfolio page content');
        // Use a small timeout to ensure DOM is ready
        setTimeout(() => {
            if (!isShowcaseInitialized) {
                populateShowcase();
            }
        }, 100);
    }
});
