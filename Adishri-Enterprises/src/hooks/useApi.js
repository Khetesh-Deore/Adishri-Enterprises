// Custom hooks for Google Sheets data fetching - OPTIMIZED FOR SPEED
import { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';

// Hero data hook - Direct Google Sheets fetch
export function useHero() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contentService.getHero();
        setData(result.data);
      } catch (err) {
        console.error('Hero Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

// Hero Slider data hook - Direct Google Sheets fetch
export function useHeroSlider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contentService.getHeroSlider();
        if (result.data && typeof result.data === 'object') {
          const sheetsData = result.data;
          setData([{
            id: 1,
            title: sheetsData.title,
            subtitle: sheetsData.subtitle,
            description: sheetsData.description,
            image: { url: sheetsData.heroImage },
            ctaText: sheetsData.ctaText,
            ctaLink: sheetsData.ctaLink,
            secondaryText: sheetsData.secondaryText,
            secondaryLink: sheetsData.secondaryLink,
            badge: sheetsData.badge
          }]);
        }
      } catch (err) {
        console.error('Hero Slider Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { slides: data, loading, error };
}

// Products data hook - Direct Google Sheets fetch
export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contentService.getProducts();
        
        if (result.data && typeof result.data === 'object') {
          const sheetsData = result.data;
          const products = [];
          
          // Extract products from sheets data (product1, product2, etc.)
          let i = 1;
          while (sheetsData[`product${i}Name`]) {
            products.push({
              id: i,
              name: sheetsData[`product${i}Name`],
              description: sheetsData[`product${i}Description`],
              image: { url: sheetsData[`product${i}Image`] },
              price: sheetsData[`product${i}Price`],
              category: sheetsData[`product${i}Category`],
              features: sheetsData[`product${i}Features`]?.split('|').map(f => f.trim()),
              sizes: sheetsData[`product${i}Sizes`]?.split(',').map(s => s.trim())
            });
            i++;
          }
          
          setData(products);
        }
      } catch (err) {
        console.error('Products Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { products: data, loading, error };
}

// About data hook - Direct Google Sheets fetch
export function useAbout() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contentService.getAbout();
        setData(result.data);
      } catch (err) {
        console.error('About Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

// About Section data hook - Direct Google Sheets fetch
export function useAboutSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { googleSheetsAPI } = await import('../services/googleSheets');
        const sheetsData = await googleSheetsAPI.getAboutSection();
        setData(sheetsData);
      } catch (err) {
        console.error('About-section Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

// Gallery data hook - Direct Google Sheets fetch
export function useGallery() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contentService.getGallery();
        
        if (result.data && typeof result.data === 'object') {
          const sheetsData = result.data;
          const images = [];
          
          // Extract images from sheets data (image1, image2, etc.)
          let i = 1;
          while (sheetsData[`image${i}Url`]) {
            images.push({
              id: i,
              url: sheetsData[`image${i}Url`],
              image: { url: sheetsData[`image${i}Url`] },
              title: sheetsData[`image${i}Title`],
              category: sheetsData[`image${i}Category`],
              description: sheetsData[`image${i}Description`],
              caption: sheetsData[`image${i}Description`]
            });
            i++;
          }
          
          // Add title and subtitle to first image for header display
          if (images.length > 0) {
            images[0].title = sheetsData.title || images[0].title;
            images[0].subtitle = sheetsData.subtitle;
          }
          
          setData(images);
        }
      } catch (err) {
        console.error('Gallery Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { images: data, loading, error };
}

// Contact data hook - Direct Google Sheets fetch
export function useContact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contentService.getContact();
        if (result.data && typeof result.data === 'object') {
          const sheetsData = result.data;
          setData({
            company: 'Adishri Enterprises',
            tagline: sheetsData.subtitle,
            title: sheetsData.title,
            subtitle: sheetsData.subtitle,
            description: sheetsData.description,
            address: {
              full: sheetsData.address,
              factory: sheetsData.factoryAddress,
              registered: sheetsData.registeredOffice
            },
            phone: {
              primary: sheetsData.phone,
              alternate: sheetsData.phoneAlternate
            },
            email: {
              primary: sheetsData.email,
              sales: sheetsData.salesEmail,
              support: sheetsData.supportEmail
            },
            whatsapp: sheetsData.whatsapp?.replace(/\+/g, '').replace(/\s/g, ''),
            workingHours: sheetsData.workingHours,
            workingHoursSunday: sheetsData.workingHoursSunday,
            responseTime: sheetsData.responseTime,
            mapUrl: sheetsData.mapUrl,
            mapEmbedUrl: sheetsData.mapEmbedUrl,
            socialLinks: {
              facebook: sheetsData.facebook,
              instagram: sheetsData.instagram,
              linkedin: sheetsData.linkedin,
              twitter: sheetsData.twitter,
              youtube: sheetsData.youtube
            },
            gstNumber: sheetsData.gstNumber,
            cinNumber: sheetsData.cinNumber
          });
        }
      } catch (err) {
        console.error('Contact Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

// Settings data hook - Direct Google Sheets fetch
export function useSettings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contentService.getSettings();
        setData(result.data);
      } catch (err) {
        console.error('Settings Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

// Core Values data hook - Direct Google Sheets fetch
export function useCoreValues() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contentService.getVision();
        
        if (result.data && typeof result.data === 'object') {
          const sheetsData = result.data;
          const values = [];
          
          // Extract values from sheets data (value1, value2, etc.)
          let i = 1;
          while (sheetsData[`value${i}Title`]) {
            values.push({
              id: i,
              title: sheetsData[`value${i}Title`],
              description: sheetsData[`value${i}Description`],
              icon: sheetsData[`value${i}Icon`]
            });
            i++;
          }
          
          setData(values);
        }
      } catch (err) {
        console.error('Core Values Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { coreValues: data, loading, error };
}

// Vision data hook - Direct Google Sheets fetch
export function useVision() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contentService.getVision();
        setData(result.data);
      } catch (err) {
        console.error('Vision Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

// Navigation data hook - Static (no backend needed)
export function useNavigation() {
  const defaultNavigation = {
    navLinks: [
      { id: 'home', name: 'Home', href: '/', order: 0 },
      { id: 'about', name: 'About', href: '/about', order: 1 },
      { id: 'products', name: 'Products', href: '/products', order: 2 },
      { id: 'gallery', name: 'Gallery', href: '/gallery', order: 3 },
      { id: 'vision', name: 'Vision', href: '/vision', order: 4 },
      { id: 'contact', name: 'Contact', href: '/contact', order: 5 }
    ],
    footerQuickLinks: [
      { name: 'Home', href: '/', order: 0 },
      { name: 'About', href: '/about', order: 1 },
      { name: 'Products', href: '/products', order: 2 },
      { name: 'Gallery', href: '/gallery', order: 3 },
      { name: 'Vision', href: '/vision', order: 4 },
      { name: 'Contact', href: '/contact', order: 5 }
    ],
    socialLinks: {},
    whatsapp: { number: '919876543210', message: 'Hello! I would like to inquire about your products.' }
  };

  return { data: defaultNavigation, loading: false, error: null };
}
