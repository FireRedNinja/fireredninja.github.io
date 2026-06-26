import React, { useRef } from "react";
import { profile } from "../data";
import { gsap, SplitText, useGSAP } from "../lib/gsap";
import RoleCycler from "./RoleCycler";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  const nameParts = profile.name.split(" ");
  const lastName = nameParts[nameParts.length - 1].toUpperCase();

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Parallax ghost text on scroll
      if (!reduced && bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          yPercent: 28,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      if (reduced) {
        [firstNameRef.current, lastNameRef.current, lineRef.current, metaRef.current, scrollRef.current]
          .forEach(el => { if (el) el.style.opacity = "1"; });
        return;
      }

      // Char-by-char entrance on first name
      let split: InstanceType<typeof SplitText> | null = null;
      if (firstNameRef.current) {
        split = SplitText.create(firstNameRef.current, { type: "chars", mask: "chars" });
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 });

      if (split?.chars) {
        tl.fromTo(
          split.chars,
          { yPercent: 110, rotateZ: 5 },
          { yPercent: 0, rotateZ: 0, duration: 1.0, stagger: 0.04 }
        );
      }

      tl.fromTo(
        lastNameRef.current,
        { xPercent: 40, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
        "-=0.65"
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.7, ease: "power3.out", transformOrigin: "left" },
        "-=0.45"
      )
      .fromTo(
        metaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.25"
      );

      // Scroll indicator line draw
      const lineInner = container.querySelector<HTMLElement>(".scroll-line-inner");
      if (lineInner) {
        gsap.fromTo(
          lineInner,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 1.4,
            ease: "power2.inOut",
            repeat: -1,
            repeatDelay: 0.6,
            delay: 2.4,
          }
        );
      }

      return () => { split?.revert(); };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex h-screen flex-col justify-end overflow-hidden px-8 pb-16 pt-32 md:px-16 md:pb-24"
      aria-labelledby="hero-heading"
    >
      {/* Ghost oversized letter — parallax bg */}
      <div
        ref={bgTextRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(18rem, 70vw, 110rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(240,240,238,0.035)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {profile.firstName.toUpperCase()}
        </span>
      </div>

      {/* Main name block */}
      <div className="relative z-10">
        <h1
          id="hero-heading"
          aria-label={profile.name}
          style={{ lineHeight: 0.88 }}
        >
          {/* NOEL — char-split entrance */}
          <span
            ref={firstNameRef}
            className="block overflow-hidden font-display font-black uppercase"
            style={{
              fontSize: "clamp(4.5rem, 19vw, 24rem)",
              letterSpacing: "-0.03em",
              color: "#F0F0EE",
            }}
          >
            {profile.firstName.toUpperCase()}
          </span>

          {/* RAJAN — acid green, offset right */}
          <span
            ref={lastNameRef}
            className="block font-display font-black uppercase"
            style={{
              fontSize: "clamp(4.5rem, 19vw, 24rem)",
              letterSpacing: "-0.03em",
              color: "#C8F135",
              paddingLeft: "clamp(2.5rem, 10vw, 16rem)",
              opacity: 0,
            }}
            aria-hidden="true"
          >
            {lastName}
          </span>
        </h1>

        {/* Thin separator line */}
        <div
          ref={lineRef}
          style={{
            height: "1px",
            backgroundColor: "rgba(240,240,238,0.1)",
            margin: "clamp(0.75rem, 1.5vw, 1.75rem) 0",
            opacity: 0,
          }}
          aria-hidden="true"
        />

        {/* Meta row — location / role cycler / year */}
        <div
          ref={metaRef}
          className="flex items-center justify-between opacity-0"
        >
          <span
            className="font-sans font-medium uppercase tracking-[0.22em]"
            style={{ fontSize: "0.65rem", color: "rgba(240,240,238,0.35)" }}
          >
            {profile.location}
          </span>

          <RoleCycler />

          <span
            className="font-sans font-medium uppercase tracking-[0.22em]"
            style={{ fontSize: "0.65rem", color: "rgba(240,240,238,0.35)" }}
          >
            {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* Vertical scroll indicator — bottom right */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-3 opacity-0"
        aria-hidden="true"
      >
        <span
          className="font-sans uppercase tracking-[0.2em]"
          style={{
            fontSize: "0.55rem",
            color: "rgba(240,240,238,0.3)",
            writingMode: "vertical-rl",
          }}
        >
          scroll
        </span>
        <div
          className="overflow-hidden"
          style={{ width: "1px", height: "52px", backgroundColor: "rgba(240,240,238,0.08)" }}
        >
          <div
            className="scroll-line-inner w-full h-full"
            style={{ backgroundColor: "#C8F135", transform: "scaleY(0)", transformOrigin: "top" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
