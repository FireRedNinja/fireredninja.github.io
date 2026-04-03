import React, { useRef, useCallback } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { profile } from "../data";

/**
 * RoleCycler — auto-cycles through role titles with a cursor wipe effect.
 * On hover, immediately advances to the next role.
 * Auto-cycles every ~3s after the initial entrance delay.
 */
const RoleCycler: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);
  const nextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const autoTimerRef = useRef<gsap.core.Tween | null>(null);

  const roles = profile.roles;

  const cycleRole = useCallback(() => {
    if (isAnimatingRef.current) return;
    if (!currentRef.current || !nextRef.current || !cursorRef.current) return;

    isAnimatingRef.current = true;
    const nextIndex = (indexRef.current + 1) % roles.length;
    const nextText = roles[nextIndex];

    // Set the next text
    nextRef.current.textContent = nextText;

    const tl = gsap.timeline({
      onComplete: () => {
        indexRef.current = nextIndex;
        if (currentRef.current) currentRef.current.textContent = nextText;
        // Reset positions
        gsap.set(nextRef.current, { xPercent: 0, opacity: 0 });
        gsap.set(cursorRef.current, { left: 0 });
        isAnimatingRef.current = false;
      },
    });

    // Cursor sweeps across
    tl.fromTo(
      cursorRef.current,
      { left: 0, opacity: 1 },
      {
        left: "100%",
        duration: 0.6,
        ease: "power2.inOut",
      }
    )
      // Old text wipes out left-to-right (clip-path)
      .to(
        currentRef.current,
        {
          clipPath: "inset(0 0 0 100%)",
          duration: 0.6,
          ease: "power2.inOut",
        },
        0 // same time as cursor
      )
      // New text wipes in left-to-right
      .fromTo(
        nextRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      )
      // Fade cursor out at end
      .to(cursorRef.current, { opacity: 0, duration: 0.15 }, 0.55)
      // Reset current clip-path for next cycle
      .set(currentRef.current, { clipPath: "inset(0 0 0 0)" });
  }, [roles]);

  const { contextSafe } = useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Initial state
      gsap.set(nextRef.current, { opacity: 0 });
      gsap.set(cursorRef.current, { opacity: 0 });

      // Start auto-cycling after hero entrance (delay ~2s)
      autoTimerRef.current = gsap.delayedCall(3, () => {
        startAutoCycle();
      });
    },
    { scope: containerRef }
  );

  const startAutoCycle = useCallback(() => {
    // Kill existing timer
    autoTimerRef.current?.kill();
    autoTimerRef.current = gsap.delayedCall(3, () => {
      cycleRole();
      // After animation completes (~0.7s), restart timer
      gsap.delayedCall(0.7, startAutoCycle);
    });
  }, [cycleRole]);

  const handleMouseEnter = contextSafe(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Kill auto timer, cycle immediately, then restart
    autoTimerRef.current?.kill();
    cycleRole();
    gsap.delayedCall(0.7, startAutoCycle);
  });

  return (
    <div
      ref={containerRef}
      className="relative inline-block overflow-hidden"
      onMouseEnter={handleMouseEnter}
      role="status"
      aria-live="polite"
    >
      {/* Current text */}
      <span
        ref={currentRef}
        className="role-text font-sans text-xs font-medium uppercase tracking-[0.25em] sm:text-sm"
        style={{ clipPath: "inset(0 0 0 0)", color: "rgba(28,18,8,0.6)" }}
      >
        {roles[0]}
      </span>

      {/* Next text (overlaid) */}
      <span
        ref={nextRef}
        className="absolute inset-0 font-sans text-xs font-medium uppercase tracking-[0.25em] sm:text-sm"
        style={{ opacity: 0, clipPath: "inset(0 100% 0 0)", color: "rgba(28,18,8,0.6)" }}
        aria-hidden="true"
      >
        {roles[1]}
      </span>

      {/* Cursor line */}
      <span
        ref={cursorRef}
        className="pointer-events-none absolute top-0 bottom-0 w-px"
        style={{ left: 0, opacity: 0, backgroundColor: "#C4613A" }}
        aria-hidden="true"
      />
    </div>
  );
};

export default RoleCycler;
