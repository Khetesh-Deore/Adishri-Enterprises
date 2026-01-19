// IndustriesServed Component - Industries Showcase Section
import { motion } from 'framer-motion';
import { Pill, Beaker, Apple, Sprout, Sparkles, Car, FlaskConical, Home } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../controllers/useAnimations';
import { SectionHeading, LazySection, LazyStaggerContainer, LazyStaggerItem } from '../shared';

const industries = [
  {
    icon: Pill,
    name: 'Pharmaceutical Industries',
    description: 'FDA approved bottles for medicines and healthcare products',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Beaker,
    name: 'Chemical Industries',
    description: 'Chemical-resistant containers for industrial chemicals',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Apple,
    name: 'Food & Beverage',
    description: 'Food-grade packaging for edible products',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Sprout,
    name: 'Agricultural Products',
    description: 'Durable containers for pesticides and fertilizers',
    color: 'from-lime-500 to-lime-600'
  },
  {
    icon: Sparkles,
    name: 'Cosmetics & Personal Care',
    description: 'Premium packaging for beauty and personal care',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: Car,
    name: 'Automotive Lubricants',
    description: 'Heavy-duty containers for oils and lubricants',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: FlaskConical,
    name: 'Industrial Chemicals',
    description: 'Robust packaging for industrial applications',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Home,
    name: 'Home & Garden',
    description: 'Versatile containers for household products',
    color: 'from-cyan-500 to-cyan-600'
  }
];

export default function IndustriesServed() {
  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <LazySection animation="fadeUp">
          <SectionHeading
            subtitle="Industries We Serve"
            title="Providing Solutions Across"
            highlight="Diverse Sectors"
            description="Empowering industries with cutting-edge packaging solutions, driving innovation, efficiency, and growth"
          />
        </LazySection>

        <LazyStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <LazyStaggerItem
                key={index}
                className="group relative"
              >
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  {/* Icon */}
                  <div className="relative mb-4">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${industry.color} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity`} />
                    
                    {/* Icon Container */}
                    <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-r ${industry.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>

                  {/* Hover Arrow */}
                  {/* <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity"> */}
                    {/* <span className="text-sm font-medium">Learn More</span> */}
                    {/* <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div> */}
                </div>
              </LazyStaggerItem>
            );
          })}
        </LazyStaggerContainer>
      </div>
    </section>
  );
}
