import React, { useRef } from "react";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { skills, skillCategories } from "../data";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../lib/gsap";

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Scroll-triggered reveals ────────────────────────────────────
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Section index "02" reveal
      gsap.set(".skills-index", { yPercent: 100, opacity: 0 });
      gsap.to(".skills-index", {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Heading word reveal via SplitText + mask
      const split = SplitText.create("#skills-heading", {
        type: "words",
        mask: "words",
      });
      gsap.set(split.words, { yPercent: 110 });
      gsap.to(split.words, {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: "#skills-heading",
          start: "top 85%",
          once: true,
        },
      });

      // Category headings stagger in
      gsap.set(".skill-category-heading", { opacity: 0, x: -20 });
      ScrollTrigger.batch(".skill-category-heading", {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
          }),
        start: "top 90%",
        once: true,
      });

      // Skill badges — batch pop with back.out
      gsap.set(".skill-badge", { opacity: 0, scale: 0.8, y: 20 });
      ScrollTrigger.batch(".skill-badge", {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.5,
            ease: "back.out(1.7)",
            clearProps: "all",
          }),
        start: "top 90%",
        once: true,
      });

      return () => {
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="bg-bg-muted-light py-24 px-4 dark:bg-bg-muted-dark"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          {/* Section index number */}
          <span
            className="skills-index mb-2 block font-sans text-xs font-medium uppercase tracking-[0.25em] text-accent-orange dark:text-accent-orange-dark"
            aria-hidden="true"
          >
            02
          </span>
          {/* Oversized editorial heading */}
          <div className="overflow-hidden">
            <h2
              id="skills-heading"
              className="font-display font-bold uppercase text-text-primary dark:text-text-primary-dark"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
              }}
            >
              Skills
            </h2>
          </div>
        </div>

        <TooltipProvider delayDuration={300}>
          <div className="space-y-8">
            {skillCategories.map((category) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category.id
              );

              return (
                <div key={category.id}>
                  <h3 className="skill-category-heading mb-4 text-xl font-semibold text-text-primary dark:text-text-primary-dark">
                    {category.label}
                  </h3>
                  <ul
                    className="flex flex-wrap gap-3"
                    role="list"
                    aria-label={`${category.label} skills`}
                  >
                    {categorySkills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <li key={skill.name} className="skill-badge">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="hover:scale-[1.02] active:scale-[0.98] transition-transform">
                                <Badge
                                  variant="secondary"
                                  className="cursor-default gap-2 px-4 py-2 text-base"
                                >
                                  <Icon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <span>{skill.name}</span>
                                </Badge>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{skill.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default Skills;
