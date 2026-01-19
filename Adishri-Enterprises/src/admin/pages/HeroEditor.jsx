import { useState, useEffect } from 'react';
import { heroAPI, uploadAPI } from '../services/api';
import { Save, Upload, X, Eye } from 'lucide-react';
import { PageLoader, ButtonSpinner } from '../../views/shared';
import toast from 'react-hot-toast';

export default function HeroEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    description: '',
    backgroundImage: { url: '', publicId: '' },
    ctaButton: { text: 'Get Quote', link: '/contact' },
    secondaryButton: { text: '', link: '' }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: res } = await heroAPI.get();
      if (res.data) setData(res.data);
    } catch (error) {
      toast.error('Failed to load hero data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const { data: res } = await uploadAPI.single(file);
      setData(prev => ({
        ...prev,
        backgroundImage: res.data
      }));
      toast.success('Image uploaded');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!data.title) {
      toast.error('Title is required');
      return;
    }

    setSaving(true);
    try {
      await heroAPI.update(data);
      toast.success('Hero section updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <PageLoader message="Loading hero section..." />;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hero Section</h1>
          <p className="text-muted-foreground mt-1">Edit the main banner of your website</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                     rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {saving ? <ButtonSpinner className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Premium HDPE & LDPE Bottles"
            className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Subtitle</label>
          <input
            type="text"
            value={data.subtitle}
            onChange={(e) => setData(prev => ({ ...prev, subtitle: e.target.value }))}
            placeholder="Quality Packaging Solutions"
            className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Leading manufacturer of high-quality plastic bottles..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Background Image */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Background Image</label>
          <div className="flex items-start gap-4">
            {data.backgroundImage?.url ? (
              <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-border">
                <img 
                  src={data.backgroundImage.url} 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setData(prev => ({ ...prev, backgroundImage: { url: '', publicId: '' } }))}
                  className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="w-40 h-24 border-2 border-dashed border-border rounded-lg 
                               flex flex-col items-center justify-center cursor-pointer
                               hover:border-primary transition-colors">
                {uploading ? (
                  <ButtonSpinner className="w-6 h-6 text-muted-foreground" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">Upload</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Primary Button Text</label>
            <input
              type="text"
              value={data.ctaButton?.text || ''}
              onChange={(e) => setData(prev => ({ 
                ...prev, 
                ctaButton: { ...prev.ctaButton, text: e.target.value } 
              }))}
              placeholder="Get Quote"
              className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                         text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Primary Button Link</label>
            <input
              type="text"
              value={data.ctaButton?.link || ''}
              onChange={(e) => setData(prev => ({ 
                ...prev, 
                ctaButton: { ...prev.ctaButton, link: e.target.value } 
              }))}
              placeholder="/contact"
              className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                         text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
