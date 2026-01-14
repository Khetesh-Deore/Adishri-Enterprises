// ProductCollection Component - Product Showcase Section
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { products, categories } from "../../models/productData";
import { staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { SectionHeading, GlassCard } from "../shared";

export default function ProductCollection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const scrollRef = useRef(null);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="products" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Our Products"
          title="Premium Bottle"
          highlight="Collection"
          description="Explore our comprehensive range of HDPE and LDPE bottles designed for diverse industrial applications."
        />

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mt-8 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Products Scroll Container */}
          <motion.div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-72 snap-start"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Product Grid for Mobile */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:hidden"
        >
          {filteredProducts.slice(0, 6).map((product) => (
            <motion.div key={product.id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Product Card Component
function ProductCard({ product }) {
  return (
    <GlassCard className="overflow-hidden h-full" hover={true}>
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 overflow-hidden group">
        <img
          src={product.image || "/adishri_logo3.png"}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-800 dark:text-white">
            {product.name}
          </h3>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
            {product.capacity}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {product.description}
        </p>

        {/* Features */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.features.slice(0, 3).map((feature, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Specs Preview */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500 dark:text-gray-500">Neck:</span>
              <span className="ml-1 text-gray-700 dark:text-gray-300">
                {product.specs.neckSize}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-500">Weight:</span>
              <span className="ml-1 text-gray-700 dark:text-gray-300">
                {product.specs.weight}
              </span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
