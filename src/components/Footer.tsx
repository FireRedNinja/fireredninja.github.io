import React, { useRef } from "react";
import { profile } from "../data";
import { gsap, useGSAP } from "../lib/gsap";
import MagneticButton from "./MagneticButton";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".footer-content",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 92%", once: true },
        }
      );

      gsap.utils.toArray<Element>(".footer-social-icon").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1, scale: 1,
            duration: 0.45,
            delay: 0.12 + i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: footerRef.current, start: "top 92%", once: true },
          }
        );
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="px-8 py-20 md:px-16"
      role="contentinfo"
      style={{ borderTop: "1px solid rgba(240,240,238,0.06)" }}
    >
      <div className="mx-auto max-w-6xl footer-content" style={{ opacity: 0 }}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-12">
          <span
            className="font-display font-black uppercase"
            style={{
              color: "#F0F0EE",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {profile.handle}
          </span>
          <span
            className="font-sans"
            style={{ fontSize: "0.65rem", color: "rgba(240,240,238,0.22)", letterSpacing: "0.14em" }}
          >
            © {currentYear}
          </span>
        </div>

        <nav aria-label="Social media links">
          <ul className="flex items-center gap-3" role="list">
            {profile.socialLinks.map(link => {
              const Icon = link.icon;
              return (
                <li key={link.name} className="footer-social-icon" style={{ opacity: 0 }}>
                  <MagneticButton strength={0.4}>
                    <a
                      href={link.url}
                      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={link.ariaLabel}
                      className="flex h-11 w-11 items-center justify-center transition-all duration-200"
                      style={{
                        color: "rgba(240,240,238,0.4)",
                        border: "1px solid rgba(240,240,238,0.1)",
                        borderRadius: "2px",
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.color = "#C8F135";
                        el.style.borderColor = "#C8F135";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.color = "rgba(240,240,238,0.4)";
                        el.style.borderColor = "rgba(240,240,238,0.1)";
                      }}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
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
