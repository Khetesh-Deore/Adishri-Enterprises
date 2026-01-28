// Content Service - Google Sheets CMS Only - OPTIMIZED FOR SPEED
// Direct integration with Google Sheets for all content

import { googleSheetsAPI } from './googleSheets';

const isDev = import.meta.env.DEV;

// Content Service API - All data from Google Sheets
export const contentService = {
  // Hero Section
  getHero: async () => {
    try {
      const data = await googleSheetsAPI.getHero();
      if (isDev) console.log('✅ Hero: Loaded from Google Sheets');
      return { source: 'sheets', data };
    } catch (error) {
      console.error('❌ Hero: Failed to fetch', error);
      throw error;
    }
  },

  // Hero Slider
  getHeroSlider: async () => {
    try {
      const data = await googleSheetsAPI.getHero();
      if (isDev) console.log('✅ HeroSlider: Loaded from Google Sheets');
      return { source: 'sheets', data };
    } catch (error) {
      console.error('❌ HeroSlider: Failed to fetch', error);
      throw error;
    }
  },

  // About Section
  getAbout: async () => {
    try {
      const data = await googleSheetsAPI.getAbout();
      if (isDev) console.log('✅ About: Loaded from Google Sheets');
      return { source: 'sheets', data };
    } catch (error) {
      console.error('❌ About: Failed to fetch', error);
      throw error;
    }
  },

  // Products
  getProducts: async () => {
    try {
      const data = await googleSheetsAPI.getProducts();
      if (isDev) console.log('✅ Products: Loaded from Google Sheets');
      return { source: 'sheets', data };
    } catch (error) {
      console.error('❌ Products: Failed to fetch', error);
      throw error;
    }
  },

  // Gallery
  getGallery: async () => {
    try {
      const data = await googleSheetsAPI.getGallery();
      if (isDev) console.log('✅ Gallery: Loaded from Google Sheets');
      return { source: 'sheets', data };
    } catch (error) {
      console.error('❌ Gallery: Failed to fetch', error);
      throw error;
    }
  },

  // Contact
  getContact: async () => {
    try {
      const data = await googleSheetsAPI.getContact();
      if (isDev) console.log('✅ Contact: Loaded from Google Sheets');
      return { source: 'sheets', data };
    } catch (error) {
      console.error('❌ Contact: Failed to fetch', error);
      throw error;
    }
  },

  // Vision
  getVision: async () => {
    try {
      const data = await googleSheetsAPI.getVision();
      if (isDev) console.log('✅ Vision: Loaded from Google Sheets');
      return { source: 'sheets', data };
    } catch (error) {
      console.error('❌ Vision: Failed to fetch', error);
      throw error;
    }
  },

  // Settings
  getSettings: async () => {
    try {
      const data = await googleSheetsAPI.getHero();
      if (isDev) console.log('✅ Settings: Loaded from Google Sheets');
      return { source: 'sheets', data };
    } catch (error) {
      console.error('❌ Settings: Failed to fetch', error);
      throw error;
    }
  }
};

export default contentService;
