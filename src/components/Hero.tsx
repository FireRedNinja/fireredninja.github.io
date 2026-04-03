import React, { useRef, useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import { profile } from "../data";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import RoleCycler from "./RoleCycler";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const rajanRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLHRElement>(null);
  const roleCyclerRef = useRef<HTMLDivElement>(null);

  // Disable cursor effect on touch devices
  const [isTouchDevice] = useState(() =>
    typeof window !== "undefined" ? "ontouchstart" in window : false
  );

  // Split name: firstName = "Noel", lastName = last word of profile.name
  const firstNameLetters = profile.firstName.split("");
  const nameParts = profile.name.split(" ");
  const lastName = nameParts[nameParts.length - 1].toUpperCase();

  // ── Cursor gradient effect ──────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isTouchDevice) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--cursor-x", `${x}%`);
      el.style.setProperty("--cursor-y", `${y}%`);
    },
    [isTouchDevice]
  );

  // ── Hero entrance timeline ──────────────────────────────────────
  const { contextSafe } = useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Remove CSS hidden-state classes synchronously so GSAP takes over via inline styles
      const hiddenEls = container.querySelectorAll(
        ".gsap-hidden-y, .gsap-hidden-fade"
      );

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hiddenEls.forEach((el) =>
          el.classList.remove("gsap-hidden-y", "gsap-hidden-fade")
        );
        return;
      }

      hiddenEls.forEach((el) =>
        el.classList.remove("gsap-hidden-y", "gsap-hidden-fade")
      );

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.3,
      });

      // 1. NOEL letters stagger drop in from yPercent: 110
      tl.fromTo(
        ".hero-letter",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "elastic.out(1, 0.4)",
        }
      )
        // 2. RAJAN sweeps in from right
        .fromTo(
          rajanRef.current,
          { x: "100vw" },
          { x: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        // 3. Rule draws from left
        .fromTo(
          ruleRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power3.out",
            transformOrigin: "left",
          },
          "-=0.2"
        )
        // 4. Role cycler fades in
        .fromTo(
          roleCyclerRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        // 5. Scroll indicator fades in
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.1"
        );

      // Bounce animation on arrow (starts after entrance)
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 6,
          duration: 0.8,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2,
        });
      }
    },
    { scope: containerRef }
  );

  // ── Per-letter fill ↔ outline hover (NOEL only) ─────────────────
  const handleLetterEnter = contextSafe(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (ScrollTrigger.isTouch) return;
      gsap.to(e.currentTarget, {
        "--fill-color": "transparent",
        "--stroke-width": "3px",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  );

  const handleLetterLeave = contextSafe(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(e.currentTarget, {
        "--fill-color": "currentColor",
        "--stroke-width": "0px",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex h-screen flex-col justify-center overflow-hidden px-8 md:px-16 skew-on-scroll"
      aria-labelledby="hero-heading"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(700px circle at var(--cursor-x, 30%) var(--cursor-y, 50%), rgba(196, 97, 58, 0.12) 0%, transparent 60%)`,
      }}
    >
      {/* Name — broken staircase layout */}
      <h1
        id="hero-heading"
        aria-label={profile.name}
        className="font-display font-bold uppercase"
        style={{
          fontSize: "18vw",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          color: "#1C1208",
        }}
      >
        {/* Line 1: NOEL — far left, per-letter animation */}
        <span className="block">
          {firstNameLetters.map((letter, i) => (
            <span
              key={i}
              className="hero-letter gsap-hidden-y inline-block cursor-pointer"
              style={{
                WebkitTextFillColor: "var(--fill-color, currentColor)",
                WebkitTextStroke: "var(--stroke-width, 0px) currentColor",
                paintOrder: "stroke fill",
              }}
              onMouseEnter={handleLetterEnter}
              onMouseLeave={handleLetterLeave}
              aria-hidden="true"
            >
              {letter}
            </span>
          ))}
        </span>

        {/* Line 2: RAJAN — offset right on md+, animates as a block */}
        <span
          ref={rajanRef}
          className="block pl-0 md:pl-[8vw]"
          aria-hidden="true"
        >
          {lastName}
        </span>
      </h1>

      {/* Thin terracotta rule */}
      <hr
        ref={ruleRef}
        className="my-6 border-0"
        style={{
          height: "1px",
          backgroundColor: "#C4613A",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Role cycler — italic, Instrument Serif */}
      <div
        ref={roleCyclerRef}
        style={{
          fontFamily: "var(--font-editorial)",
          fontStyle: "italic",
          fontSize: "1rem",
          opacity: 0.8,
          color: "#1C1208",
        }}
      >
        <RoleCycler />
      </div>

      {/* Scroll indicator — bottom center */}
      <div className="hero-scroll-indicator gsap-hidden-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-sans text-xs uppercase tracking-widest opacity-60">
          scroll
        </span>
        <span ref={arrowRef} className="inline-block">
          <ArrowDown
            className="h-4 w-4"
            style={{ color: "#C4613A" }}
            aria-hidden="true"
          />
        </span>
        <span className="sr-only">scroll to projects</span>
      </div>
    </section>
  );
};

export default Hero;
