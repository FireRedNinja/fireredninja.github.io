import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  /** Attraction strength — 0 = none, 1 = full cursor offset. Default 0.35 */
  strength?: number;
}

/**
 * Wraps a child element with a magnetic cursor-attraction effect.
 * The button subtly follows the cursor when hovering within its bounds.
 * Disabled on touch devices and when reduced motion is preferred.
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.35,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (ScrollTrigger.isTouch) return;

      const el = ref.current;
      if (!el) return;

      xTo.current = gsap.quickTo(el, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      yTo.current = gsap.quickTo(el, "y", {
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (!ref.current || !xTo.current || !yTo.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    xTo.current((e.clientX - centerX) * strength);
    yTo.current((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = (): void => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
