// Custom hooks for API data fetching
import { useState, useEffect, useCallback } from 'react';
import { heroAPI, productsAPI, aboutAPI, galleryAPI, contactAPI, settingsAPI } from '../services/api';

// Generic fetch hook
function useFetch(fetchFn, defaultData = null) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFn();
      setData(response.data?.data || defaultData);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [fetchFn, defaultData]);

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, refetch: fetch };
}

// Hero data hook
export function useHero() {
  const defaultHero = {
    title: 'Premium HDPE & LDPE Bottles',
    subtitle: 'Quality Packaging Solutions',
    description: 'Industry-leading manufacturer of high-quality plastic bottles for pharmaceuticals, chemicals, and industrial applications.',
    ctaButton: { text: 'Explore Products', link: '/products' }
  };

  return useFetch(() => heroAPI.get(), defaultHero);
}

// Products data hook
export function useProducts(params = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsAPI.getAll(params);
      setData(response.data?.data || []);
    } catch (err) {
      console.error('Products API Error:', err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { products: data, loading, error, refetch: fetch };
}

// Single product hook
export function useProduct(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await productsAPI.getOne(id);
        setData(response.data?.data || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetch();
  }, [id]);

  return { product: data, loading, error };
}

// About data hook
export function useAbout() {
  const defaultAbout = {
    title: 'About Adishri Enterprises',
    subtitle: 'Excellence in Plastic Packaging',
    description: 'With over 15 years of experience, we are a leading manufacturer of HDPE & LDPE bottles.',
    mission: { title: 'Our Mission', description: 'To provide superior quality plastic packaging solutions.' },
    vision: { title: 'Our Vision', description: 'To become India\'s most trusted packaging manufacturer.' }
  };

  return useFetch(() => aboutAPI.get(), defaultAbout);
}

// Gallery data hook
export function useGallery(params = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await galleryAPI.getAll(params);
      setData(response.data?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { images: data, loading, error, refetch: fetch };
}

// Contact data hook
export function useContact() {
  const defaultContact = {
    company: 'Adishri Enterprises',
    tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
    address: {
      full: 'Plot No B 33/2, Shendra MIDC, Shendra, Chh. Sambhajinagar, Maharashtra - 431007'
    },
    phone: { primary: '+91 98765 43210' },
    email: { primary: 'info@adishrienterprises.com' },
    workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    whatsapp: '919876543210',
    socialLinks: {}
  };

  return useFetch(() => contactAPI.get(), defaultContact);
}

// Settings data hook
export function useSettings() {
  const defaultSettings = {
    siteName: 'Adishri Enterprises',
    tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
    credentials: [
      { name: 'ISO 9001:2015' },
      { name: 'FDA Approved' },
      { name: 'BIS Certified' }
    ]
  };

  return useFetch(() => settingsAPI.get(), defaultSettings);
}

// Core Values data hook
export function useCoreValues() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await import('../services/api').then(m => m.coreValuesAPI.getAll());
      setData(response.data?.data || []);
    } catch (err) {
      console.error('Core Values API Error:', err);
      setError(err.message || 'Failed to fetch core values');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { coreValues: data, loading, error, refetch: fetch };
}

// Standards data hook
export function useStandards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await import('../services/api').then(m => m.standardsAPI.getAll());
      setData(response.data?.data || []);
    } catch (err) {
      console.error('Standards API Error:', err);
      setError(err.message || 'Failed to fetch standards');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { standards: data, loading, error, refetch: fetch };
}

// Navigation data hook
export function useNavigation() {
  const defaultNavigation = {
    navLinks: [
      { id: 'home', name: 'Home', href: '/', order: 0 },
      { id: 'about', name: 'About', href: '/about', order: 1 },
      { id: 'products', name: 'Products', href: '/products', order: 2 },
      { id: 'vision', name: 'Vision', href: '/vision', order: 3 },
      { id: 'contact', name: 'Contact', href: '/contact', order: 4 }
    ],
    footerQuickLinks: [],
    footerResources: [],
    socialLinks: {},
    whatsapp: { number: '919876543210', message: 'Hello! I would like to inquire about your products.' }
  };

  return useFetch(async () => {
    const { navigationAPI } = await import('../services/api');
    return navigationAPI.get();
  }, defaultNavigation);
}

// Hero Slider data hook
export function useHeroSlider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await import('../services/api').then(m => m.heroSliderAPI.getAll());
      setData(response.data?.data || []);
    } catch (err) {
      console.error('Hero Slider API Error:', err);
      setError(err.message || 'Failed to fetch hero slides');
      // Fallback to default slides
      setData([
        {
          id: 1,
          title: 'Future of Packaging',
          subtitle: 'Innovation in Every Bottle',
          description: 'Leading manufacturer of premium HDPE & LDPE bottles for pharmaceutical, chemical, and industrial applications',
          image: { url: '/product8.jpeg' },
          ctaText: 'Explore Products',
          ctaLink: '/products',
          secondaryText: 'Get Quote',
          secondaryLink: '/contact',
          badge: '🚀 Innovation Leader'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { slides: data, loading, error, refetch: fetch };
}
