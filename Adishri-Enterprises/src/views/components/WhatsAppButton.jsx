// WhatsAppButton Component - Floating WhatsApp Contact Button
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useContact } from '../../hooks/useApi';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: apiContact } = useContact();
  
  // Fetch WhatsApp number from API with fallback
  const whatsappNumber = apiContact?.whatsapp || '919876543210';
  const defaultMessage = 'Hello! I am interested in your HDPE/LDPE bottles. Please provide more information.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          onClick={handleWhatsAppClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow group relative"
          aria-label="Contact us on WhatsApp"
        >
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
          
          {/* Icon */}
          <MessageCircle className="w-7 h-7 relative z-10" />

          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with us on WhatsApp
          </span>
        </motion.button>
      </motion.div>

      {/* Optional: Expandable Chat Widget */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Adishri Enterprises</h3>
                <p className="text-white/80 text-xs">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-gray-50">
            <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
              <p className="text-sm text-gray-700">
                👋 Hello! How can we help you today?
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-700 mb-2">
                We're here to assist you with:
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Product inquiries</li>
                <li>• Custom orders</li>
                <li>• Pricing & quotes</li>
                <li>• Technical support</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Start Chat
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
