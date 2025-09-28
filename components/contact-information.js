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
      const html = await response.text();

      // Insert the contact information HTML
      this.contactContainer.innerHTML = html;

      // Populate with contact information
      this.populateContactInformation();
    } catch (error) {
      console.error('Error loading contact information component:', error);
    }
  }

  populateContactInformation() {
    const contactInfo = document.querySelector('#contact-container .contact-info');
    if (!contactInfo) {
      console.error('Contact info container not found');
      return;
    }

    // Define contact information data
    const contactData = [
      {
        label: 'Primary Contact',
        value: 'Uma Maheshwari'
      },
      {
        label: 'Mobile',
        value: '+91 94611 22111',
        isLink: true,
        href: 'tel:+919461122111'
      },
      {
        label: 'Email',
        value: 'umamaheshwari100170@gmail.com',
        isLink: true,
        href: 'mailto:umamaheshwari100170@gmail.com'
      },
      {
        label: 'Address',
        value: 'Bundi, Rajasthan - 323001'
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

    if (item.isLink) {
      contactItem.innerHTML = `
        <strong>${item.label}:</strong> <a href="${item.href}">${item.value}</a>
      `;
    } else {
      contactItem.innerHTML = `
        <strong>${item.label}:</strong> ${item.value}
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
