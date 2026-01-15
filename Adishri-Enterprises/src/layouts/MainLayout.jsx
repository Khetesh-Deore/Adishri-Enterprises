// MainLayout - Shared layout with Navbar and Footer
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../views/components";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
