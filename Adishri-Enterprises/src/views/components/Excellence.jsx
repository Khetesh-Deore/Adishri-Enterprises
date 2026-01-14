// Excellence Component - Manufacturing Excellence Section
import { motion } from "framer-motion";
import { CheckCircle, Factory, Cog, Award } from "lucide-react";
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight } from "../../controllers/useAnimations";
import { SectionHeading, GlassCard } from "../shared";

const excellenceFeatures = [
  {
    icon: Factory,
    title: "State-of-the-art Facility",
    description: "Modern manufacturing unit with advanced blow molding technology"
  },
  {
    icon: Cog,
    title: "Precision Engineering",
    description: "Tight tolerances and consistent quality in every batch"
  },
  {
    icon: Award,
    title: "Quality Certifications",
    description: "ISO 9001:2015, FDA approved, BIS certified facility"
  }
];

const galleryImages = [
  { id: 1, src: "/adishri_logo3.png", alt: "Manufacturing Floor" },
  { id: 2, src: "/adishri_logo3.png", alt: "Quality Control" },
  { id: 3, src: "/adishri_logo3.png", alt: "Blow Molding Machine" },
  { id: 4, src: "/adishri_logo3.png", alt: "Product Testing" }
];

export default function Excellence() {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="About Us"
          title="Excellence in"
          highlight="Industrial Packaging"
          description="With over 15 years of experience, we deliver premium quality HDPE and LDPE bottles that meet the highest industry standards."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-16">
          {/* Image Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={staggerItem}
                className={`relative overflow-hidden rounded-2xl ${
                  index === 0 ? "row-span-2" : ""
                }`}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full object-cover ${
                    index === 0 ? "h-full min-h-[300px]" : "h-40 md:h-48"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium">{image.alt}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Crafting Quality Since{" "}
              <span className="text-blue-600">2009</span>
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Adishri Enterprises has been at the forefront of plastic packaging
              innovation, serving pharmaceutical, chemical, and industrial sectors
              with unwavering commitment to quality and customer satisfaction.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {excellenceFeatures.map((feature, index) => (
                <GlassCard key={index} className="p-4" hover={true}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["FDA Approved", "ISO Certified", "BIS Standards", "GMP Compliant"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {badge}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
