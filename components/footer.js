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
      // Fetch the footer HTML
      const response = await fetch('components/footer.html');
      const html = await response.text();

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
