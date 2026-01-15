// App.jsx - Main Application with Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./controllers/useTheme";
import MainLayout from "./layouts/MainLayout";
import { HomePage, AboutPage, VisionPage, ProductsPage, ContactPage, GalleryPage } from "./pages";

// Admin imports
import { AuthProvider } from "./admin/context/AuthContext";
import AdminLayout from "./admin/components/AdminLayout";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import {
  Login,
  Dashboard,
  HeroEditor,
  AboutEditor,
  ProductsManager,
  GalleryManager,
  ContactEditor,
  SettingsEditor,
  UsersManager,
  VisionEditor
} from "./admin/pages";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="vision" element={<VisionPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="hero" element={<HeroEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="products" element={<ProductsManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="contact" element={<ContactEditor />} />
              <Route path="settings" element={<SettingsEditor />} />
              <Route path="users" element={<UsersManager />} />
              <Route path="vision" element={<VisionEditor />} />
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
    </ThemeProvider>
  );
}

export default App;
