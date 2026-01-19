import { useState, useEffect } from 'react';
import { heroSliderAPI } from '../services/api';
import { Save, Plus, Trash2, GripVertical, Upload, X, Presentation } from 'lucide-react';
import { PageLoader, ButtonSpinner } from '../../views/shared';
import toast from 'react-hot-toast';

export default function HeroSliderEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slides, setSlides] = useState([]);
  const [imagePreview, setImagePreview] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: res } = await heroSliderAPI.getAll();
      setSlides(res.data || []);
    } catch (error) {
      toast.error('Failed to load hero slides');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSlides([...slides, {
      title: '',
      subtitle: '',
      description: '',
      ctaText: 'Learn More',
      ctaLink: '/products',
      secondaryText: 'Contact Us',
      secondaryLink: '/contact',
      badge: '🚀 New',
      order: slides.length,
      isActive: true,
      _isNew: true
    }]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
  };

  const handleImageChange = (index, file) => {
    if (file) {
      const updated = [...slides];
      updated[index] = { ...updated[index], image: file };
      setSlides(updated);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview({ ...imagePreview, [index]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (index) => {
    const slide = slides[index];
    if (slide._isNew) {
      setSlides(slides.filter((_, i) => i !== index));
      return;
    }

    if (!confirm('Are you sure you want to delete this slide?')) return;

    try {
      await heroSliderAPI.delete(slide._id);
      toast.success('Slide deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete slide');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const slide of slides) {
        // Skip empty new slides
        if (slide._isNew && (!slide.title || !slide.subtitle || !slide.description || !slide.image)) {
          continue;
        }
        
        if (slide._isNew) {
          await heroSliderAPI.create(slide);
        } else {
          await heroSliderAPI.update(slide._id, slide);
        }
      }
      toast.success('Hero slides saved successfully');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save hero slides');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const moveSlide = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= slides.length) return;

    const updated = [...slides];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updated.forEach((slide, i) => slide.order = i);
    setSlides(updated);
  };

  if (loading) {
    return <PageLoader message="Loading hero slides..." />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">Hero Slider Editor</h1>
            {slides.length > 0 && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                {slides.filter(s => s.isActive).length} Active
              </span>
            )}
          </div>
          <p className="text-muted-foreground mt-1">Manage homepage hero slider content</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Slide
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-gradient-to-r from-gradient-from to-gradient-to text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <ButtonSpinner className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {slides.map((slide, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveSlide(index, -1)}
                    disabled={index === 0}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30"
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSlide(index, 1)}
                    disabled={index === slides.length - 1}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30"
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Slide {index + 1}
                </h3>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Future of Packaging"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Subtitle *
                  </label>
                  <input
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => handleUpdate(index, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Innovation in Every Bottle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description *
                  </label>
                  <textarea
                    value={slide.description}
                    onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Leading manufacturer of premium HDPE & LDPE bottles..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Badge *
                  </label>
                  <input
                    type="text"
                    value={slide.badge}
                    onChange={(e) => handleUpdate(index, 'badge', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="🚀 Innovation Leader"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Image *
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4">
                    {(imagePreview[index] || slide.image?.url) ? (
                      <div className="relative">
                        <img
                          src={imagePreview[index] || slide.image?.url}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            handleUpdate(index, 'image', null);
                            setImagePreview({ ...imagePreview, [index]: null });
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(index, e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Primary CTA Text
                    </label>
                    <input
                      type="text"
                      value={slide.ctaText}
                      onChange={(e) => handleUpdate(index, 'ctaText', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Primary CTA Link
                    </label>
                    <input
                      type="text"
                      value={slide.ctaLink}
                      onChange={(e) => handleUpdate(index, 'ctaLink', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Secondary CTA Text
                    </label>
                    <input
                      type="text"
                      value={slide.secondaryText}
                      onChange={(e) => handleUpdate(index, 'secondaryText', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Secondary CTA Link
                    </label>
                    <input
                      type="text"
                      value={slide.secondaryLink}
                      onChange={(e) => handleUpdate(index, 'secondaryLink', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`active-${index}`}
                    checked={slide.isActive}
                    onChange={(e) => handleUpdate(index, 'isActive', e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label htmlFor={`active-${index}`} className="text-sm text-foreground">
                    Active
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}

        {slides.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <div className="mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Presentation className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Slides Yet</h3>
              <p className="text-muted-foreground mb-4">Create your first hero slider to showcase your products and services</p>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-gradient-from to-gradient-to text-white rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add First Slide
            </button>
          </div>
        )}

        {slides.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Tips for Great Slides
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Use high-quality images (recommended: 1200x800px)</li>
                  <li>• Keep titles short and impactful (3-5 words)</li>
                  <li>• Limit to 3-5 slides for best user experience</li>
                  <li>• Use emojis in badges to make them more engaging</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Quick Add Button - Floating */}
        {slides.length > 0 && slides.length < 10 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-white dark:bg-card border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary/5 transition-all inline-flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Another Slide
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
