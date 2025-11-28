import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { profile } from "../data";
import {
  useReducedMotion,
  getStaggerContainer,
  getStaggerChild,
  getFadeInUp,
} from "../lib/motion";

const Hero: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const staggerContainer = getStaggerContainer(reducedMotion, 0.15);
  const staggerChild = getStaggerChild(reducedMotion);
  const fadeInUp = getFadeInUp(reducedMotion);

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 pt-16"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.p
          variants={staggerChild}
          className="mb-4 text-lg font-medium text-accent-orange dark:text-accent-orange-dark"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name - H1 for SEO and accessibility */}
        <motion.h1
          id="hero-heading"
          variants={staggerChild}
          className="mb-4 text-4xl font-bold tracking-tight text-text-primary dark:text-text-primary-dark sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {profile.name}
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={staggerChild}
          className="mb-6 text-xl font-medium text-text-secondary dark:text-text-secondary-dark sm:text-2xl md:text-3xl"
        >
          {profile.role}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={fadeInUp}
          whileHover={reducedMotion ? {} : { scale: 1.05 }}
          whileTap={reducedMotion ? {} : { scale: 0.98 }}
        >
          <Button
            size="lg"
            onClick={handleScrollToProjects}
            className="group gap-2"
            aria-label="View my projects - scroll to projects section"
          >
            View My Work
            <motion.span
              animate={
                reducedMotion
                  ? {}
                  : {
                      y: [0, 4, 0],
                    }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <ArrowDown
                className="h-5 w-5 transition-transform group-hover:translate-y-1"
                aria-hidden="true"
              />
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative gradient orbs */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-accent-orange/10 blur-3xl dark:bg-accent-orange-dark/10" />
        <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-accent-zinc/10 blur-3xl dark:bg-accent-zinc-dark/10" />
      </div>
    </section>
  );
};

export default Hero;
