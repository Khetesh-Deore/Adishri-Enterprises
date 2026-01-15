// ProductCollection Component - Product Showcase with API Integration
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { useProducts } from "../../hooks/useApi";
import { products as staticProducts, categories } from "../../models/productData";
import { staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { SectionHeading, GlassCard, SkeletonProductCard, SkeletonSection } from "../shared";

export default function ProductCollection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const scrollRef = useRef(null);
  const { products: apiProducts, loading } = useProducts();
  const products = apiProducts.length > 0 ? apiProducts : staticProducts;

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => {
        const cat = p.category?.toLowerCase().replace(/\s+/g, '-');
        return cat === activeCategory.toLowerCase();
      });

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return (
      <SkeletonSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonProductCard key={i} />
          ))}
        </div>
      </SkeletonSection>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Our Products"
          title="Premium Bottle"
          highlight="Collection"
          description="Explore our comprehensive range of HDPE and LDPE bottles."
        />

        <div className="flex justify-center gap-3 mt-8 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-foreground hover:bg-muted border border-border"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="relative hidden md:block">
          <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-muted">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-muted">
            <ChevronRight className="w-6 h-6" />
          </button>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: "none" }}>
            {filteredProducts.map((product, i) => (
              <motion.div key={product._id || product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex-shrink-0 w-72 snap-start">
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:hidden">
          {filteredProducts.slice(0, 8).map((product) => (
            <motion.div key={product._id || product.id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const imageUrl = product.image?.url || product.image || "/adishri_logo3.png";
  const catLabel = product.category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const features = product.features || [];
  const specs = product.specifications || product.specs || {};
  const neckSize = specs.neckSize || specs.find?.(s => s.key === 'Neck Size')?.value || '-';
  const weight = specs.weight || specs.find?.(s => s.key === 'Weight')?.value || '-';

  return (
    <GlassCard className="overflow-hidden h-full" hover={true}>
      <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden group">
        <img src={imageUrl} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform" onError={(e) => { e.target.src = "/adishri_logo3.png"; }} />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-lg capitalize">{catLabel}</span>
        {product.isFeatured && <span className="absolute top-3 right-3 px-2 py-1 text-xs bg-accent text-accent-foreground rounded-lg">Featured</span>}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-foreground line-clamp-1">{product.name}</h3>
          {product.capacity && <span className="text-sm font-semibold text-primary whitespace-nowrap">{product.capacity}</span>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.shortDescription || product.description}</p>
        {features.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {features.slice(0, 3).map((f, i) => <span key={i} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">{f}</span>)}
          </div>
        )}
        {(neckSize !== '-' || weight !== '-') && (
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2 text-xs">
            <div><span className="text-muted-foreground">Neck:</span> <span className="text-foreground">{neckSize}</span></div>
            <div><span className="text-muted-foreground">Weight:</span> <span className="text-foreground">{weight}</span></div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
