import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Image, FileText, Settings, ArrowRight, Loader2 } from 'lucide-react';
import { productsAPI, galleryAPI } from '../services/api';

const quickLinks = [
  { path: '/admin/hero', icon: FileText, label: 'Edit Hero', color: 'from-blue-500 to-blue-600' },
  { path: '/admin/products', icon: Package, label: 'Manage Products', color: 'from-green-500 to-green-600' },
  { path: '/admin/gallery', icon: Image, label: 'Gallery', color: 'from-purple-500 to-purple-600' },
  { path: '/admin/settings', icon: Settings, label: 'Settings', color: 'from-orange-500 to-orange-600' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, galleryRes] = await Promise.all([
        productsAPI.getAll(),
        galleryAPI.getAll()
      ]);
      setStats({
        products: productsRes.data.count || 0,
        gallery: galleryRes.data.count || 0
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to Adishri Enterprises Admin Panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mt-2" />
              ) : (
                <p className="text-3xl font-bold text-foreground mt-1">{stats.products}</p>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Gallery Images</p>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mt-2" />
              ) : (
                <p className="text-3xl font-bold text-foreground mt-1">{stats.gallery}</p>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="group bg-card rounded-xl border border-border p-5 hover:border-primary/50 
                           hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${link.color} 
                                flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary 
                                        group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Getting Started</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>• Update your <Link to="/admin/hero" className="text-primary hover:underline">Hero Section</Link> with your company tagline</p>
          <p>• Add your products in the <Link to="/admin/products" className="text-primary hover:underline">Products Manager</Link></p>
          <p>• Upload factory and product images to the <Link to="/admin/gallery" className="text-primary hover:underline">Gallery</Link></p>
          <p>• Update <Link to="/admin/contact" className="text-primary hover:underline">Contact Information</Link> with your details</p>
          <p>• Configure <Link to="/admin/settings" className="text-primary hover:underline">Site Settings</Link> like logo and SEO</p>
        </div>
      </div>
    </div>
  );
}
