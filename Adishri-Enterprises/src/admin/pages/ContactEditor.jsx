import { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    company: '',
    tagline: '',
    address: { street: '', city: '', state: '', pincode: '', full: '' },
    phone: { primary: '', secondary: '' },
    whatsapp: '',
    email: { primary: '', secondary: '' },
    workingHours: '',
    mapLink: '',
    mapEmbed: '',
    socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '', youtube: '' }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: res } = await contactAPI.get();
      if (res.data) setData(res.data);
    } catch (error) {
      toast.error('Failed to load contact data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await contactAPI.update(data);
      toast.success('Contact info updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const updateNested = (parent, field, value) => {
    setData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
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
          <h1 className="text-2xl font-bold text-foreground">Contact Information</h1>
          <p className="text-muted-foreground mt-1">Update your contact details</p>
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

      {/* Company Info */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Company Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
            <input
              type="text"
              value={data.company}
              onChange={(e) => setData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tagline</label>
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => setData(prev => ({ ...prev, tagline: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
            <input
              type="text"
              value={data.address?.street || ''}
              onChange={(e) => updateNested('address', 'street', e.target.value)}
              placeholder="Plot No B 33/2, Shendra MIDC"
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">City</label>
            <input
              type="text"
              value={data.address?.city || ''}
              onChange={(e) => updateNested('address', 'city', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">State</label>
            <input
              type="text"
              value={data.address?.state || ''}
              onChange={(e) => updateNested('address', 'state', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Pincode</label>
            <input
              type="text"
              value={data.address?.pincode || ''}
              onChange={(e) => updateNested('address', 'pincode', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Contact Numbers */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Contact Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Primary Phone</label>
            <input
              type="text"
              value={data.phone?.primary || ''}
              onChange={(e) => updateNested('phone', 'primary', e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Secondary Phone</label>
            <input
              type="text"
              value={data.phone?.secondary || ''}
              onChange={(e) => updateNested('phone', 'secondary', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">WhatsApp (with country code)</label>
            <input
              type="text"
              value={data.whatsapp || ''}
              onChange={(e) => setData(prev => ({ ...prev, whatsapp: e.target.value }))}
              placeholder="919876543210"
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Email & Hours */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Email & Working Hours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Primary Email</label>
            <input
              type="email"
              value={data.email?.primary || ''}
              onChange={(e) => updateNested('email', 'primary', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Working Hours</label>
            <input
              type="text"
              value={data.workingHours || ''}
              onChange={(e) => setData(prev => ({ ...prev, workingHours: e.target.value }))}
              placeholder="Mon - Sat: 9:00 AM - 6:00 PM"
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Social Media Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['facebook', 'instagram', 'linkedin', 'twitter', 'youtube'].map(platform => (
            <div key={platform}>
              <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                {platform}
              </label>
              <input
                type="url"
                value={data.socialLinks?.[platform] || ''}
                onChange={(e) => updateNested('socialLinks', platform, e.target.value)}
                placeholder={`https://${platform}.com/...`}
                className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Google Maps</h2>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Map Link</label>
          <input
            type="url"
            value={data.mapLink || ''}
            onChange={(e) => setData(prev => ({ ...prev, mapLink: e.target.value }))}
            placeholder="https://maps.google.com/..."
            className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
