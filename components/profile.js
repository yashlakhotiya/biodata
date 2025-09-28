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

      // Now setup carousel functionality
      this.setupCarousel();
    } catch (error) {
      console.error('Error loading profile component:', error);
    }
  }

  setupCarousel() {

    // Define your photo URLs here
    const photoUrls = [
      'assets/images/photo1.png',
      'assets/images/photo2.jpg',
      'assets/images/photo3.jpg',
      'assets/images/photo4.jpg',
      'assets/images/photo5.jpg',
    ];

    // Carousel functionality
    const totalPhotos = 5;
    let currentPhotoIndex = Math.floor(totalPhotos / 2); // Start at the middle photo
    const photoElements = document.querySelectorAll('.photo-frame');
    const indicatorElements = document.querySelectorAll('.indicator');

    function updateCarousel() {
      photoElements.forEach((photo, index) => {
        photo.classList.remove('center', 'left', 'right', 'hidden-left', 'hidden-right');
        let newPosition = (index - currentPhotoIndex + totalPhotos) % totalPhotos;
        if (newPosition === 0) photo.classList.add('center');
        else if (newPosition === 1) photo.classList.add('right');
        else if (newPosition === totalPhotos - 1) photo.classList.add('left');
        else if (newPosition === 2) photo.classList.add('hidden-right');
        else photo.classList.add('hidden-left');
      });
      indicatorElements.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPhotoIndex);
      });
    }

    // Make functions globally available
    window.changePhoto = function(direction) {
      currentPhotoIndex = (currentPhotoIndex + direction + totalPhotos) % totalPhotos;
      updateCarousel();
    }

    window.goToPhoto = function(index) {
      currentPhotoIndex = index;
      updateCarousel();
    }

    // Setup touch/swipe functionality
    const photoStack = document.querySelector('.photo-stack');
    if (photoStack) {
      let touchStartX = 0;
      let touchEndX = 0;

      photoStack.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, false);

      photoStack.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) changePhoto(1);
        if (touchEndX > touchStartX + 50) changePhoto(-1);
      }, false);

      // Expand/Collapse Logic
      photoStack.addEventListener('click', (e) => {
        if (e.target.closest('.photo-frame.center')) {
          const isExpanded = photoStack.classList.contains('expanded');
          if (!isExpanded) {
            photoStack.classList.add('expanded');
          } else {
            photoStack.classList.remove('expanded');
          }
        }
      });
    }

    // Setup keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') changePhoto(-1);
      if (e.key === 'ArrowRight') changePhoto(1);
    });

    // Initialize carousel
    updateCarousel();

    // Initialize photos with actual URLs
    const photos = document.querySelectorAll('.photo-frame img');
    photos.forEach((img, index) => {
      if (photoUrls[index]) {
        img.src = photoUrls[index];
        img.alt = `Profile Photo ${index + 1}`;
      }
    });
  }
}

// Initialize profile when script loads
new Profile();
