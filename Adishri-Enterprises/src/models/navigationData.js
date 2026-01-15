// Navigation Data Model
export const navLinks = [
  { id: 1, name: "Home", href: "#home" },
  { id: 2, name: "About", href: "#about" },
  { id: 3, name: "Vision", href: "#vision" },
  { id: 4, name: "Products", href: "#products" },
  // { id: 5, name: "Gallery", href: "#gallery" },
  { id: 6, name: "Contact", href: "#contact" }
];

// Footer Links
export const footerLinks = {
  quickLinks: [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Our Vision", href: "#vision" },
    { name: "Products", href: "#products" },
    // { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" }
  ],
  credentials: [
    { name: "ISO 9001:2015", href: "#" },
    { name: "FDA Approved", href: "#" },
    { name: "BIS Certified", href: "#" },
    { name: "GMP Compliant", href: "#" }
  ],
  resources: [
    { name: "Product Catalog", href: "#brochure" },
    { name: "Download Brochure", href: "#brochure" },
    { name: "Technical Specs", href: "#products" },
    { name: "Quality Reports", href: "#" }
  ]
};

// Social Media Links
export const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: "Facebook" },
  { name: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { name: "Instagram", href: "https://instagram.com", icon: "Instagram" }
];

// Company Contact Info - Updated with actual details
export const contactInfo = {
  company: "Adishri Enterprises",
  tagline: "Premium HDPE & LDPE Bottles & Jerry Can Manufacturer",
  address: "Plot No B 33/2, Shendra MIDC, Shendra, Chh. Sambhajinagar, Maharashtra - 431007",
  taluka: "Chhatrapati Sambhajinagar",
  district: "Chhatrapati Sambhajinagar",
  pincode: "431007",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  email: "info@adishrienterprises.com",
  workingHours: "Mon - Sat: 9:00 AM - 6:00 PM",
  businessType: "Manufacturing"
};

// WhatsApp Configuration
export const whatsappConfig = {
  number: "919876543210",
  message: "Hello! I'm interested in your HDPE/LDPE bottles and jerry cans. Please share more details.",
  getWhatsAppLink: (customMessage) => {
    const msg = encodeURIComponent(customMessage || whatsappConfig.message);
    return `https://wa.me/${whatsappConfig.number}?text=${msg}`;
  }
};
