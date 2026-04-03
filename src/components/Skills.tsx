import React, { useRef, useState } from "react";
import { skills, skillCategories } from "../data";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../lib/gsap";

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);
  const hoveredSkill = hoveredSkillName
    ? (skills.find((s) => s.name === hoveredSkillName) ?? null)
    : null;

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

      // Skill rows — batch reveal
      gsap.set(".skill-row", { yPercent: 20, opacity: 0 });
      ScrollTrigger.batch(".skill-row", {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { yPercent: 20, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.6,
              ease: "power3.out",
            }
          ),
        start: "top 88%",
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
      className="py-24 px-8 md:px-16"
      aria-labelledby="skills-heading"
    >
      {/* Section header */}
      <div className="mb-16">
        <span
          aria-hidden="true"
          className="skills-index mb-2 block font-sans text-xs font-medium uppercase tracking-[0.25em]"
          style={{ color: "#1C1208", opacity: 0.5 }}
        >
          02
        </span>
        <h2
          id="skills-heading"
          className="font-display font-bold uppercase"
          style={{
            color: "#1C1208",
            fontSize: "clamp(2.5rem, 8vw, 9rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          Skills
        </h2>
      </div>

      {/* Category rows */}
      <div className="space-y-0">
        {skillCategories.map((category, catIndex) => {
          const categorySkills = skills.filter(
            (s) => s.category === category.id
          );
          const isActive =
            hoveredSkill !== null &&
            categorySkills.some((s) => s.name === hoveredSkillName);

          return (
            <div
              key={category.id}
              className="skill-row flex flex-col gap-4 py-6 md:flex-row md:gap-8 md:items-start"
              style={
                catIndex > 0
                  ? { borderTop: "1px solid rgba(245,237,216,0.2)" }
                  : {}
              }
            >
              {/* Left: category label */}
              <div className="skill-category-heading w-full md:w-44 md:flex-shrink-0 md:pt-1">
                <h3
                  className="font-display font-semibold uppercase text-sm tracking-wide"
                  style={{ color: "#1C1208" }}
                >
                  {category.label}
                </h3>
              </div>

              {/* Right: pills + description */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {categorySkills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <span
                        key={skill.name}
                        className="skill-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-default"
                        style={{ backgroundColor: "#F5EDD8", color: "#1C1208" }}
                        onMouseEnter={(e) => {
                          setHoveredSkillName(skill.name);
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "#1C1208";
                          (e.currentTarget as HTMLElement).style.color =
                            "#F5EDD8";
                        }}
                        onMouseLeave={(e) => {
                          setHoveredSkillName(null);
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "#F5EDD8";
                          (e.currentTarget as HTMLElement).style.color =
                            "#1C1208";
                        }}
                      >
                        <Icon
                          className="h-4 w-4 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>{skill.name}</span>
                      </span>
                    );
                  })}
                </div>

                {/* Inline description */}
                <div
                  style={{
                    minHeight: "1.4em",
                    transition: "opacity 0.25s ease",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-editorial)",
                      fontStyle: "italic",
                      color: "#1C1208",
                      fontSize: "0.875rem",
                      opacity: 0.75,
                    }}
                  >
                    {isActive ? hoveredSkill!.description : "\u00a0"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
