import React from "react";
import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { skills, skillCategories } from "../data";
import {
  useReducedMotion,
  getFadeInUp,
  getLineReveal,
  getStaggerContainer,
  getStaggerChild,
  getHoverScale,
  useScrollSkew,
} from "../lib/motion";

const Skills: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const fadeInUp = getFadeInUp(reducedMotion);
  const staggerContainer = getStaggerContainer(reducedMotion, 0.05);
  const staggerChild = getStaggerChild(reducedMotion);
  const hoverScale = getHoverScale(reducedMotion);
  const skewY = useScrollSkew(2.5);

  return (
    <motion.section
      id="skills"
      className="bg-bg-muted-light py-24 px-4 dark:bg-bg-muted-dark"
      aria-labelledby="skills-heading"
      style={{ skewY }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          {/* Section index number */}
          <motion.span
            className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.25em] text-accent-orange dark:text-accent-orange-dark"
            aria-hidden="true"
            initial={getLineReveal(false, 0).initial}
            whileInView={getLineReveal(false, 0).animate}
            viewport={{ once: true, margin: "-80px" }}
            transition={getLineReveal(false, 0.05).transition}
          >
            02
          </motion.span>
          {/* Oversized editorial heading */}
          <div className="overflow-hidden">
            <motion.h2
              id="skills-heading"
              className="font-display font-bold uppercase text-text-primary dark:text-text-primary-dark"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
              }}
              initial={getLineReveal(reducedMotion, 0).initial}
              whileInView={getLineReveal(reducedMotion, 0.1).animate}
              viewport={{ once: true, margin: "-80px" }}
              transition={getLineReveal(reducedMotion, 0.1).transition}
            >
              Skills
            </motion.h2>
          </div>
        </div>

        <TooltipProvider delayDuration={300}>
          <div className="space-y-8">
            {skillCategories.map((category) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category.id
              );

              return (
                <motion.div
                  key={category.id}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <h3 className="mb-4 text-xl font-semibold text-text-primary dark:text-text-primary-dark">
                    {category.label}
                  </h3>
                  <motion.ul
                    className="flex flex-wrap gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    role="list"
                    aria-label={`${category.label} skills`}
                  >
                    {categorySkills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <motion.li key={skill.name} variants={staggerChild}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.div {...hoverScale}>
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
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{skill.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </motion.div>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </motion.section>
  );
};

export default Skills;
