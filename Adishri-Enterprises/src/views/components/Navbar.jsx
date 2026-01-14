// Navbar Component - Sticky Navigation with Glassmorphism
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, MessageCircle } from "lucide-react";
import { navLinks, whatsappConfig } from "../../models/navigationData";
import { useScrollDirection, useScrollToSection, useActiveSection } from "../../controllers/useScroll";
import { useTheme } from "../../controllers/useTheme";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const { visible, scrollY } = useScrollDirection();
  const { scrollToSection } = useScrollToSection();
  const { isDark, toggleTheme } = useTheme();
  
  // Track active section for highlighting
  const sectionIds = navLinks.map(link => link.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  const handleNavClick = (href) => {
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  // Check if link is active
  const isActive = (href) => href.replace("#", "") === activeSection;

  return (
    <motion.nav
      className={`
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-md border-b
        transition-all duration-300
        ${scrollY > 50 
          ? "bg-white/85 dark:bg-gray-900/85 border-gray-200/50 dark:border-gray-700/50 shadow-sm" 
          : "bg-white/70 dark:bg-gray-900/70 border-transparent"
        }
      `}
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick("#home")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <img
                src="/adishri_logo3.png"
                alt="Adishri Enterprises"
                className="h-10 w-10 md:h-12 md:w-12 object-contain transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
              />
              {/* Logo glow on hover */}
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-wide bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
                Adishri
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 -mt-1 tracking-wider">
                ENTERPRISES
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <motion.button
                  onClick={() => handleNavClick(link.href)}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`
                    relative px-4 py-2 font-medium transition-colors duration-200
                    ${isActive(link.href) 
                      ? "text-primary" 
                      : "text-foreground/80 hover:text-primary"
                    }
                  `}
                >
                  {link.name}
                  
                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gradient-from to-gradient-to rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ 
                      scaleX: isActive(link.href) || hoveredLink === link.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.button>
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* WhatsApp Button - Desktop */}
            <motion.a
              href={whatsappConfig.getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden xl:inline">WhatsApp</span>
            </motion.a>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? "sun" : "moon"}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-indigo-500" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* CTA Button - Desktop */}
            <motion.button
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-gradient-from to-gradient-to hover:from-gradient-from-hover hover:to-gradient-to-hover transition-all shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick("#contact")}
            >
              Get Quote
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ul className="px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`
                      block w-full text-left px-4 py-3 rounded-xl font-medium transition-all
                      ${isActive(link.href)
                        ? "bg-primary-soft text-primary"
                        : "text-foreground/80 hover:bg-muted"
                      }
                    `}
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
              
              {/* Mobile WhatsApp */}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <a
                  href={whatsappConfig.getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </motion.li>

              {/* Mobile CTA */}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
              >
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="block w-full mt-2 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-gradient-from to-gradient-to text-center shadow-md"
                >
                  Get Quote
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
