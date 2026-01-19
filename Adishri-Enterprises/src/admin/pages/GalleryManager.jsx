import { useState, useEffect } from 'react';
import { galleryAPI, uploadAPI } from '../services/api';
import { Upload, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { PageLoader, ButtonSpinner } from '../../views/shared';
import toast from 'react-hot-toast';

const galleryCategories = [
  { value: 'products', label: 'Products' },
  { value: 'factory', label: 'Factory' },
  { value: 'team', label: 'Team' },
  { value: 'events', label: 'Events' },
  { value: 'general', label: 'General' }
];

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, [filterCategory]);

  const fetchImages = async () => {
    try {
      const params = filterCategory ? { category: filterCategory } : {};
      const { data } = await galleryAPI.getAll(params);
      setImages(data.data || []);
    } catch (error) {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('category', filterCategory || 'general');
        
        await galleryAPI.add(formData);
        successCount++;
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} image(s) uploaded`);
      fetchImages();
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;

    try {
      await galleryAPI.delete(id);
      setImages(prev => prev.filter(img => img._id !== id));
      toast.success('Image deleted');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) return;
    if (!confirm(`Delete ${selectedImages.length} selected images?`)) return;

    try {
      await Promise.all(selectedImages.map(id => galleryAPI.delete(id)));
      setImages(prev => prev.filter(img => !selectedImages.includes(img._id)));
      setSelectedImages([]);
      toast.success('Images deleted');
    } catch (error) {
      toast.error('Failed to delete some images');
    }
  };

  const toggleSelect = (id) => {
    setSelectedImages(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(images.map(img => img._id));
    }
  };

  if (loading) {
    return <PageLoader message="Loading gallery..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gallery</h1>
          <p className="text-muted-foreground mt-1">{images.length} images</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedImages.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-destructive text-white 
                         rounded-lg hover:bg-destructive/90 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedImages.length})
            </button>
          )}
          <label className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                           rounded-lg hover:bg-primary-hover transition-colors cursor-pointer">
            {uploading ? (
              <ButtonSpinner className="w-4 h-4" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Upload Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-background border border-input text-foreground"
        >
          <option value="">All Categories</option>
          {galleryCategories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        {images.length > 0 && (
          <button
            onClick={selectAll}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm"
          >
            {selectedImages.length === images.length ? 'Deselect All' : 'Select All'}
          </button>
        )}
      </div>

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {images.map(image => (
            <div
              key={image._id}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 
                         transition-all cursor-pointer group
                         ${selectedImages.includes(image._id) 
                           ? 'border-primary ring-2 ring-primary/30' 
                           : 'border-border hover:border-primary/50'}`}
              onClick={() => toggleSelect(image._id)}
            >
              <img
                src={image.image?.url}
                alt={image.title || 'Gallery image'}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                              transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewImage(image);
                  }}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100"
                >
                  <ImageIcon className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(image._id);
                  }}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>

              {/* Selection indicator */}
              <div className={`absolute top-2 left-2 w-5 h-5 rounded-full border-2 
                              flex items-center justify-center transition-colors
                              ${selectedImages.includes(image._id) 
                                ? 'bg-primary border-primary' 
                                : 'bg-white/80 border-gray-300'}`}>
                {selectedImages.includes(image._id) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              {/* Category badge */}
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white">
                {image.category}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-xl border border-border">
          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No images in gallery</p>
          <p className="text-sm text-muted-foreground mt-1">Upload images to get started</p>
        </div>
      )}

      {/* Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={previewImage.image?.url}
            alt={previewImage.title || 'Preview'}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
