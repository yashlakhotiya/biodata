// Debug logging
console.log('=== Scripts.js loaded ===');
console.log('workData available at load:', typeof workData !== 'undefined' ? workData : 'Not loaded yet');

// Define your photo URLs here
const photoUrls = [
    'assets/images/photo1.png',
    'assets/images/photo2.jpg',
    'assets/images/photo3.jpg',
    'assets/images/photo4.jpg',
    'assets/images/photo5.jpg',
];

// ==================== INITIALIZATION ==================== //
document.addEventListener('DOMContentLoaded', () => {
    // --- CAROUSEL SETUP ---
    const photoStack = document.querySelector('.photo-stack');
    let isExpanded = false;

    // Only attach carousel event listeners if elements exist
    if (photoStack) {
        // Expand/Collapse Logic
        photoStack.addEventListener('click', (e) => {
            if (e.target.closest('.photo-frame.center')) {
                isExpanded = !isExpanded;
                photoStack.classList.toggle('expanded', isExpanded);
            }
        });
    }
});

// ==================== WORK SHOWCASE & GALLERY SETUP ==================== //
populateShowcase();
window.addEventListener('resize', populateShowcase);

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
            document.body.classList.add('swipe-to-biodata');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        } else {
            console.log('Adding swipe-to-portfolio class and navigating to portfolio.html');
            // From biodata page - navigate to portfolio with swipe
            document.body.classList.add('swipe-to-portfolio');
            setTimeout(() => {
                window.location.href = 'portfolio.html';
            }, 300);
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
            document.body.classList.add('swipe-to-biodata');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        }
        // Right arrow on portfolio page could also navigate back (alternative)
        if (e.key === 'ArrowRight') {
            document.body.classList.add('swipe-to-biodata');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        }
    } else {
        // On biodata page - handle carousel navigation
        if (e.key === 'ArrowLeft') changePhoto(-1);
        if (e.key === 'ArrowRight') changePhoto(1);
    }
});

function populateShowcase() {
    console.log('=== populateShowcase() called ===');
    const showcaseContainer = document.querySelector('.work-items-container');
    const isPortfolioPage = window.location.pathname.includes('portfolio');
    
    console.log('Showcase container found:', !!showcaseContainer);
    console.log('Is portfolio page:', isPortfolioPage);
    console.log('workData available:', !!workData);
    
    if (workData) {
        console.log('workData length:', workData.length);
        console.log('First work item:', workData[0]);
    }

    // Initialize Instagram Frame Component for portfolio page
    if (showcaseContainer && isPortfolioPage) {
        console.log('Initializing Instagram Frame Component for portfolio page');
        // Clear existing content
        showcaseContainer.innerHTML = '';

        try {
            // Create Work Items Gallery instance
            const galleryComponent = new WorkItemsGallery(showcaseContainer, {
                gap: '20px',
                enableLazyLoading: true
            });
            console.log('Work Items Gallery created successfully');

            // Initialize and render items using the component's initialize method
            galleryComponent.initialize(workData).catch(error => {
                console.error('Error initializing Work Items Gallery:', error);
            });

            // Store component reference for potential updates
            window.galleryComponent = galleryComponent;
        } catch (error) {
            console.error('Error creating Work Items Gallery:', error);
        }
    } else if (showcaseContainer) {
        console.log('Clearing showcase container on non-portfolio page');
        // Clear showcase container on non-portfolio pages
        showcaseContainer.innerHTML = '';
    }
}

// Initialize photos with actual URLs
document.addEventListener('DOMContentLoaded', function () {
    const photos = document.querySelectorAll('.photo-frame img');
    photos.forEach((img, index) => {
        if (photoUrls[index]) {
            img.src = photoUrls[index];
            img.alt = `Profile Photo ${index + 1}`;
        }
    });
});
