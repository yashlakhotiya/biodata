/**
 * Work Items Gallery Component
 * A modular, reusable gallery component for displaying work items in a masonry layout
 *
 * @class WorkItemsGallery
 */
class WorkItemsGallery {

    /**
     * Creates a work items gallery instance
     * @param {HTMLElement} container - The container element to render items into
     * @param {Object} options - Configuration options for the gallery
     */
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            gap: '20px',
            enableLazyLoading: true,
            defaultSize: 'medium',
            ...options
        };

        this.init();
    }

    /**
     * Initialize the gallery component
     */
    async init() {
        if (!this.container) {
            console.error('WorkItemsGallery: Container element not found');
            return;
        }
        await this.setupContainer();
    }

    /**
     * Set up the container element
     */
    async setupContainer() {
        // Set up basic container styling
        this.container.className = 'work-items-container';
        this.container.style.display = 'grid';
        this.container.style.gap = this.options.gap;
        this.container.style.placeItems = 'center';
    }

    /**
     * Get the HTML template for a work item
     * @returns {string} HTML template string
     */
    getItemTemplate() {
        return `
            <div class="work-item" data-title="" data-description="" data-image="" data-link="" data-size="">
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
     * Generate a random size for gallery items
     * @returns {string} Size class name
     */
    generateRandomSize() {
        const sizes = ['small', 'medium', 'large', 'tall', 'wide'];
        const weights = [0.25, 0.35, 0.15, 0.15, 0.10]; // Favor smaller items

        let random = Math.random();
        let cumulativeWeight = 0;

        for (let i = 0; i < sizes.length; i++) {
            cumulativeWeight += weights[i];
            if (random <= cumulativeWeight) {
                return sizes[i];
            }
        }

        return this.options.defaultSize;
    }

    /**
     * Create a single work item element
     * @param {Object} workItem - The work item data
     * @param {Object} options - Override options for this item
     * @returns {HTMLElement} The created work item element
     */
    createItem(workItem, options = {}) {
        const template = document.createElement('template');
        template.innerHTML = this.getItemTemplate();

        const itemElement = template.content.firstElementChild.cloneNode(true);
        const itemOptions = { ...this.options, ...options };

        this.setupItemElement(itemElement, workItem, itemOptions);
        return itemElement;
    }

    /**
     * Set up a work item element with data
     * @param {HTMLElement} itemElement - The item element to set up
     * @param {Object} workItem - The work item data
     * @param {Object} options - Component options
     */
    setupItemElement(itemElement, workItem, options) {
        const img = itemElement.querySelector('img');
        const caption = itemElement.querySelector('.work-item-caption p');

        // Set data attributes
        itemElement.dataset.title = workItem.title;
        itemElement.dataset.description = workItem.description;
        itemElement.dataset.image = workItem.image;
        itemElement.dataset.link = workItem.link;

        // Set size
        const size = workItem.size || this.generateRandomSize();
        itemElement.dataset.size = size;
        itemElement.classList.add(`size-${size}`);

        // Generate YouTube thumbnail if needed
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

        // Apply custom max-width if specified
        if (options.maxWidth) {
            itemElement.style.maxWidth = options.maxWidth;
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

        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = videoUrl.match(youtubeRegex);

        if (match && match[1]) {
            return `https://img.youtube.com/vi/${match[1]}/0.jpg`;
        }

        return null;
    }

    /**
     * Render work items from data array
     * @param {Array} workData - Array of work items to render
     * @param {Object} options - Override options
     */
    renderItems(workData, options = {}) {
        if (!this.container) {
            console.error('WorkItemsGallery: Cannot render items - container not found');
            return;
        }

        // Clear existing content
        this.container.innerHTML = '';

        // Render each work item
        workData.forEach(workItem => {
            const itemElement = this.createItem(workItem, options);
            this.container.appendChild(itemElement);
        });

        console.log(`WorkItemsGallery: Rendered ${workData.length} items`);
    }

    /**
     * Update gallery options and re-render if needed
     * @param {Object} newOptions - New options to merge with existing
     */
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        // Re-setup container with new gap setting
        this.setupContainer();
    }
}

// Make available globally
window.WorkItemsGallery = WorkItemsGallery;
