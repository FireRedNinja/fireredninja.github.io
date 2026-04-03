import React, { useRef } from "react";
import { profile } from "../data";
import { gsap, useGSAP } from "../lib/gsap";
import MagneticButton from "./MagneticButton";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  // ── Scroll-triggered reveals ────────────────────────────────────
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Border line draws in from center
      gsap.set(".footer-border", { scaleX: 0 });
      gsap.to(".footer-border", {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 92%",
          once: true,
        },
      });

      // Brand + copyright fades up
      gsap.set(".footer-copyright", { opacity: 0, y: 20 });
      gsap.to(".footer-copyright", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 88%",
          once: true,
        },
      });

      // Social icons pop with rotation
      gsap.set(".footer-social-icon", {
        scale: 0,
        rotation: -180,
        opacity: 0,
      });
      gsap.to(".footer-social-icon", {
        scale: 1,
        rotation: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power4.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="py-16 px-8 md:px-16"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        {/* Terracotta rule */}
        <div
          className="footer-border mb-12"
          style={{ height: '1px', backgroundColor: '#C4613A', transformOrigin: 'center' }}
          aria-hidden="true"
        />

        {/* Row 1: brand mark + copyright */}
        <div className="footer-copyright flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-10">
          <span
            className="font-display font-bold uppercase"
            style={{ color: '#F5EDD8', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}
          >
            {profile.handle}
          </span>
          <span className="font-sans text-sm" style={{ color: 'rgba(245,237,216,0.45)' }}>
            © {currentYear}
          </span>
        </div>

        {/* Row 2: social links */}
        <nav aria-label="Social media links">
          <ul className="flex items-center gap-4" role="list">
            {profile.socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.name} className="footer-social-icon">
                  <MagneticButton strength={0.45}>
                    <a
                      href={link.url}
                      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={link.ariaLabel}
                      className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200"
                      style={{ color: '#F5EDD8' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#C4613A'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#F5EDD8'; }}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </MagneticButton>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
