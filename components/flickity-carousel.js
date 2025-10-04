// ==================== FLICKITY CAROUSEL COMPONENT JAVASCRIPT ====================

// CSS-only carousel implementation with Flickity-like behavior
class FlickityCarousel {
    constructor() {
        this.carouselContainer = null;
        this.carousel = null;
        this.gallery = null;
        this.cells = [];
        this.currentIndex = 0;
        this.isAnimating = false;

        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadCarousel());
        } else {
            await this.loadCarousel();
        }
    }

    async loadCarousel() {
        this.carouselContainer = document.getElementById('carousel-container');
        if (!this.carouselContainer) {
            console.error('Carousel container not found');
            return;
        }

        try {
            // Fetch the flickity carousel HTML
            const response = await fetch('components/flickity-carousel.html');
            const html = await response.text();

            // Insert the flickity carousel HTML
            this.carouselContainer.innerHTML = html;

            // Initialize carousel after HTML is loaded
            this.setupCarousel();
        } catch (error) {
            console.error('Error loading flickity carousel component:', error);
        }
    }

    setupCarousel() {
        this.carousel = document.querySelector('.flickity-carousel');
        this.gallery = document.querySelector('.gallery');

        if (!this.carousel || !this.gallery) {
            console.error('Flickity carousel elements not found');
            return;
        }

        this.cells = Array.from(document.querySelectorAll('.gallery-cell'));
        this.loadProfileImages();
        this.setupEventListeners();
        this.setupInfiniteScroll();
        this.updateDots();
    }

    loadProfileImages() {
        // Get profile pictures array
        const photoUrls = window.photoUrls || [];

        // Update each gallery cell with profile images
        this.cells.forEach((cell, index) => {
            const imageIndex = index % photoUrls.length;
            const imageUrl = photoUrls[imageIndex];

            cell.style.backgroundImage = `url('${imageUrl}')`;
            cell.style.backgroundSize = 'cover';
            cell.style.backgroundPosition = 'center';
            cell.style.backgroundRepeat = 'no-repeat';

            // Remove the counter number since we're using images
            cell.style.color = 'transparent';
        });

        // Hide the before pseudo-element that shows numbers
        const style = document.createElement('style');
        style.textContent = `
            .flickity-carousel .gallery-cell:before {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Scroll event for position tracking
        this.gallery.addEventListener('scroll', () => {
            if (!this.isAnimating) {
                this.updateCurrentIndex();
                this.updateDots();
            }
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let isScrolling = false;

        this.gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isScrolling = false;
        });

        this.gallery.addEventListener('touchmove', (e) => {
            if (!startX) return;

            const currentX = e.touches[0].clientX;
            const diffX = startX - currentX;

            if (Math.abs(diffX) > 10) {
                isScrolling = true;
            }
        });

        this.gallery.addEventListener('touchend', (e) => {
            if (isScrolling) {
                const endX = e.changedTouches[0].clientX;
                const diffX = startX - endX;

                if (Math.abs(diffX) > 50) { // Minimum swipe distance
                    if (diffX > 0) {
                        this.nextSlide();
                    } else {
                        this.previousSlide();
                    }
                }
            }

            startX = 0;
            isScrolling = false;
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    setupInfiniteScroll() {
        // Duplicate cells for infinite scroll effect
        const originalCells = this.cells.slice();
        const galleryWidth = this.gallery.offsetWidth;

        // Add clones at the beginning and end for seamless looping
        originalCells.forEach((cell, index) => {
            const cloneStart = cell.cloneNode(true);
            const cloneEnd = cell.cloneNode(true);

            cloneStart.classList.add('clone');
            cloneEnd.classList.add('clone');

            // Insert before first cell
            this.gallery.insertBefore(cloneStart, this.cells[0]);

            // Append after last cell
            this.gallery.appendChild(cloneEnd);
        });

        // Update cells array
        this.cells = Array.from(document.querySelectorAll('.gallery-cell:not(.clone)'));
    }

    updateCurrentIndex() {
        const scrollLeft = this.gallery.scrollLeft;
        const cellWidth = this.cells[0].offsetWidth + 10; // Include margin
        const newIndex = Math.round(scrollLeft / cellWidth);
        this.currentIndex = newIndex;
    }

    updateDots() {
        // Remove existing dots container if it exists
        const existingDotsContainer = document.querySelector('.flickity-dots-container');
        if (existingDotsContainer) {
            existingDotsContainer.remove();
        }

        // Create dots container
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'flickity-dots-container';
        dotsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            margin-top: 1rem;
            gap: 8px;
        `;

        // Create dots for each cell
        this.cells.forEach((cell, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: ${index === this.currentIndex ? 'var(--secondary-gold)' : 'rgba(255, 255, 255, 0.5)'};
                cursor: pointer;
                transition: background 0.3s ease;
            `;

            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });

            dotsContainer.appendChild(dot);
        });

        this.carousel.appendChild(dotsContainer);
    }

    goToSlide(index) {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.currentIndex = index;
        const cellWidth = this.cells[0].offsetWidth + 10;
        const scrollPosition = index * cellWidth;

        this.gallery.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        setTimeout(() => {
            this.isAnimating = false;
            this.updateDots();
        }, 300);
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.cells.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentIndex - 1 + this.cells.length) % this.cells.length;
        this.goToSlide(prevIndex);
    }

    // Public API methods
    select(index) {
        this.goToSlide(index);
    }

    next() {
        this.nextSlide();
    }

    previous() {
        this.previousSlide();
    }
}

// Initialize flickity carousel when script loads
document.addEventListener('DOMContentLoaded', () => {
    window.flickityCarousel = new FlickityCarousel();
});
