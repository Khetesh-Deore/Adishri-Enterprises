// Theme Data Model - CSS Variables Based System
// Base colors: rgb(250, 250, 250) light | rgb(10, 10, 10) dark

// ========================================
// SEMANTIC COLOR TOKENS
// Edit these to change colors site-wide!
// ========================================

export const themeColors = {
  light: {
    background: "rgb(250, 250, 250)",
    foreground: "rgb(10, 10, 10)",
    card: "rgb(255, 255, 255)",
    muted: "rgb(240, 240, 240)",
    mutedForeground: "rgb(110, 110, 110)",
    border: "rgb(220, 220, 220)",
    // Primary - Main brand color
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primarySoft: "#dbeafe",
    // Accent - Secondary brand color
    accent: "#16a34a",
    accentHover: "#15803d",
    accentSoft: "#dcfce7",
    // Gradient
    gradientFrom: "#2563eb",
    gradientTo: "#4f46e5"
  },
  dark: {
    background: "rgb(10, 10, 10)",
    foreground: "rgb(250, 250, 250)",
    card: "rgb(20, 20, 20)",
    muted: "rgb(30, 30, 30)",
    mutedForeground: "rgb(140, 140, 140)",
    border: "rgb(50, 50, 50)",
    // Primary - Brighter for dark mode
    primary: "#3b82f6",
    primaryHover: "#60a5fa",
    primarySoft: "rgba(59, 130, 246, 0.2)",
    // Accent
    accent: "#22c55e",
    accentHover: "#4ade80",
    accentSoft: "rgba(34, 197, 94, 0.2)",
    // Gradient
    gradientFrom: "#3b82f6",
    gradientTo: "#6366f1"
  }
};

// Neutral scale from rgb(250,250,250) to rgb(10,10,10)
export const neutral = {
  50: "rgb(250, 250, 250)",
  100: "rgb(230, 230, 230)",
  200: "rgb(200, 200, 200)",
  300: "rgb(170, 170, 170)",
  400: "rgb(140, 140, 140)",
  500: "rgb(110, 110, 110)",
  600: "rgb(80, 80, 80)",
  700: "rgb(50, 50, 50)",
  800: "rgb(30, 30, 30)",
  900: "rgb(10, 10, 10)"
};

// Primary colors (Blue)
export const primary = {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a"
};

// Accent colors (Green)
export const accent = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a",
  700: "#15803d",
  800: "#166534",
  900: "#14532d"
};

// Gradient Presets using CSS variables
export const gradients = {
  primary: "from-gradient-from to-gradient-to",
  secondary: "from-indigo-500 to-purple-600",
  accent: "from-accent to-emerald-600",
  hero: "from-background via-muted/30 to-background",
  glass: "from-card/10 to-card/5",
  text: "from-gradient-from to-gradient-to"
};

// Glassmorphism using CSS variables
export const glassStyles = {
  base: "bg-card/70 backdrop-blur-md border border-border/50",
  light: "bg-card/80 backdrop-blur-md border border-border/30",
  dark: "bg-card/50 backdrop-blur-lg border border-border/20"
};

// Shadow Presets
export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  glow: "shadow-lg shadow-primary/25",
  glowAccent: "shadow-lg shadow-accent/25"
};

// Theme Configuration using Tailwind CSS variable classes
export const themeConfig = {
  light: {
    name: "light",
    background: "bg-background",
    foreground: "text-foreground",
    card: "bg-card",
    cardForeground: "text-card-foreground",
    muted: "bg-muted",
    mutedForeground: "text-muted-foreground",
    border: "border-border",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground"
  },
  dark: {
    name: "dark",
    background: "bg-background",
    foreground: "text-foreground",
    card: "bg-card",
    cardForeground: "text-card-foreground",
    muted: "bg-muted",
    mutedForeground: "text-muted-foreground",
    border: "border-border",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground"
  }
};

// Font families
export const fonts = {
  sans: "'Outfit', system-ui, sans-serif",
  serif: "'Crimson Pro', Georgia, serif",
  mono: "ui-monospace, monospace"
};
