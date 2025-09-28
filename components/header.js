// Header Component JavaScript
class Header {
  constructor() {
    this.headerContainer = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadHeader());
    } else {
      await this.loadHeader();
    }
  }

  async loadHeader() {
    this.headerContainer = document.getElementById('header-container');
    if (!this.headerContainer) return;

    try {
      // Fetch the header HTML
      const response = await fetch('components/header.html');
      const html = await response.text();

      // Insert the header HTML
      this.headerContainer.innerHTML = html;

      // Now setup event listeners
      this.setupEventListeners();

      // Adjust navigation links based on current page
      this.adjustNavigationForCurrentPage();
    } catch (error) {
      console.error('Error loading header component:', error);
    }
  }

  adjustNavigationForCurrentPage() {
    // Detect current page
    const currentPath = window.location.pathname;
    const isPortfolioPage = currentPath.includes('portfolio.html');

    if (isPortfolioPage) {
      // Modify navigation links to point to main page sections
      const navLinks = [
        { selector: '.header__nav-link[href*="personal-details"]', href: 'index.html#personal-details', text: 'About' },
        { selector: '.header__nav-link[href*="education-profession"]', href: 'index.html#education-profession', text: 'Experience' },
        { selector: '.header__nav-link[href*="hobbies-interests"]', href: 'index.html#hobbies-interests', text: 'Interests' },
        { selector: '.header__nav-link[href*="contact"]', href: 'index.html#contact', text: 'Contact' }
      ];

      navLinks.forEach(({ selector, href, text }) => {
        const link = document.querySelector(selector);
        if (link) {
          link.href = href;
          link.textContent = text;
        }
      });
    }
  }

  setupEventListeners() {
    // Get DOM elements after header is loaded
    this.mobileToggle = document.getElementById('mobile-toggle');
    this.mainNav = document.getElementById('main-nav');
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = document.querySelector('.theme-icon');
    this.navLinks = document.querySelectorAll('.header__nav-link');

    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Theme toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Close mobile menu when clicking on a nav link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Load theme preference
    this.loadThemePreference();
  }

  toggleMobileMenu() {
    if (!this.mobileToggle || !this.mainNav) return;

    const isExpanded = this.mobileToggle.getAttribute('aria-expanded') === 'true';
    this.mobileToggle.setAttribute('aria-expanded', !isExpanded);
    this.mainNav.classList.toggle('header__nav--active');
    document.body.classList.toggle('menu-open');
  }

  closeMobileMenu() {
    if (!this.mobileToggle || !this.mainNav) return;

    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mainNav.classList.remove('header__nav--active');
    document.body.classList.remove('menu-open');
  }

  toggleTheme() {
    if (!this.themeIcon) return;

    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);

    // Update icon
    this.themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';

    // Save preference
    localStorage.setItem('theme', newTheme);
  }

  loadThemePreference() {
    if (!this.themeIcon) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }
}

// Initialize header when script loads
new Header();
