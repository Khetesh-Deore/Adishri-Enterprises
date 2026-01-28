// Hybrid Content Service - MongoDB + Google Sheets CMS
// Fetches from MongoDB first, then falls back to Google Sheets
// Google Sheets can override MongoDB content when enabled

import { googleSheetsAPI } from './googleSheets';
import * as api from './api';

// Configuration
const USE_GOOGLE_SHEETS = import.meta.env.VITE_USE_GOOGLE_SHEETS === 'true';
const SHEETS_PRIORITY = import.meta.env.VITE_SHEETS_PRIORITY === 'true'; // If true, Sheets override MongoDB

/**
 * Fetch content with fallback strategy
 * @param {Function} mongoFetch - MongoDB API call
 * @param {Function} sheetsFetch - Google Sheets API call
 * @param {string} contentType - Type of content for logging
 * @returns {Promise<Object>} - Content data
 */
const fetchWithFallback = async (mongoFetch, sheetsFetch, contentType) => {
  try {
    // Strategy 1: Google Sheets has priority
    if (USE_GOOGLE_SHEETS && SHEETS_PRIORITY) {
      try {
        const sheetsData = await sheetsFetch();
        if (sheetsData && Object.keys(sheetsData).length > 0) {
          console.log(`✅ ${contentType}: Using Google Sheets (priority mode)`);
          return { source: 'sheets', data: sheetsData };
        }
      } catch (sheetsError) {
        console.warn(`⚠️ ${contentType}: Sheets failed, falling back to MongoDB`, sheetsError);
      }
    }

    // Strategy 2: Try MongoDB first
    try {
      const mongoResponse = await mongoFetch();
      const mongoData = mongoResponse?.data?.data || mongoResponse?.data;
      
      if (mongoData) {
        console.log(`✅ ${contentType}: Using MongoDB`);
        
        // If Google Sheets is enabled but not priority, merge with sheets data
        if (USE_GOOGLE_SHEETS && !SHEETS_PRIORITY) {
          try {
            const sheetsData = await sheetsFetch();
            if (sheetsData && Object.keys(sheetsData).length > 0) {
              console.log(`✅ ${contentType}: Merging with Google Sheets overrides`);
              return { source: 'hybrid', data: { ...mongoData, ...sheetsData } };
            }
          } catch (sheetsError) {
            console.warn(`⚠️ ${contentType}: Sheets merge failed`, sheetsError);
          }
        }
        
        return { source: 'mongodb', data: mongoData };
      }
    } catch (mongoError) {
      console.warn(`⚠️ ${contentType}: MongoDB failed`, mongoError);
    }

    // Strategy 3: Fallback to Google Sheets
    if (USE_GOOGLE_SHEETS) {
      try {
        const sheetsData = await sheetsFetch();
        if (sheetsData && Object.keys(sheetsData).length > 0) {
          console.log(`✅ ${contentType}: Using Google Sheets (fallback)`);
          return { source: 'sheets', data: sheetsData };
        }
      } catch (sheetsError) {
        console.error(`❌ ${contentType}: Both MongoDB and Sheets failed`, sheetsError);
      }
    }

    throw new Error(`Failed to fetch ${contentType} from all sources`);
  } catch (error) {
    console.error(`❌ ${contentType}: All fetch strategies failed`, error);
    throw error;
  }
};

// Content Service API
export const contentService = {
  // Hero Section
  getHero: () => fetchWithFallback(
    () => api.heroAPI.get(),
    () => googleSheetsAPI.getHero(),
    'Hero'
  ),

  // Hero Slider
  getHeroSlider: () => fetchWithFallback(
    () => api.heroSliderAPI.getAll(),
    () => googleSheetsAPI.getHero(),
    'HeroSlider'
  ),

  // About Section
  getAbout: () => fetchWithFallback(
    () => api.aboutAPI.get(),
    () => googleSheetsAPI.getAbout(),
    'About'
  ),

  // Products
  getProducts: (params) => fetchWithFallback(
    () => api.productsAPI.getAll(params),
    () => googleSheetsAPI.getProducts(),
    'Products'
  ),

  // Gallery
  getGallery: (params) => fetchWithFallback(
    () => api.galleryAPI.getAll(params),
    () => googleSheetsAPI.getGallery(),
    'Gallery'
  ),

  // Contact
  getContact: () => fetchWithFallback(
    () => api.contactAPI.get(),
    () => googleSheetsAPI.getContact(),
    'Contact'
  ),

  // Vision
  getVision: () => fetchWithFallback(
    () => api.visionAPI.get(),
    () => googleSheetsAPI.getVision(),
    'Vision'
  ),

  // Settings
  getSettings: () => fetchWithFallback(
    () => api.settingsAPI.get(),
    () => googleSheetsAPI.getAll(),
    'Settings'
  )
};

export default contentService;
