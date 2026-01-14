// Hero Component - Main Landing Section
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { stats } from "../../models/statsData";
import { fadeInRight, staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { useScrollToSection } from "../../controllers/useScroll";
import { AnimatedCounter, FloatingBlur, Button } from "../shared";

export default function Hero() {
  const { scrollToSection } = useScrollToSection();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
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
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                🏭 Premium Industrial Packaging
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-800 dark:text-white"
            >
              Precision{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                HDPE &
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LDPE Bottles
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 dark:text-gray-400 font-semibold">
                200ml to 5L Capacity
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0"
            >
              Industry-leading manufacturer of high-quality plastic bottles for
              pharmaceuticals, chemicals, and industrial applications. ISO certified
              with 15+ years of excellence.
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
                onClick={() => scrollToSection("products")}
              >
                Explore Products
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={Play}
                onClick={() => scrollToSection("about")}
              >
                Watch Process
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
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
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300" />
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-xl" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative group"
          >
            {/* Multi-layer Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20 scale-90 group-hover:opacity-30 group-hover:scale-95 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 scale-75 group-hover:scale-90 transition-all duration-700" />
            
            {/* Animated ring glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 60px rgba(99, 102, 241, 0.4)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Image Container with Enhanced Hover */}
            <motion.div
              className="relative z-10 perspective-1000"
              whileHover={{ 
                scale: 1.08,
                rotate: 2,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Product showcase image */}
              <motion.img
                src="/product1.jpeg"
                alt="HDPE LDPE Bottles Collection"
                className="w-full max-w-lg mx-auto drop-shadow-2xl rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              
              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%", y: "-100%" }}
                whileHover={{ x: "100%", y: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            {/* Floating Badge - ISO Certified */}
            <motion.div
              className="absolute -bottom-4 -left-4 sm:bottom-8 sm:left-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:border-green-200 dark:hover:border-green-800 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.08, y: -2 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-2xl">✓</span>
                </motion.div>
                <div>
                  <div className="font-bold text-gray-800 dark:text-white">ISO Certified</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Quality Assured</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge - Capacity Range */}
            <motion.div
              className="absolute -top-4 -right-4 sm:top-8 sm:right-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-xl p-3 border border-blue-400/50"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: -2 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">200ml - 5L</div>
                <div className="text-xs text-blue-100">Capacity Range</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
