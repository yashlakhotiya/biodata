// Header Component JavaScript
class Header {
  constructor() {
    this.headerContainer = null;
    this.navConfig = window.navigationConfig || {
      items: [],
      breakpoints: { mobile: 0, tablet: 768, desktop: 1200 },
      itemsToShow: { mobile: 0, tablet: 2, desktop: 4 },
      behavior: { showHamburgerOnDesktop: true, smoothScroll: true }
    };
    this.sortedNavItems = [];
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
      // Load header template
      const response = await fetch('components/header.html');
      const html = await response.text();
      
      // Insert the header HTML
      this.headerContainer.innerHTML = html;
      
      // Initialize navigation
      this.initializeNavigation();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Adjust navigation based on current page
      this.adjustNavigationForCurrentPage();
    } catch (error) {
      console.error('Error loading header component:', error);
    }
  }

  adjustNavigationForCurrentPage() {
    // Detect current page
    const currentPath = window.location.pathname;
    const isPortfolioPage = currentPath.includes('portfolio.html');
    const isIndexPage = currentPath.endsWith('index.html') || 
                       currentPath.endsWith('/') || 
                       currentPath === '';

    const updateLink = (selector, href, text) => {
      const link = document.querySelector(selector);
      if (!link) return;

      if (href) {
        link.href = href;
      }

      if (text) {
        const navText = link.querySelector('.nav-text');
        if (navText) {
          navText.textContent = text;
        } else {
          link.textContent = text;
        }
      }
    };

    if (isPortfolioPage) {
      // For portfolio page, update navigation links to point to main page sections
      updateLink('.header__nav-link[data-nav-id="experience"]', 'index.html#education-profession', 'Experience');
      updateLink('.header__nav-link[data-nav-id="interests"]', 'index.html#hobbies-interests', 'Interests');
      updateLink('.header__nav-link[data-nav-id="contact"]', 'index.html#contact', 'Contact');
    } else if (isIndexPage) {
      // Ensure About Me link is correct on index page
      updateLink('.header__nav-link[data-nav-id="about-me"]', 'about-me.html', 'About Me');
    }
  }

  setupEventListeners() {
    // Get DOM elements
    this.mobileToggle = document.getElementById('mobile-toggle');
    this.mainNav = document.getElementById('main-nav');
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = document.querySelector('.theme-icon');
    
    if (!this.primaryNav) this.primaryNav = document.getElementById('primary-nav');
    if (!this.secondaryNav) this.secondaryNav = document.getElementById('secondary-nav');

    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
      this.loadThemePreference();
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.renderNavigation();
      }, 150);
    });

    document.addEventListener('click', (e) => {
      if (
        this.mainNav &&
        this.mainNav.classList.contains('header__nav--active') &&
        !this.mainNav.contains(e.target) &&
        e.target !== this.mobileToggle
      ) {
        this.closeMobileMenu();
      }
    });

    this.setupNavLinkHandlers();
  }

  // Removed setupResponsiveNav as its functionality is now in setupEventListeners

  setupNavLinkHandlers() {
    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (evt) => {
        this.closeMobileMenu();

        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement && this.navConfig.behavior?.smoothScroll !== false) {
            evt.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });

            if (history.pushState) {
              history.pushState(null, null, '#' + targetId);
            } else {
              window.location.hash = '#' + targetId;
            }
          }
        }
      });
    });
  }

  /**
   * Initialize navigation from config
   */
  initializeNavigation() {
    this.primaryNav = document.getElementById('primary-nav');
    this.secondaryNav = document.getElementById('secondary-nav');
    this.mobileToggle = document.getElementById('mobile-toggle');

    if (!this.primaryNav || !this.secondaryNav) return;

    this.sortedNavItems = (this.navConfig.items || [])
      .filter(item => item.showInNav !== false)
      .sort((a, b) => a.priority - b.priority);

    this.renderNavigation();
  }

  /**
   * Render navigation items into primary and secondary lists
   */
  renderNavigation() {
    if (!this.primaryNav || !this.secondaryNav) return;

    this.primaryNav.innerHTML = '';
    this.secondaryNav.innerHTML = '';

    const itemsToShow = this.getItemsToShow();

    this.sortedNavItems.forEach((item, index) => {
      const navItem = this.createNavItem(item);
      if (index < itemsToShow) {
        this.primaryNav.appendChild(navItem);
      } else {
        this.secondaryNav.appendChild(navItem);
      }
    });

    this.updateHamburgerMenu();
    this.setupNavLinkHandlers();
  }

  /**
   * Determine how many items should be visible based on current viewport
   */
  getItemsToShow() {
    const windowWidth = window.innerWidth;
    const breakpoints = this.navConfig.breakpoints || {};
    const itemsToShow = this.navConfig.itemsToShow || {};

    if (windowWidth < (breakpoints.tablet || 0)) {
      return itemsToShow.mobile ?? 0;
    }

    if (windowWidth < (breakpoints.desktop || 0)) {
      return itemsToShow.tablet ?? 0;
    }

    return itemsToShow.desktop ?? this.sortedNavItems.length;
  }

  /**
   * Create a navigation list item element from config
   */
  createNavItem(item) {
    const li = document.createElement('li');
    li.className = 'header__nav-item';
    li.setAttribute('data-nav-priority', item.priority ?? '');

    const a = document.createElement('a');
    a.href = item.url;
    a.className = 'header__nav-link';
    a.setAttribute('data-nav-id', item.id || item.text.toLowerCase().replace(/\s+/g, '-'));

    if (item.icon) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'nav-icon';
      iconSpan.textContent = item.icon;
      a.appendChild(iconSpan);
    }

    const textSpan = document.createElement('span');
    textSpan.className = 'nav-text';
    textSpan.textContent = item.text;
    a.appendChild(textSpan);

    li.appendChild(a);
    return li;
  }
  
  /**
   * Update hamburger menu visibility based on secondary nav items
   */
  updateHamburgerMenu() {
    if (!this.mobileToggle || !this.secondaryNav) return;
    
    const hasSecondaryItems = this.secondaryNav.children.length > 0;
    const showOnDesktop = this.navConfig.behavior?.showHamburgerOnDesktop !== false;
    
    if (hasSecondaryItems && (window.innerWidth < this.navConfig.breakpoints.desktop || showOnDesktop)) {
      this.mobileToggle.style.display = 'flex';
      this.mobileToggle.classList.add('has-items');
    } else {
      this.mobileToggle.style.display = 'none';
      this.mobileToggle.classList.remove('has-items');
    }

    // Re-setup click handlers after distribution
    this.setupNavLinkHandlers();
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
