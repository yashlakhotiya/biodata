// Profile Component JavaScript
class Profile {
  constructor() {
    this.profileContainer = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadProfile());
    } else {
      await this.loadProfile();
    }
  }

  async loadProfile() {
    this.profileContainer = document.getElementById('profile-container');
    if (!this.profileContainer) return;

    try {
      // Fetch the profile HTML
      const response = await fetch('components/profile.html');
      const html = await response.text();

      // Insert the profile HTML
      this.profileContainer.innerHTML = html;

      // Load the card carousel script
      await this.loadCarouselScript();

      // Setup carousel functionality
      this.setupCarousel();
    } catch (error) {
      console.error('Error loading profile component:', error);
    }
  }

  async loadCarouselScript() {
    // Three.js is already loaded in index.html head section
    // No need to load it again here to avoid conflicts

    // Note: card-carousel.js is now loaded in index.html, not here
    // to avoid duplicate script loading issues
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  setupCarousel() {
    // The carousel is now handled by the card-carousel.js script
    // which initializes itself when DOM is ready
    console.log('Card carousel loaded and initialized');
  }
}

// Initialize profile when script loads
new Profile();
