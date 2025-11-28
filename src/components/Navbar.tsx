import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Menu, Moon, Sun } from "lucide-react";
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
import {
  useReducedMotion,
  getNavLinkVariants,
  getStaggerContainer,
  getStaggerChild,
} from "../lib/motion";

type Theme = "light" | "dark";

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  // Handle SSR - only show interactive elements after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    if (!isMounted) return;
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, [isMounted]);

  // Toggle theme function
  const toggleTheme = useCallback((): void => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

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

  // Handle scroll for navbar background
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation click
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      // Update URL without adding to history
      window.history.replaceState(null, "", href);
    }
    setIsOpen(false);
  };

  const navLinkVariants = getNavLinkVariants(reducedMotion);
  const staggerContainer = getStaggerContainer(reducedMotion, 0.1);
  const staggerChild = getStaggerChild(reducedMotion);

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
            main.scrollIntoView({
              behavior: reducedMotion ? "auto" : "smooth",
            });
          }
        }}
      >
        Skip to main content
      </a>

      {/* Navbar */}
      <motion.header
        initial={reducedMotion ? {} : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          reducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }
        }
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-bg-light/95 shadow-md backdrop-blur-sm dark:bg-bg-dark/95"
            : "bg-transparent"
        )}
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
            className="text-xl font-bold text-text-primary dark:text-text-primary-dark"
            onClick={(e) => handleNavClick(e, "#hero")}
            aria-label={`${profile.firstName} - Go to top of page`}
          >
            {profile.firstName}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                className="relative"
                initial="initial"
                whileHover="hover"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative px-4 py-2 text-base font-medium transition-colors min-h-[44px] min-w-[44px] inline-flex items-center",
                    activeSection === item.href.replace("#", "")
                      ? "text-accent-orange dark:text-accent-orange-dark"
                      : "text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark"
                  )}
                  aria-label={item.ariaLabel}
                  aria-current={
                    activeSection === item.href.replace("#", "")
                      ? "true"
                      : undefined
                  }
                >
                  {item.label}
                  {/* Animated underline */}
                  <motion.span
                    variants={navLinkVariants}
                    className={cn(
                      "absolute bottom-0 left-4 right-4 h-0.5 bg-accent-orange dark:bg-accent-orange-dark",
                      activeSection === item.href.replace("#", "")
                        ? "scale-x-100"
                        : ""
                    )}
                    initial={
                      activeSection === item.href.replace("#", "")
                        ? "active"
                        : "initial"
                    }
                    style={{ originX: 0 }}
                  />
                </a>
              </motion.div>
            ))}

            {/* Theme Toggle - Desktop */}
            {isMounted && (
              <motion.div
                whileHover={reducedMotion ? {} : { scale: 1.05 }}
                whileTap={reducedMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  aria-pressed={theme === "dark"}
                  className="ml-2"
                >
                  <motion.div
                    key={theme}
                    initial={reducedMotion ? {} : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={reducedMotion ? {} : { rotate: 90, opacity: 0 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.2, ease: "easeInOut" }
                    }
                  >
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Sun className="h-5 w-5" aria-hidden="true" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle - Mobile */}
            {isMounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                aria-pressed={theme === "dark"}
              >
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Sun className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            )}

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
                <motion.nav
                  className="mt-8 flex flex-col gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  aria-label="Mobile navigation"
                >
                  {navItems.map((item) => (
                    <motion.div key={item.href} variants={staggerChild}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                          "block px-4 py-3 text-lg font-medium transition-colors rounded-lg min-h-[44px]",
                          activeSection === item.href.replace("#", "")
                            ? "bg-bg-hover-light text-accent-orange dark:bg-bg-hover-dark dark:text-accent-orange-dark"
                            : "text-text-secondary hover:bg-bg-hover-light hover:text-text-primary dark:text-text-secondary-dark dark:hover:bg-bg-hover-dark dark:hover:text-text-primary-dark"
                        )}
                        aria-label={item.ariaLabel}
                        aria-current={
                          activeSection === item.href.replace("#", "")
                            ? "true"
                            : undefined
                        }
                      >
                        {item.label}
                      </a>
                    </motion.div>
                  ))}
                </motion.nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>
    </>
  );
};

export default Navbar;
