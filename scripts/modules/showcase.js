/**
 * Work Showcase Module
 * Handles work showcase and gallery functionality
 */

class WorkShowcase {
    constructor() {
        this.showcaseContainer = document.querySelector('.work-showcase-container');
        this.galleryGrid = document.querySelector('.gallery-grid');
        this.instagramComponent = null;

        // Initialize on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.init();
            });
        } else {
            this.init();
        }
    }

    init() {
        this.populateShowcase();
        this.setupResizeHandler();
    }

    setupResizeHandler() {
        // Debounced resize handler for better performance
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.populateShowcase();
            }, 250);
        });
    }

    generateWorkItemHTML(item) {
        return `
            <div class="work-item" title="${item.title}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="work-item-caption">
                    <p>${item.title}</p>
                </div>
            </div>
        `;
    }

    populateShowcase() {
        const isPortfolioPage = window.location.pathname.includes('portfolio.html');

        // Handle portfolio page showcase
        if (this.showcaseContainer && isPortfolioPage) {
            this.populatePortfolioShowcase();
        } else if (this.showcaseContainer) {
            // Clear showcase container on non-portfolio pages
            this.showcaseContainer.innerHTML = '';
        }

        // Handle gallery grid (for modal)
        if (this.galleryGrid) {
            this.populateGalleryGrid();
        }
    }

    populatePortfolioShowcase() {
        if (!this.showcaseContainer) return;

        // Clear existing content
        this.showcaseContainer.innerHTML = '';

        try {
            // Create Instagram Frame Component instance
            this.instagramComponent = new InstagramFrameComponent(this.showcaseContainer, {
                maxWidth: '350px',
                enableLazyLoading: true
            });

            // Render all work items using the component
            this.instagramComponent.renderFrames(workData);

            // Store component reference for potential updates
            window.instagramComponent = this.instagramComponent;
        } catch (error) {
            console.error('Error initializing Instagram Frame Component:', error);
            // Fallback to basic HTML generation
            this.populateBasicShowcase();
        }
    }

    populateBasicShowcase() {
        if (!this.showcaseContainer || !workData) return;

        this.showcaseContainer.innerHTML = '';
        workData.forEach(item => {
            this.showcaseContainer.innerHTML += this.generateWorkItemHTML(item);
        });
    }

    populateGalleryGrid() {
        if (!this.galleryGrid || !workData) return;

        this.galleryGrid.innerHTML = '';
        workData.forEach(item => {
            this.galleryGrid.innerHTML += this.generateWorkItemHTML(item);
        });
    }

    positionWorkItems() {
        if (!this.showcaseContainer) return;

        const workItems = this.showcaseContainer.querySelectorAll('.work-item');
        const isPortfolioPage = window.location.pathname.includes('portfolio.html');

        // Don't apply any positioning - let CSS grid handle the layout
        workItems.forEach(item => {
            item.style.position = '';
            item.style.top = '';
            item.style.left = '';
            item.style.transform = '';
            item.style.width = '';
            item.style.height = '';
        });
    }

    // Method to refresh showcase (useful for dynamic updates)
    refresh() {
        this.populateShowcase();
    }
}

// Export for use in other modules
window.WorkShowcase = WorkShowcase;
