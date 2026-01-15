import { useState, useEffect } from 'react';
import { settingsAPI, uploadAPI } from '../services/api';
import { Save, Loader2, Upload, X, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({ logo: false, favicon: false });
  const [data, setData] = useState({
    siteName: '',
    tagline: '',
    logo: { url: '', publicId: '' },
    favicon: { url: '', publicId: '' },
    footerText: '',
    copyrightText: '',
    credentials: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  });
  const [newCredential, setNewCredential] = useState({ name: '', description: '' });
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: res } = await settingsAPI.get();
      if (res.data) setData(res.data);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    setUploading(prev => ({ ...prev, [type]: true }));
    try {
      const { data: res } = await uploadAPI.single(file);
      setData(prev => ({ ...prev, [type]: res.data }));
      toast.success(`${type === 'logo' ? 'Logo' : 'Favicon'} uploaded`);
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const addCredential = () => {
    if (newCredential.name.trim()) {
      setData(prev => ({
        ...prev,
        credentials: [...(prev.credentials || []), { ...newCredential }]
      }));
      setNewCredential({ name: '', description: '' });
    }
  };

  const removeCredential = (index) => {
    setData(prev => ({
      ...prev,
      credentials: prev.credentials.filter((_, i) => i !== index)
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      setData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...(prev.seo?.keywords || []), newKeyword.trim()]
        }
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (index) => {
    setData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsAPI.update(data);
      toast.success('Settings updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your website settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                     rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Site Name</label>
            <input
              type="text"
              value={data.siteName}
              onChange={(e) => setData(prev => ({ ...prev, siteName: e.target.value }))}
              placeholder="Adishri Enterprises"
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tagline</label>
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => setData(prev => ({ ...prev, tagline: e.target.value }))}
              placeholder="Premium HDPE & LDPE Bottles"
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Logo & Favicon */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Branding</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Logo</label>
            <div className="flex items-start gap-4">
              {data.logo?.url ? (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border bg-white p-2">
                  <img src={data.logo.url} alt="Logo" className="w-full h-full object-contain" />
                  <button
                    onClick={() => setData(prev => ({ ...prev, logo: { url: '', publicId: '' } }))}
                    className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="w-24 h-24 border-2 border-dashed border-border rounded-lg 
                                 flex flex-col items-center justify-center cursor-pointer
                                 hover:border-primary transition-colors">
                  {uploading.logo ? (
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground mt-1">Logo</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Favicon */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Favicon</label>
            <div className="flex items-start gap-4">
              {data.favicon?.url ? (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border bg-white p-1">
                  <img src={data.favicon.url} alt="Favicon" className="w-full h-full object-contain" />
                  <button
                    onClick={() => setData(prev => ({ ...prev, favicon: { url: '', publicId: '' } }))}
                    className="absolute -top-1 -right-1 p-1 bg-destructive text-white rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="w-16 h-16 border-2 border-dashed border-border rounded-lg 
                                 flex flex-col items-center justify-center cursor-pointer
                                 hover:border-primary transition-colors">
                  {uploading.favicon ? (
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  ) : (
                    <Upload className="w-4 h-4 text-muted-foreground" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'favicon')}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Footer Content</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Footer Text</label>
            <textarea
              value={data.footerText}
              onChange={(e) => setData(prev => ({ ...prev, footerText: e.target.value }))}
              placeholder="Quality packaging solutions since 2008"
              rows={2}
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Copyright Text</label>
            <input
              type="text"
              value={data.copyrightText}
              onChange={(e) => setData(prev => ({ ...prev, copyrightText: e.target.value }))}
              placeholder="© 2024 Adishri Enterprises. All rights reserved."
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Credentials */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Credentials & Certifications</h2>
        </div>
        
        {/* Add new credential */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newCredential.name}
            onChange={(e) => setNewCredential(prev => ({ ...prev, name: e.target.value }))}
            placeholder="ISO 9001:2015"
            className="flex-1 px-4 py-2 rounded-lg bg-background border border-input text-foreground"
          />
          <input
            type="text"
            value={newCredential.description}
            onChange={(e) => setNewCredential(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Quality Management"
            className="flex-1 px-4 py-2 rounded-lg bg-background border border-input text-foreground"
          />
          <button
            onClick={addCredential}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Credentials list */}
        <div className="space-y-2">
          {data.credentials?.map((cred, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">{cred.name}</p>
                {cred.description && (
                  <p className="text-sm text-muted-foreground">{cred.description}</p>
                )}
              </div>
              <button
                onClick={() => removeCredential(index)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">SEO Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Meta Title</label>
            <input
              type="text"
              value={data.seo?.metaTitle || ''}
              onChange={(e) => setData(prev => ({ 
                ...prev, 
                seo: { ...prev.seo, metaTitle: e.target.value } 
              }))}
              placeholder="Adishri Enterprises - HDPE & LDPE Bottle Manufacturer"
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Meta Description</label>
            <textarea
              value={data.seo?.metaDescription || ''}
              onChange={(e) => setData(prev => ({ 
                ...prev, 
                seo: { ...prev.seo, metaDescription: e.target.value } 
              }))}
              placeholder="Leading manufacturer of HDPE & LDPE bottles..."
              rows={2}
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Keywords</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                placeholder="Add keyword..."
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-input text-foreground"
              />
              <button
                onClick={addKeyword}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.seo?.keywords?.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                >
                  {keyword}
                  <button onClick={() => removeKeyword(index)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
