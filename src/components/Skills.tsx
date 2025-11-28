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
      id="skills"
      className="bg-bg-muted-light py-24 px-4 dark:bg-bg-muted-dark"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            id="skills-heading"
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
    </section>
  );
};

export default Skills;
