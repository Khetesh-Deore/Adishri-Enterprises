import { useState, useEffect } from 'react';
import { aboutAPI, uploadAPI } from '../services/api';
import { Save, Upload, X, Plus, Trash2, Home, Tractor, Beaker, Package } from 'lucide-react';
import { PageLoader, ButtonSpinner } from '../../views/shared';
import toast from 'react-hot-toast';

const iconOptions = [
  { value: 'Home', label: 'Home', icon: Home },
  { value: 'Tractor', label: 'Tractor', icon: Tractor },
  { value: 'Beaker', label: 'Beaker', icon: Beaker },
  { value: 'Package', label: 'Package', icon: Package }
];

const colorOptions = [
  { value: 'from-blue-500 to-blue-600', label: 'Blue' },
  { value: 'from-green-500 to-green-600', label: 'Green' },
  { value: 'from-purple-500 to-purple-600', label: 'Purple' },
  { value: 'from-red-500 to-red-600', label: 'Red' },
  { value: 'from-orange-500 to-orange-600', label: 'Orange' },
  { value: 'from-pink-500 to-pink-600', label: 'Pink' }
];

export default function AboutEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: { url: '', publicId: '' },
    excellenceImages: [],
    mission: { title: 'Our Mission', description: '' },
    vision: { title: 'Our Vision', description: '' },
    stats: [],
    experienceYears: '15',
    aboutText: '',
    facilityText: '',
    capacityStats: [],
    packagingFeatures: [],
    industries: [],
    manufacturingTitle: 'Manufacturing Excellence',
    manufacturingDescription: '',
    manufacturingStats: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: res } = await aboutAPI.get();
      if (res.data) {
        setData({
          ...res.data,
          excellenceImages: res.data.excellenceImages || [],
          manufacturingStats: res.data.manufacturingStats || []
        });
      }
    } catch (error) {
      toast.error('Failed to load about data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data: res } = await uploadAPI.single(file);
      setData(prev => ({ ...prev, image: res.data }));
      toast.success('Image uploaded');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleExcellenceImageUpload = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data: res } = await uploadAPI.single(file);
      setData(prev => ({
        ...prev,
        excellenceImages: prev.excellenceImages.map((img, i) =>
          i === index ? { ...img, url: res.data.url, publicId: res.data.publicId } : img
        )
      }));
      toast.success('Image uploaded');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const addExcellenceImage = () => {
    if (data.excellenceImages.length >= 3) {
      toast.error('Maximum 3 images allowed');
      return;
    }
    setData(prev => ({
      ...prev,
      excellenceImages: [...prev.excellenceImages, { url: '', publicId: '', alt: '' }]
    }));
  };

  const removeExcellenceImage = (index) => {
    setData(prev => ({
      ...prev,
      excellenceImages: prev.excellenceImages.filter((_, i) => i !== index)
    }));
  };

  const updateExcellenceImageAlt = (index, alt) => {
    setData(prev => ({
      ...prev,
      excellenceImages: prev.excellenceImages.map((img, i) =>
        i === index ? { ...img, alt } : img
      )
    }));
  };

  const addStat = () => {
    setData(prev => ({
      ...prev,
      stats: [...(prev.stats || []), { value: '', label: '', suffix: '' }]
    }));
  };

  const updateStat = (index, field, value) => {
    setData(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const removeStat = (index) => {
    setData(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  // Capacity Stats handlers
  const addCapacityStat = () => {
    setData(prev => ({
      ...prev,
      capacityStats: [...(prev.capacityStats || []), { label: '', value: '', suffix: '' }]
    }));
  };

  const updateCapacityStat = (index, field, value) => {
    setData(prev => ({
      ...prev,
      capacityStats: prev.capacityStats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const removeCapacityStat = (index) => {
    setData(prev => ({
      ...prev,
      capacityStats: prev.capacityStats.filter((_, i) => i !== index)
    }));
  };

  // Packaging Features handlers
  const addPackagingFeature = () => {
    setData(prev => ({
      ...prev,
      packagingFeatures: [...(prev.packagingFeatures || []), '']
    }));
  };

  const updatePackagingFeature = (index, value) => {
    setData(prev => ({
      ...prev,
      packagingFeatures: prev.packagingFeatures.map((feature, i) => 
        i === index ? value : feature
      )
    }));
  };

  const removePackagingFeature = (index) => {
    setData(prev => ({
      ...prev,
      packagingFeatures: prev.packagingFeatures.filter((_, i) => i !== index)
    }));
  };

  // Industries handlers
  const addIndustry = () => {
    setData(prev => ({
      ...prev,
      industries: [...(prev.industries || []), { 
        icon: 'Home', 
        name: '', 
        description: '', 
        color: 'from-blue-500 to-blue-600' 
      }]
    }));
  };

  const updateIndustry = (index, field, value) => {
    setData(prev => ({
      ...prev,
      industries: prev.industries.map((industry, i) => 
        i === index ? { ...industry, [field]: value } : industry
      )
    }));
  };

  const removeIndustry = (index) => {
    setData(prev => ({
      ...prev,
      industries: prev.industries.filter((_, i) => i !== index)
    }));
  };

  // Manufacturing Stats handlers
  const addManufacturingStat = () => {
    if (data.manufacturingStats.length >= 4) {
      toast.error('Maximum 4 stats allowed');
      return;
    }
    setData(prev => ({
      ...prev,
      manufacturingStats: [...(prev.manufacturingStats || []), { icon: 'Factory', value: '', label: '' }]
    }));
  };

  const updateManufacturingStat = (index, field, value) => {
    setData(prev => ({
      ...prev,
      manufacturingStats: prev.manufacturingStats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const removeManufacturingStat = (index) => {
    setData(prev => ({
      ...prev,
      manufacturingStats: prev.manufacturingStats.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!data.subtitle || !data.description) {
      toast.error('Page heading and description are required');
      return;
    }

    setSaving(true);
    try {
      await aboutAPI.update(data);
      toast.success('About section updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <PageLoader message="Loading about section..." />;
  }

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">About Section</h1>
          <p className="text-muted-foreground mt-1">Edit your company information and excellence section</p>
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

      {/* Basic Information */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Page Heading <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={data.subtitle}
            onChange={(e) => setData(prev => ({ ...prev, subtitle: e.target.value }))}
            placeholder="Excellence in Plastic Packaging Manufacturing"
            className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            value={data.description}
            onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Based in Chhatrapati Sambhaji Nagar..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Experience Years</label>
          <input
            type="text"
            value={data.experienceYears}
            onChange={(e) => setData(prev => ({ ...prev, experienceYears: e.target.value }))}
            placeholder="15"
            className="w-32 px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">About Text</label>
          <textarea
            value={data.aboutText}
            onChange={(e) => setData(prev => ({ ...prev, aboutText: e.target.value }))}
            placeholder="With over 15 years of experience..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Facility Text</label>
          <textarea
            value={data.facilityText}
            onChange={(e) => setData(prev => ({ ...prev, facilityText: e.target.value }))}
            placeholder="Our state-of-the-art facility..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mission</label>
            <textarea
              value={data.mission?.description || ''}
              onChange={(e) => setData(prev => ({ 
                ...prev, 
                mission: { ...prev.mission, description: e.target.value } 
              }))}
              placeholder="To provide superior quality..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                         text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Vision</label>
            <textarea
              value={data.vision?.description || ''}
              onChange={(e) => setData(prev => ({ 
                ...prev, 
                vision: { ...prev.vision, description: e.target.value } 
              }))}
              placeholder="100% recyclable HDPE & LDPE materials..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                         text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>
      </div>

      {/* Excellence Section Images */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Excellence Section Images</h2>
            <p className="text-sm text-muted-foreground mt-1">Upload up to 3 images for the about section grid (recommended: 3 images)</p>
          </div>
          <button
            onClick={addExcellenceImage}
            disabled={data.excellenceImages?.length >= 3}
            className="flex items-center gap-1 text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" /> Add Image
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.excellenceImages?.map((img, index) => (
            <div key={index} className="relative border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Image {index + 1}</span>
                <button
                  onClick={() => removeExcellenceImage(index)}
                  className="p-1 text-destructive hover:bg-destructive/10 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {img.url ? (
                <div className="relative group">
                  <img
                    src={img.url}
                    alt={img.alt || `Excellence ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center rounded-lg">
                    <Upload className="w-6 h-6 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleExcellenceImageUpload(e, index)}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleExcellenceImageUpload(e, index)}
                    className="hidden"
                  />
                </label>
              )}
              
              <input
                type="text"
                value={img.alt || ''}
                onChange={(e) => updateExcellenceImageAlt(index, e.target.value)}
                placeholder="Image description (alt text)"
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-input text-foreground"
              />
            </div>
          ))}
        </div>
        
        {data.excellenceImages?.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No images added yet. Click "Add Image" to upload excellence section images.</p>
          </div>
        )}
      </div>

      {/* Capacity Statistics */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Capacity Statistics</h2>
          <button
            onClick={addCapacityStat}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Stat
          </button>
        </div>
        <div className="space-y-3">
          {data.capacityStats?.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateCapacityStat(index, 'label', e.target.value)}
                placeholder="Daily Production"
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-input text-foreground"
              />
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateCapacityStat(index, 'value', e.target.value)}
                placeholder="10,000+"
                className="w-32 px-3 py-2 rounded-lg bg-background border border-input text-foreground"
              />
              <input
                type="text"
                value={stat.suffix}
                onChange={(e) => updateCapacityStat(index, 'suffix', e.target.value)}
                placeholder="Units"
                className="w-32 px-3 py-2 rounded-lg bg-background border border-input text-foreground"
              />
              <button
                onClick={() => removeCapacityStat(index)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Packaging Features */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Packaging Features</h2>
          <button
            onClick={addPackagingFeature}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Feature
          </button>
        </div>
        <div className="space-y-3">
          {data.packagingFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={feature}
                onChange={(e) => updatePackagingFeature(index, e.target.value)}
                placeholder="HDPE Bottles (200ml to 5L)"
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-input text-foreground"
              />
              <button
                onClick={() => removePackagingFeature(index)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Industries We Serve</h2>
          <button
            onClick={addIndustry}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Industry
          </button>
        </div>
        <div className="space-y-4">
          {data.industries?.map((industry, index) => (
            <div key={index} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Industry {index + 1}</span>
                <button
                  onClick={() => removeIndustry(index)}
                  className="p-1 text-destructive hover:bg-destructive/10 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Icon</label>
                  <select
                    value={industry.icon}
                    onChange={(e) => updateIndustry(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-input text-foreground"
                  >
                    {iconOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Color</label>
                  <select
                    value={industry.color}
                    onChange={(e) => updateIndustry(index, 'color', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-input text-foreground"
                  >
                    {colorOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={industry.name}
                onChange={(e) => updateIndustry(index, 'name', e.target.value)}
                placeholder="Home Appliances"
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-foreground"
              />
              <textarea
                value={industry.description}
                onChange={(e) => updateIndustry(index, 'description', e.target.value)}
                placeholder="Packaging solutions for household products..."
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-foreground resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Manufacturing Section */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Manufacturing Excellence Banner</h2>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Title</label>
          <input
            type="text"
            value={data.manufacturingTitle}
            onChange={(e) => setData(prev => ({ ...prev, manufacturingTitle: e.target.value }))}
            placeholder="Manufacturing Excellence"
            className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
          <textarea
            value={data.manufacturingDescription}
            onChange={(e) => setData(prev => ({ ...prev, manufacturingDescription: e.target.value }))}
            placeholder="Our advanced facility operates with cutting-edge..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">Banner Statistics (max 4)</label>
            <button
              onClick={addManufacturingStat}
              disabled={data.manufacturingStats?.length >= 4}
              className="flex items-center gap-1 text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" /> Add Stat
            </button>
          </div>
          <div className="space-y-3">
            {data.manufacturingStats?.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <select
                  value={stat.icon}
                  onChange={(e) => updateManufacturingStat(index, 'icon', e.target.value)}
                  className="w-32 px-3 py-2 rounded-lg bg-background border border-input text-foreground"
                >
                  <option value="Factory">Factory</option>
                  <option value="Package">Package</option>
                  <option value="Beaker">Beaker</option>
                  <option value="Tractor">Tractor</option>
                </select>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateManufacturingStat(index, 'value', e.target.value)}
                  placeholder="24/7"
                  className="w-24 px-3 py-2 rounded-lg bg-background border border-input text-foreground"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateManufacturingStat(index, 'label', e.target.value)}
                  placeholder="Production"
                  className="flex-1 px-3 py-2 rounded-lg bg-background border border-input text-foreground"
                />
                <button
                  onClick={() => removeManufacturingStat(index)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
