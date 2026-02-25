import React, { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { profile } from "../data";
import { gsap, useGSAP } from "../lib/gsap";
import MagneticButton from "./MagneticButton";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nameWords = profile.name.split(" ");
  const roleText = profile.role;

  // ── Hero entrance timeline ──────────────────────────────────────
  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Remove CSS hidden-state classes — done synchronously before any paint,
      // so there is no visible flash. GSAP takes over via inline styles.
      const hiddenEls = container.querySelectorAll(
        ".gsap-hidden-y, .gsap-hidden-fade, .gsap-hidden-char-1"
      );

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hiddenEls.forEach((el) =>
          el.classList.remove(
            "gsap-hidden-y",
            "gsap-hidden-fade",
            "gsap-hidden-char-1"
          )
        );
        return;
      }

      hiddenEls.forEach((el) =>
        el.classList.remove(
          "gsap-hidden-y",
          "gsap-hidden-fade",
          "gsap-hidden-char-1"
        )
      );

      // Use fromTo() to provide both start and end values, avoiding
      // forced reflows from GSAP reading getComputedStyle.
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.3,
      });

      // Role label slides up
      tl.fromTo(
        ".hero-role",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        // First name chars stagger in
        .fromTo(
          ".hero-char-0",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, stagger: 0.04 },
          "-=0.3"
        )
        // Second name (stroke) chars with subtle rotation
        .fromTo(
          ".hero-char-1",
          { yPercent: 110, rotation: 3 },
          { yPercent: 0, rotation: 0, duration: 0.7, stagger: 0.04 },
          "-=0.4"
        )
        // CTA button with overshoot
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            clearProps: "all",
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex h-screen flex-col justify-center overflow-hidden pt-24"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
        {/* Role label — appears above name as a typographic anchor */}
        <div className="mb-4 overflow-hidden">
          <p className="hero-role gsap-hidden-y font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary dark:text-text-secondary-dark sm:text-sm">
            {roleText}
          </p>
        </div>

        {/* Name — stacked words */}
        <h1
          id="hero-heading"
          className="mb-8 w-full font-display font-bold uppercase"
          style={{
            fontSize: "clamp(3rem, min(31vw, 38vh), 9999px)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
          }}
        >
          {nameWords.map((word, wi) => {
            const isStroke = wi % 2 !== 0;
            const wordClass = isStroke
              ? "text-text-primary dark:text-text-primary-dark text-stroke"
              : "text-text-primary dark:text-text-primary-dark";

            return (
              <span key={wi} className="block whitespace-nowrap">
                {word.split("").map((char, ci) => {
                  const key = `${wi}-${ci}`;
                  return (
                    <span
                      key={key}
                      style={{ display: "inline-block", overflow: "hidden" }}
                    >
                      <span
                        className={`hero-char hero-char-${wi} gsap-hidden-y ${wi === 1 ? "gsap-hidden-char-1" : ""} ${wordClass}`}
                        style={{ display: "inline-block" }}
                        aria-hidden="true"
                      >
                        {char}
                      </span>
                    </span>
                  );
                })}
                {/* Screen-reader-only full word so assistive tech reads "Noel Rajan" */}
                <span className="sr-only">{word}</span>
              </span>
            );
          })}
        </h1>

        {/* CTA Button */}
        <div className="hero-cta gsap-hidden-fade flex justify-center">
          <MagneticButton>
            <Button
              size="lg"
              onClick={handleScrollToProjects}
              className="group gap-2"
              aria-label="View my projects - scroll to projects section"
            >
              View My Work
              <span>
                <ArrowDown
                  className="h-5 w-5 transition-transform group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </span>
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
