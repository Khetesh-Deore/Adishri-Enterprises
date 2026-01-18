// Product Data Model - HDPE/LDPE Bottles & Jerry Cans Collection
// Images: product1.jpeg to product8.jpeg in public folder

export const products = [
    {
    id: 1,
    name: "Jerry Can",
    category: "Jerry Can",
    capacity: "5L",
    image: "/product8.jpeg",
    description: "Large capacity HDPE jerry can suitable for bulk storage and transport of liquids.",
    specs: {
      material: "HDPE",
      neckSize: "50 mm",
      height: "340 mm",
      width: "230 mm",
      weight: "380 g"
    },
    features: ["Heavy Duty", "Double Handle", "Stackable"],
    applications: ["Industrial", "Agricultural", "Automotive"]
  },

  {
    id: 2,
    name: "Narrow Mouth HDPE Bottle",
    category: "HDPE Bottle",
    capacity: "4 ML-1 L",
    image: "/product2.jpeg",
    description: "Narrow mouth HDPE bottle designed for controlled and precise pouring of liquids.",
    specs: {
      material: "HDPE",
      neckSize: "28 mm",
      height: "220 mm",
      diameter: "90 mm",
      weight: "45 g"
    },
    features: ["Precision Pouring", "Stackable", "UV Resistant"],
    applications: ["Chemicals", "Solvents", "Industrial"]
  },

  {
    id: 3,
    name: "Round bottles with wide mouths",
    category: "HDPE",
    capacity: "100 ML - 5 L",
    image: "/product3.jpeg",
    description: "Strong, chemical- and UV-resistant containers ideal for chemicals, pharmaceuticals, and personal care products.",
    specs: {
      material: "HDPE",
      neckSize: "50 mm",
      height: "280 mm",
      width: "180 mm",
      weight: "200 g"
    },
    features: ["Industrial Grade", "Strong Handle", "Leak Proof"],
    applications: ["Chemicals", "Lubricants", "Agricultural"]
  },

  {
    id: 4,
    name: "LDPE Plastic Bottle ",
    category: "LDPE",
    capacity: "",
    image: "/product4.jpeg",
    description: "They are designed with a narrow neck and a flip-top or pull-push cap for controlled dispensing of liquids like dish soap or other household chemicals. ",
    specs: {
      material: "HDPE",
      neckSize: "45 mm",
      height: "250 mm",
      diameter: "120 mm",
      weight: "95 g"
    },
    features: ["Chemical Resistant", "Tamper Evident", "Leak Proof"],
    applications: ["Chemicals", "Solvents", "Industrial"]
  },

  {
    id: 5,
    name: "Pharmaceutical HDPE Bottle",
    category: "HDPE Bottle",
    capacity: "",
    image: "/product5.jpeg",
    description: "Compact pharmaceutical-grade HDPE bottle suitable for medicines and healthcare products.",
    specs: {
      material: "HDPE",
      neckSize: "28 mm",
      height: "140 mm",
      diameter: "60 mm",
      weight: "22 g"
    },
    features: ["FDA Approved", "Light Weight", "Leak Proof"],
    applications: ["Pharmaceuticals", "Nutraceuticals", "Healthcare"]
  },

  {
    id: 6,
    name: "LDPE Squeeze Bottle",
    category: "LDPE Bottle",
    capacity: "250 ml",
    image: "/product6.jpeg",
    description: "Flexible LDPE squeeze bottle for easy and controlled dispensing.",
    specs: {
      material: "LDPE",
      neckSize: "24 mm",
      height: "150 mm",
      diameter: "55 mm",
      weight: "18 g"
    },
    features: ["Flexible Body", "Easy Dispensing", "Food Grade"],
    applications: ["Food", "Cosmetics", "Laboratory"]
  },

  {
    id: 7,
    name: "Agro Chemical HDPE Bottle",
    category: "HDPE Bottle",
    capacity: "1 L",
    image: "/product7.jpeg",
    description: "UV-stabilized HDPE bottle designed for agricultural chemicals and pesticides.",
    specs: {
      material: "HDPE",
      neckSize: "38 mm",
      height: "210 mm",
      diameter: "95 mm",
      weight: "55 g"
    },
    features: ["UV Stabilized", "Chemical Resistant", "Strong Body"],
    applications: ["Agricultural", "Pesticides", "Fertilizers"]
  },

 {
    id: 8,
    name: "Wide Mouth HDPE Bottle",
    category: "HDPE Bottle",
    capacity: "500 ml",
    image: "/product1.jpeg",
    description: "Wide mouth HDPE bottle suitable for pharmaceutical and chemical storage. Easy filling and cleaning.",
    specs: {
      material: "HDPE",
      neckSize: "38 mm",
      height: "185 mm",
      diameter: "75 mm",
      weight: "32 g"
    },
    features: ["Chemical Resistant", "Leak Proof", "Reusable"],
    applications: ["Pharmaceuticals", "Chemicals", "Laboratory"]
  }
];

// Product Categories - Match backend enum values
export const categories = [
  { id: "all", name: "All Products", count: 8 },
  { id: "hdpe-bottles", name: "HDPE Bottles", count: 5 },
  { id: "ldpe-bottles", name: "LDPE Bottles", count: 1 },
  { id: "jerry-cans", name: "Jerry Cans", count: 2 },
  { id: "caps-closures", name: "Caps & Closures", count: 0 },
  { id: "custom-moulded", name: "Custom Moulded", count: 0 }
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
