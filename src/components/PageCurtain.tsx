import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion, getCurtainVariants } from "../lib/motion";

const PageCurtain: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const curtainVariants = getCurtainVariants(reducedMotion);

  useEffect(() => {
    // Hold the curtain briefly so the page can hydrate, then exit
    const timer = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-curtain"
          className="pointer-events-none fixed inset-0 z-[9999] bg-accent-orange dark:bg-accent-orange-dark"
          aria-hidden="true"
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      )}
    </AnimatePresence>
  );
};

export default PageCurtain;
