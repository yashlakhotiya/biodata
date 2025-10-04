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

        // Center the first image initially
        this.centerFirstImage();

        this.updateDots();
    }

    centerFirstImage() {
        // For circular layout, start with middle image centered
        setTimeout(() => {
            if (!this.cells.length || !this.gallery) return;

            const middleIndex = Math.floor(this.cells.length / 2)-1;
            const middleCell = this.cells[middleIndex];
            if (!middleCell) return;

            const cellWidth = middleCell.offsetWidth;
            const gap = 25;
            const galleryWidth = this.gallery.offsetWidth;
            const galleryPadding = 32;

            // Calculate position to center middle image
            const availableWidth = galleryWidth - (galleryPadding * 2);
            const centerPosition = galleryPadding + ((availableWidth - cellWidth) / 2);

            // Position so middle image is centered, but we can see first and last images
            const totalContentWidth = (cellWidth + gap) * this.cells.length - gap;
            const startPosition = Math.max(0,
                (totalContentWidth - availableWidth) / 2 - (cellWidth + gap) * (middleIndex - 1)
            );

            this.gallery.scrollLeft = startPosition;

            console.log('Circular carousel centering:', {
                middleIndex,
                cellWidth,
                galleryWidth,
                totalContentWidth,
                startPosition,
                scrollLeft: this.gallery.scrollLeft
            });

            this.currentIndex = middleIndex;
        }, 100);
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
        if (this.currentIndex < this.cells.length - 1) {
            this.goToSlide(this.currentIndex + 1);
        }
        // If at last image, do nothing (no wraparound)
    }

    previousSlide() {
        if (this.currentIndex > 0) {
            this.goToSlide(this.currentIndex - 1);
        }
        // If at first image, do nothing (no wraparound)
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
