/**
 * Navigation Module
 * Handles gallery trigger and page navigation functionality
 */

class Navigation {
    constructor() {
        this.galleryScreen = document.getElementById('work-gallery-screen');
        this.galleryTrigger = document.getElementById('gallery-trigger');
        this.closeGalleryBtn = document.getElementById('close-gallery-btn');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Gallery trigger click handler
        if (this.galleryTrigger) {
            this.galleryTrigger.addEventListener('click', () => {
                this.handleGalleryTrigger();
            });
        } else {
            console.log('Gallery trigger not found on page:', window.location.pathname);
        }

        // Close gallery button
        if (this.closeGalleryBtn) {
            this.closeGalleryBtn.addEventListener('click', () => {
                this.closeGallery();
            });
        }

        // Keyboard navigation for portfolio page
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    handleGalleryTrigger() {
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
    }

    handleKeyboardNavigation(e) {
        const isPortfolioPage = window.location.pathname.includes('portfolio.html');

        if (isPortfolioPage) {
            // On portfolio page - handle navigation back to biodata
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                // Navigate back to biodata with reverse swipe animation
                document.body.classList.add('swipe-to-biodata');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);
            }
        }
        // Note: Carousel navigation is handled by the carousel module
    }

    closeGallery() {
        if (this.galleryScreen) {
            this.galleryScreen.classList.remove('active');
        }
    }

    // Method to programmatically trigger gallery navigation
    navigateToGallery() {
        if (this.galleryTrigger) {
            this.galleryTrigger.click();
        }
    }
}

// Export for use in other modules
window.Navigation = Navigation;
