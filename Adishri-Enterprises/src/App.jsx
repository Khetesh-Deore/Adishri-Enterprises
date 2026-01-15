// App.jsx - Main Application with Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./controllers/useTheme";
import MainLayout from "./layouts/MainLayout";
import { HomePage, AboutPage, VisionPage, ProductsPage, ContactPage } from "./pages";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="vision" element={<VisionPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
