/**
 * Gallery Frame Component Module
 * A modular, reusable gallery-style frame component with random sizing for masonry layout
 *
 * @class GalleryFrameComponent
 */
class GalleryFrameComponent {

    /**
     * Creates a gallery frame component instance
     * @param {HTMLElement} container - The container element to render components into
     * @param {Object} options - Configuration options for the component
     */
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            minWidth: '200px',
            maxWidth: '350px',
            aspectRatios: [0.8, 1, 1.2, 1.5, 1.8], // Portrait to landscape ratios
            gap: '20px',
            enableLazyLoading: true,
            ...options
        };

        this.componentTemplate = this.getComponentTemplate();
        this.init();
    }

    /**
     * Initialize the component
     */
    init() {
        if (!this.container) {
            console.error('GalleryFrameComponent: Container element not found');
            return;
        }

        // Load component styles if not already loaded
        this.loadComponentStyles();

        // Set up component container
        this.setupContainer();
    }

    /**
     * Load component-specific styles
     */
    loadComponentStyles() {
        // Check if styles are already loaded
        if (document.querySelector('[data-component-styles="gallery-frame"]')) {
            return;
        }

        // Create style element
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-component-styles', 'gallery-frame');
        styleElement.textContent = this.getComponentStyles();
        document.head.appendChild(styleElement);
    }

    /**
     * Set up the container element
     */
    setupContainer() {
        this.container.classList.add('gallery-frames-container');
        if (!this.container.style.display) {
            this.container.style.display = 'grid';
        }
        if (!this.container.style.gap) {
            this.container.style.gap = this.options.gap;
        }
        if (!this.container.style.placeItems) {
            this.container.style.placeItems = 'center';
        }
    }

    /**
     * Get the component styles
     * @returns {string} CSS styles for the component
     */
    getComponentStyles() {
        return `
            .gallery-frames-container {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-auto-rows: 100px;
                gap: 20px;
                max-width: 1400px;
                margin: 0 auto;
                padding: 40px 20px;
            }

            /* Remove inline-block layout for grid */
            .instagram-frame-item {
                display: block;
                width: 100%;
                margin-bottom: 0;
                break-inside: auto;
                page-break-inside: auto;
            }

            .instagram-frame-item:hover {
                transform: translateY(-15px) scale(1.02);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
            }

            .instagram-frame-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.4s ease;
                border-radius: 15px;
            }

            .instagram-frame-item:hover img {
                transform: scale(1.1);
            }

            .instagram-frame-item .work-item-caption {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                color: var(--primary-maroon);
                padding: 12px 20px;
                opacity: 1;
                transition: all 0.3s ease;
                border-radius: 0 0 15px 15px;
                min-height: 35px;
                display: flex;
                align-items: center;
            }

            .instagram-frame-item:hover .work-item-caption {
                opacity: 0.8;
                transform: scale(1.02);
                background: rgba(255, 255, 255, 0.98);
            }

            .instagram-frame-item .work-item-caption p {
                font-size: 0.9em;
                line-height: 1.3;
                margin: 0;
                font-weight: 600;
                text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
            }

            .instagram-frame-item::before {
                content: '♡';
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: var(--primary-maroon);
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.3s ease;
                z-index: 10;
            }

            .instagram-frame-item:hover::before {
                opacity: 1;
                transform: scale(1.1);
            }

            /* Balanced masonry sizing - tall + 2 mediums per conceptual row */
            .instagram-frame-item.size-small {
                grid-column: span 1;
                grid-row: span 1;
                height: 100px;
            }

            .instagram-frame-item.size-medium {
                grid-column: span 1;
                grid-row: span 2;
                height: 220px;
            }

            .instagram-frame-item.size-large {
                grid-column: span 2;
                grid-row: span 2;
                height: 220px;
            }

            .instagram-frame-item.size-tall {
                grid-column: span 1;
                grid-row: span 4;
                height: 440px;
            }

            .instagram-frame-item.size-wide {
                grid-column: span 2;
                grid-row: span 1;
                height: 100px;
            }

            /* Responsive design for component */
            @media (min-width: 1200px) {
                .gallery-frames-container {
                    grid-template-columns: repeat(5, 1fr);
                    max-width: 1600px;
                }
            }

            @media (min-width: 768px) and (max-width: 1199px) {
                .gallery-frames-container {
                    grid-template-columns: repeat(3, 1fr);
                    max-width: 1000px;
                }

                .instagram-frame-item.size-large,
                .instagram-frame-item.size-wide {
                    grid-column: span 1;
                    grid-row: span 2;
                    height: 220px;
                }

                .instagram-frame-item.size-tall {
                    grid-column: span 1;
                    grid-row: span 3;
                    height: 320px;
                }
            }

            @media (max-width: 767px) {
                .gallery-frames-container {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                    padding: 30px 15px;
                }

                .instagram-frame-item.size-large,
                .instagram-frame-item.size-wide {
                    grid-column: span 1;
                    grid-row: span 2;
                    height: 220px;
                }

                .instagram-frame-item.size-tall {
                    grid-column: span 1;
                    grid-row: span 2;
                    height: 220px;
                }
            }

            @media (max-width: 480px) {
                .gallery-frames-container {
                    grid-template-columns: 1fr;
                    gap: 10px;
                    padding: 20px 10px;
                }

                .instagram-frame-item.size-large,
                .instagram-frame-item.size-wide,
                .instagram-frame-item.size-tall,
                .instagram-frame-item.size-medium {
                    grid-column: span 1;
                    grid-row: span 1;
                    height: 180px;
                }
            }
        `;
    }

    /**
     * Get the component HTML template
     * @returns {string} HTML template string
     */
    getComponentTemplate() {
        return `
            <div class="work-item instagram-frame-item" data-title="" data-description="" data-image="" data-link="" data-size="">
                <img src="" alt="" loading="lazy">
                <div class="work-item-caption">
                    <p></p>
                </div>
            </div>
        `;
    }

    /**
     * Generate a random size for the gallery item
     * @returns {string} Size class name
     */
    generateRandomSize() {
        const sizes = ['small', 'medium', 'large', 'tall', 'wide'];
        
        // Create balanced distribution with weights that promote variety
        const weights = [0.25, 0.35, 0.15, 0.15, 0.10]; // small and medium more common
        
        // Use a more sophisticated random selection
        let random = Math.random();
        let cumulativeWeight = 0;
        
        for (let i = 0; i < sizes.length; i++) {
            cumulativeWeight += weights[i];
            if (random <= cumulativeWeight) {
                return sizes[i];
            }
        }
        
        return 'medium'; // Fallback
    }

    /**
     * Create a single gallery frame component
     * @param {Object} workItem - The work item data
     * @param {Object} options - Override options for this specific item
     * @returns {HTMLElement} The created component element
     */
    createFrame(workItem, options = {}) {
        const template = document.createElement('template');
        template.innerHTML = this.getComponentTemplate();

        const frameElement = template.content.firstElementChild.cloneNode(true);
        const itemOptions = { ...this.options, ...options };

        // Set up the frame with work item data
        this.setupFrameElement(frameElement, workItem, itemOptions);

        return frameElement;
    }

    /**
     * Set up a frame element with work item data
     * @param {HTMLElement} frameElement - The frame element to set up
     * @param {Object} workItem - The work item data
     * @param {Object} options - Component options
     */
    setupFrameElement(frameElement, workItem, options) {
        const img = frameElement.querySelector('img');
        const caption = frameElement.querySelector('.work-item-caption p');

        // Set data attributes
        frameElement.dataset.title = workItem.title;
        frameElement.dataset.description = workItem.description;
        frameElement.dataset.image = workItem.image;
        frameElement.dataset.link = workItem.link;

        // Generate or use specified size
        const size = workItem.size || this.generateRandomSize();
        frameElement.dataset.size = size;
        frameElement.classList.add(`size-${size}`);

        // Auto-generate YouTube thumbnail if image not provided and link is YouTube
        const imageUrl = workItem.image || this.generateYouTubeThumbnail(workItem.link);

        // Set image properties
        if (img) {
            img.src = imageUrl;
            img.alt = workItem.title;
            img.title = workItem.title;

            if (options.enableLazyLoading) {
                img.loading = 'lazy';
            }
        }

        // Set caption text
        if (caption) {
            caption.textContent = workItem.title;
        }

        // Set up click handler if link is provided
        if (workItem.link && workItem.link !== '#') {
            frameElement.style.cursor = 'pointer';
            frameElement.addEventListener('click', (e) => {
                e.preventDefault();
                if (workItem.link.startsWith('http')) {
                    window.open(workItem.link, '_blank');
                } else {
                    window.location.href = workItem.link;
                }
            });
        }

        // Apply custom max-width if specified
        if (options.maxWidth) {
            frameElement.style.maxWidth = options.maxWidth;
        }
    }

    /**
     * Truncate description to specified length
     * @param {string} description - The description to truncate
     * @param {number} maxLength - Maximum length
     * @returns {string} Truncated description
     */
    truncateDescription(description, maxLength) {
        if (!description || description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength).trim() + '...';
    }

    /**
     * Generate YouTube thumbnail URL from video URL
     * @param {string} videoUrl - The YouTube video URL
     * @returns {string|null} Thumbnail URL or null if not a YouTube video
     */
    generateYouTubeThumbnail(videoUrl) {
        if (!videoUrl || typeof videoUrl !== 'string') {
            return null;
        }

        // Check if it's a YouTube video URL
        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = videoUrl.match(youtubeRegex);

        if (match && match[1]) {
            const videoId = match[1];
            return `https://img.youtube.com/vi/${videoId}/0.jpg`;
        }

        return null;
    }

    /**
     * Render multiple gallery frames from work data
     * @param {Array} workData - Array of work items to render
     * @param {Object} options - Override options
     */
    renderFrames(workData, options = {}) {
        if (!this.container) {
            console.error('GalleryFrameComponent: Cannot render frames - container not found');
            return;
        }

        // Clear existing content
        this.container.innerHTML = '';

        // Render each work item
        workData.forEach(workItem => {
            const frameElement = this.createFrame(workItem, options);
            this.container.appendChild(frameElement);
        });

        console.log(`GalleryFrameComponent: Rendered ${workData.length} frames`);
    }

    /**
     * Update a specific frame with new data
     * @param {number} index - Index of the frame to update
     * @param {Object} workItem - New work item data
     */
    updateFrame(index, workItem) {
        const frames = this.container.querySelectorAll('.gallery-item');
        if (frames[index]) {
            this.setupFrameElement(frames[index], workItem, this.options);
        }
    }

    /**
     * Remove all frames from the container
     */
    clearFrames() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    /**
     * Get all frame elements
     * @returns {NodeList} All frame elements in the container
     */
    getFrames() {
        return this.container ? this.container.querySelectorAll('.instagram-frame-item') : [];
    }

    /**
     * Destroy the component and clean up
     */
    destroy() {
        this.clearFrames();

        // Remove component styles if they exist
        const styleElement = document.querySelector('[data-component-styles="gallery-frame"]');
        if (styleElement) {
            styleElement.remove();
        }

        console.log('GalleryFrameComponent: Component destroyed');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GalleryFrameComponent;
}

// Make available globally
window.GalleryFrameComponent = GalleryFrameComponent;
