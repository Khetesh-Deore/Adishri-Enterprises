// React Hook for Google Sheets CMS
import { useState, useEffect } from 'react';
import { fetchSheetContent, fetchSection } from '../services/googleSheets';

/**
 * Hook to fetch and manage Google Sheets content
 * @param {string} section - Sheet tab name (default: 'Sheet1')
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useGoogleSheets = (section = 'Sheet1', options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    autoRefresh = false,
    refreshInterval = 5 * 60 * 1000, // 5 minutes
    fallbackData = null
  } = options;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const content = section === 'Sheet1' 
        ? await fetchSheetContent(section)
        : await fetchSection(section);
      
      setData(content);
    } catch (err) {
      console.error('useGoogleSheets error:', err);
      setError(err.message);
      
      // Use fallback data if provided
      if (fallbackData) {
        setData(fallbackData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up auto-refresh if enabled
    if (autoRefresh) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [section, autoRefresh, refreshInterval]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

/**
 * Hook to fetch multiple sections at once
 * @param {Array<string>} sections - Array of sheet tab names
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useMultipleSheets = (sections = []) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const results = await Promise.all(
        sections.map(section => fetchSection(section))
      );
      
      const combined = {};
      sections.forEach((section, index) => {
        combined[section] = results[index];
      });
      
      setData(combined);
    } catch (err) {
      console.error('useMultipleSheets error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sections.length > 0) {
      fetchData();
    }
  }, [sections.join(',')]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

export default useGoogleSheets;
