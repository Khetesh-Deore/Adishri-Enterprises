// App.jsx - Main Application Component
import { ThemeProvider } from "./controllers/useTheme";
import {
  Navbar,
  Hero,
  Excellence,
  CoreValues,
  ProductCollection,
  Standards,
  ContactForm,
  Footer
} from "./views/components";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white overflow-hidden transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Excellence />
          <CoreValues />
          <ProductCollection />
          <Standards />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
