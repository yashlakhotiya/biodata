// Footer Component JavaScript
class Footer {
  constructor() {
    this.footerContainer = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadFooter());
    } else {
      await this.loadFooter();
    }
  }

  async loadFooter() {
    this.footerContainer = document.getElementById('footer-container');
    if (!this.footerContainer) return;

    try {
      let html;

      // Check if footer HTML is cached in sessionStorage
      const cachedFooter = sessionStorage.getItem('footer-html');

      if (cachedFooter) {
        // Use cached version
        html = cachedFooter;
        console.log('Using cached footer HTML');
      } else {
        // Fetch the footer HTML
        const response = await fetch('components/footer.html');
        html = await response.text();

        // Cache it for future page loads
        sessionStorage.setItem('footer-html', html);
        console.log('Fetched and cached footer HTML');
      }

      // Insert the footer HTML
      this.footerContainer.innerHTML = html;

      // Initialize footer functionality
      this.initializeFooter();
    } catch (error) {
      console.error('Error loading footer component:', error);
    }
  }

  initializeFooter() {
    // Add any footer-specific functionality here
    // For now, the footer is static content
    console.log('Footer component initialized');
  }

  // Public API methods
  updateFooterText(newText) {
    const footerText = document.querySelector('#footer-container .footer-text');
    if (footerText) {
      footerText.innerHTML = newText;
    }
  }

  updateFooterDecorations(newDecorations) {
    const decorations = document.querySelectorAll('#footer-container .footer-decoration');
    decorations.forEach(decoration => {
      decoration.textContent = newDecorations;
    });
  }
}

// Initialize footer when script loads
new Footer();
