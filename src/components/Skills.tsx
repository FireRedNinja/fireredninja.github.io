import React, { useRef } from "react";
import { skills, skillCategories } from "../data";
import { gsap, SplitText, useGSAP } from "../lib/gsap";

const SEPARATOR = "·";

const SkillsMarqueeRow: React.FC<{ items: typeof skills; reverse?: boolean }> = ({
  items,
  reverse = false,
}) => {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden"
      style={{ borderTop: "1px solid rgba(240,240,238,0.055)" }}
    >
      <div
        className={reverse ? "marquee-track-rev" : "marquee-track"}
        style={{ padding: "0.8rem 0" }}
      >
        {doubled.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <span
              key={`${skill.name}-${i}`}
              className="inline-flex items-center gap-3 px-6 font-sans font-medium uppercase"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                color: "rgba(240,240,238,0.38)",
                whiteSpace: "nowrap",
              }}
            >
              <Icon
                className="h-3.5 w-3.5 flex-shrink-0"
                aria-hidden="true"
                style={{ color: "rgba(240,240,238,0.22)" }}
              />
              <span>{skill.name}</span>
              <span style={{ color: "rgba(240,240,238,0.14)" }}>{SEPARATOR}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create("#skills-heading", { type: "chars", mask: "chars" });
      gsap.fromTo(
        split.chars,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.03,
          scrollTrigger: { trigger: "#skills-heading", start: "top 86%", once: true },
        }
      );

      gsap.utils.toArray<Element>(".skills-cat-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.035,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 91%", once: true },
          }
        );
      });

      return () => { split.revert(); };
    },
    { scope: containerRef }
  );

  const categorized = skillCategories.map(cat => ({
    ...cat,
    skills: skills.filter(s => s.category === cat.id),
  }));

  const half = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, half);
  const row2 = skills.slice(half);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24"
      aria-labelledby="skills-heading"
      style={{ borderTop: "1px solid rgba(240,240,238,0.06)" }}
    >
      {/* Heading */}
      <div className="px-8 md:px-16 mb-16 overflow-hidden">
        <h2
          id="skills-heading"
          className="font-display font-black uppercase"
          style={{
            color: "#F0F0EE",
            fontSize: "clamp(3rem, 10vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
          }}
        >
          Skills
        </h2>
      </div>

      {/* Marquee strips */}
      <div className="mb-20">
        <SkillsMarqueeRow items={row1} />
        <SkillsMarqueeRow items={row2} reverse />
        <SkillsMarqueeRow items={row1} />
      </div>

      {/* Detailed category list */}
      <div className="px-8 md:px-16">
        <div>
          {categorized.map((cat) => (
            <div
              key={cat.id}
              className="skills-cat-row flex flex-col gap-3 py-5 md:flex-row md:gap-10 md:items-baseline"
              style={{
                borderTop: "1px solid rgba(240,240,238,0.055)",
                opacity: 0,
              }}
            >
              <div className="w-full md:w-32 md:flex-shrink-0">
                <span
                  className="font-sans font-medium uppercase"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "rgba(240,240,238,0.28)" }}
                >
                  {cat.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {cat.skills.map(skill => {
                  const Icon = skill.icon;
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-2 font-sans font-medium"
                      style={{ fontSize: "0.82rem", color: "rgba(240,240,238,0.55)", cursor: "default" }}
                      title={skill.description}
                    >
                      <Icon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" style={{ color: "rgba(240,240,238,0.28)" }} />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
