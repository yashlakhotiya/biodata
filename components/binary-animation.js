// Binary Animation Component JavaScript
class BinaryAnimation {
  constructor() {
    this.animationContainer = null;
    this.digits = [];
    this.animationInterval = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadBinaryAnimation());
    } else {
      await this.loadBinaryAnimation();
    }
  }

  async loadBinaryAnimation() {
    this.animationContainer = document.getElementById('binary-animation-container');
    if (!this.animationContainer) return;

    try {
      // Fetch the binary animation HTML
      const response = await fetch('components/binary-animation.html');
      const html = await response.text();

      // Insert the binary animation HTML
      this.animationContainer.innerHTML = html;

      // Initialize binary animation
      this.initializeBinaryAnimation();
    } catch (error) {
      console.error('Error loading binary animation component:', error);
    }
  }

  initializeBinaryAnimation() {
    // Generate random binary digits across the screen
    this.generateRandomDigits();

    // Start random on/off animation
    this.startRandomAnimation();

    console.log('Binary animation component initialized');
  }

  generateRandomDigits() {
    const container = this.animationContainer;
    if (!container) return;

    // Clear existing digits
    container.innerHTML = '';
    this.digits = [];

    // Generate 20-30 random binary digits
    const digitCount = 20 + Math.floor(Math.random() * 10);

    for (let i = 0; i < digitCount; i++) {
      const digit = document.createElement('div');
      digit.className = 'binary-digit';
      digit.textContent = Math.random() > 0.5 ? '0' : '1';

      // Random positioning
      digit.style.top = `${Math.random() * 100}%`;
      digit.style.left = `${Math.random() * 100}%`;
      digit.style.fontSize = `${Math.random() * 1.5 + 1.5}em`;
      digit.style.animationDelay = `${Math.random() * 4}s`;

      container.appendChild(digit);
      this.digits.push(digit);
    }
  }

  startRandomAnimation() {
    // Start interval to randomly toggle digits on/off
    this.animationInterval = setInterval(() => {
      // Randomly select some digits to toggle
      const digitsToToggle = Math.floor(Math.random() * 5) + 1; // 1-5 digits

      for (let i = 0; i < digitsToToggle; i++) {
        const randomIndex = Math.floor(Math.random() * this.digits.length);
        const digit = this.digits[randomIndex];

        if (digit) {
          // Toggle visibility
          digit.classList.toggle('visible');

          // Randomly change the digit value when it becomes visible
          if (digit.classList.contains('visible')) {
            digit.textContent = Math.random() > 0.5 ? '0' : '1';
          }
        }
      }
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
  }

  // Public API methods
  updateDigitCount(newCount) {
    this.generateRandomDigits();
  }

  changeAnimationSpeed(speedMultiplier) {
    const digits = this.animationContainer.querySelectorAll('.binary-digit');
    digits.forEach(digit => {
      const currentDuration = 4; // base duration
      digit.style.animationDuration = `${currentDuration / speedMultiplier}s`;
    });
  }

  toggleAnimation(pause = true) {
    if (pause) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
      // Hide all digits
      this.digits.forEach(digit => digit.classList.remove('visible'));
    } else {
      this.startRandomAnimation();
    }
  }

  destroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    this.digits = [];
  }
}

// Initialize binary animation when script loads
new BinaryAnimation();
