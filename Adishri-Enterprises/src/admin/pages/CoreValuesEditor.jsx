import { useState, useEffect } from 'react';
import { coreValuesAPI } from '../services/api';
import { Save, Loader2, Plus, Trash2, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';

const ICON_OPTIONS = ['Shield', 'Users', 'Zap', 'Heart', 'Award', 'Target', 'TrendingUp', 'CheckCircle'];
const COLOR_OPTIONS = [
  { label: 'Blue', value: 'from-blue-500 to-blue-600' },
  { label: 'Green', value: 'from-green-500 to-green-600' },
  { label: 'Purple', value: 'from-purple-500 to-purple-600' },
  { label: 'Red', value: 'from-red-500 to-red-600' },
  { label: 'Orange', value: 'from-orange-500 to-orange-600' },
  { label: 'Cyan', value: 'from-cyan-500 to-cyan-600' },
  { label: 'Pink', value: 'from-pink-500 to-pink-600' },
  { label: 'Indigo', value: 'from-indigo-500 to-indigo-600' }
];

export default function CoreValuesEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: res } = await coreValuesAPI.getAll();
      setValues(res.data || []);
    } catch (error) {
      toast.error('Failed to load core values');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setValues([...values, {
      title: '',
      description: '',
      icon: 'Shield',
      color: 'from-blue-500 to-blue-600',
      order: values.length,
      isActive: true,
      _isNew: true
    }]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...values];
    updated[index] = { ...updated[index], [field]: value };
    setValues(updated);
  };

  const handleDelete = async (index) => {
    const value = values[index];
    if (value._isNew) {
      setValues(values.filter((_, i) => i !== index));
      return;
    }

    if (!confirm('Delete this core value?')) return;

    try {
      await coreValuesAPI.delete(value._id);
      setValues(values.filter((_, i) => i !== index));
      toast.success('Core value deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const value of values) {
        if (value._isNew) {
          const { _isNew, ...data } = value;
          await coreValuesAPI.create(data);
        } else {
          const { _id, ...data } = value;
          await coreValuesAPI.update(_id, data);
        }
      }
      toast.success('Core values saved');
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
          <h1 className="text-2xl font-bold text-foreground">Core Values Editor</h1>
          <p className="text-muted-foreground mt-1">Manage company core values</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            Add Value
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
        {values.map((value, index) => (
          <div key={index} className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-start gap-4">
              <GripVertical className="w-5 h-5 text-muted-foreground mt-2 cursor-move" />
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={value.title}
                      onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      placeholder="Quality First"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Icon</label>
                      <select
                        value={value.icon}
                        onChange={(e) => handleUpdate(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      >
                        {ICON_OPTIONS.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Color</label>
                      <select
                        value={value.color}
                        onChange={(e) => handleUpdate(index, 'color', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      >
                        {COLOR_OPTIONS.map(color => (
                          <option key={color.value} value={color.value}>{color.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={value.description}
                    onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    placeholder="Describe this core value..."
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={value.isActive}
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

        {values.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No core values yet. Click "Add Value" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
