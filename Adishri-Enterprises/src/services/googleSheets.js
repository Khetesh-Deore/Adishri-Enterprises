// Google Sheets CMS Service
// Fetches content from Google Sheets for live updates without redeployment

const SHEET_ID = '1s3e0PGnaRKu3oW2E1Bh23epXvlWIgiLip9GkuYJe-oI';
const OPENSHEET_API = 'https://opensheet.vercel.app';

// Cache to reduce API calls
const cache = {
  data: null,
  timestamp: null,
  duration: 5 * 60 * 1000 // 5 minutes cache
};

/**
 * Fetch data from Google Sheet and convert to key-value object
 * @param {string} sheetName - Name of the sheet tab (default: 'Sheet1')
 * @returns {Promise<Object>} - Content object with key-value pairs
 */
export const fetchSheetContent = async (sheetName = 'Sheet1') => {
  // Return cached data if still valid
  if (cache.data && cache.timestamp && (Date.now() - cache.timestamp < cache.duration)) {
    return cache.data;
  }

  try {
    const url = `${OPENSHEET_API}/${SHEET_ID}/${sheetName}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Convert array of {key, value} to object
    const content = {};
    data.forEach(row => {
      if (row.key && row.value !== undefined) {
        content[row.key] = row.value;
      }
    });

    // Update cache
    cache.data = content;
    cache.timestamp = Date.now();

    return content;
  } catch (error) {
    console.error('Google Sheets fetch error:', error);
    // Return cached data if available, even if expired
    if (cache.data) {
      console.warn('Using expired cache due to fetch error');
      return cache.data;
    }
    throw error;
  }
};

/**
 * Fetch specific section from Google Sheet
 * @param {string} section - Section name (e.g., 'hero', 'about', 'products')
 * @returns {Promise<Object>} - Section content
 */
export const fetchSection = async (section) => {
  try {
    const content = await fetchSheetContent(section);
    return content;
  } catch (error) {
    console.error(`Failed to fetch ${section} section:`, error);
    return {};
  }
};

/**
 * Clear cache manually (useful for testing)
 */
export const clearCache = () => {
  cache.data = null;
  cache.timestamp = null;
};

/**
 * Parse JSON string from sheet cell
 * Useful for complex data like arrays or objects
 */
export const parseJSON = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

// Export individual section fetchers for convenience
export const googleSheetsAPI = {
  // Fetch all content
  getAll: () => fetchSheetContent('Sheet1'),
  
  // Fetch specific sections
  getHero: () => fetchSection('Hero'),
  getAbout: () => fetchSection('About'),
  getAboutSection: () => fetchSection('About-section'),
  getProducts: () => fetchSection('Products'),
  getContact: () => fetchSection('Contact'),
  getVision: () => fetchSection('Vision'),
  getGallery: () => fetchSection('Gallery'),
  
  // Utility
  clearCache
};

export default googleSheetsAPI;
