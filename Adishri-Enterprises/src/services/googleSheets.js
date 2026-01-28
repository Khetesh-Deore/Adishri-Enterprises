// Google Sheets CMS Service - OPTIMIZED FOR SPEED
// Fetches content from Google Sheets with aggressive caching and parallel loading

const SHEET_ID = '1s3e0PGnaRKu3oW2E1Bh23epXvlWIgiLip9GkuYJe-oI';
const OPENSHEET_API = 'https://opensheet.vercel.app';

// Aggressive cache - 30 minutes in memory + localStorage
const memoryCache = {};
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get from localStorage cache
 */
const getFromLocalStorage = (key) => {
  try {
    const cached = localStorage.getItem(`sheets_${key}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  } catch (e) {
    console.warn('LocalStorage read error:', e);
  }
  return null;
};

/**
 * Save to localStorage cache
 */
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(`sheets_${key}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('LocalStorage write error:', e);
  }
};

/**
 * Fetch data from Google Sheet with aggressive caching
 */
const fetchSheetContent = async (sheetName) => {
  // Check memory cache first (fastest)
  if (memoryCache[sheetName] && Date.now() - memoryCache[sheetName].timestamp < CACHE_DURATION) {
    return memoryCache[sheetName].data;
  }

  // Check localStorage cache (fast)
  const localData = getFromLocalStorage(sheetName);
  if (localData) {
    memoryCache[sheetName] = { data: localData, timestamp: Date.now() };
    return localData;
  }

  // Fetch from API (slower but fresh)
  try {
    const url = `${OPENSHEET_API}/${SHEET_ID}/${sheetName}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${sheetName}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Convert array of {key, value} to object
    const content = {};
    data.forEach(row => {
      if (row.key && row.value !== undefined) {
        content[row.key] = row.value;
      }
    });

    // Cache in memory and localStorage
    memoryCache[sheetName] = { data: content, timestamp: Date.now() };
    saveToLocalStorage(sheetName, content);

    return content;
  } catch (error) {
    console.error(`Google Sheets fetch error (${sheetName}):`, error);
    throw error;
  }
};

/**
 * Prefetch all sheets in parallel for maximum speed
 */
export const prefetchAllSheets = async () => {
  const sheets = ['Hero', 'About', 'About-section', 'Products', 'Contact', 'Vision', 'Gallery'];
  
  // Fetch all sheets in parallel
  const promises = sheets.map(sheet => 
    fetchSheetContent(sheet).catch(err => {
      console.warn(`Failed to prefetch ${sheet}:`, err);
      return null;
    })
  );
  
  await Promise.all(promises);
  console.log('✅ All sheets prefetched');
};

/**
 * Clear all caches
 */
export const clearCache = () => {
  Object.keys(memoryCache).forEach(key => delete memoryCache[key]);
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('sheets_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (e) {
    console.warn('Cache clear error:', e);
  }
};

// Export individual section fetchers
export const googleSheetsAPI = {
  getHero: () => fetchSheetContent('Hero'),
  getAbout: () => fetchSheetContent('About'),
  getAboutSection: () => fetchSheetContent('About-section'),
  getProducts: () => fetchSheetContent('Products'),
  getContact: () => fetchSheetContent('Contact'),
  getVision: () => fetchSheetContent('Vision'),
  getGallery: () => fetchSheetContent('Gallery'),
  
  // Utility
  prefetchAll: prefetchAllSheets,
  clearCache
};

export default googleSheetsAPI;
