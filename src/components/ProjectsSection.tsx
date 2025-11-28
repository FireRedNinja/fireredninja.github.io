import React from "react";
import { motion } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { projectsList } from "../data";
import ProjectCard from "./ProjectCard";
import {
  useReducedMotion,
  getFadeInUp,
  getStaggerContainer,
  getStaggerChild,
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
    <section
      id="projects"
      className="py-24 px-4"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            id="projects-heading"
            className="mb-8 text-3xl font-bold text-text-primary dark:text-text-primary-dark sm:text-4xl"
          >
            Projects
          </h2>
        </motion.div>

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
    </section>
  );
};

export default Projects;
