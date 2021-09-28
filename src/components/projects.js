import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import projectsList from '../data/projectsList';
import Project from './project';
import * as STYLES from './projects.module.scss';

const personalProjects = projectsList.filter((project) =>
  project.tags.includes('personal')
);
const hackathonProjects = projectsList.filter((project) =>
  project.tags.includes('hackathon')
);

const buildProjectList = (projects, images) => {
  return projects.map((project) => {
    let projectImage = images.filter(
      (image) => image.node.fluid.originalName === project.image
    );
    if (projectImage.length) {
      projectImage = projectImage[0].node.gatsbyImageData;
    } else {
      projectImage = undefined;
    }
    return (
      <Project
        title={project.title}
        description={project.description}
        links={project.links}
        key={project.title}
        image={projectImage}
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
            )
            fluid {
              originalName
            }
          }
        }
      }
    }
  `);
  const images = data.image.edges;
  const projects = {
    personal: buildProjectList(personalProjects, images),
    hackathon: buildProjectList(hackathonProjects, images),
  };
  const [projectsList, setProjectsList] = useState(projects.personal);
  const [projectType, setProjectType] = useState('personal');
  const activeTabCss = 'border-b-2 border-blue-600';
  const inactiveTabCss = STYLES.inactiveTab;

  const setActiveTab = (projectType) => {
    if (projectType === 'personal') {
      setProjectType('personal');
      setProjectsList(projects.personal);
    } else if (projectType === 'hackathon') {
      setProjectType('hackathon');
      setProjectsList(projects.hackathon);
    }
  };

  return (
    <div className={`mt-12 mb-12 ${STYLES.Project}`}>
      <h2 className="text-2xl font-bold pb-2">Projects</h2>
      <div className="flex flex-row pb-2">
        <button
          type="button"
          className={`text-center font-semibold px-3 py-2 cursor-pointer mr-4 hover:bg-gray-100 ${
            projectType === 'personal' ? activeTabCss : inactiveTabCss
          }`}
          onClick={() => setActiveTab('personal')}
          aria-label="Personal projects tab"
        >
          Personal
        </button>
        <button
          type="button"
          className={`text-center font-semibold px-3 py-2 cursor-pointer hover:bg-gray-100 ${
            projectType === 'hackathon' ? activeTabCss : inactiveTabCss
          }`}
          onClick={() => setActiveTab('hackathon')}
          aria-label="Hackathon projects tab"
        >
          Hackathon
        </button>
      </div>
      <div className="flex flex-col mt-2">{projectsList}</div>
    </div>
  );
};

export default Projects;
