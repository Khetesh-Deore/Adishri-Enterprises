// Footer Component - Site Footer with API Integration
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useContact, useSettings, useNavigation } from "../../hooks/useApi";
import { socialLinks, contactInfo as staticContact, footerLinks } from "../../models/navigationData";

// Social icons as simple SVGs to avoid deprecation warnings
const SocialIcon = ({ type }) => {
  const icons = {
    Facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
    Twitter: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>,
    Linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></>,
    Instagram: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
};

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  
  // Fetch data from API
  const { data: apiContact } = useContact();
  const { data: apiSettings } = useSettings();
  const { data: navigation } = useNavigation();

  // Merge API data with static fallback
  const contact = {
    company: apiContact?.company || staticContact.company,
    tagline: apiContact?.tagline || staticContact.tagline,
    phone: apiContact?.phone?.primary || staticContact.phone,
    email: apiContact?.email?.primary || staticContact.email,
    address: apiContact?.address?.full || staticContact.address,
    socialLinks: apiContact?.socialLinks || {}
  };
  
  // Get footer links from navigation API with proper fallbacks
  const quickLinks = (navigation?.footerQuickLinks && navigation.footerQuickLinks.length > 0)
    ? navigation.footerQuickLinks.sort((a, b) => a.order - b.order)
    : footerLinks.quickLinks;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isInternalLink = (href) => href.startsWith("/");

  // Build social links from API or static
  const activeSocialLinks = socialLinks.map(social => ({
    ...social,
    href: (navigation?.socialLinks?.[social.icon.toLowerCase()] || contact.socialLinks[social.icon.toLowerCase()] || social.href)
  })).filter(s => s.href && s.href !== '');

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden mt-auto">
      <div className="h-1 bg-gradient-to-r from-gradient-from via-gradient-to to-purple-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
        >
          
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-1"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
            }}
          >
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img src={apiSettings?.logo?.url || "/adishri_logo3.png"} alt="Logo" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{contact.company}</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">{contact.tagline}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{contact.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
            }}
          >
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  {isInternalLink(link.href) ? (
                    <Link to={link.href} className={`text-sm hover:text-blue-400 transition-colors ${location.pathname === link.href ? 'text-blue-400' : ''}`}>
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm hover:text-blue-400 transition-colors">{link.name}</a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources - COMMENTED OUT */}
          {/* <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
            }}
          >
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link, i) => (
                <li key={i}>
                  {isInternalLink(link.href) ? (
                    <Link to={link.href} className="text-sm hover:text-blue-400 transition-colors">{link.name}</Link>
                  ) : (
                    <a href={link.href} className="text-sm hover:text-blue-400 transition-colors">{link.name}</a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div> */}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              {apiSettings?.copyrightText || `© ${new Date().getFullYear()} ${contact.company}. All rights reserved.`}
            </p>
            <div className="flex items-center gap-4">
              {activeSocialLinks.map((social, i) => (
                <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <SocialIcon type={social.icon} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Developer Credit */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="mt-6 pt-4 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              Developed by{" "}
              <a href="https://www.linkedin.com/in/khetesh-deore/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Khetesh Deore
              </a>
            </p>
          </div>
        </motion.div> */}
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button onClick={scrollToTop} className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary-hover transition-colors z-50" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
