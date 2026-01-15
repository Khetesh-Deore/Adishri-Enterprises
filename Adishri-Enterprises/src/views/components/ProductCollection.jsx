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
    <section id="products" className="py-20 md:py-28 bg-background relative overflow-hidden">
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
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-foreground hover:bg-muted border border-border"
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
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center text-foreground hover:bg-muted transition-colors hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center text-foreground hover:bg-muted transition-colors hidden md:flex"
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
      <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden group">
        <img
          src={product.image || "/adishri_logo3.png"}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-lg">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-foreground">
            {product.name}
          </h3>
          <span className="text-sm font-semibold text-primary whitespace-nowrap">
            {product.capacity}
          </span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Features */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.features.slice(0, 3).map((feature, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Specs Preview */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Neck:</span>
              <span className="ml-1 text-foreground">
                {product.specs.neckSize}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Weight:</span>
              <span className="ml-1 text-foreground">
                {product.specs.weight}
              </span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
