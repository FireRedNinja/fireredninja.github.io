import React from "react";

// Factory to create mock motion components that strip animation props
const createMockMotionComponent = (tagName: string) => {
  return React.forwardRef<any, any>(({ children, ...props }, ref) => {
    // Filter out motion-specific props
    const {
      initial,
      animate,
      exit,
      variants,
      transition,
      whileHover,
      whileTap,
      whileInView,
      viewport,
      onAnimationStart,
      onAnimationComplete,
      ...htmlProps
    } = props;

    return React.createElement(tagName, { ref, ...htmlProps }, children);
  });
};

// Export commonly used motion components
export const motion = {
  div: createMockMotionComponent("div"),
  section: createMockMotionComponent("section"),
  header: createMockMotionComponent("header"),
  nav: createMockMotionComponent("nav"),
  footer: createMockMotionComponent("footer"),
  span: createMockMotionComponent("span"),
  h1: createMockMotionComponent("h1"),
  h2: createMockMotionComponent("h2"),
  p: createMockMotionComponent("p"),
  button: createMockMotionComponent("button"),
  a: createMockMotionComponent("a"),
};

// Mock AnimatePresence to just render children
export const AnimatePresence: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

// Mock useReducedMotion hook
export const useReducedMotion = jest.fn(() => false);

// Mock other common exports
export const MotionConfig: React.FC<any> = ({ children }) => <>{children}</>;
export const LazyMotion: React.FC<any> = ({ children }) => <>{children}</>;
export const domAnimation = {};
