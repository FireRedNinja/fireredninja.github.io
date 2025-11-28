import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import projectsList from "../data/projectsList";
import Project from "./Project";
import DarkModeButton from "./DarkModeButton";

type ProjectType = "personal" | "hackathon";

interface ImageNode {
  node: {
    id: string;
    gatsbyImageData: IGatsbyImageData;
    fluid: {
      originalName: string;
    };
  };
}

const personalProjects = projectsList.filter((project) =>
  project.tags.includes("personal")
);
const hackathonProjects = projectsList.filter((project) =>
  project.tags.includes("hackathon")
);

const buildProjectList = (
  projects: typeof projectsList,
  images: ImageNode[]
) => {
  return projects.map((project) => {
    const projectImage = images.find(
      (image) => image.node.fluid.originalName === project.image
    );

    return (
      <Project
        title={project.title}
        description={project.description}
        links={project.links}
        key={project.title}
        image={projectImage?.node.gatsbyImageData}
      />
    );
  });
};

const Projects = () => {
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
  const projects = {
    personal: buildProjectList(personalProjects, images),
    hackathon: buildProjectList(hackathonProjects, images),
  };

  const [projectType, setProjectType] = useState<ProjectType>("personal");

  const currentProjects =
    projectType === "personal" ? projects.personal : projects.hackathon;

  return (
    <div className="mb-4 text-text-primary dark:text-text-primary-dark">
      <div className="flex justify-between">
        <h2 className="pb-2 text-2xl font-bold leading-8">Projects</h2>
        <DarkModeButton />
      </div>
      <div className="flex flex-row pb-2">
        <button
          type="button"
          className={`cursor-pointer border-b-2 px-3 py-2 text-center font-semibold ${
            projectType === "personal"
              ? "border-accent-blue text-accent-blue dark:border-accent-blue-dark dark:text-accent-blue-dark"
              : "border-white text-text-secondary hover:border-border-light hover:text-text-tertiary dark:border-black dark:text-text-tertiary-dark dark:hover:border-border-hover-light dark:hover:text-text-secondary-dark"
          }`}
          onClick={() => setProjectType("personal")}
          aria-label="Personal projects tab"
        >
          Personal
        </button>
        <button
          type="button"
          className={`cursor-pointer border-b-2 px-3 py-2 text-center font-semibold ${
            projectType === "hackathon"
              ? "border-accent-blue text-accent-blue dark:border-accent-blue-dark dark:text-accent-blue-dark"
              : "border-white text-text-secondary hover:border-border-light hover:text-text-tertiary dark:border-black dark:text-text-tertiary-dark dark:hover:border-border-hover-light dark:hover:text-text-secondary-dark"
          }`}
          onClick={() => setProjectType("hackathon")}
          aria-label="Hackathon projects tab"
        >
          Hackathon
        </button>
      </div>
      <div className="mt-2 flex flex-col">{currentProjects}</div>
    </div>
  );
};

export default Projects;
