// Gallery Page - Product Image Gallery with Optimized Images
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Filter } from 'lucide-react';
import { useGallery } from '../hooks';
import { Skeleton, LazyImage } from '../views/shared';
import { getOptimizedCloudinaryUrl } from '../views/shared/LazyImage';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'products', name: 'Products' },
  { id: 'factory', name: 'Factory' },
  { id: 'team', name: 'Team' },
  { id: 'events', name: 'Events' }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const { images, loading, error } = useGallery({ 
    category: selectedCategory === 'all' ? undefined : selectedCategory 
  });

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="bg-background py-12 md:py-16 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Product <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">Gallery</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of HDPE & LDPE bottles and jerry cans
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Failed to load gallery images</p>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => {
                // Optimize image URLs for thumbnails
                const thumbnailUrl = image.image?.url 
                  ? getOptimizedCloudinaryUrl(image.image.url, { width: 400, quality: 'auto', format: 'auto' })
                  : image.image || '/product1.jpeg';
                
                return (
                  <motion.div
                    key={image._id || index}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-card border border-border cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    {/* Image */}
                    <LazyImage
                      src={thumbnailUrl}
                      alt={image.title || 'Product'}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/product1.jpeg';
                      }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold mb-1 line-clamp-1">
                          {image.title}
                        </h3>
                        {image.caption && (
                          <p className="text-white/80 text-sm line-clamp-2">
                            {image.caption}
                          </p>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No images found in this category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Optimized full-size image for lightbox */}
              <img
                src={selectedImage.image?.url 
                  ? getOptimizedCloudinaryUrl(selectedImage.image.url, { width: 1600, quality: 'auto', format: 'auto' })
                  : selectedImage.image || '/product1.jpeg'}
                alt={selectedImage.title}
                width={1600}
                height={1200}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                loading="eager"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/product1.jpeg';
                }}
              />
              
              {/* Image Info */}
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {selectedImage.title}
                </h3>
                {selectedImage.caption && (
                  <p className="text-white/70">
                    {selectedImage.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
