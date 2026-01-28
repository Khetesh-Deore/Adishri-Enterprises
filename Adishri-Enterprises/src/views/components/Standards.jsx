// Standards Component - Quality Standards Section (Static Data)
import { motion } from "framer-motion";
import { Shield, CheckCircle, Award, Leaf, Recycle, FlaskConical, Factory, Package } from "lucide-react";
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { FloatingBlur } from "../shared";

// Static standards data
const standardFeatures = [
  {
    icon: Shield,
    title: "ISO 9001:2015 Certified",
    description: "International quality management standards"
  },
  {
    icon: FlaskConical,
    title: "FDA Approved",
    description: "Food-grade safe materials for packaging"
  },
  {
    icon: Award,
    title: "BIS Certified",
    description: "Bureau of Indian Standards compliance"
  },
  {
    icon: Recycle,
    title: "100% Recyclable",
    description: "Eco-friendly HDPE & LDPE materials"
  }
];

export default function Standards() {

  return (
    <section
      id="standards"
      className="
    py-20 md:py-28
    bg-black
    text-white
    relative overflow-hidden
  "
    >

      {/* Background Effects */}
      <FloatingBlur color="blue" position="top-0 left-0" size="w-96 h-96" opacity="opacity-10" />
      <FloatingBlur color="indigo" position="bottom-0 right-0" size="w-80 h-80" opacity="opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-300 bg-blue-500/20 rounded-full">
              Quality Assurance
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Setting Standards in{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Quality Packaging
              </span>
            </h2>

            <p className="mt-6 text-lg text-blue-100/80 leading-relaxed">
              Our commitment to quality goes beyond manufacturing. We adhere to
              international standards and certifications to ensure every bottle
              meets the highest benchmarks of safety and performance.
            </p>

            {/* Features Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid sm:grid-cols-2 gap-4"
            >
              {standardFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-blue-200/70 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-3xl opacity-20 scale-90" />

            {/* Main Image */}
            <motion.div
              className="relative z-10 rounded-3xl overflow-hidden"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/adishri_logo3.png"
                alt="Quality Standards"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              className="absolute top-4 right-4 bg-white rounded-xl shadow-xl p-3"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-semibold text-gray-800">
                  100% Quality Tested
                </span>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-4 bg-white rounded-xl shadow-xl p-3"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-500" />
                <span className="text-sm font-semibold text-gray-800">
                  Eco-Friendly
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
