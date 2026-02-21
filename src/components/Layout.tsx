import React, { type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GrainOverlay from "./GrainOverlay";
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
  return (
    <div className="relative min-h-screen w-full bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <GrainOverlay />
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
