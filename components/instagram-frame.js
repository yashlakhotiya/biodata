// Instagram Frame Component JavaScript
class InstagramFrame {
  constructor() {
    this.framesContainer = null;
    this.workData = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadInstagramFrame());
    } else {
      await this.loadInstagramFrame();
    }
  }

  async loadInstagramFrame() {
    this.framesContainer = document.querySelector('.instagram-frames-container');
    if (!this.framesContainer) return;

    try {
      // Load work data
      await this.loadWorkData();

      // Render frames
      if (this.workData) {
        this.renderFrames(this.workData);
      }
    } catch (error) {
      console.error('Error loading Instagram frame component:', error);
    }
  }

  async loadWorkData() {
    try {
      // In a real application, you might fetch this from an API
      // For now, we'll assume workData is already loaded globally
      if (typeof workData !== 'undefined') {
        this.workData = workData;
      } else {
        // Fallback: try to load workData.js
        await this.loadScript('assets/workData.js');
        this.workData = workData;
      }
    } catch (error) {
      console.error('Error loading work data:', error);
    }
  }

  async loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  renderFrames(workData) {
    if (!this.framesContainer || !workData) return;

    // Clear existing content
    this.framesContainer.innerHTML = '';

    // Render each work item
    workData.forEach(workItem => {
      const frameElement = this.createFrame(workItem);
      this.framesContainer.appendChild(frameElement);
    });

    console.log(`InstagramFrame: Rendered ${workData.length} frames`);
  }

  createFrame(workItem) {
    const frameElement = document.createElement('div');
    frameElement.className = 'work-item';
    frameElement.dataset.title = workItem.title;
    frameElement.dataset.description = workItem.description;
    frameElement.dataset.image = workItem.image;
    frameElement.dataset.link = workItem.link;

    // Create image element
    const img = document.createElement('img');
    const imageUrl = workItem.image || this.generateYouTubeThumbnail(workItem.link);
    img.src = imageUrl;
    img.alt = workItem.title;
    img.title = workItem.title;
    img.loading = 'lazy';

    // Create caption element
    const caption = document.createElement('div');
    caption.className = 'work-item-caption';
    const captionText = document.createElement('p');
    captionText.textContent = workItem.title;
    caption.appendChild(captionText);

    // Assemble frame
    frameElement.appendChild(img);
    frameElement.appendChild(caption);

    // Set up click handler if link is provided
    if (workItem.link && workItem.link !== '#') {
      frameElement.style.cursor = 'pointer';
      frameElement.addEventListener('click', (e) => {
        e.preventDefault();
        if (workItem.link.startsWith('http')) {
          window.open(workItem.link, '_blank');
        } else {
          window.location.href = workItem.link;
        }
      });
    }

    return frameElement;
  }

  generateYouTubeThumbnail(videoUrl) {
    if (!videoUrl || typeof videoUrl !== 'string') {
      return null;
    }

    // Check if it's a YouTube video URL
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoUrl.match(youtubeRegex);

    if (match && match[1]) {
      const videoId = match[1];
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }

    return null;
  }

  // Public API methods
  updateFrame(index, workItem) {
    const frames = this.framesContainer ? this.framesContainer.querySelectorAll('.work-item') : [];
    if (frames[index]) {
      const newFrame = this.createFrame(workItem);
      frames[index].replaceWith(newFrame);
    }
  }

  addFrame(workItem) {
    if (this.framesContainer) {
      const frameElement = this.createFrame(workItem);
      this.framesContainer.appendChild(frameElement);
    }
  }

  clearFrames() {
    if (this.framesContainer) {
      this.framesContainer.innerHTML = '';
    }
  }
}

// Initialize Instagram frame when script loads
new InstagramFrame();
