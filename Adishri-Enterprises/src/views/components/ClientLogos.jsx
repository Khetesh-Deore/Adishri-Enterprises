// ClientLogos Component - Scrolling Client Logos Carousel
import { motion } from 'framer-motion';
import { SectionHeading } from '../shared';

// Placeholder client data - Replace with actual client logos
const clients = [
  { id: 1, name: 'Pharmaceutical Co.', logo: '🏥' },
  { id: 2, name: 'Chemical Industries', logo: '⚗️' },
  { id: 3, name: 'Food & Beverage', logo: '🍽️' },
  { id: 4, name: 'Agricultural Corp', logo: '🌾' },
  { id: 5, name: 'Cosmetics Brand', logo: '💄' },
  { id: 6, name: 'Automotive Ltd', logo: '🚗' },
  { id: 7, name: 'Industrial Group', logo: '🏭' },
  { id: 8, name: 'Healthcare Plus', logo: '⚕️' },
];

// Duplicate for seamless loop
const allClients = [...clients, ...clients];

export default function ClientLogos() {
  return (
    <section className="py-16 md:py-20 bg-background border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Trusted by <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">Leading Companies</span>
          </h2>
          <p className="text-muted-foreground">
            Serving diverse industries across India with excellence
          </p>
        </motion.div>

        {/* Scrolling Logo Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling Track */}
          <motion.div
            className="flex gap-12 items-center"
            animate={{
              x: [0, -50 * clients.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear'
              }
            }}
          >
            {allClients.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-32 h-24 flex items-center justify-center bg-card border border-border rounded-lg hover:border-primary/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2 grayscale group-hover:grayscale-0 transition-all">
                    {client.logo}
                  </div>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                    {client.name}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Below */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Partnering with <span className="font-bold text-primary">1000+</span> satisfied clients nationwide
          </p>
        </motion.div> */}
      </div>
    </section>
  );
}
