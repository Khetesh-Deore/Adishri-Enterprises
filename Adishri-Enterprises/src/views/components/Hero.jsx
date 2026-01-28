// Hero Component - Main Landing Section with API Integration
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useHero } from "../../hooks/useApi";
import { fadeInRight, staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { FloatingBlur, Button, SkeletonHero } from "../shared";

export default function Hero() {
  const navigate = useNavigate();
  const { data: hero, loading, error } = useHero();

  // Show skeleton while loading from Google Sheets
  if (loading || !hero) {
    return (
      <section className="bg-background relative min-h-screen overflow-hidden">
        <SkeletonHero />
      </section>
    );
  }

  return (
    <section className="bg-background relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Floating Background Blurs */}
      <FloatingBlur color="blue" position="-top-32 -left-32" size="w-96 h-96" />
      <FloatingBlur color="indigo" position="-bottom-32 -right-32" size="w-80 h-80" duration={10} />
      <FloatingBlur color="cyan" position="top-1/3 right-1/4" size="w-64 h-64" opacity="opacity-10" duration={12} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={staggerItem}>
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary-soft rounded-full">
                🏭 Premium Industrial Packaging
              </span>
            </motion.div>

            {/* Heading - Dynamic from API */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground"
            >
              {hero.title ? (
                <>
                  {hero.title.split(' ').slice(0, 1).join(' ')}{" "}
                  <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
                    {hero.title.split(' ').slice(1, 3).join(' ')}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
                    {hero.title.split(' ').slice(3).join(' ')}
                  </span>
                </>
              ) : (
                <>
                  Precision{" "}
                  <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
                    HDPE & LDPE Bottles
                  </span>
                </>
              )}
              {hero.subtitle && (
                <>
                  <br />
                  <span className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-semibold">
                    {hero.subtitle}
                  </span>
                </>
              )}
            </motion.h1>

            {/* Description - Dynamic from API */}
            <motion.p
              variants={staggerItem}
              className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              {hero.description || 
                "Industry-leading manufacturer of high-quality plastic bottles for pharmaceuticals, chemicals, and industrial applications."}
            </motion.p>

            {/* CTA Buttons - Dynamic from API */}
            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="gradient"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate(hero.ctaButton?.link || "/products")}
              >
                {hero.ctaButton?.text || "Explore Products"}
              </Button>
              {hero.secondaryButton?.text && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate(hero.secondaryButton.link || "/contact")}
                >
                  {hero.secondaryButton.text}
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Image - Use API background image or fallback */}
            <img
              src={hero.backgroundImage?.url || "/product8.jpeg"}
              alt="HDPE LDPE Bottles Collection"
              className="w-full max-w-lg mx-auto rounded-2xl shadow-lg"
              onError={(e) => {
                e.target.src = "/product8.jpeg";
              }}
            />

            {/* Floating Badge - Capacity Range */}
            <motion.div
              className="absolute -top-4 -right-4 sm:top-8 sm:right-0 bg-gradient-to-br from-gradient-from to-gradient-to rounded-xl shadow-xl p-3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">200ml - 5L</div>
                <div className="text-xs text-white/80">Capacity Range</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
