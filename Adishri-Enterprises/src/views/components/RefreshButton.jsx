// RefreshButton - Manual refresh for Google Sheets data
import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { googleSheetsAPI } from '../../services/googleSheets';

export default function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await googleSheetsAPI.forceRefreshAll();
    } catch (error) {
      console.error('Refresh failed:', error);
      alert('Failed to refresh data. Please try again.');
      setIsRefreshing(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`
        fixed bottom-6 right-6 z-40
        w-14 h-14 rounded-full
        bg-primary text-primary-foreground
        shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-300
        ${isRefreshing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
      `}
      title="Refresh data from Google Sheets"
    >
      <RefreshCw 
        className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`} 
      />
    </button>
  );
}
