// Portfolio Skills Component JavaScript
class PortfolioSkills {
  constructor() {
    this.skillsContainer = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadPortfolioSkills());
    } else {
      await this.loadPortfolioSkills();
    }
  }

  async loadPortfolioSkills() {
    this.skillsContainer = document.getElementById('portfolio-skills-container');
    if (!this.skillsContainer) return;

    try {
      // Fetch the portfolio skills HTML
      const response = await fetch('components/portfolio-skills.html');
      const html = await response.text();

      // Insert the portfolio skills HTML
      this.skillsContainer.innerHTML = html;

      // Initialize skills functionality
      this.initializeSkills();
    } catch (error) {
      console.error('Error loading portfolio skills component:', error);
    }
  }

  initializeSkills() {
    // Add click functionality to skill tags
    const skillTags = document.querySelectorAll('#portfolio-skills-container .skill-tag');

    skillTags.forEach(tag => {
      tag.addEventListener('click', () => {
        // Add visual feedback
        tag.style.transform = 'scale(0.95)';
        setTimeout(() => {
          tag.style.transform = '';
        }, 150);

        // You could add more functionality here like filtering or navigation
        console.log('Skill clicked:', tag.textContent);
      });
    });

    // Add intersection observer for scroll animations
    this.addScrollAnimations();
  }

  addScrollAnimations() {
    const skillCategories = document.querySelectorAll('#portfolio-skills-container .skill-category');

    if (skillCategories.length > 0 && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger animation
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Initial state
      skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(category);
      });
    }
  }

  // Public API methods
  highlightSkill(skillName) {
    const skillTags = document.querySelectorAll('#portfolio-skills-container .skill-tag');
    skillTags.forEach(tag => {
      if (tag.textContent.includes(skillName)) {
        tag.classList.add('highlighted');
      }
    });
  }

  filterSkillsByCategory(categoryName) {
    const skillCategories = document.querySelectorAll('#portfolio-skills-container .skill-category');

    skillCategories.forEach(category => {
      const title = category.querySelector('.category-title').textContent;

      if (title.includes(categoryName)) {
        category.style.display = 'block';
      } else {
        category.style.display = 'none';
      }
    });
  }

  showAllSkills() {
    const skillCategories = document.querySelectorAll('#portfolio-skills-container .skill-category');
    skillCategories.forEach(category => {
      category.style.display = 'block';
    });
  }
}

// Initialize portfolio skills when script loads
new PortfolioSkills();
