// Contact Information Component JavaScript
class ContactInformation {
  constructor() {
    this.contactContainer = null;
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadContactInformation());
    } else {
      await this.loadContactInformation();
    }
  }

  async loadContactInformation() {
    this.contactContainer = document.getElementById('contact-container');
    if (!this.contactContainer) return;

    try {
      // Fetch the contact information HTML
      const response = await fetch('components/contact-information.html');
      // Insert the contact information HTML
      this.contactContainer.innerHTML = await response.text();

      // Add ethnic border at the top
      this.addEthnicBorder();

      // Populate with contact information
      this.populateContactInformation();
    } catch (error) {
      console.error('Error loading contact information component:', error);
    }
  }

  addEthnicBorder() {
    // Add ethnic borders at the top and bottom of contact section
    const contactSection = this.contactContainer.querySelector('.contact-section');
    if (contactSection) {
      // Add ethnic border at the top
      const ethnicBorderTop = document.createElement('div');
      ethnicBorderTop.className = 'ethnic-border';
      contactSection.insertBefore(ethnicBorderTop, contactSection.firstChild);

      // Add ethnic border at the bottom
      const ethnicBorderBottom = document.createElement('div');
      ethnicBorderBottom.className = 'ethnic-border';
      contactSection.appendChild(ethnicBorderBottom);
    }
  }

  populateContactInformation() {
    const contactInfo = document.querySelector('#contact-container .contact-info');
    if (!contactInfo) {
      console.error('Contact info container not found');
      return;
    }

    // Define contact information data with additional details
    const contactData = [
      {
        label: 'Primary Contact',
        value: 'Uma Maheshwari',
        description: 'Mother',
        icon: 'user-tie'
      },
      {
        label: 'Mobile',
        value: '+91 94611 22111',
        isLink: true,
        href: 'tel:+919461122111',
        icon: 'phone-alt',
        description: 'Available on WhatsApp'
      },
      {
        label: 'Email',
        value: 'umamaheshwari100170@gmail.com',
        isLink: true,
        href: 'mailto:umamaheshwari100170@gmail.com',
        icon: 'envelope',
        description: 'For formal inquiries'
      },
      {
        label: 'Address',
        value: 'Bundi, Rajasthan - 323001',
        icon: 'map-marker-alt',
        description: 'Near City Palace, Bundi'
      }
    ];

    // Clear existing content
    contactInfo.innerHTML = '';

    // Populate with contact information
    contactData.forEach(item => {
      const contactItem = this.createContactItem(item);
      contactInfo.appendChild(contactItem);
    });
  }

  createContactItem(item) {
    const contactItem = document.createElement('div');
    contactItem.className = 'contact-item';
    
    // Map labels to Font Awesome icons
    const iconMap = {
      'Primary Contact': 'user-tie',
      'Mobile': 'phone-alt',
      'Email': 'envelope',
      'Address': 'map-marker-alt'
    };
    
    const icon = iconMap[item.label] || 'info-circle';
    
    if (item.isLink) {
      contactItem.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <strong>${item.label}</strong>
        <a href="${item.href}" class="contact-link">${item.value}</a>
      `;
    } else {
      contactItem.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <strong>${item.label}</strong>
        <span>${item.value}</span>
      `;
    }

    return contactItem;
  }

  // Public API methods for updating contact information
  updateContactItem(label, newValue, isLink = false, href = '') {
    // This could be extended to update specific contact items
    // For now, it's a simple static component
    console.log(`Updating ${label} to ${newValue}`);
    this.populateContactInformation(); // Refresh the display
    return true;
  }

  addContactItem(item) {
    // This could be extended to add new contact items
    console.log('Adding new contact item:', item);
    this.populateContactInformation(); // Refresh the display
    return true;
  }

  removeContactItem(label) {
    // This could be extended to remove contact items
    console.log('Removing contact item:', label);
    this.populateContactInformation(); // Refresh the display
    return true;
  }
}

// Initialize contact information when script loads
new ContactInformation();
