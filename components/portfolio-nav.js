// Portfolio Navigation Component JavaScript
class PortfolioNav {
  constructor() {
    this.navContainer = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadPortfolioNav());
    } else {
      await this.loadPortfolioNav();
    }
  }

  async loadPortfolioNav() {
    this.navContainer = document.getElementById('portfolio-nav-container');
    if (!this.navContainer) return;

    try {
      // Fetch the portfolio navigation HTML
      const response = await fetch('components/portfolio-nav.html');
      const html = await response.text();

      // Insert the portfolio navigation HTML
      this.navContainer.innerHTML = html;

      // Initialize navigation functionality
      this.initializeNavigation();
    } catch (error) {
      console.error('Error loading portfolio navigation component:', error);
    }
  }

  initializeNavigation() {
    // Add smooth scrolling for INTERNAL anchor links only
    const navLinks = document.querySelectorAll('#portfolio-nav-container a[href^="#"]');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId.substring(1)); // Remove # prefix

        if (targetElement) {
          e.preventDefault(); // Only prevent default for internal anchors
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // If target element doesn't exist yet, try again after a short delay
          // This handles cases where components are loaded asynchronously
          setTimeout(() => {
            const retryElement = document.querySelector(targetId.substring(1));
            if (retryElement) {
              e.preventDefault();
              retryElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 100);
        }
      });
    });

    // Add active state management
    this.updateActiveNavItem();
  }

  updateActiveNavItem() {
    const navLinks = document.querySelectorAll('#portfolio-nav-container a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      // Check if this is the current page or section
      if (href === currentPath || (href.startsWith('#') && href === window.location.hash)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Public API methods
  highlightNavItem(itemText) {
    const navLinks = document.querySelectorAll('#portfolio-nav-container a');
    navLinks.forEach(link => {
      if (link.textContent.includes(itemText)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Initialize portfolio navigation when script loads
new PortfolioNav();
