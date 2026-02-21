import React from "react";
import {
  Variants,
  Transition,
  MotionValue,
  TargetAndTransition,
  useReducedMotion as useFramerReducedMotion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "motion/react";

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

/**
 * Page curtain overlay — exits by sliding up out of view
 */
export function getCurtainVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 0 },
      exit: { opacity: 0, transition: { duration: 0 } },
    };
  }
  return {
    initial: { y: 0 },
    animate: { y: 0 },
    exit: {
      y: "-101%",
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
    },
  };
}

/**
 * Word/line mask reveal — slides up from behind an overflow:hidden parent
 */
export function getMaskReveal(
  reducedMotion: boolean,
  delay = 0
): {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} {
  if (reducedMotion) {
    return {
      initial: { y: 0, opacity: 1 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { y: "110%", opacity: 1 },
    animate: { y: 0, opacity: 1 },
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 28,
      delay,
    },
  };
}

/**
 * Line reveal — horizontal clip-path wipe (cinematic curtain per line)
 * More editorial than the y:110% mask reveal
 */
export function getLineReveal(
  reducedMotion: boolean,
  delay = 0
): {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} {
  if (reducedMotion) {
    return {
      initial: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
      animate: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
    animate: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay,
    },
  };
}

/**
 * Blur dissolve + Y-slide entrance — stacks opacity fade, vertical slide, and
 * blur clearance for a premium "materialising" feel on page load.
 */
export function getBlurSlideIn(
  reducedMotion: boolean,
  delay = 0
): {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} {
  if (reducedMotion) {
    return {
      initial: { opacity: 1, y: 0, filter: "blur(0px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: 32, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay,
    },
  };
}

/**
 * Scroll-velocity skew hook — applies subtle skewY based on scroll speed
 */
export function useScrollSkew(maxSkew = 3): MotionValue<number> {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const raw = useTransform(
    scrollVelocity,
    [-2500, 2500],
    reducedMotion ? [0, 0] : [-maxSkew, maxSkew]
  );
  const skewY = useSpring(raw, { stiffness: 300, damping: 20, mass: 0.2 });
  return skewY;
}

/**
 * Per-character bounce reveal — slides up from below with an overshoot.
 * Mimics the Tiger Milk "Hola" entrance: y: 110% → -25% → 0%.
 * Parent char-wrap must have overflow:hidden to mask the incoming char.
 *
 * @param reducedMotion - skip animation for accessibility
 * @param delay         - stagger offset in seconds
 */
export function getCharReveal(
  reducedMotion: boolean,
  delay = 0
): {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
} {
  if (reducedMotion) {
    return {
      initial: { y: "0%", opacity: 1 },
      animate: { y: "0%", opacity: 1 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { y: "110%", opacity: 0 },
    animate: { y: ["110%", "-20%", "0%"], opacity: [0, 1, 1] },
    transition: {
      duration: 0.75,
      ease: [0.455, 0.03, 0.515, 0.955],
      delay,
      times: [0, 0.6, 1],
    },
  };
}

/**
 * Per-character hover bounce — a one-shot y bounce on mouse-enter.
 * Mimics the Tiger Milk hover: y: 0% → -30% → 0%.
 * Intended for use with useAnimate(), fired imperatively on onMouseEnter.
 */
export function getHoverBounceAnimation(): {
  keyframes: { y: string[] };
  options: Transition;
} {
  return {
    keyframes: { y: ["0%", "-30%", "0%"] },
    options: {
      duration: 0.5,
      ease: [0.455, 0.03, 0.515, 0.955],
      times: [0, 0.5, 1],
    },
  };
}

/**
 * Per-character fill↔outline transition — animates -webkit-text-fill-color
 * and -webkit-text-stroke-width on mouse-enter and mouse-leave.
 *
 * @param isStroke - true if the char is currently outlined (e.g. "Rajan")
 * @param color    - resolved currentColor read from getComputedStyle at call time
 */
export function getHoverStrokeAnimation(
  isStroke: boolean,
  color: string
): {
  enter: { keyframes: Record<string, string[]>; options: Transition };
  leave: { keyframes: Record<string, string[]>; options: Transition };
} {
  const options: Transition = { duration: 0.5, ease: "easeInOut" };
  if (isStroke) {
    // Rajan: outlined → filled on enter, filled → outlined on leave
    return {
      enter: {
        keyframes: {
          WebkitTextFillColor: ["transparent", color],
          WebkitTextStrokeWidth: ["2px", "0px"],
        },
        options,
      },
      leave: {
        keyframes: {
          WebkitTextFillColor: [color, "transparent"],
          WebkitTextStrokeWidth: ["0px", "2px"],
        },
        options,
      },
    };
  } else {
    // Noel: filled → outlined on enter, outlined → filled on leave
    return {
      enter: {
        keyframes: {
          WebkitTextFillColor: [color, "transparent"],
          WebkitTextStrokeWidth: ["0px", "2px"],
        },
        options,
      },
      leave: {
        keyframes: {
          WebkitTextFillColor: ["transparent", color],
          WebkitTextStrokeWidth: ["2px", "0px"],
        },
        options,
      },
    };
  }
}

/**
 * Scroll-exit hook for the Hero H1 name words.
 * "Noel" (wi=0) slides left; "Rajan" (wi=1) slides right — both fade out.
 * Driven by the hero section's scroll progress through the viewport.
 *
 * @param ref           - ref attached to the hero <section> element
 * @param reducedMotion - skip animation for accessibility
 */
export function useHeroScrollExit(
  ref: React.RefObject<HTMLElement | null>,
  reducedMotion: boolean
): {
  noelX: MotionValue<number>;
  rajanX: MotionValue<number>;
  exitOpacity: MotionValue<number>;
} {
  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 = hero top at viewport top; 1 = hero bottom at viewport top
    offset: ["start start", "end start"],
  });

  // Exit begins at 10% scroll, completes at 55%
  const rawNoelX = useTransform(
    scrollYProgress,
    [0.1, 0.55],
    reducedMotion ? [0, 0] : [0, -800]
  );
  const rawRajanX = useTransform(
    scrollYProgress,
    [0.1, 0.55],
    reducedMotion ? [0, 0] : [0, 800]
  );
  // Opacity fades slightly earlier so text is gone before fully off-screen
  const exitOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    reducedMotion ? [1, 1] : [1, 0]
  );

  const springCfg = { stiffness: 120, damping: 20, mass: 0.5 };
  const noelX = useSpring(rawNoelX, springCfg);
  const rajanX = useSpring(rawRajanX, springCfg);

  return { noelX, rajanX, exitOpacity };
}
