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

      // Copyright text fades up
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
      gsap.set(".footer-social-icon", { scale: 0, rotation: -180, opacity: 0 });
      gsap.to(".footer-social-icon", {
        scale: 1,
        rotation: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
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
      className="bg-bg-muted-light py-12 px-4 dark:bg-bg-muted-dark"
      role="contentinfo"
    >
      {/* Animated border line */}
      <div
        className="footer-border mx-auto mb-12 h-px max-w-6xl origin-center bg-border-light dark:bg-border-dark"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright */}
          <p className="footer-copyright text-sm text-text-secondary dark:text-text-secondary-dark">
            © {currentYear} {profile.name}. All rights reserved.
          </p>

          {/* Social Links */}
          <nav aria-label="Social media links">
            <ul className="flex items-center gap-4" role="list">
              {profile.socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name} className="footer-social-icon">
                    <MagneticButton strength={0.45}>
                      <a
                        href={link.url}
                        target={
                          link.url.startsWith("mailto:") ? undefined : "_blank"
                        }
                        rel={
                          link.url.startsWith("mailto:")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        aria-label={link.ariaLabel}
                        className="flex h-11 w-11 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-hover-light hover:text-text-primary dark:text-text-secondary-dark dark:hover:bg-bg-hover-dark dark:hover:text-text-primary-dark"
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
      </div>
    </footer>
  );
};

export default Footer;
