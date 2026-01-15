// Hero Component - Main Landing Section
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInRight, staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { FloatingBlur, Button } from "../shared";

export default function Hero() {
  const navigate = useNavigate();

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

            {/* Heading */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground"
            >
              Precision{" "}
              <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
                HDPE &
              </span>
              <br />
              <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
                LDPE Bottles
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-semibold">
                200ml to 5L Capacity
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              Industry-leading manufacturer of high-quality plastic bottles for
              pharmaceuticals, chemicals, and industrial applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="gradient"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate("/products")}
              >
                Explore Products
              </Button>
            </motion.div>

            {/* Stats */}
            {/* <motion.div
              variants={staggerItem}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  className="group relative p-4 rounded-xl bg-gradient-to-br from-white/60 via-white/50 to-blue-50/30 dark:from-gray-800/60 dark:via-gray-800/50 dark:to-blue-900/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300" />
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-xl" />
                  </div>

                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div> */}
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Simple Image */}
            <img
              src="/product8.jpeg"
              alt="HDPE LDPE Bottles Collection"
              className="w-full max-w-lg mx-auto rounded-2xl shadow-lg"
            />

            {/* Floating Badge - ISO Certified */}
            {/* <motion.div
              className="absolute -bottom-4 -left-4 sm:bottom-8 sm:left-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800 dark:text-white">ISO Certified</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Quality Assured</div>
                </div>
              </div>
            </motion.div> */}

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
