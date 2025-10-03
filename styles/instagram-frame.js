/**
 * Instagram Frame Component Module
 * A modular, reusable Instagram-style frame component for displaying work items
 *
 * @class InstagramFrameComponent
 */
class InstagramFrameComponent {

    /**
     * Creates an Instagram frame component instance
     * @param {HTMLElement} container - The container element to render components into
     * @param {Object} options - Configuration options for the component
     */
    constructor(container, options = {}) {
        this.container = container;
        this.init();
    }

    /**
     * Initialize the component
     */
    init() {
        if (!this.container) {
            console.error('InstagramFrameComponent: Container element not found');
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
        if (document.querySelector('[data-component-styles="instagram-frame"]')) {
            return;
        }

        // Create style element
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-component-styles', 'instagram-frame');
        styleElement.textContent = this.getComponentStyles();
        document.head.appendChild(styleElement);
    }

    /**
     * Set up the container element
     */
    setupContainer() {
        this.container.classList.add('instagram-frames-container');
        if (!this.container.style.display) {
            this.container.style.display = 'grid';
        }
        if (!this.container.style.gap) {
            this.container.style.gap = '30px';
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
            .instagram-frames-container {
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                max-width: 1400px;
                margin: 0 auto;
                padding: 40px 20px;
                justify-content: center;
            }

            /* Component-specific styles */
            .instagram-frame-component .work-item {
                position: relative;
                background: white;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                cursor: pointer;
                aspect-ratio: 1;
                max-width: 350px;
                margin: 0 auto;
            }

            .instagram-frame-component .work-item:hover {
                transform: translateY(-15px) scale(1.02);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
            }

            .instagram-frame-component .work-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.4s ease;
                border-radius: 15px;
            }

            .instagram-frame-component .work-item:hover img {
                transform: scale(1.1);
            }

                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity 0.3s ease;
                border-radius: 0 0 15px 15px;
            }

            .instagram-frame-component .work-item:hover .work-item-caption {
                opacity: 1;
            }

            .instagram-frame-component .work-item-caption p {
                font-size: 0.95em;
                line-height: 1.4;
                margin: 0;
                font-weight: 400;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
            }

            .instagram-frame-component .work-item::before {
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

            .instagram-frame-component .work-item:hover::before {
                opacity: 1;
                transform: scale(1.1);
            }

            /* Responsive design for component */
            @media (min-width: 1200px) {
                .instagram-frames-container {
                    grid-template-columns: repeat(3, 1fr);
                    max-width: 1200px;
                }
            }

            @media (min-width: 768px) and (max-width: 1199px) {
                .instagram-frames-container {
                    grid-template-columns: repeat(2, 1fr);
                    max-width: 900px;
                }
            }

            @media (max-width: 767px) {
                .instagram-frames-container {
                    grid-template-columns: 1fr;
                    gap: 20px;
                    padding: 30px 15px;
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
            <div class="work-item" data-title="" data-description="" data-image="" data-link="">
                <img src="" alt="" loading="lazy">
                <div class="work-item-caption">
                    <p></p>
                </div>
            </div>
        `;
    }
}

// Make available globally
window.InstagramFrameComponent = InstagramFrameComponent;
