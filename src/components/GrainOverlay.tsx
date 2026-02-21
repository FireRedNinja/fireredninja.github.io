import React from "react";

/**
 * Full-screen animated film-grain overlay using SVG feTurbulence.
 * Pointer-events: none so it never blocks interactions.
 * Respects prefers-reduced-motion via CSS (animation is disabled globally
 * when the user has reduced motion enabled — see index.css).
 */
const GrainOverlay: React.FC = () => {
  return (
    <>
      {/* Hidden SVG that defines the noise filter used by the overlay */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>

      {/* The actual overlay — larger than viewport so translate animation tiles seamlessly */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
};

export default GrainOverlay;
