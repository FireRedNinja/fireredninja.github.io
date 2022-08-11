import React, { useContext, useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import projectsList from '../data/projectsList';
import Project from './project';
import { FaSun, FaMoon } from 'react-icons/fa';
import * as STYLES from './projects.module.scss';
import { ThemeContext } from '../context/ThemeContext';

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

  const useIsSsr = () => {
    const [isSsr, setIsSsr] = useState(true);

    useEffect(() => {
      setIsSsr(false);
    }, []);

    return isSsr;
  };

  const isSsr = useIsSsr();

  const startTheme = () => {
    // if (
    //   localStorage?.theme === 'dark' ||
    //   (!('theme' in localStorage) &&
    //     window.matchMedia('(prefers-color-scheme: dark)').matches)
    // ) {
    if (isSsr) {
      return 'light';
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      // localStorage.theme = 'dark';
      return 'dark';
    } else {
      document.documentElement.removeAttribute('data-theme');
      // localStorage.theme = 'light';
      return 'light';
    }
  };

  const [projectsList, setProjectsList] = useState(projects.personal);
  const [projectType, setProjectType] = useState('personal');
  // const [theme, setTheme] = useState(startTheme());
  const {theme, setTheme} = useContext(ThemeContext)

  const setActiveTab = (projectType) => {
    if (projectType === 'personal') {
      setProjectType('personal');
      setProjectsList(projects.personal);
    } else if (projectType === 'hackathon') {
      setProjectType('hackathon');
      setProjectsList(projects.hackathon);
    }
  };

  const darkModeButtonOnClick = (event) => {
    if (theme === 'dark') {
      if (!isSsr) {
        document.documentElement.removeAttribute('data-theme');
      }
      // localStorage.theme = 'light';
      setTheme('light');
    } else {
      if (!isSsr) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      // localStorage.theme = 'dark';
      setTheme('dark');
    }
  };

  return (
    <div className={`mt-12 mb-12 ${STYLES.Projects}`}>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold pb-2">Projects</h2>
        <button onClick={darkModeButtonOnClick}>
          {theme === 'dark' ? <FaMoon size="1.5em" /> : <FaSun size="1.5em" />}
        </button>
      </div>
      <div className="flex flex-row pb-2">
        <button
          type="button"
          className={`text-center font-semibold px-3 py-2 cursor-pointer ${
            projectType === 'personal' ? STYLES.activeTab : STYLES.inactiveTab
          }`}
          onClick={() => setActiveTab('personal')}
          aria-label="Personal projects tab"
        >
          Personal
        </button>
        <button
          type="button"
          className={`text-center font-semibold px-3 py-2 cursor-pointer ${
            projectType === 'hackathon' ? STYLES.activeTab : STYLES.inactiveTab
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
