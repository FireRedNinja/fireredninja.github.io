import React, { useRef, useCallback } from "react";
import { motion, animate } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { profile } from "../data";
import {
  useReducedMotion,
  getLineReveal,
  getCharReveal,
  getHoverBounceAnimation,
  getHoverStrokeAnimation,
  useHeroScrollExit,
} from "../lib/motion";
import MagneticButton from "./MagneticButton";

const Hero: React.FC = () => {
  const reducedMotion = useReducedMotion();

  // Ref for the hero section — used by the scroll-exit hook
  const heroRef = useRef<HTMLElement>(null);

  // Registry of char DOM nodes keyed by "wordIndex-charIndex"
  const charRefs = useRef<Map<string, Element>>(new Map());

  // Scroll-driven exit: "Noel" → left, "Rajan" → right
  const { noelX, rajanX, exitOpacity } = useHeroScrollExit(
    heroRef,
    reducedMotion
  );

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  const handleCharHover = useCallback(
    (key: string, isStroke: boolean) => {
      if (reducedMotion) return;
      const el = charRefs.current.get(key);
      if (!el) return;
      const { keyframes, options } = getHoverBounceAnimation();
      animate(el, keyframes, options as Parameters<typeof animate>[2]);
      const color = getComputedStyle(el).color;
      const { enter } = getHoverStrokeAnimation(isStroke, color);
      animate(
        el,
        enter.keyframes as Parameters<typeof animate>[1],
        enter.options as Parameters<typeof animate>[2]
      );
    },
    [reducedMotion]
  );

  const handleCharLeave = useCallback(
    (key: string, isStroke: boolean) => {
      if (reducedMotion) return;
      const el = charRefs.current.get(key);
      if (!el) return;
      const color = getComputedStyle(el).color;
      const { leave } = getHoverStrokeAnimation(isStroke, color);
      animate(
        el,
        leave.keyframes as Parameters<typeof animate>[1],
        leave.options as Parameters<typeof animate>[2]
      );
    },
    [reducedMotion]
  );

  const nameWords = profile.name.split(" ");
  const roleText = profile.role;

  return (
    <motion.section
      ref={heroRef}
      id="hero"
      className="relative flex h-screen flex-col justify-center overflow-hidden pt-24"
      aria-labelledby="hero-heading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        reducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }
      }
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
        {/* Role label — appears above name as a typographic anchor */}
        <div className="mb-4 overflow-hidden">
          {(() => {
            const reveal = getLineReveal(reducedMotion, 0.1);
            return (
              <motion.p
                className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary dark:text-text-secondary-dark sm:text-sm"
                initial={reveal.initial}
                animate={reveal.animate}
                transition={reveal.transition}
              >
                {roleText}
              </motion.p>
            );
          })()}
        </div>

        {/* Name — stacked words, char-by-char bounce reveal + hover bounce */}
        <h1
          id="hero-heading"
          className="mb-8 w-full font-display font-bold uppercase"
          style={{
            fontSize: "clamp(3rem, min(31vw, 38vh), 9999px)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
          }}
        >
          {nameWords.map((word, wi) => {
            const isStroke = wi % 2 !== 0;
            const wordClass = isStroke
              ? "text-text-primary dark:text-text-primary-dark text-stroke"
              : "text-text-primary dark:text-text-primary-dark";

            // "Noel" slides left on scroll, "Rajan" slides right
            const scrollX = wi === 0 ? noelX : rajanX;

            return (
              <motion.span
                key={wi}
                className="block whitespace-nowrap"
                style={{ x: scrollX, opacity: exitOpacity }}
              >
                {word.split("").map((char, ci) => {
                  const key = `${wi}-${ci}`;
                  // "Rajan" (wi=1) staggers right-to-left so last char enters first
                  const charIndex = wi === 0 ? ci : word.length - 1 - ci;
                  const delay = 0.15 + wi * 0.25 + charIndex * 0.06;
                  const anim = getCharReveal(reducedMotion, delay);

                  return (
                    // overflow-hidden clip mask so the incoming char slides up from behind
                    <span
                      key={key}
                      style={{ display: "inline-block", overflow: "hidden" }}
                    >
                      <motion.span
                        ref={(el) => {
                          if (el) charRefs.current.set(key, el);
                          else charRefs.current.delete(key);
                        }}
                        className={wordClass}
                        style={{ display: "inline-block" }}
                        initial={anim.initial}
                        animate={anim.animate}
                        transition={anim.transition}
                        onMouseEnter={() => handleCharHover(key, isStroke)}
                        onMouseLeave={() => handleCharLeave(key, isStroke)}
                        aria-hidden="true"
                      >
                        {char}
                      </motion.span>
                    </span>
                  );
                })}
                {/* Screen-reader-only full word so assistive tech reads "Noel Rajan" */}
                <span className="sr-only">{word}</span>
              </motion.span>
            );
          })}
        </h1>

        {/* CTA Button — magnetic + fade in */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.5, delay: 0.75, ease: "easeOut" }
          }
        >
          <MagneticButton>
            <Button
              size="lg"
              onClick={handleScrollToProjects}
              className="group gap-2"
              aria-label="View my projects - scroll to projects section"
            >
              View My Work
              <motion.span
                animate={reducedMotion ? {} : { y: [0, 4, 0] }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <ArrowDown
                  className="h-5 w-5 transition-transform group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </motion.span>
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
