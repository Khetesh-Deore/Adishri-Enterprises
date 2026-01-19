// App.jsx - Main Application with Routing and Lazy Loading
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./controllers/useTheme";
import MainLayout from "./layouts/MainLayout";
import { PageLoader } from "./views/shared";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const VisionPage = lazy(() => import("./pages/VisionPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));

// Admin imports - lazy loaded
const AuthProvider = lazy(() => import("./admin/context/AuthContext").then(m => ({ default: m.AuthProvider })));
const AdminLayout = lazy(() => import("./admin/components/AdminLayout"));
const ProtectedRoute = lazy(() => import("./admin/components/ProtectedRoute"));
const Login = lazy(() => import("./admin/pages/Login"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const HeroEditor = lazy(() => import("./admin/pages/HeroEditor"));
const HeroSliderEditor = lazy(() => import("./admin/pages/HeroSliderEditor"));
const AboutEditor = lazy(() => import("./admin/pages/AboutEditor"));
const ProductsManager = lazy(() => import("./admin/pages/ProductsManager"));
const GalleryManager = lazy(() => import("./admin/pages/GalleryManager"));
const ContactEditor = lazy(() => import("./admin/pages/ContactEditor"));
const SettingsEditor = lazy(() => import("./admin/pages/SettingsEditor"));
const UsersManager = lazy(() => import("./admin/pages/UsersManager"));
const VisionEditor = lazy(() => import("./admin/pages/VisionEditor"));

// Loading fallback component - using PageLoader from shared components

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<PageLoader />}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={
                  <Suspense fallback={<PageLoader />}>
                    <HomePage />
                  </Suspense>
                } />
                <Route path="about" element={
                  <Suspense fallback={<PageLoader />}>
                    <AboutPage />
                  </Suspense>
                } />
                <Route path="vision" element={
                  <Suspense fallback={<PageLoader />}>
                    <VisionPage />
                  </Suspense>
                } />
                <Route path="products" element={
                  <Suspense fallback={<PageLoader />}>
                    <ProductsPage />
                  </Suspense>
                } />
                <Route path="gallery" element={
                  <Suspense fallback={<PageLoader />}>
                    <GalleryPage />
                  </Suspense>
                } />
                <Route path="contact" element={
                  <Suspense fallback={<PageLoader />}>
                    <ContactPage />
                  </Suspense>
                } />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={
                <Suspense fallback={<PageLoader />}>
                  <Login />
                </Suspense>
              } />
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  </Suspense>
                }
              >
                <Route index element={
                  <Suspense fallback={<PageLoader />}>
                    <Dashboard />
                  </Suspense>
                } />
                <Route path="hero" element={
                  <Suspense fallback={<PageLoader />}>
                    <HeroEditor />
                  </Suspense>
                } />
                <Route path="hero-slider" element={
                  <Suspense fallback={<PageLoader />}>
                    <HeroSliderEditor />
                  </Suspense>
                } />
                <Route path="about" element={
                  <Suspense fallback={<PageLoader />}>
                    <AboutEditor />
                  </Suspense>
                } />
                <Route path="products" element={
                  <Suspense fallback={<PageLoader />}>
                    <ProductsManager />
                  </Suspense>
                } />
                <Route path="gallery" element={
                  <Suspense fallback={<PageLoader />}>
                    <GalleryManager />
                  </Suspense>
                } />
                <Route path="contact" element={
                  <Suspense fallback={<PageLoader />}>
                    <ContactEditor />
                  </Suspense>
                } />
                <Route path="settings" element={
                  <Suspense fallback={<PageLoader />}>
                    <SettingsEditor />
                  </Suspense>
                } />
                <Route path="users" element={
                  <Suspense fallback={<PageLoader />}>
                    <UsersManager />
                  </Suspense>
                } />
                <Route path="vision" element={
                  <Suspense fallback={<PageLoader />}>
                    <VisionEditor />
                  </Suspense>
                } />
              </Route>
            </Routes>
          </BrowserRouter>
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--card)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)'
              },
              success: {
                iconTheme: { primary: 'var(--accent)', secondary: 'white' }
              },
              error: {
                iconTheme: { primary: 'var(--destructive)', secondary: 'white' }
              }
            }}
          />
        </AuthProvider>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
