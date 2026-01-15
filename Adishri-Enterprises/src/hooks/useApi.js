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
