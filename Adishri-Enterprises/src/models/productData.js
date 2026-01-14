// Product Data Model - HDPE/LDPE Bottles & Jerry Cans Collection
export const products = [
  {
    id: 1,
    name: "Wide Mouth Bottle",
    category: "HDPE",
    capacity: "500ml",
    image: "/products/wide-mouth-500ml.png",
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
    image: "/products/narrow-mouth-1l.png",
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
    name: "Jerry Can - 5L",
    category: "Jerry Can",
    capacity: "5L",
    image: "/products/jerry-can-5l.png",
    description: "Heavy-duty jerry can for industrial liquid storage and transport",
    specs: {
      material: "HDPE",
      neckSize: "50mm",
      height: "280mm",
      width: "180mm",
      weight: "200g"
    },
    features: ["Industrial Grade", "Ergonomic Handle", "Tamper Evident", "Stackable"],
    applications: ["Chemicals", "Lubricants", "Agricultural"]
  },
  {
    id: 4,
    name: "Jerry Can - 10L",
    category: "Jerry Can",
    capacity: "10L",
    image: "/products/jerry-can-10l.png",
    description: "Large capacity jerry can for bulk liquid storage",
    specs: {
      material: "HDPE",
      neckSize: "50mm",
      height: "340mm",
      width: "230mm",
      weight: "380g"
    },
    features: ["Heavy Duty", "Double Handle", "UN Certified", "Stackable"],
    applications: ["Industrial", "Agricultural", "Automotive"]
  },
  {
    id: 5,
    name: "Jerry Can - 20L",
    category: "Jerry Can",
    capacity: "20L",
    image: "/products/jerry-can-20l.png",
    description: "Extra large jerry can for industrial and commercial use",
    specs: {
      material: "HDPE",
      neckSize: "60mm",
      height: "420mm",
      width: "280mm",
      weight: "650g"
    },
    features: ["Maximum Capacity", "Reinforced Walls", "Transport Safe"],
    applications: ["Bulk Storage", "Industrial", "Commercial"]
  },
  {
    id: 6,
    name: "Squeeze Bottle",
    category: "LDPE",
    capacity: "250ml",
    image: "/products/squeeze-250ml.png",
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
    name: "Dropper Bottle",
    category: "LDPE",
    capacity: "100ml",
    image: "/products/dropper-100ml.png",
    description: "Precision dropper bottle for laboratory and pharmaceutical use",
    specs: {
      material: "LDPE",
      neckSize: "18mm",
      height: "120mm",
      diameter: "45mm",
      weight: "12g"
    },
    features: ["Precision Drops", "Lab Grade", "Autoclavable"],
    applications: ["Pharmaceuticals", "Laboratory", "Medical"]
  },
  {
    id: 8,
    name: "Chemical Container",
    category: "HDPE",
    capacity: "2L",
    image: "/products/chemical-2l.png",
    description: "Robust container for chemical storage",
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
    id: 9,
    name: "Pharmaceutical Bottle",
    category: "HDPE",
    capacity: "200ml",
    image: "/products/pharma-200ml.png",
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
    id: 10,
    name: "Agro Chemical Bottle",
    category: "HDPE",
    capacity: "1L",
    image: "/products/agro-1l.png",
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
  }
];

// Product Categories
export const categories = [
  { id: "all", name: "All Products", count: 10 },
  { id: "hdpe", name: "HDPE Bottles", count: 6 },
  { id: "ldpe", name: "LDPE Bottles", count: 2 },
  { id: "jerry can", name: "Jerry Cans", count: 3 }
];

// Capacity Options
export const capacityOptions = [
  "100ml", "200ml", "250ml", "500ml", "1L", "2L", "5L", "10L", "20L", "50L"
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
