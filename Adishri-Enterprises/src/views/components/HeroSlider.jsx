// HeroSlider Component - Multi-slide Hero Section with Auto-play and Optimized Images
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button, LazyImage } from '../shared';
import { getOptimizedCloudinaryUrl } from '../shared/LazyImage';
import { useHeroSlider } from '../../hooks/useApi';

export default function HeroSlider() {
  const navigate = useNavigate();
  const { slides: apiSlides, loading } = useHeroSlider();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  // Use API slides or empty array
  const slides = apiSlides.length > 0 ? apiSlides : [];

  // Preload first 2 hero images for instant display
  useEffect(() => {
    if (slides.length === 0) return;

    const preloadImages = slides.slice(0, 2).map(slide => {
      if (!slide.image?.url) return null;
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimizedCloudinaryUrl(slide.image.url, { 
        width: 800, 
        quality: 'auto', 
        format: 'auto' 
      });
      document.head.appendChild(link);
      
      return link;
    }).filter(Boolean);

    // Cleanup
    return () => {
      preloadImages.forEach(link => {
        if (link && link.parentNode) {
          document.head.removeChild(link);
        }
      });
    };
  }, [slides]);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || slides.length === 0) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, slides.length]);

  // Show loading state
  if (loading || slides.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-6 bg-muted rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
      {/* Floating Background Blurs - matching Hero.jsx */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow" />

      {/* Slide Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary-soft rounded-full">
                  {slide.badge}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground mb-4"
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent mb-6"
              >
                {slide.subtitle}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
              >
                {slide.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  variant="gradient"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => navigate(slide.ctaLink)}
                >
                  {slide.ctaText}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate(slide.secondaryLink)}
                >
                  {slide.secondaryText}
                </Button>
              </motion.div>
            </div>

            {/* Right Content - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <LazyImage
                src={slide.image?.url 
                  ? getOptimizedCloudinaryUrl(slide.image.url, { width: 800, quality: 'auto', format: 'auto' })
                  : slide.image || '/product8.jpeg'}
                alt={slide.title}
                width={800}
                height={600}
                className="w-full max-w-lg mx-auto rounded-2xl shadow-lg"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-muted hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-card-hover transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>

              {/* Play/Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-card-hover transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-foreground" />
                ) : (
                  <Play className="w-4 h-4 text-foreground" />
                )}
              </button>

              {/* Next */}
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-card-hover transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
