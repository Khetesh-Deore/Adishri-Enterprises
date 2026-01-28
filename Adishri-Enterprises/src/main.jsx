import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { register as registerServiceWorker } from './utils/serviceWorkerRegistration'
import { googleSheetsAPI } from './services/googleSheets'

// Prefetch all Google Sheets data immediately for maximum speed
googleSheetsAPI.prefetchAll().catch(err => {
  console.warn('Prefetch failed:', err);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register service worker for image caching
registerServiceWorker()
