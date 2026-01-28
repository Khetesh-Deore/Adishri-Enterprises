// Admin Panel for Google Sheets CMS Management
import { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw, CheckCircle, XCircle, Info, Copy, Eye } from 'lucide-react';
import { googleSheetsAPI, clearCache } from '../../services/googleSheets';
import { PageLoader, ButtonSpinner } from '../../views/shared';
import toast from 'react-hot-toast';

const SHEET_ID = '1s3e0PGnaRKu3oW2E1Bh23epXvlWIgiLip9GkuYJe-oI';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

export default function GoogleSheetsCMS() {
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [sections, setSections] = useState({
    Hero: { status: 'pending', data: null, error: null },
    About: { status: 'pending', data: null, error: null },
    Products: { status: 'pending', data: null, error: null },
    Contact: { status: 'pending', data: null, error: null },
    Vision: { status: 'pending', data: null, error: null },
    Gallery: { status: 'pending', data: null, error: null }
  });

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setTesting(true);
    setLoading(true);

    const sectionNames = Object.keys(sections);
    const results = {};

    for (const section of sectionNames) {
      try {
        const data = await googleSheetsAPI[`get${section}`]();
        results[section] = {
          status: Object.keys(data).length > 0 ? 'success' : 'empty',
          data,
          error: null
        };
      } catch (error) {
        results[section] = {
          status: 'error',
          data: null,
          error: error.message
        };
      }
    }

    setSections(results);
    setTesting(false);
    setLoading(false);

    const successCount = Object.values(results).filter(r => r.status === 'success').length;
    if (successCount > 0) {
      toast.success(`${successCount} sections loaded successfully`);
    } else {
      toast.error('Failed to load any sections');
    }
  };

  const handleClearCache = () => {
    clearCache();
    toast.success('Cache cleared! Refresh to see latest data.');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'empty':
        return <Info className="w-5 h-5 text-yellow-500" />;
      default:
        return <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return 'Connected';
      case 'error':
        return 'Failed';
      case 'empty':
        return 'Empty Sheet';
      default:
        return 'Testing...';
    }
  };

  if (loading && !testing) {
    return <PageLoader message="Testing Google Sheets connection..." />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Google Sheets CMS</h1>
          <p className="text-muted-foreground mt-1">Manage content directly from Google Sheets</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-card border border-border text-foreground rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Clear Cache
          </button>
          <button
            onClick={testConnection}
            disabled={testing}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {testing ? <ButtonSpinner className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
            Test Connection
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              How Google Sheets CMS Works
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <li>✅ Edit content in Google Sheets - no coding required</li>
              <li>✅ Changes appear on website within 5 minutes (cache refresh)</li>
              <li>✅ No redeployment needed - updates are instant</li>
              <li>✅ Works alongside MongoDB - use as fallback or override</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a
                href={SHEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Open Google Sheet
              </a>
              <a
                href="/GOOGLE_SHEETS_CMS_SETUP.md"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-card border border-blue-300 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                Setup Guide
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Info */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Sheet Configuration</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Sheet ID</span>
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono text-foreground">{SHEET_ID}</code>
              <button
                onClick={() => copyToClipboard(SHEET_ID)}
                className="p-1 hover:bg-background rounded"
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">API Endpoint</span>
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono text-foreground">opensheet.vercel.app</code>
              <button
                onClick={() => copyToClipboard(`https://opensheet.vercel.app/${SHEET_ID}/Hero`)}
                className="p-1 hover:bg-background rounded"
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Cache Duration</span>
            <span className="text-sm font-medium text-foreground">5 minutes</span>
          </div>
        </div>
      </div>

      {/* Sections Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Sheet Tabs Status</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(sections).map(([name, section]) => (
            <div
              key={name}
              className="p-4 border border-border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(section.status)}
                  <div>
                    <h4 className="font-semibold text-foreground">{name}</h4>
                    <p className="text-sm text-muted-foreground">{getStatusText(section.status)}</p>
                  </div>
                </div>
                {section.status === 'success' && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                    {Object.keys(section.data || {}).length} fields
                  </span>
                )}
              </div>

              {section.error && (
                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs text-red-700 dark:text-red-300">
                  {section.error}
                </div>
              )}

              {section.status === 'success' && section.data && (
                <details className="mt-3">
                  <summary className="text-sm text-primary cursor-pointer hover:underline">
                    View Data ({Object.keys(section.data).length} fields)
                  </summary>
                  <div className="mt-2 p-3 bg-muted rounded text-xs font-mono max-h-40 overflow-auto">
                    <pre>{JSON.stringify(section.data, null, 2)}</pre>
                  </div>
                </details>
              )}

              {section.status === 'empty' && (
                <div className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">
                  Sheet tab exists but has no data. Add content to use this section.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href={SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors text-center group"
          >
            <ExternalLink className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-foreground mb-1">Edit Content</h4>
            <p className="text-sm text-muted-foreground">Open Google Sheet to update content</p>
          </a>

          <button
            onClick={testConnection}
            className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors text-center group"
          >
            <RefreshCw className="w-8 h-8 text-primary mx-auto mb-2 group-hover:rotate-180 transition-transform" />
            <h4 className="font-semibold text-foreground mb-1">Refresh Data</h4>
            <p className="text-sm text-muted-foreground">Test connection and reload content</p>
          </button>

          <a
            href={`https://opensheet.vercel.app/${SHEET_ID}/Hero`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors text-center group"
          >
            <Eye className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-foreground mb-1">View API</h4>
            <p className="text-sm text-muted-foreground">See raw JSON data from API</p>
          </a>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          Environment Configuration
        </h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-4">
          Add these to your <code className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/50 rounded">.env</code> file:
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-card rounded border border-yellow-200 dark:border-yellow-800">
            <code className="text-sm font-mono text-foreground">VITE_USE_GOOGLE_SHEETS=true</code>
            <button
              onClick={() => copyToClipboard('VITE_USE_GOOGLE_SHEETS=true')}
              className="p-1 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 rounded"
            >
              <Copy className="w-4 h-4 text-yellow-700 dark:text-yellow-300" />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-white dark:bg-card rounded border border-yellow-200 dark:border-yellow-800">
            <code className="text-sm font-mono text-foreground">VITE_SHEETS_PRIORITY=false</code>
            <button
              onClick={() => copyToClipboard('VITE_SHEETS_PRIORITY=false')}
              className="p-1 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 rounded"
            >
              <Copy className="w-4 h-4 text-yellow-700 dark:text-yellow-300" />
            </button>
          </div>
        </div>
        <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-3">
          💡 Set VITE_SHEETS_PRIORITY=true to make Google Sheets override MongoDB completely
        </p>
      </div>
    </div>
  );
}
