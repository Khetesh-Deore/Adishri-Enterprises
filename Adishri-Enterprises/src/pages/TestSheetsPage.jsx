// Test Page - Shows all Google Sheets data in action
import { useHero, useAbout, useProducts, useContact, useVision, useCoreValues, useGallery, useHeroSlider } from '../hooks/useApi';
import { PageLoader } from '../views/shared';

export default function TestSheetsPage() {
  const { data: hero, loading: heroLoading } = useHero();
  const { data: about, loading: aboutLoading } = useAbout();
  const { products, loading: productsLoading } = useProducts();
  const { data: contact, loading: contactLoading } = useContact();
  const { data: vision, loading: visionLoading } = useVision();
  const { coreValues, loading: valuesLoading } = useCoreValues();
  const { images, loading: galleryLoading } = useGallery();
  const { slides, loading: slidesLoading } = useHeroSlider();

  const loading = heroLoading || aboutLoading || productsLoading || contactLoading || 
                  visionLoading || valuesLoading || galleryLoading || slidesLoading;

  if (loading) {
    return <PageLoader message="Loading all Google Sheets data..." />;
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          🎨 Google Sheets CMS - All Data
        </h1>
        <p className="text-muted-foreground mb-12">
          This page displays all content from your Google Sheets
        </p>

        {/* Hero Slider Data */}
        <section className="mb-12 bg-card rounded-lg p-6 border border-border">
          <h2 className="text-2xl font-bold text-primary mb-4">Hero Slider ({slides.length} slides)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {slides.map((slide, index) => (
              <div key={index} className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">{slide.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{slide.subtitle}</p>
                <p className="text-xs text-muted-foreground mb-2">{slide.description}</p>
                {slide.image?.url && (
                  <img src={slide.image.url} alt={slide.title} className="w-full h-32 object-cover rounded mt-2" />
                )}
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{slide.badge}</span>
                  <span className="text-xs bg-blue-500/10 text-blue-600 px-2 py-1 rounded">{slide.ctaText}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hero Data */}
        {hero && (
          <section className="mb-12 bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">Hero Section</h2>
            <div className="space-y-2">
              <p><strong>Title:</strong> {hero.title}</p>
              <p><strong>Subtitle:</strong> {hero.subtitle}</p>
              <p><strong>Description:</strong> {hero.description}</p>
            </div>
          </section>
        )}

        {/* About Data */}
        {about && (
          <section className="mb-12 bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">About Section</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">{about.title}</h3>
                <p className="text-sm text-muted-foreground">{about.subtitle}</p>
                <p className="text-sm text-muted-foreground mt-2">{about.description}</p>
              </div>
              {about.mission && (
                <div className="bg-muted p-4 rounded">
                  <h4 className="font-semibold text-foreground">{about.mission.title || about.missionTitle}</h4>
                  <p className="text-sm text-muted-foreground">{about.mission.description || about.missionDescription}</p>
                </div>
              )}
              {about.vision && (
                <div className="bg-muted p-4 rounded">
                  <h4 className="font-semibold text-foreground">{about.vision.title || about.visionTitle}</h4>
                  <p className="text-sm text-muted-foreground">{about.vision.description || about.visionDescription}</p>
                </div>
              )}
              {about.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {about.stats.map((stat, index) => (
                    <div key={index} className="bg-primary/10 p-3 rounded text-center">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Products Data */}
        <section className="mb-12 bg-card rounded-lg p-6 border border-border">
          <h2 className="text-2xl font-bold text-primary mb-4">Products ({products.length})</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-muted p-4 rounded-lg">
                {product.image?.url && (
                  <img src={product.image.url} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
                )}
                <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-blue-500/10 text-blue-600 px-2 py-1 rounded">{product.category}</span>
                  <span className="text-xs font-semibold text-primary">{product.price}</span>
                </div>
                {product.features && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Data */}
        {contact && (
          <section className="mb-12 bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p><strong>Email:</strong> {contact.email?.primary}</p>
                <p><strong>Phone:</strong> {contact.phone?.primary}</p>
                <p><strong>WhatsApp:</strong> {contact.whatsapp}</p>
                <p><strong>Working Hours:</strong> {contact.workingHours}</p>
              </div>
              <div className="space-y-2">
                <p><strong>Address:</strong> {contact.address?.full}</p>
                {contact.socialLinks && (
                  <div className="flex gap-2 mt-4">
                    {contact.socialLinks.facebook && (
                      <a href={contact.socialLinks.facebook} className="text-blue-600 hover:underline text-sm">Facebook</a>
                    )}
                    {contact.socialLinks.instagram && (
                      <a href={contact.socialLinks.instagram} className="text-pink-600 hover:underline text-sm">Instagram</a>
                    )}
                    {contact.socialLinks.linkedin && (
                      <a href={contact.socialLinks.linkedin} className="text-blue-700 hover:underline text-sm">LinkedIn</a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Vision Data */}
        {vision && (
          <section className="mb-12 bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">Vision & Mission</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted p-4 rounded">
                <h3 className="font-semibold text-foreground mb-2">{vision.visionTitle}</h3>
                <p className="text-sm text-muted-foreground">{vision.visionDescription}</p>
              </div>
              <div className="bg-muted p-4 rounded">
                <h3 className="font-semibold text-foreground mb-2">{vision.missionTitle}</h3>
                <p className="text-sm text-muted-foreground">{vision.missionDescription}</p>
              </div>
            </div>
          </section>
        )}

        {/* Core Values Data */}
        <section className="mb-12 bg-card rounded-lg p-6 border border-border">
          <h2 className="text-2xl font-bold text-primary mb-4">Core Values ({coreValues.length})</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {coreValues.map((value) => (
              <div key={value.id} className="bg-muted p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">{value.icon}</div>
                <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                <p className="text-xs text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Data */}
        <section className="mb-12 bg-card rounded-lg p-6 border border-border">
          <h2 className="text-2xl font-bold text-primary mb-4">Gallery ({images.length} images)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="bg-muted rounded-lg overflow-hidden">
                <img src={image.url} alt={image.title} className="w-full h-32 object-cover" />
                <div className="p-2">
                  <p className="text-xs font-semibold text-foreground">{image.title}</p>
                  <p className="text-xs text-muted-foreground">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Success Message */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
            ✅ All Data Loaded from Google Sheets!
          </h3>
          <p className="text-green-800 dark:text-green-200">
            Your website is now powered by Google Sheets CMS. Edit the sheet to update content instantly!
          </p>
        </div>
      </div>
    </div>
  );
}
