// ==================== STANDALONE THEME TOGGLE ====================
// Handles theme switching for the standalone theme toggle button

class ThemeToggle {
  constructor() {
    this.themeToggle = null;
    this.themeIcon = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupThemeToggle());
    } else {
      this.setupThemeToggle();
    }
  }

  setupThemeToggle() {
    // Get the standalone theme toggle element
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = this.themeToggle?.querySelector('.theme-icon');

    if (!this.themeToggle || !this.themeIcon) {
      console.warn('Theme toggle elements not found');
      return;
    }

    // Setup event listeners
    this.themeToggle.addEventListener('click', () => this.toggleTheme());

    // Load initial theme preference
    this.loadThemePreference();

    console.log('Standalone theme toggle initialized');
  }

  toggleTheme() {
    if (!this.themeIcon) return;

    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);

    // Update icon with animation
    this.animateIconChange(newTheme === 'dark' ? '☀️' : '🌙');

    // Save preference
    localStorage.setItem('theme', newTheme);
  }

  animateIconChange(newIcon) {
    if (!this.themeIcon) return;

    // Add a subtle animation class for icon change
    this.themeIcon.style.transform = 'scale(0.8)';
    this.themeIcon.style.transition = 'transform 0.2s ease';

    setTimeout(() => {
      this.themeIcon.textContent = newIcon;
      this.themeIcon.style.transform = 'scale(1)';
    }, 100);
  }

  loadThemePreference() {
    if (!this.themeIcon) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }
}

// Initialize theme toggle when script loads
new ThemeToggle();
