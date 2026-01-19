// Cache Manager Component - Admin tool to manage service worker cache
import { useState, useEffect } from 'react';
import { Trash2, RefreshCw, Database } from 'lucide-react';
import { Button } from '../../views/shared';
import { clearImageCache, getCacheSize } from '../../utils/serviceWorkerRegistration';

export default function CacheManager() {
  const [cacheSize, setCacheSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadCacheSize = async () => {
    try {
      const size = await getCacheSize();
      setCacheSize(size);
    } catch (error) {
      console.error('Failed to get cache size:', error);
    }
  };

  useEffect(() => {
    loadCacheSize();
  }, []);

  const handleClearCache = async () => {
    if (!confirm('Are you sure you want to clear the image cache? This will remove all cached images.')) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await clearImageCache();
      await loadCacheSize();
      setMessage('✅ Cache cleared successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Failed to clear cache: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    await loadCacheSize();
    setLoading(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Database className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Image Cache Manager</h3>
      </div>

      <div className="space-y-4">
        {/* Cache Stats */}
        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cached Images</p>
              <p className="text-2xl font-bold text-foreground">{cacheSize}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={RefreshCw}
              onClick={handleRefresh}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Service Worker caches images after first load for instant display on repeat visits.
          </p>
          <p>
            Cache expires after 7 days automatically.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="destructive"
            icon={Trash2}
            onClick={handleClearCache}
            disabled={loading || cacheSize === 0}
          >
            Clear Cache
          </Button>
        </div>

        {/* Message */}
        {message && (
          <div className={`text-sm p-3 rounded-lg ${
            message.startsWith('✅') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
