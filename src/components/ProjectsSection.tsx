import React from "react";
import { motion } from "motion/react";
import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { projectsList } from "../data";
import ProjectCard from "./ProjectCard";
import {
  useReducedMotion,
  getFadeInUp,
  getLineReveal,
  getStaggerContainer,
  getStaggerChild,
  useScrollSkew,
} from "../lib/motion";

interface ImageNode {
  node: {
    id: string;
    gatsbyImageData: IGatsbyImageData;
    fluid: {
      originalName: string;
    };
  };
}

const Projects: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const fadeInUp = getFadeInUp(reducedMotion);
  const staggerContainer = getStaggerContainer(reducedMotion, 0.1);
  const staggerChild = getStaggerChild(reducedMotion);
  const skewY = useScrollSkew(2.5);

  const data = useStaticQuery(graphql`
    query {
      image: allImageSharp {
        edges {
          node {
            id
            gatsbyImageData(
              placeholder: DOMINANT_COLOR
              height: 500
              quality: 80
              formats: [AUTO, WEBP, AVIF]
            )
            fluid {
              originalName
            }
          }
        }
      }
    }
  `);

  const images: ImageNode[] = data.image.edges;

  const personalProjects = projectsList.filter((project) =>
    project.tags.includes("personal")
  );
  const hackathonProjects = projectsList.filter((project) =>
    project.tags.includes("hackathon")
  );

  const getProjectImage = (
    imageName?: string
  ): IGatsbyImageData | undefined => {
    if (!imageName) return undefined;
    const projectImage = images.find(
      (image) => image.node.fluid.originalName === imageName
    );
    return projectImage?.node.gatsbyImageData;
  };

  return (
    <motion.section
      id="projects"
      className="py-24 px-4"
      aria-labelledby="projects-heading"
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
            01
          </motion.span>
          {/* Oversized editorial heading */}
          <div className="overflow-hidden">
            <motion.h2
              id="projects-heading"
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
              Projects
            </motion.h2>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <TabsList className="mb-8" aria-label="Project categories">
              <TabsTrigger value="personal" aria-label="View personal projects">
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="hackathon"
                aria-label="View hackathon projects"
              >
                Hackathon
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="personal">
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {personalProjects.map((project) => (
                <motion.div key={project.title} variants={staggerChild}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    links={project.links}
                    image={getProjectImage(project.image)}
                    imageAlt={project.imageAlt}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="hackathon">
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {hackathonProjects.map((project) => (
                <motion.div key={project.title} variants={staggerChild}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    links={project.links}
                    image={getProjectImage(project.image)}
                    imageAlt={project.imageAlt}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.section>
  );
};

export default Projects;
