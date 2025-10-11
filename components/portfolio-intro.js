// Portfolio Introduction Component JavaScript
class PortfolioIntro {
  constructor() {
    this.introContainer = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadPortfolioIntro());
    } else {
      await this.loadPortfolioIntro();
    }
  }

  async loadPortfolioIntro() {
    this.introContainer = document.getElementById('portfolio-intro-container');
    if (!this.introContainer) return;

    try {
      // Fetch the portfolio introduction HTML
      const response = await fetch('components/portfolio-intro.html');
      const html = await response.text();

      // Insert the portfolio introduction HTML
      this.introContainer.innerHTML = html;

      // Initialize introduction functionality
      this.initializeIntro();
    } catch (error) {
      console.error('Error loading portfolio introduction component:', error);
    }
  }

  initializeIntro() {
    // Add any introduction-specific functionality here
    // For now, the introduction is static content
    console.log('Portfolio introduction component initialized');

    // Add scroll animations or other effects if needed
    this.addScrollEffects();
  }

  addScrollEffects() {
    // Add intersection observer for scroll animations
    const introSection = document.querySelector('#portfolio-intro-container .portfolio-intro-section');

    if (introSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Initial state
      introSection.style.opacity = '0';
      introSection.style.transform = 'translateY(20px)';
      introSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

      observer.observe(introSection);
    }
  }
}

// Initialize portfolio introduction when script loads
new PortfolioIntro();
