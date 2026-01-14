// Scroll Controller - Scroll Behavior & Navigation
import { useState, useEffect, useCallback } from "react";

// Custom Hook for Scroll Direction Detection
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScroll, setPrevScroll] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Determine scroll direction
      if (currentScroll > prevScroll && currentScroll > 80) {
        setScrollDirection("down");
        setVisible(false);
      } else {
        setScrollDirection("up");
        setVisible(true);
      }
      
      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return { scrollDirection, visible, scrollY: prevScroll };
}

// Custom Hook for Scroll Progress
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

// Custom Hook for Scroll to Section
export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return { scrollToSection, scrollToTop };
}

// Custom Hook for Active Section Detection
export function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return activeSection;
}

export default {
  useScrollDirection,
  useScrollProgress,
  useScrollToSection,
  useActiveSection
};
