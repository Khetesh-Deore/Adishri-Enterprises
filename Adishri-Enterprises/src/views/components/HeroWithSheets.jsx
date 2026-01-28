// Example: Hero Component with Google Sheets CMS Integration
import { useGoogleSheets } from '../../hooks/useGoogleSheets';
import { PageLoader } from '../shared';

export default function HeroWithSheets() {
  const { data, loading, error } = useGoogleSheets('Hero', {
    autoRefresh: true, // Auto-refresh every 5 minutes
    refreshInterval: 5 * 60 * 1000,
    fallbackData: {
      title: 'Future of Packaging',
      subtitle: 'Innovation in Every Bottle',
      description: 'Leading manufacturer of premium HDPE & LDPE bottles',
      ctaText: 'Explore Products',
      ctaLink: '/products',
      badge: '🚀 Innovation Leader'
    }
  });

  if (loading) {
    return <PageLoader message="Loading hero content..." />;
  }

  if (error) {
    console.error('Hero error:', error);
    // Still render with fallback data
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Background Image */}
      {data?.heroImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImage}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {data?.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6 animate-fade-in">
              {data.badge}
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-slide-up">
            {data?.title || 'Welcome'}
          </h1>

          {/* Subtitle */}
          {data?.subtitle && (
            <h2 className="text-2xl md:text-3xl text-primary font-semibold mb-6 animate-slide-up animation-delay-100">
              {data.subtitle}
            </h2>
          )}

          {/* Description */}
          {data?.description && (
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-200">
              {data.description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up animation-delay-300">
            {data?.ctaText && data?.ctaLink && (
              <a
                href={data.ctaLink}
                className="px-8 py-4 bg-gradient-to-r from-gradient-from to-gradient-to text-white rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                {data.ctaText}
              </a>
            )}
            
            {data?.secondaryText && data?.secondaryLink && (
              <a
                href={data.secondaryLink}
                className="px-8 py-4 bg-card border-2 border-border text-foreground rounded-lg font-semibold hover:border-primary transition-all"
              >
                {data.secondaryText}
              </a>
            )}
          </div>

          {/* Live Update Indicator (Dev Mode) */}
          {import.meta.env.DEV && (
            <div className="mt-8 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live from Google Sheets
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
}
