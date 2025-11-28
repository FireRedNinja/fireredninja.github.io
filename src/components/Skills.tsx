import React from "react";
import { motion } from "framer-motion";
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
  getStaggerContainer,
  getStaggerChild,
  getHoverScale,
} from "../lib/motion";

const Skills: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const fadeInUp = getFadeInUp(reducedMotion);
  const staggerContainer = getStaggerContainer(reducedMotion, 0.05);
  const staggerChild = getStaggerChild(reducedMotion);
  const hoverScale = getHoverScale(reducedMotion);

  return (
    <section
      id="about"
      className="bg-bg-muted-light py-24 px-4 dark:bg-bg-muted-dark"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            id="about-heading"
            className="mb-4 text-3xl font-bold text-text-primary dark:text-text-primary-dark sm:text-4xl"
          >
            Skills
          </h2>
        </motion.div>

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
                  <h3 className="mb-2 text-xl font-semibold text-text-secondary dark:text-text-secondary-dark">
                    {category.label}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill) => (
                      <Tooltip key={skill.name} delayDuration={200}>
                        <TooltipTrigger asChild>
                          <motion.div
                            variants={staggerChild}
                            whileHover={hoverScale}
                            whileFocus={hoverScale}
                          >
                            <Badge
                              variant="default"
                              tabIndex={0}
                              aria-label={skill.name}
                            >
                              {skill.name}
                            </Badge>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center">
                          {skill.description}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default Skills;
