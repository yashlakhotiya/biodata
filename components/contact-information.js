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
      // ethnicBorderTop.className = 'ethnic-border';
      // contactSection.insertBefore(ethnicBorderTop, contactSection.firstChild);

      // Add ethnic border at the bottom
      const ethnicBorderBottom = document.createElement('div');
      // ethnicBorderBottom.className = 'ethnic-border';
      // contactSection.appendChild(ethnicBorderBottom);
    }
  }

  populateContactInformation() {
    const contactInfo = document.querySelector('#contact-container .contact-info');
    if (!contactInfo) {
      console.error('Contact info container not found');
      return;
    }

    // Define contact information data with primary and secondary contacts
    const contactData = [
      {
        type: 'primary',
        label: 'Primary Contact',
        name: 'Uma Maheshwari',
        relation: 'Mother',
        mobile: '+91 94611 22111',
        email: 'umamaheshwari100170@gmail.com',
        address: 'Bundi, Rajasthan - 323001',
        // description: 'Near City Palace, Bundi',
        icon: 'user-tie'
      },
      {
        type: 'secondary',
        label: 'Secondary Contact',
        name: 'Shailendra Lakhotiya',
        relation: 'Father',
        mobile: '+91 94130 87600',
        email: 'shailulakhotiya@gmail.com',
        address: 'Bundi, Rajasthan - 323001',
        // description: 'Near City Palace, Bundi',
        icon: 'user-tie'
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
    contactItem.className = `contact-item ${item.type}-contact`;
    
    const icon = item.icon || 'info-circle';
    
    contactItem.innerHTML = `
      <div class="contact-header">
        <i class="fas fa-${icon}"></i>
        <div class="contact-header-content">
          <h4><span class="contact-relation">${item.relation}</span> <span class="contact-name">${item.name}</span></h4>
        </div>
      </div>
      <div class="contact-details">
        <div class="detail-row">
          <i class="fas fa-phone-alt"></i>
          <a href="tel:${item.mobile.replace(/\s+/g, '')}" class="contact-link">${item.mobile}</a>
        </div>
        <div class="detail-row">
          <i class="fas fa-envelope"></i>
          <a href="mailto:${item.email}" class="contact-link">${item.email}</a>
        </div>
        <div class="detail-row">
          <i class="fas fa-map-marker-alt"></i>
          <span class="detail-address">${item.address}</span>
        </div>
      </div>
    `;

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
