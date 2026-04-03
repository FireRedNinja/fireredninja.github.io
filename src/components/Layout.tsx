import React, { useRef, type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useVelocitySkew } from "../hooks/useVelocitySkew";
import { useGSAP, gsap, ScrollTrigger } from "../lib/gsap";
import "./index.css";

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showNavbar = true,
  showFooter = true,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Apply velocity skew to sections with the .skew-on-scroll class
  useVelocitySkew(wrapperRef, ".skew-on-scroll", 3);

  // Scroll-driven background color transitions ("The Canvas")
  useGSAP(() => {
    if (typeof window === 'undefined') return; // SSR guard

    const sectionColors = [
      { selector: '#hero', color: '#F5EDD8' },
      { selector: '#projects', color: '#1A2B1F' },
      { selector: '#skills', color: '#C4613A' },
      { selector: 'footer', color: '#1C1208' },
    ];

    // Set initial background
    gsap.set(wrapperRef.current, { backgroundColor: '#F5EDD8' });

    sectionColors.forEach(({ selector, color }) => {
      const el = wrapperRef.current?.querySelector(selector);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        onEnter: () =>
          gsap.to(wrapperRef.current, {
            backgroundColor: color,
            duration: 0.8,
            ease: 'power2.inOut',
            overwrite: 'auto',
          }),
        onEnterBack: () =>
          gsap.to(wrapperRef.current, {
            backgroundColor: color,
            duration: 0.8,
            ease: 'power2.inOut',
            overwrite: 'auto',
          }),
      });
    });
  }, { scope: wrapperRef });

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-screen w-full"
      style={{ backgroundColor: '#F5EDD8' }}
    >
      {showNavbar && <Navbar />}
      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
        role="main"
      >
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
