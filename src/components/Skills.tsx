import React from "react";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { skills, skillCategories } from "../data";

const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="bg-bg-muted-light py-24 px-4 dark:bg-bg-muted-dark"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          {/* Section index number */}
          <span
            className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.25em] text-accent-orange dark:text-accent-orange-dark"
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
                  <h3 className="mb-4 text-xl font-semibold text-text-primary dark:text-text-primary-dark">
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
                        <li key={skill.name}>
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
