import React, { useRef, useEffect, type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
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
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  // Custom cursor — dot snaps instantly, glow lerps behind
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dot = cursorDotRef.current;
    const glow = cursorGlowRef.current;
    if (!dot || !glow) return;

    let mx = 0, my = 0, gx = 0, gy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const tick = () => {
      gx += (mx - gx) * 0.075;
      gy += (my - gy) * 0.075;
      glow.style.left = `${gx}px`;
      glow.style.top = `${gy}px`;
      raf = requestAnimationFrame(tick);
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[role=button],input,textarea")) {
        dot.classList.add("is-hovering");
      }
    };
    const onLeave = () => dot.classList.remove("is-hovering");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll-driven background color transitions
  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const sectionColors = [
        { selector: "#hero",     color: "#080808" },
        { selector: "#projects", color: "#080808" },
        { selector: "#skills",   color: "#0D0D0C" },
        { selector: "footer",    color: "#080808" },
      ];

      gsap.set(wrapperRef.current, { backgroundColor: "#080808" });

      sectionColors.forEach(({ selector, color }) => {
        const el = wrapperRef.current?.querySelector(selector);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          onEnter: () =>
            gsap.to(wrapperRef.current, { backgroundColor: color, duration: 0.9, ease: "power2.inOut", overwrite: "auto" }),
          onEnterBack: () =>
            gsap.to(wrapperRef.current, { backgroundColor: color, duration: 0.9, ease: "power2.inOut", overwrite: "auto" }),
        });
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-screen w-full"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Noise texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <div ref={cursorDotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={cursorGlowRef} className="cursor-glow" aria-hidden="true" />

      {showNavbar && <Navbar />}
      <main id="main-content" tabIndex={-1} className="outline-none" role="main">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
