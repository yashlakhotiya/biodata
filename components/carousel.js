class Carousel {
    constructor(config = {}) {
        this.config = {
            showContent: false,
            autoRotate: false,
            rotateInterval: 5000,
            imageUrls: [],
            ...config
        };
        
        this.rotationInterval = null;
        this.init();
    }

    async init() {
        const container = document.getElementById('carousel-container');
        if (!container) {
            console.error('Carousel container not found');
            return;
        }

        try {
            // Clear the container first to prevent duplicate content
            container.innerHTML = '';
            // Add the carousel-container class for styling
            container.className = 'carousel-container';

            // Load and parse the carousel HTML
            const response = await fetch('components/carousel.html');
            if (!response.ok) {
                throw new Error(`Failed to load carousel: ${response.status}`);
            }
            
            const html = await response.text();
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            // Get the container template
            const containerTemplate = temp.querySelector('#carousel-container-template');
            if (!containerTemplate) {
                throw new Error('Carousel container template not found');
            }

            // Get the item template
            this.itemTemplate = temp.querySelector('#carousel-item-template');
            if (!this.itemTemplate) {
                throw new Error('Carousel item template not found');
            }

            // Get the slide and buttons from the template
            const containerContent = containerTemplate.content.cloneNode(true);
            const slide = containerContent.querySelector('.slide');
            const buttons = containerContent.querySelector('.button');
            
            // Append them to our main container
            if (slide) container.appendChild(slide);
            if (buttons) container.appendChild(buttons);
            
            // Generate carousel items
            this.generateCarouselItems();
            this.setupEventListeners();
            
            if (this.config.autoRotate) {
                this.startAutoRotation();
            }
            
            return this;
            
        } catch (error) {
            console.error('Error initializing carousel:', error);
            const container = document.getElementById('carousel-container');
            if (container) {
                container.innerHTML = `<p>Error loading carousel: ${error.message}</p>`;
            }
            throw error;
        }
    }

    generateCarouselItems() {
        const slide = document.querySelector('.slide');
        if (!slide) return;

        // Clear any existing items
        slide.innerHTML = '';

        const photos = this.config.imageUrls.length > 0 
            ? this.config.imageUrls 
            : (window.photoUrls || []);

        // Filter out any invalid entries
        const validPhotos = photos.filter(photo => 
            photo && typeof photo === 'object' && photo.url
        );

        if (validPhotos.length === 0) {
            console.warn('No valid images provided for the carousel');
            return;
        }

        // Create items for each photo
        validPhotos.forEach(photo => {
            const item = this.itemTemplate.content.cloneNode(true);
            const itemElement = item.querySelector('.item');
            const contentElement = item.querySelector('.content');
            
            if (itemElement && contentElement) {
                // Set background image
                itemElement.style.backgroundImage = `url('${photo.url}')`;
                
                // Set content if enabled in config
                if (this.config.showContent) {
                    const nameElement = item.querySelector('.name');
                    const descElement = item.querySelector('.des');
                    const linkElement = item.querySelector('.seeMore');
                    
                    if (nameElement) nameElement.textContent = photo.name || '';
                    if (descElement) descElement.textContent = photo.description || '';
                    if (linkElement && photo.link) {
                        linkElement.href = photo.link;
                    } else if (linkElement) {
                        linkElement.style.display = 'none';
                    }
                } else {
                    contentElement.style.display = 'none';
                }
            }
            
            slide.appendChild(item);
        });
    }

    setupEventListeners() {
        // Use event delegation for the buttons since they might be recreated
        const carouselContainer = document.querySelector('.carousel-container');
        
        if (carouselContainer) {
            // Remove existing event listeners if any
            if (this._handleNext) {
                carouselContainer.removeEventListener('click', this._handleNext);
            }
            if (this._handlePrev) {
                carouselContainer.removeEventListener('click', this._handlePrev);
            }
            
            // Create new handlers
            this._handleNext = (e) => {
                if (e.target.closest('.next')) {
                    this.navigate('next');
                }
            };
            
            this._handlePrev = (e) => {
                if (e.target.closest('.prev')) {
                    this.navigate('prev');
                }
            };
            
            // Add event listeners with event delegation
            carouselContainer.addEventListener('click', this._handleNext);
            carouselContainer.addEventListener('click', this._handlePrev);
        } else {
            console.warn('Carousel container not found for setting up event listeners');
        }
    }

    navigate(direction) {
        const items = document.querySelectorAll('.item');
        const slide = document.querySelector('.slide');
        
        if (!items.length || !slide) {
            console.warn('Carousel items or slide container not found');
            return;
        }

        if (direction === 'next') {
            slide.appendChild(items[0]);
        } else {
            slide.prepend(items[items.length - 1]);
        }
        
        // Reset auto-rotation timer if enabled
        if (this.config.autoRotate) {
            this.resetAutoRotation();
        }
    }

    startAutoRotation() {
        if (!this.config.autoRotate || this.rotationInterval) return;
        
        this.rotationInterval = setInterval(() => {
            this.navigate('next');
        }, this.config.rotateInterval);
    }

    stopAutoRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
    }

    resetAutoRotation() {
        if (this.config.autoRotate) {
            this.stopAutoRotation();
            this.startAutoRotation();
        }
    }

    destroy() {
        this.stopAutoRotation();
        
        // Remove event listeners
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer && this._handleNext && this._handlePrev) {
            carouselContainer.removeEventListener('click', this._handleNext);
            carouselContainer.removeEventListener('click', this._handlePrev);
        }
        
        // Clear the container
        const container = document.getElementById('carousel-container');
        if (container) {
            container.innerHTML = '';
        }
    }
}

// Initialize the carousel when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make carousel instance available globally if needed
    window.carousel = new Carousel({
        showContent: false,
        autoRotate: false,
        rotateInterval: 5000,
        imageUrls: window.photoUrls || []
    }).init().catch(error => {
        console.error('Failed to initialize carousel:', error);
    });
});