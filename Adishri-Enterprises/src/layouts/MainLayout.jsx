// MainLayout - Shared layout with Navbar and Footer
import { Outlet } from "react-router-dom";
import { Navbar, Footer, WhatsAppButton } from "../views/components";
import RefreshButton from "../views/components/RefreshButton";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      {/* Show refresh button only in production */}
      {import.meta.env.PROD && <RefreshButton />}
    </div>
  );
}
