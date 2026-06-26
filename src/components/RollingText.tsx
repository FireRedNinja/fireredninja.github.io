import React, { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

interface RollingTextProps {
  children: string;
}

const RollingText: React.FC<RollingTextProps> = ({ children }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleEnter = contextSafe(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = containerRef.current;
    if (!c) return;
    const orig  = c.querySelector<HTMLElement>(".roll-orig");
    const clone = c.querySelector<HTMLElement>(".roll-clone");
    if (!orig || !clone) return;
    gsap.to(orig,  { y: "-100%", duration: 0.35, ease: "power2.out" });
    gsap.fromTo(clone, { y: "100%" }, { y: "0%", duration: 0.35, ease: "power2.out" });
  });

  const handleLeave = contextSafe(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = containerRef.current;
    if (!c) return;
    const orig  = c.querySelector<HTMLElement>(".roll-orig");
    const clone = c.querySelector<HTMLElement>(".roll-clone");
    if (!orig || !clone) return;
    gsap.to(orig,  { y: "0%",   duration: 0.35, ease: "power2.out" });
    gsap.to(clone, { y: "100%", duration: 0.35, ease: "power2.out" });
  });

  return (
    <span
      ref={containerRef}
      className="inline-block overflow-hidden relative"
      style={{ verticalAlign: "bottom" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="roll-orig inline-block">{children}</span>
      <span className="roll-clone absolute inset-0 translate-y-full inline-block" aria-hidden="true">
        {children}
      </span>
    </span>
  );
};

export default RollingText;
