import React from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
}

/**
 * Simple wrapper div. Previously provided a magnetic cursor-attraction effect
 * via framer-motion; now passes children through unchanged.
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({ children }) => {
  return <div style={{ display: "inline-block" }}>{children}</div>;
};

export default MagneticButton;
