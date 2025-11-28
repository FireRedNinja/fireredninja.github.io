import React from "react";
import { motion } from "motion/react";
import { profile } from "../data";
import { useReducedMotion, getHoverScale } from "../lib/motion";

const Footer: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const hoverScale = getHoverScale(reducedMotion);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border-light bg-bg-muted-light py-12 px-4 dark:border-border-dark dark:bg-bg-muted-dark"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright */}
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
            © {currentYear} {profile.name}. All rights reserved.
          </p>

          {/* Social Links */}
          <nav aria-label="Social media links">
            <ul className="flex items-center gap-4" role="list">
              {profile.socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <motion.a
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
                      {...hoverScale}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </motion.a>
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
