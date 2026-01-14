// Button Component - Reusable Button with Variants
import { motion } from "framer-motion";

const variants = {
  primary: `
    bg-blue-600 text-white
    hover:bg-blue-700
    shadow-md hover:shadow-lg hover:shadow-blue-500/25
  `,
  secondary: `
    bg-transparent text-blue-600
    border-2 border-blue-600
    hover:bg-blue-600 hover:text-white
  `,
  ghost: `
    bg-transparent text-gray-700 dark:text-gray-300
    hover:bg-gray-100 dark:hover:bg-gray-800
  `,
  gradient: `
    bg-gradient-to-r from-blue-600 to-indigo-600 text-white
    hover:from-blue-700 hover:to-indigo-700
    shadow-md hover:shadow-lg hover:shadow-blue-500/25
  `
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  icon: Icon,
  iconPosition = "left"
}) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </motion.button>
  );
}
