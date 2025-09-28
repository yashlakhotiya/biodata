// Debug logging
console.log('=== Scripts.js loaded ===');
console.log('workData available at load:', typeof workData !== 'undefined' ? workData : 'Not loaded yet');

// Photo carousel functionality
const totalPhotos = 6;
let currentPhotoIndex = 0;
let photoElements;
let indicatorElements;

// Define your photo URLs here
const photoUrls = [
    'assets/images/photo1.png',
    'assets/images/photo2.jpg',
    'assets/images/photo3.jpg',
    'assets/images/photo4.jpg',
    'assets/images/photo5.jpg',
    'assets/images/photo6.jpg'
];

// ==================== INITIALIZATION ==================== //
document.addEventListener('DOMContentLoaded', () => {
    // --- CAROUSEL SETUP ---
    const photoStack = document.querySelector('.photo-stack');
    const photoElements = document.querySelectorAll('.photo-frame');
    const indicatorElements = document.querySelectorAll('.indicator');
    const totalPhotos = photoElements.length;
    let currentPhotoIndex = Math.floor(totalPhotos / 2); // Start at the middle photo
    let isExpanded = false;

    function updateCarousel() {
        photoElements.forEach((photo, index) => {
            photo.classList.remove('center', 'left', 'right', 'hidden-left', 'hidden-right');
            let newPosition = (index - currentPhotoIndex + totalPhotos) % totalPhotos;
            if (newPosition === 0) photo.classList.add('center');
            else if (newPosition === 1) photo.classList.add('right');
            else if (newPosition === totalPhotos - 1) photo.classList.add('left');
            else if (newPosition === 2) photo.classList.add('hidden-right');
            else photo.classList.add('hidden-left');
        });
        indicatorElements.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentPhotoIndex);
        });
    }

    window.changePhoto = function(direction) {
        currentPhotoIndex = (currentPhotoIndex + direction + totalPhotos) % totalPhotos;
        updateCarousel();
    }
    window.goToPhoto = function(index) {
        currentPhotoIndex = index;
        updateCarousel();
    }

    // Only attach carousel event listeners if elements exist
    if (photoStack) {
        // Expand/Collapse Logic
        photoStack.addEventListener('click', (e) => {
            if (e.target.closest('.photo-frame.center')) {
                isExpanded = !isExpanded;
                photoStack.classList.toggle('expanded', isExpanded);
            }
        });

        // --- TOUCH/SWIPE & KEYBOARD FOR CAROUSEL ---
        let touchStartX = 0;
        let touchEndX = 0;
        photoStack.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, false);
        photoStack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) changePhoto(1);
            if (touchEndX > touchStartX + 50) changePhoto(-1);
        }, false);
    }

    // --- INITIAL CALLS ---
    if (typeof updateCarousel === 'function') {
        updateCarousel();
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
        const isPortfolioPage = window.location.pathname.includes('portfolio.html');
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
    const isPortfolioPage = window.location.pathname.includes('portfolio.html');

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

// ==================== WORK SHOWCASE LOGIC ==================== //

function generateWorkItemHTML(item) {
    return `
        <div class="work-item" title="${item.title}">
            <img src="${item.image}" alt="${item.title}">
            <div class="work-item-caption">
                <p>${item.title}</p>
            </div>
        </div>
    `;
}

function populateShowcase() {
    console.log('=== populateShowcase() called ===');
    const showcaseContainer = document.querySelector('.work-showcase-container');
    const galleryGrid = document.querySelector('.gallery-grid');
    const isPortfolioPage = window.location.pathname.includes('portfolio.html');
    
    console.log('Showcase container found:', !!showcaseContainer);
    console.log('Gallery grid found:', !!galleryGrid);
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
            // Create Instagram Frame Component instance
            const instagramComponent = new InstagramFrameComponent(showcaseContainer, {
                maxWidth: '350px',
                enableLazyLoading: true
            });
            console.log('Instagram Frame Component created successfully');

            // Render all work items using the component
            if (workData && workData.length > 0) {
                console.log('Rendering work items:', workData.length);
                instagramComponent.renderFrames(workData);
                console.log('Work items rendered successfully');
            } else {
                console.warn('No work data available to render');
            }

            // Store component reference for potential updates
            window.instagramComponent = instagramComponent;
        } catch (error) {
            console.error('Error initializing Instagram Frame Component:', error);
        }
    } else if (showcaseContainer) {
        console.log('Clearing showcase container on non-portfolio page');
        // Clear showcase container on non-portfolio pages
        showcaseContainer.innerHTML = '';
    }

    // Keep gallery grid functionality for modal (when gallery button is clicked)
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        // Use traditional HTML generation for gallery grid (simpler for modal)
        workData.forEach(item => {
            galleryGrid.innerHTML += generateWorkItemHTML(item);
        });
    }
}

function positionWorkItems() {
    const container = document.querySelector('.container');
    const workItems = document.querySelectorAll('.work-showcase-container .work-item');
    const viewportWidth = window.innerWidth;
    const isPortfolioPage = window.location.pathname.includes('portfolio.html');

    // Don't apply any positioning - let CSS grid handle the layout
    // This ensures clean, organized display within the container bounds
    workItems.forEach(item => {
        item.style.position = '';
        item.style.top = '';
        item.style.left = '';
        item.style.transform = '';
        item.style.width = '';
        item.style.height = '';
    });
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
