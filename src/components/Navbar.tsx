import React, { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { navItems, profile } from "../data";
import { cn } from "../lib/utils";
import { gsap, useGSAP } from "../lib/gsap";
import RollingText from "./RollingText";

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [inFooter, setInFooter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle SSR - only show interactive elements after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ── Navbar entrance (delayed to play after hero) ──────────────
  useGSAP(
    () => {
      if (!isMounted) return;

      const container = navRef.current;
      if (!container) return;

      // Remove CSS hidden-state classes — GSAP takes over via inline styles.
      const hiddenEls = container.querySelectorAll(".gsap-hidden-fade");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hiddenEls.forEach((el) => el.classList.remove("gsap-hidden-fade"));
        return;
      }

      hiddenEls.forEach((el) => el.classList.remove("gsap-hidden-fade"));

      // Use fromTo() to supply both start and end values, avoiding
      // forced reflows from GSAP reading getComputedStyle.
      const tl = gsap.timeline({ delay: 1.5 });

      tl.fromTo(
        ".nav-logo",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      ).fromTo(
        ".nav-link",
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3"
      );
    },
    { scope: navRef, dependencies: [isMounted] }
  );

  // Scroll spy using Intersection Observer
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = navItems.map((item) => item.href.replace("#", ""));

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Footer intersection observer
  useEffect(() => {
    if (typeof window === "undefined") return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInFooter(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  // Handle navigation click
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL without adding to history
      window.history.replaceState(null, "", href);
    }
    setIsOpen(false);
  };

  // Sections where the background is dark → nav text should be light/cream
  const lightNavSections = ["projects", "skills"];
  const navIsLight = lightNavSections.includes(activeSection) || inFooter;

  // Accent color: cream on Skills (terracotta bg), terracotta everywhere else
  const navAccent = activeSection === "skills" ? "#F5EDD8" : "#C4613A";

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById("main-content");
          if (main) {
            main.focus();
            main.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        Skip to main content
      </a>

      {/* Navbar */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          color: navIsLight ? "#F5EDD8" : "#1C1208",
          transition: "color 0.5s ease",
        }}
        role="banner"
      >
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#hero"
            className="nav-logo gsap-hidden-fade font-display text-2xl font-bold uppercase tracking-[-0.02em]"
            onClick={(e) => handleNavClick(e, "#hero")}
            aria-label={`${profile.handle} - Go to top of page`}
          >
            {profile.handle}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="nav-link gsap-hidden-fade group relative"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative px-4 py-2 text-base font-medium min-h-[44px] min-w-[44px] inline-flex items-center transition-opacity duration-200",
                    activeSection === item.href.replace("#", "")
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-90"
                  )}
                  style={
                    activeSection === item.href.replace("#", "")
                      ? { color: navAccent }
                      : {}
                  }
                  aria-label={item.ariaLabel}
                  aria-current={
                    activeSection === item.href.replace("#", "")
                      ? "true"
                      : undefined
                  }
                >
                  <RollingText>{item.label}</RollingText>
                  {/* Underline */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-4 right-4 h-0.5 origin-left transition-transform duration-200",
                      activeSection === item.href.replace("#", "")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                    style={{ backgroundColor: navAccent }}
                  />
                </a>
              </div>
            ))}

          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Menu Sheet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  aria-expanded={isOpen}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Use the links below to navigate to different sections of the
                  page
                </SheetDescription>
                <nav
                  className="mt-8 flex flex-col gap-4"
                  aria-label="Mobile navigation"
                >
                  {navItems.map((item) => (
                    <div key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                          "block px-4 py-3 text-lg font-medium rounded-lg min-h-[44px] transition-opacity duration-200",
                          activeSection === item.href.replace("#", "")
                            ? "opacity-100"
                            : "opacity-60 hover:opacity-90"
                        )}
                        style={
                          activeSection === item.href.replace("#", "")
                            ? { color: navAccent }
                            : {}
                        }
                        aria-label={item.ariaLabel}
                        aria-current={
                          activeSection === item.href.replace("#", "")
                            ? "true"
                            : undefined
                        }
                      >
                        {item.label}
                      </a>
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
