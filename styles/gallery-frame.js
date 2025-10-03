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
        // Set up component container
        this.setupContainer();
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
     * Get the component HTML template
     * @returns {string} HTML template string
     */
    getComponentTemplate() {
        return `
            <div class="work-item instagram-frame-item" data-title="" data-description="" data-image="" data-link="" data-size="">
                <div class="image-container">
                    <img src="" alt="" loading="lazy">
                </div>
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

        console.log('GalleryFrameComponent: Component destroyed');
    }
}

// Make available globally
window.GalleryFrameComponent = GalleryFrameComponent;
