import { useState, useEffect } from 'react';
import { standardsAPI } from '../services/api';
import { Save, Loader2, Plus, Trash2, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';

const ICON_OPTIONS = ['Shield', 'FlaskConical', 'Award', 'Recycle', 'CheckCircle', 'Leaf', 'Factory', 'Package'];

export default function StandardsEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [standards, setStandards] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: res } = await standardsAPI.getAll();
      setStandards(res.data || []);
    } catch (error) {
      toast.error('Failed to load standards');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setStandards([...standards, {
      title: '',
      description: '',
      icon: 'Shield',
      order: standards.length,
      isActive: true,
      _isNew: true
    }]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...standards];
    updated[index] = { ...updated[index], [field]: value };
    setStandards(updated);
  };

  const handleDelete = async (index) => {
    const standard = standards[index];
    if (standard._isNew) {
      setStandards(standards.filter((_, i) => i !== index));
      return;
    }

    if (!confirm('Delete this standard?')) return;

    try {
      await standardsAPI.delete(standard._id);
      setStandards(standards.filter((_, i) => i !== index));
      toast.success('Standard deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const standard of standards) {
        if (standard._isNew) {
          const { _isNew, ...data } = standard;
          await standardsAPI.create(data);
        } else {
          const { _id, ...data } = standard;
          await standardsAPI.update(_id, data);
        }
      }
      toast.success('Standards saved');
      fetchData();
    } catch (error) {
      toast.error('Failed to save');
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
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quality Standards Editor</h1>
          <p className="text-muted-foreground mt-1">Manage quality certifications and standards</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            Add Standard
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {standards.map((standard, index) => (
          <div key={index} className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-start gap-4">
              <GripVertical className="w-5 h-5 text-muted-foreground mt-2 cursor-move" />
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={standard.title}
                      onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      placeholder="ISO 9001:2015"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Icon</label>
                    <select
                      value={standard.icon}
                      onChange={(e) => handleUpdate(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      {ICON_OPTIONS.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={standard.description}
                    onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    placeholder="Describe this standard..."
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={standard.isActive}
                      onChange={(e) => handleUpdate(index, 'isActive', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Active</span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => handleDelete(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {standards.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No standards yet. Click "Add Standard" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
