// Custom hooks for API data fetching with Google Sheets fallback
import { useState, useEffect, useCallback } from 'react';
import { heroAPI, productsAPI, aboutAPI, galleryAPI, contactAPI, settingsAPI } from '../services/api';
import { contentService } from '../services/contentService';

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

// Hero data hook with Google Sheets fallback
export function useHero() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try content service (MongoDB + Google Sheets hybrid)
      const result = await contentService.getHero();
      setData(result.data);
    } catch (err) {
      console.error('Hero API Error:', err);
      setError(err.message);
      // Fallback to default
      setData({
        title: 'Premium HDPE & LDPE Bottles',
        subtitle: 'Quality Packaging Solutions',
        description: 'Industry-leading manufacturer of high-quality plastic bottles for pharmaceuticals, chemicals, and industrial applications.',
        ctaButton: { text: 'Explore Products', link: '/products' }
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// Products data hook with Google Sheets fallback
export function useProducts(params = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try content service (MongoDB + Google Sheets hybrid)
      const result = await contentService.getProducts(params);
      
      if (result.data) {
        // If data is an array (MongoDB format), use it directly
        if (Array.isArray(result.data)) {
          setData(result.data);
        } 
        // If data is an object (Google Sheets format), convert to array
        else if (typeof result.data === 'object') {
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
      }
    } catch (err) {
      console.error('Products API Error:', err);
      setError(err.message || 'Failed to fetch products');
      setData([]);
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

// About data hook with Google Sheets fallback
export function useAbout() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try content service (MongoDB + Google Sheets hybrid)
      const result = await contentService.getAbout();
      setData(result.data);
    } catch (err) {
      console.error('About API Error:', err);
      setError(err.message);
      // Fallback to default
      setData({
        title: 'About Adishri Enterprises',
        subtitle: 'Excellence in Plastic Packaging',
        description: 'With over 15 years of experience, we are a leading manufacturer of HDPE & LDPE bottles.',
        mission: { title: 'Our Mission', description: 'To provide superior quality plastic packaging solutions.' },
        vision: { title: 'Our Vision', description: 'To become India\'s most trusted packaging manufacturer.' }
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// Gallery data hook with Google Sheets fallback
export function useGallery(params = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try content service (MongoDB + Google Sheets hybrid)
      const result = await contentService.getGallery(params);
      
      if (result.data) {
        // If data is an array (MongoDB format), use it directly
        if (Array.isArray(result.data)) {
          setData(result.data);
        } 
        // If data is an object (Google Sheets format), convert to array
        else if (typeof result.data === 'object') {
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
            images[0].subtitle = sheetsData.subtitle || 'Explore Our Manufacturing Excellence';
          }
          
          setData(images);
        }
      }
    } catch (err) {
      console.error('Gallery API Error:', err);
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { images: data, loading, error, refetch: fetch };
}

// Contact data hook with Google Sheets fallback
export function useContact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try content service (MongoDB + Google Sheets hybrid)
      const result = await contentService.getContact();
      
      if (result.data) {
        // If data has nested structure (MongoDB format), use it directly
        if (result.data.address && typeof result.data.address === 'object') {
          setData(result.data);
        }
        // If data is flat (Google Sheets format), convert to nested structure
        else if (typeof result.data === 'object') {
          const sheetsData = result.data;
          setData({
            company: 'Adishri Enterprises',
            tagline: sheetsData.subtitle || 'Premium HDPE & LDPE Bottles Manufacturer',
            title: sheetsData.title || 'Get In Touch',
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
      }
    } catch (err) {
      console.error('Contact API Error:', err);
      setError(err.message);
      // Fallback to default
      setData({
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
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// Settings data hook with Google Sheets fallback
export function useSettings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try content service (MongoDB + Google Sheets hybrid)
      const result = await contentService.getSettings();
      
      if (result.data) {
        setData(result.data);
      }
    } catch (err) {
      console.error('Settings API Error:', err);
      setError(err.message);
      // Fallback to default
      setData({
        siteName: 'Adishri Enterprises',
        tagline: 'Premium HDPE & LDPE Bottles & Jerry Can Manufacturer',
        credentials: [
          { name: 'ISO 9001:2015' },
          { name: 'FDA Approved' },
          { name: 'BIS Certified' }
        ]
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// Core Values data hook with Google Sheets fallback
export function useCoreValues() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try content service (MongoDB + Google Sheets hybrid)
      const result = await contentService.getVision();
      
      if (result.data) {
        // If data is an array (MongoDB format), use it directly
        if (Array.isArray(result.data)) {
          setData(result.data);
        } 
        // If data is an object (Google Sheets format), convert to array
        else if (typeof result.data === 'object') {
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
      }
    } catch (err) {
      console.error('Core Values API Error:', err);
      setError(err.message || 'Failed to fetch core values');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { coreValues: data, loading, error, refetch: fetch };
}

// Vision data hook with Google Sheets fallback
export function useVision() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try content service (MongoDB + Google Sheets hybrid)
      const result = await contentService.getVision();
      setData(result.data);
    } catch (err) {
      console.error('Vision API Error:', err);
      setError(err.message);
      // Fallback to default
      setData({
        title: 'Our Vision & Mission',
        subtitle: 'Building a Sustainable Future',
        visionTitle: 'Vision',
        visionDescription: 'To be the leading manufacturer of eco-friendly packaging solutions.',
        missionTitle: 'Mission',
        missionDescription: 'Deliver innovative, sustainable packaging solutions.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// About Section data hook (for Excellence component) - Direct Google Sheets
export function useAboutSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch directly from Google Sheets About-section tab
      const { googleSheetsAPI } = await import('../services/googleSheets');
      const sheetsData = await googleSheetsAPI.getAboutSection();
      
      if (sheetsData && Object.keys(sheetsData).length > 0) {
        console.log('✅ About-section: Using Google Sheets (DIRECT)');
        setData(sheetsData);
      } else {
        throw new Error('No data in About-section tab');
      }
    } catch (err) {
      console.error('About-section Error:', err);
      setError(err.message);
      // Fallback to default
      setData({
        title: 'Excellence in Plastic Packaging Manufacturing',
        subtitle: 'About Us',
        description: 'Based in Chhatrapati Sambhaji Nagar, Adishri Enterprises is a leading manufacturer of HDPE & LDPE bottles and jerry cans.',
        experienceYears: '15',
        mainText: 'With over 15 years of experience, we have established ourselves as a trusted manufacturer serving pharmaceutical, chemical, agricultural, and industrial sectors across India.',
        secondaryText: 'Our state-of-the-art facility uses advanced blow molding technology to produce high-quality bottles ranging from 200ml to 5L capacity, meeting the diverse needs of our clients.',
        missionTitle: 'Our Mission',
        missionDescription: 'To provide superior quality plastic packaging solutions ensuring safety, durability, and customer satisfaction.',
        ecoTitle: 'Eco-Friendly',
        ecoDescription: '100% recyclable HDPE & LDPE materials promoting sustainable packaging solutions.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
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
      { id: 'gallery', name: 'Gallery', href: '/gallery', order: 3 },
      { id: 'vision', name: 'Vision', href: '/vision', order: 4 },
      { id: 'contact', name: 'Contact', href: '/contact', order: 5 }
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

// Hero Slider data hook with Google Sheets fallback
export function useHeroSlider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try content service (MongoDB + Google Sheets hybrid)
      const result = await contentService.getHeroSlider();
      
      if (result.data) {
        // If data is an array (MongoDB format), use it directly
        if (Array.isArray(result.data)) {
          setData(result.data);
        } 
        // If data is an object (Google Sheets format), convert to array
        else if (typeof result.data === 'object') {
          const sheetsData = result.data;
          setData([{
            id: 1,
            title: sheetsData.title || 'Future of Packaging',
            subtitle: sheetsData.subtitle || 'Innovation in Every Bottle',
            description: sheetsData.description || 'Leading manufacturer of premium HDPE & LDPE bottles',
            image: { url: sheetsData.heroImage || '/product8.jpeg' },
            ctaText: sheetsData.ctaText || 'Explore Products',
            ctaLink: sheetsData.ctaLink || '/products',
            secondaryText: sheetsData.secondaryText || 'Get Quote',
            secondaryLink: sheetsData.secondaryLink || '/contact',
            badge: sheetsData.badge || '🚀 Innovation Leader'
          }]);
        }
      } else {
        throw new Error('No data received');
      }
    } catch (err) {
      console.error('Hero Slider Error:', err);
      setError(err.message || 'Failed to fetch hero slides');
      // Final fallback to default slides
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
