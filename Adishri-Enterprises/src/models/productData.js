// Product Data Model - HDPE/LDPE Bottles & Jerry Cans Collection
// Images: product1.jpeg to product8.jpeg in public folder

export const products = [
  {
    id: 1,
    name: "Wide Mouth Bottle",
    category: "HDPE",
    capacity: "500ml",
    image: "/product1.jpeg",
    description: "Premium wide mouth HDPE bottle ideal for chemicals and pharmaceuticals",
    specs: {
      material: "HDPE",
      neckSize: "38mm",
      height: "185mm",
      diameter: "75mm",
      weight: "32g"
    },
    features: ["Chemical Resistant", "FDA Approved", "Leak Proof"],
    applications: ["Pharmaceuticals", "Chemicals", "Laboratory"]
  },
  {
    id: 2,
    name: "Narrow Mouth Bottle",
    category: "HDPE",
    capacity: "1L",
    image: "/product2.jpeg",
    description: "Narrow mouth design for precise pouring and dispensing",
    specs: {
      material: "HDPE",
      neckSize: "28mm",
      height: "220mm",
      diameter: "90mm",
      weight: "45g"
    },
    features: ["Precision Pouring", "Stackable", "UV Resistant"],
    applications: ["Chemicals", "Solvents", "Industrial"]
  },
  {
    id: 3,
    name: "Jerry Can",
    category: "Jerry Can",
    capacity: "5L",
    image: "/product3.jpeg",
    description: "Heavy-duty jerry can for industrial liquid storage and transport",
    specs: {
      material: "HDPE",
      neckSize: "50mm",
      height: "280mm",
      width: "180mm",
      weight: "200g"
    },
    features: ["Industrial Grade", "Ergonomic Handle", "Stackable"],
    applications: ["Chemicals", "Lubricants", "Agricultural"]
  },
  {
    id: 4,
    name: "Chemical Container",
    category: "HDPE",
    capacity: "2L",
    image: "/product4.jpeg",
    description: "Robust container for chemical storage and transport",
    specs: {
      material: "HDPE",
      neckSize: "45mm",
      height: "250mm",
      diameter: "120mm",
      weight: "95g"
    },
    features: ["Chemical Resistant", "Leak Proof", "Tamper Evident"],
    applications: ["Chemicals", "Solvents", "Industrial"]
  },
  {
    id: 5,
    name: "Pharmaceutical Bottle",
    category: "HDPE",
    capacity: "200ml",
    image: "/product5.jpeg",
    description: "FDA approved bottle for pharmaceutical packaging",
    specs: {
      material: "HDPE",
      neckSize: "28mm",
      height: "140mm",
      diameter: "60mm",
      weight: "22g"
    },
    features: ["FDA Approved", "Child Resistant Cap", "Light Protected"],
    applications: ["Pharmaceuticals", "Nutraceuticals", "Healthcare"]
  },
  {
    id: 6,
    name: "Squeeze Bottle",
    category: "LDPE",
    capacity: "250ml",
    image: "/product6.jpeg",
    description: "Flexible squeeze bottle for easy dispensing",
    specs: {
      material: "LDPE",
      neckSize: "24mm",
      height: "150mm",
      diameter: "55mm",
      weight: "18g"
    },
    features: ["Flexible Body", "Easy Squeeze", "Food Safe"],
    applications: ["Food", "Cosmetics", "Laboratory"]
  },
  {
    id: 7,
    name: "Agro Chemical Bottle",
    category: "HDPE",
    capacity: "1L",
    image: "/product7.jpeg",
    description: "Durable bottle for agricultural chemicals and pesticides",
    specs: {
      material: "HDPE",
      neckSize: "38mm",
      height: "210mm",
      diameter: "95mm",
      weight: "55g"
    },
    features: ["UV Stabilized", "Chemical Resistant", "Measuring Cap"],
    applications: ["Agricultural", "Pesticides", "Fertilizers"]
  },
  {
    id: 8,
    name: "Industrial Container",
    category: "Jerry Can",
    capacity: "10L",
    image: "/product8.jpeg",
    description: "Large capacity container for bulk liquid storage",
    specs: {
      material: "HDPE",
      neckSize: "50mm",
      height: "340mm",
      width: "230mm",
      weight: "380g"
    },
    features: ["Heavy Duty", "Double Handle", "Stackable"],
    applications: ["Industrial", "Agricultural", "Automotive"]
  }
];

// Product Categories
export const categories = [
  { id: "all", name: "All Products", count: 8 },
  { id: "hdpe", name: "HDPE Bottles", count: 5 },
  { id: "ldpe", name: "LDPE Bottles", count: 1 },
  { id: "jerry can", name: "Jerry Cans", count: 2 }
];

// Capacity Options
export const capacityOptions = [
  "200ml", "250ml", "500ml", "1L", "2L", "5L", "10L"
];

// Product Applications
export const applications = [
  "Pharmaceutical",
  "Chemical",
  "Agricultural",
  "Industrial",
  "Food & Beverage",
  "Cosmetics",
  "Laboratory",
  "Automotive"
];

// Brochure Data
export const brochureData = {
  title: "Product Catalog",
  description: "Download our complete product catalog with specifications",
  fileName: "Adishri-Enterprises-Catalog.pdf",
  fileSize: "2.5 MB",
  downloadUrl: "/brochure/Adishri-Enterprises-Catalog.pdf"
};
