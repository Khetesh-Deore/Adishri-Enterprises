import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Save, Loader2, Plus, Trash2, GripVertical } from 'lucide-react';
import api from '../services/api';

const ICON_OPTIONS = [
  { value: 'Target', label: 'Target' },
  { value: 'Rocket', label: 'Rocket' },
  { value: 'Globe', label: 'Globe' },
  { value: 'TrendingUp', label: 'Trending Up' },
  { value: 'Lightbulb', label: 'Lightbulb' },
  { value: 'Award', label: 'Award' },
  { value: 'Users', label: 'Users' },
  { value: 'Shield', label: 'Shield' }
];

export default function VisionEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    subtitle: '',
    title: '',
    highlight: '',
    description: '',
    cards: []
  });

  useEffect(() => {
    fetchVision();
  }, []);

  const fetchVision = async () => {
    try {
      const response = await api.get('/vision');
      setFormData(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch vision content');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await api.put('/vision', formData);
      toast.success('Vision content updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const addCard = () => {
    if (formData.cards.length >= 8) {
      toast.error('Maximum 8 cards allowed');
      return;
    }
    setFormData({
      ...formData,
      cards: [...formData.cards, { icon: 'Target', title: '', description: '' }]
    });
  };

  const removeCard = (index) => {
    if (formData.cards.length <= 1) {
      toast.error('At least one card is required');
      return;
    }
    setFormData({
      ...formData,
      cards: formData.cards.filter((_, i) => i !== index)
    });
  };

  const updateCard = (index, field, value) => {
    const updatedCards = [...formData.cards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setFormData({ ...formData, cards: updatedCards });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vision Section</h1>
          <p className="text-muted-foreground">Edit your company vision and goals</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section Header */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Section Header</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Our Vision"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Highlight Word</label>
              <input
                type="text"
                value={formData.highlight}
                onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Packaging"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Shaping the Future of"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary resize-none"
                placeholder="Section description..."
              />
            </div>
          </div>
        </div>

        {/* Vision Cards */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Vision Cards</h2>
            <button
              type="button"
              onClick={addCard}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
            >
              <Plus className="w-4 h-4" />
              Add Card
            </button>
          </div>

          <div className="space-y-4">
            {formData.cards.map((card, index) => (
              <div key={index} className="p-4 bg-muted/30 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="mt-2 text-muted-foreground cursor-move">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Icon</label>
                      <select
                        value={card.icon}
                        onChange={(e) => updateCard(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary"
                      >
                        {ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => updateCard(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="Card title"
                        required
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                      <textarea
                        value={card.description}
                        onChange={(e) => updateCard(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Card description..."
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCard(index)}
                    className="mt-2 p-2 hover:bg-destructive/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
