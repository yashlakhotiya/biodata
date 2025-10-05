// new_carousel.js
document.addEventListener('DOMContentLoaded', async function() {
    const carouselContainer = document.getElementById('new-carousel-container');

    if (!carouselContainer) {
        console.error('New carousel container not found');
        return;
    }

    try {
        // Load the template
        const response = await fetch('components/new_carousel.html');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const template = doc.querySelector('#new-carousel-template');

        if (!template) {
            throw new Error('Template not found in new_carousel.html');
        }

        // Clear container and add the carousel template
        carouselContainer.innerHTML = '';
        const carousel = document.importNode(template.content, true);

        // Get the carousel elements
        const carouselElement = carousel.querySelector('.carousel');
        if (!carouselElement) {
            throw new Error('Could not find .carousel element in template');
        }

        // Add navigation arrows
        const navHTML = `
            <div class="carousel-nav">
                <button class="carousel-prev" aria-label="Previous image">&#10094;</button>
                <button class="carousel-next" aria-label="Next image">&#10095;</button>
            </div>
        `;
        carouselContainer.innerHTML += navHTML;

        // Add images from profilePictures.js
        if (window.photoUrls && window.photoUrls.length > 0) {
            window.photoUrls.forEach((photo, index) => {
                const imageDiv = document.createElement('div');
                imageDiv.className = `carousel-image image-${index + 1}`;
                imageDiv.style.backgroundImage = `url(${photo.url})`;
                imageDiv.style.backgroundSize = 'cover';
                imageDiv.style.backgroundPosition = 'center';
                imageDiv.setAttribute('data-index', index);
                carouselElement.appendChild(imageDiv);
            });
        }

        // Add the carousel to the container
        carouselContainer.prepend(carousel);

        // Initialize the carousel
        const carouselInstance = new Carousel(carouselContainer);

    } catch (error) {
        console.error('Error initializing new carousel:', error);
    }
});

class Carousel {
    constructor(container) {
        this.container = container;
        this.carousel = this.container.querySelector('.carousel');
        this.images = Array.from(this.carousel.querySelectorAll('.carousel-image'));
        this.currentIndex = 0;
        this.isAnimating = false;
        this.animationDuration = 500; // ms
        this.autoSlideInterval = 3000; // 3 seconds between slides
        this.autoSlideTimer = null;

        // Initialize
        this.setupEventListeners();
        this.updateCarousel();
        this.startAutoSlide();
    }

    setupEventListeners() {
        // Navigation buttons
        this.container.querySelector('.carousel-prev').addEventListener('click', () => this.prev());
        this.container.querySelector('.carousel-next').addEventListener('click', () => this.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        // Pause auto-slide on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
        
        // Pause auto-slide when window loses focus
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoSlide();
            } else {
                this.startAutoSlide();
            }
        });
    }

    startAutoSlide() {
        // Clear any existing timer
        this.pauseAutoSlide();
        
        // Start new timer
        this.autoSlideTimer = setInterval(() => {
            this.next();
        }, this.autoSlideInterval);
    }

    pauseAutoSlide() {
        if (this.autoSlideTimer) {
            clearInterval(this.autoSlideTimer);
            this.autoSlideTimer = null;
        }
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
        // Restart auto-slide after swipe
        this.startAutoSlide();
    }

    prev() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateCarousel();
        // Reset auto-slide timer on manual navigation
        this.startAutoSlide();
    }

    next() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateCarousel();
    }

    updateCarousel() {
        this.isAnimating = true;
        const offset = -this.currentIndex * 100;
        this.carousel.style.transform = `translateX(${offset}%)`;

        // Reset animation state
        setTimeout(() => {
            this.isAnimating = false;
        }, this.animationDuration);
    }
}