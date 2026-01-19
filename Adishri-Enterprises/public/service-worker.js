// Service Worker for Image Caching
// Version 1.0.0

const CACHE_NAME = 'adishri-images-v1';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Determine if URL should be cached
const shouldCache = (url) => {
  // Cache Cloudinary images
  if (url.includes('res.cloudinary.com')) return true;
  
  // Cache local images
  if (url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) return true;
  
  return false;
};

// Install event - activate immediately
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  self.skipWaiting();
});

// Activate event - claim clients immediately
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - cache images with stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;
  
  // Only handle GET requests for images
  if (request.method !== 'GET' || !shouldCache(url)) {
    return;
  }
  
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Try to get from cache first
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        // Check if cache is expired
        const cachedDate = new Date(cachedResponse.headers.get('sw-cached-date'));
        const now = new Date();
        
        if (now - cachedDate < CACHE_EXPIRY) {
          console.log('[Service Worker] Serving from cache:', url);
          
          // Revalidate in background
          fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              const headers = new Headers(responseToCache.headers);
              headers.append('sw-cached-date', new Date().toISOString());
              
              const modifiedResponse = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
              });
              
              cache.put(request, modifiedResponse);
            }
          }).catch(() => {
            // Network failed, but we have cache
          });
          
          return cachedResponse;
        }
      }
      
      // Fetch from network
      try {
        console.log('[Service Worker] Fetching from network:', url);
        const networkResponse = await fetch(request);
        
        if (networkResponse && networkResponse.status === 200) {
          // Clone the response
          const responseToCache = networkResponse.clone();
          
          // Add cache date header
          const headers = new Headers(responseToCache.headers);
          headers.append('sw-cached-date', new Date().toISOString());
          
          const modifiedResponse = new Response(responseToCache.body, {
            status: responseToCache.status,
            statusText: responseToCache.statusText,
            headers: headers
          });
          
          // Cache the response
          cache.put(request, modifiedResponse);
          
          return networkResponse;
        }
        
        return networkResponse;
      } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);
        
        // If we have a cached version, return it even if expired
        if (cachedResponse) {
          console.log('[Service Worker] Network failed, serving stale cache:', url);
          return cachedResponse;
        }
        
        // Return a fallback image
        return new Response(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="#e5e7eb" width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af" font-family="sans-serif" font-size="16">Image unavailable</text></svg>',
          {
            headers: {
              'Content-Type': 'image/svg+xml',
              'Cache-Control': 'no-store'
            }
          }
        );
      }
    })
  );
});

// Message event - for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        console.log('[Service Worker] Cache cleared');
        event.ports[0].postMessage({ success: true });
      })
    );
  }
  
  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        const keys = await cache.keys();
        event.ports[0].postMessage({ 
          success: true, 
          size: keys.length 
        });
      })
    );
  }
});
