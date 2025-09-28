/**
 * Photo Carousel Module
 * Handles photo carousel functionality with touch/swipe support
 */

// Photo carousel configuration
const photoUrls = [
    'assets/images/photo1.png',
    'assets/images/photo2.jpg',
    'assets/images/photo3.jpg',
    'assets/images/photo4.jpg',
    'assets/images/photo5.jpg',
    'assets/images/photo6.jpg'
];

// Carousel state
let currentPhotoIndex = 0;
let isExpanded = false;
let photoElements = [];
let indicatorElements = [];
let totalPhotos = 0;

class PhotoCarousel {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.updateCarousel();
    }

    initializeElements() {
        const photoStack = document.querySelector('.photo-stack');
        if (!photoStack) return;

        photoElements = Array.from(document.querySelectorAll('.photo-frame'));
        indicatorElements = Array.from(document.querySelectorAll('.indicator'));
        totalPhotos = photoElements.length;
        currentPhotoIndex = Math.floor(totalPhotos / 2); // Start at the middle photo
    }

    updateCarousel() {
        if (photoElements.length === 0) return;

        photoElements.forEach((photo, index) => {
            photo.classList.remove('center', 'left', 'right', 'hidden-left', 'hidden-right');
            const newPosition = (index - currentPhotoIndex + totalPhotos) % totalPhotos;
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

    changePhoto(direction) {
        currentPhotoIndex = (currentPhotoIndex + direction + totalPhotos) % totalPhotos;
        this.updateCarousel();
    }

    goToPhoto(index) {
        currentPhotoIndex = index;
        this.updateCarousel();
    }

    setupEventListeners() {
        const photoStack = document.querySelector('.photo-stack');
        if (!photoStack) return;

        // Expand/Collapse Logic
        photoStack.addEventListener('click', (e) => {
            if (e.target.closest('.photo-frame.center')) {
                isExpanded = !isExpanded;
                photoStack.classList.toggle('expanded', isExpanded);
            }
        });

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        photoStack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        photoStack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;

            if (touchEndX < touchStartX - swipeThreshold) {
                this.changePhoto(1);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                this.changePhoto(-1);
            }
        }, { passive: true });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!window.location.pathname.includes('portfolio.html')) {
                switch(e.key) {
                    case 'ArrowLeft':
                        this.changePhoto(-1);
                        break;
                    case 'ArrowRight':
                        this.changePhoto(1);
                        break;
                }
            }
        });
    }

    initializePhotos() {
        const photos = document.querySelectorAll('.photo-frame img');
        photos.forEach((img, index) => {
            if (photoUrls[index]) {
                img.src = photoUrls[index];
                img.alt = `Profile Photo ${index + 1}`;
                img.loading = 'lazy'; // Optimize loading
            }
        });
    }
}

// Export for use in other modules
window.PhotoCarousel = PhotoCarousel;
