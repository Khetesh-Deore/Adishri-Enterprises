// Footer Component - Site Footer with Links
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { footerLinks, socialLinks, contactInfo } from "../../models/navigationData";
import { useScrollToSection } from "../../controllers/useScroll";
import { staggerContainer, staggerItem } from "../../controllers/useAnimations";

const socialIcons = { Facebook, Twitter, Linkedin, Instagram };

export default function Footer() {
  const { scrollToTop } = useScrollToSection();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Company Info */}
          <motion.div variants={staggerItem} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/adishri_logo3.png" alt="Logo" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold text-white">{contactInfo.company}</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">{contactInfo.tagline}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{contactInfo.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Credentials */}
          <motion.div variants={staggerItem}>
            <h4 className="text-white font-semibold mb-4">Credentials</h4>
            <ul className="space-y-2">
              {footerLinks.credentials.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={staggerItem}>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {contactInfo.company}. All rights reserved.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, i) => {
              const Icon = socialIcons[social.icon];
              return (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
