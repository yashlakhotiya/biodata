// Debug logging
console.log('=== Scripts.js loaded ===');
console.log('workData available at load:', typeof workData !== 'undefined' ? workData : 'Not loaded yet');
// ==================== WORK SHOWCASE & GALLERY SETUP ==================== //
let isShowcaseInitialized = false;

populateShowcase();

// Reset initialization state on page navigation to ensure proper loading
window.addEventListener('pageshow', (event) => {
    console.log('Pageshow event triggered, resetting initialization state');
    const isPortfolioPage = window.location.pathname.includes('portfolio');

    // Reset showcase state for portfolio page
    if (isPortfolioPage) {
        isShowcaseInitialized = false;
        setTimeout(() => populateShowcase(), 100);
    }
});

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
            console.log('Adding swipe-to-biodata class and navigating to index.html');
            // From portfolio page - navigate back to biodata with reverse swipe
            document.body.classList.add('swipe-to-biodata', 'user-triggered');
            setTimeout(() => {
                window.location.href = 'index.html';
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
                window.location.href = 'index.html';
            }, 450);
        }
        // Right arrow on portfolio page could also navigate back (alternative)
        if (e.key === 'ArrowRight') {
            document.body.classList.add('swipe-to-biodata', 'user-triggered');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 450);
        }
    } else {
    }
});

function populateShowcase() {
    console.log('=== populateShowcase() called ===');
    const showcaseContainer = document.querySelector('.work-items-container');
    const isPortfolioPage = window.location.pathname.includes('portfolio');
    
    console.log('Showcase container found:', !!showcaseContainer);
    console.log('Is portfolio page:', isPortfolioPage);
    console.log('workData available:', !!workData);
    console.log('Showcase already initialized:', isShowcaseInitialized);
    
    if (workData) {
        console.log('workData length:', workData.length);
        console.log('First work item:', workData[0]);
    }

    // Always initialize for portfolio page, reset flag if needed
    if (isPortfolioPage) {
        console.log('Initializing Work Items Gallery for portfolio page');
        
        // Clear existing content to ensure fresh render
        if (showcaseContainer) {
            showcaseContainer.innerHTML = '';
        }

        if (showcaseContainer && workData && workData.length > 0) {
            try {
                // Create Work Items Gallery instance
                const galleryComponent = new WorkItemsGallery(showcaseContainer, {
                    gap: '20px',
                    enableLazyLoading: true
                });
                console.log('Work Items Gallery created successfully');

                // Initialize and render items using the component's initialize method
                galleryComponent.initialize(workData).then(() => {
                    console.log('Work Items Gallery successfully rendered');
                    isShowcaseInitialized = true;
                }).catch(error => {
                    console.error('Error initializing Work Items Gallery:', error);
                });

                // Store component reference for potential updates
                window.galleryComponent = galleryComponent;
            } catch (error) {
                console.error('Error creating Work Items Gallery:', error);
            }
        } else {
            console.log('Showcase container or workData not available');
        }
    } else if (showcaseContainer) {
        console.log('Clearing showcase container on non-portfolio page');
        // Clear showcase container on non-portfolio pages
        showcaseContainer.innerHTML = '';
        isShowcaseInitialized = false;
    }
}
