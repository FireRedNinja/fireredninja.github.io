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
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Delayed entrance — plays after hero
  useGSAP(
    () => {
      if (!isMounted) return;
      const container = navRef.current;
      if (!container) return;

      container.querySelectorAll(".gsap-hidden-fade").forEach(el => el.classList.remove("gsap-hidden-fade"));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ delay: 1.4 });
      tl.fromTo(".nav-logo", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .fromTo(".nav-link", { opacity: 0, y: -8  }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" }, "-=0.3");
    },
    { scope: navRef, dependencies: [isMounted] }
  );

  // Scroll spy
  useEffect(() => {
    if (typeof window === "undefined") return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    navItems.map(i => i.href.replace("#", "")).forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", href);
    setIsOpen(false);
  };

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        onClick={e => { e.preventDefault(); const m = document.getElementById("main-content"); if (m) { m.focus(); m.scrollIntoView({ behavior: "smooth" }); } }}
      >
        Skip to main content
      </a>

      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          color: "#F0F0EE",
          borderBottom: scrolled ? "1px solid rgba(240,240,238,0.06)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          backgroundColor: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
        }}
        role="banner"
      >
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <a
            href="#hero"
            className="nav-logo gsap-hidden-fade font-display font-black uppercase"
            onClick={e => handleNavClick(e, "#hero")}
            aria-label={`${profile.handle} — Go to top`}
            style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)", letterSpacing: "-0.02em", color: "#F0F0EE" }}
          >
            {profile.handle}
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map(item => (
              <div key={item.href} className="nav-link gsap-hidden-fade group relative">
                <a
                  href={item.href}
                  onClick={e => handleNavClick(e, item.href)}
                  className={cn(
                    "relative px-4 py-2 font-sans text-xs font-medium min-h-[44px] min-w-[44px] inline-flex items-center uppercase tracking-[0.14em] transition-all duration-200",
                    isActive(item.href) ? "opacity-100" : "opacity-40 hover:opacity-75"
                  )}
                  style={{ color: isActive(item.href) ? "#C8F135" : "#F0F0EE" }}
                  aria-label={item.ariaLabel}
                  aria-current={isActive(item.href) ? "true" : undefined}
                >
                  <RollingText>{item.label}</RollingText>
                  <span
                    className={cn(
                      "absolute bottom-0 left-4 right-4 h-px origin-left transition-transform duration-200",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                    style={{ backgroundColor: "#C8F135" }}
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu" aria-expanded={isOpen}
                  style={{ color: "#F0F0EE" }}>
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64"
                style={{ backgroundColor: "#111110", borderColor: "rgba(240,240,238,0.08)" }}>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Navigate to sections</SheetDescription>
                <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile navigation">
                  {navItems.map(item => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={e => handleNavClick(e, item.href)}
                      className="block px-4 py-3 font-sans text-base font-medium min-h-[44px] uppercase tracking-[0.12em] transition-all duration-200"
                      style={{ color: isActive(item.href) ? "#C8F135" : "rgba(240,240,238,0.5)" }}
                      aria-label={item.ariaLabel}
                      aria-current={isActive(item.href) ? "true" : undefined}
                    >
                      {item.label}
                    </a>
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
