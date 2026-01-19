import { useState, useEffect } from 'react';
import { aboutAPI, uploadAPI } from '../services/api';
import { Save, Upload, X, Plus, Trash2 } from 'lucide-react';
import { PageLoader, ButtonSpinner } from '../../views/shared';
import toast from 'react-hot-toast';

export default function AboutEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: { url: '', publicId: '' },
    mission: { title: 'Our Mission', description: '' },
    vision: { title: 'Our Vision', description: '' },
    stats: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: res } = await aboutAPI.get();
      if (res.data) setData(res.data);
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

  const handleSave = async () => {
    if (!data.title || !data.description) {
      toast.error('Title and description are required');
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
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">About Section</h1>
          <p className="text-muted-foreground mt-1">Edit your company information</p>
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
        {/* Title & Subtitle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="About Adishri Enterprises"
              className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                         text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Subtitle</label>
            <input
              type="text"
              value={data.subtitle}
              onChange={(e) => setData(prev => ({ ...prev, subtitle: e.target.value }))}
              placeholder="Excellence in Plastic Packaging"
              className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                         text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            value={data.description}
            onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="With over 15 years of experience..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">About Image</label>
          <div className="flex items-start gap-4">
            {data.image?.url ? (
              <div className="relative w-40 h-28 rounded-lg overflow-hidden border border-border">
                <img src={data.image.url} alt="About" className="w-full h-full object-cover" />
                <button
                  onClick={() => setData(prev => ({ ...prev, image: { url: '', publicId: '' } }))}
                  className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="w-40 h-28 border-2 border-dashed border-border rounded-lg 
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
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Mission & Vision */}
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
              placeholder="To become India's most trusted..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-background border border-input 
                         text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>

        {/* Stats */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">Statistics</label>
            <button
              onClick={addStat}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Plus className="w-4 h-4" /> Add Stat
            </button>
          </div>
          <div className="space-y-3">
            {data.stats?.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(index, 'value', e.target.value)}
                  placeholder="15+"
                  className="w-24 px-3 py-2 rounded-lg bg-background border border-input text-foreground"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  placeholder="Years Experience"
                  className="flex-1 px-3 py-2 rounded-lg bg-background border border-input text-foreground"
                />
                <button
                  onClick={() => removeStat(index)}
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
