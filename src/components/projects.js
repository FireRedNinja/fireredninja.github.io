import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import projectsList from '../data/projectsList';
import Project from './project';
import * as STYLES from './projects.module.scss';
import DarkModeButton from './darkModeButton';

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
  const images = data.image.edges;
  const projects = {
    personal: buildProjectList(personalProjects, images),
    hackathon: buildProjectList(hackathonProjects, images),
  };

  const [projectsList, setProjectsList] = useState(projects.personal);
  const [projectType, setProjectType] = useState('personal');

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
    <div className={STYLES.Projects}>
      <div className={STYLES.HeadingContainer}>
        <h2>Projects</h2>
        <DarkModeButton />
      </div>
      <div className={STYLES.Tabs}>
        <button
          type="button"
          className={
            projectType === 'personal' ? STYLES.activeTab : STYLES.inactiveTab
          }
          onClick={() => setActiveTab('personal')}
          aria-label="Personal projects tab"
        >
          Personal
        </button>
        <button
          type="button"
          className={
            projectType === 'hackathon' ? STYLES.activeTab : STYLES.inactiveTab
          }
          onClick={() => setActiveTab('hackathon')}
          aria-label="Hackathon projects tab"
        >
          Hackathon
        </button>
      </div>
      <div className={STYLES.ProjectsListContainer}>{projectsList}</div>
    </div>
  );
};

export default Projects;
