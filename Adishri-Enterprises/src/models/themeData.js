// Theme Data Model - Colors, Gradients, and Design Tokens

// Core theme colors
export const themeColors = {
  light: {
    bg: "#FAFAFA",        // rgb(250, 250, 250)
    text: "#0A0A0A",      // rgb(10, 10, 10)
    bgRgb: "250, 250, 250",
    textRgb: "10, 10, 10"
  },
  dark: {
    bg: "#0A0A0A",        // rgb(10, 10, 10)
    text: "#FAFAFA",      // rgb(250, 250, 250)
    bgRgb: "10, 10, 10",
    textRgb: "250, 250, 250"
  }
};

export const colors = {
  primary: {
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
  },
  secondary: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95"
  },
  neutral: {
    50: "#FAFAFA",   // Light background
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#0A0A0A"   // Dark background
  }
};

// Gradient Presets
export const gradients = {
  primary: "from-blue-600 to-indigo-600",
  secondary: "from-purple-600 to-pink-600",
  success: "from-green-400 to-emerald-600",
  warning: "from-amber-400 to-orange-600",
  hero: "from-white via-blue-50 to-white",
  heroDark: "from-gray-900 via-gray-800 to-gray-900",
  glass: "from-white/10 to-white/5",
  glassDark: "from-gray-800/50 to-gray-900/50"
};

// Glassmorphism Styles
export const glassStyles = {
  light: {
    background: "bg-white/70",
    backdrop: "backdrop-blur-md",
    border: "border border-white/20"
  },
  dark: {
    background: "bg-gray-900/70",
    backdrop: "backdrop-blur-md",
    border: "border border-gray-700/50"
  }
};

// Shadow Presets
export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  glow: "shadow-lg shadow-blue-500/25",
  glowDark: "shadow-lg shadow-blue-400/20"
};

// Theme Configuration
export const themeConfig = {
  light: {
    name: "light",
    background: "bg-[#FAFAFA]",
    backgroundGradient: "bg-gradient-to-br from-[#FAFAFA] via-blue-50/30 to-[#FAFAFA]",
    text: "text-[#0A0A0A]",
    textMuted: "text-gray-600",
    card: "bg-white",
    cardGlass: "bg-white/70",
    border: "border-gray-200"
  },
  dark: {
    name: "dark",
    background: "bg-[#0A0A0A]",
    backgroundGradient: "bg-gradient-to-br from-[#0A0A0A] via-gray-900 to-[#0A0A0A]",
    text: "text-[#FAFAFA]",
    textMuted: "text-gray-400",
    card: "bg-gray-900",
    cardGlass: "bg-gray-900/70",
    border: "border-gray-800"
  }
};
