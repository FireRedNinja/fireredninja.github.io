import React from "react";
import {
  Variants,
  Transition,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion";

/**
 * Hook to detect if user prefers reduced motion
 * Falls back to false during SSR
 */
export function useReducedMotion(): boolean {
  const prefersReducedMotion = useFramerReducedMotion();
  return prefersReducedMotion ?? false;
}

/**
 * Hook to check if component is mounted (for SSR safety)
 */
export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

/**
 * Default transition for animations
 * Returns instant transition for reduced motion users
 */
export function getTransition(reducedMotion: boolean): Transition {
  if (reducedMotion) {
    return { duration: 0 };
  }
  return {
    type: "spring",
    stiffness: 400,
    damping: 30,
  };
}

/**
 * Fade in animation variant
 */
export function getFadeIn(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
}

/**
 * Fade in and slide up animation variant
 */
export function getFadeInUp(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
}

/**
 * Scale in animation variant
 */
export function getScaleIn(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, scale: 1 },
      visible: { opacity: 1, scale: 1 },
    };
  }
  return {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };
}

/**
 * Slide in from left animation variant
 */
export function getSlideInLeft(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, x: 0 },
      visible: { opacity: 1, x: 0 },
    };
  }
  return {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
}

/**
 * Slide in from right animation variant
 */
export function getSlideInRight(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, x: 0 },
      visible: { opacity: 1, x: 0 },
    };
  }
  return {
    hidden: { opacity: 0, x: 24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
}

/**
 * Stagger container variant for child animations
 */
export function getStaggerContainer(
  reducedMotion: boolean,
  staggerDelay: number = 0.1
): Variants {
  if (reducedMotion) {
    return {
      hidden: {},
      visible: {},
    };
  }
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };
}

/**
 * Stagger child variant (use with stagger container)
 */
export function getStaggerChild(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
}

/**
 * Hover scale animation (for buttons, cards)
 */
export function getHoverScale(reducedMotion: boolean): {
  whileHover?: { scale: number };
  whileTap?: { scale: number };
  transition: Transition;
} {
  if (reducedMotion) {
    return { transition: { duration: 0 } };
  }
  return {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 25 },
  };
}

/**
 * Card lift animation on hover
 */
export function getCardHover(reducedMotion: boolean): {
  whileHover?: { y: number; boxShadow?: string };
  transition: Transition;
} {
  if (reducedMotion) {
    return { transition: { duration: 0 } };
  }
  return {
    whileHover: {
      y: -4,
      boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.15)",
    },
    transition: { type: "spring", stiffness: 400, damping: 25 },
  };
}

/**
 * Modal backdrop animation
 */
export function getBackdropVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
      exit: { opacity: 1 },
    };
  }
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };
}

/**
 * Modal content animation
 */
export function getModalContentVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, scale: 1 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 1, scale: 1 },
    };
  }
  return {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };
}

/**
 * Navigation link underline animation
 */
export function getNavLinkVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      initial: { scaleX: 0 },
      hover: { scaleX: 1 },
      active: { scaleX: 1 },
    };
  }
  return {
    initial: { scaleX: 0, originX: 0 },
    hover: {
      scaleX: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    active: { scaleX: 1 },
  };
}

/**
 * Icon rotation animation (for theme toggle)
 */
export function getIconRotate(reducedMotion: boolean): {
  animate?: { rotate: number };
  transition: Transition;
} {
  if (reducedMotion) {
    return { transition: { duration: 0 } };
  }
  return {
    animate: { rotate: 360 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };
}

/**
 * Sheet slide animation (mobile menu)
 */
export function getSheetVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { x: 0 },
      visible: { x: 0 },
      exit: { x: 0 },
    };
  }
  return {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: {
      x: "100%",
      transition: { duration: 0.2 },
    },
  };
}
