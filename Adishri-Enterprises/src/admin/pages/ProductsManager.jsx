import { useState, useEffect } from 'react';
import { productsAPI, uploadAPI } from '../services/api';
import { Plus, Edit2, Trash2, Loader2, X, Upload, Save, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = [
  { value: 'hdpe-bottles', label: 'HDPE Bottles' },
  { value: 'ldpe-bottles', label: 'LDPE Bottles' },
  { value: 'jerry-cans', label: 'Jerry Cans' },
  { value: 'caps-closures', label: 'Caps & Closures' },
  { value: 'custom-moulded', label: 'Custom Moulded' }
];

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await productsAPI.getAll({ active: 'all' });
      setProducts(data.data || []);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productsAPI.delete(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success('Product deleted');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const openModal = (product = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filterCategory || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">{products.length} products</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                     rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-input 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-background border border-input text-foreground"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product._id} className="bg-card rounded-xl border border-border overflow-hidden group">
            <div className="aspect-square bg-muted relative">
              {product.image?.url ? (
                <img src={product.image.url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                              transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => openModal(product)}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100"
                >
                  <Edit2 className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-foreground truncate">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {categories.find(c => c.value === product.category)?.label || product.category}
              </p>
              {product.capacity && (
                <p className="text-xs text-primary mt-1">{product.capacity}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No products found
        </div>
      )}

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={closeModal}
          onSave={() => {
            closeModal();
            fetchProducts();
          }}
        />
      )}
    </div>
  );
}

function ProductModal({ product, onClose, onSave }) {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    category: product?.category || 'hdpe-bottles',
    capacity: product?.capacity || '',
    image: product?.image || { url: '', publicId: '' },
    features: product?.features || [],
    isFeatured: product?.isFeatured || false,
    isActive: product?.isActive ?? true
  });
  const [newFeature, setNewFeature] = useState('');

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

  const addFeature = () => {
    if (newFeature.trim()) {
      setData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    if (!data.name || !data.description) {
      toast.error('Name and description are required');
      return;
    }

    setSaving(true);
    try {
      if (product?._id) {
        await productsAPI.update(product._id, data);
        toast.success('Product updated');
      } else {
        await productsAPI.create(data);
        toast.success('Product created');
      }
      onSave();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Product Image</label>
            <div className="flex items-start gap-4">
              {data.image?.url ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                  <img src={data.image.url} alt="Product" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setData(prev => ({ ...prev, image: { url: '', publicId: '' } }))}
                    className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="w-32 h-32 border-2 border-dashed border-border rounded-lg 
                                 flex flex-col items-center justify-center cursor-pointer
                                 hover:border-primary transition-colors">
                  {uploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
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

          {/* Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="500ml HDPE Bottle"
                className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <select
                value={data.category}
                onChange={(e) => setData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Capacity</label>
            <input
              type="text"
              value={data.capacity}
              onChange={(e) => setData(prev => ({ ...prev, capacity: e.target.value }))}
              placeholder="500ml, 1L, 5L"
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              value={data.description}
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Product description..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground resize-none"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Features</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="Add feature..."
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-input text-foreground"
              />
              <button
                onClick={addFeature}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                >
                  {feature}
                  <button onClick={() => removeFeature(index)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.isFeatured}
                onChange={(e) => setData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 rounded border-input"
              />
              <span className="text-sm text-foreground">Featured Product</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.isActive}
                onChange={(e) => setData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 rounded border-input"
              />
              <span className="text-sm text-foreground">Active</span>
            </label>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                       rounded-lg hover:bg-primary-hover disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {product ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
