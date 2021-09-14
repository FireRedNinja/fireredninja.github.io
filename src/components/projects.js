import React from 'react'
import Project from './project'
import projectsList from '../data/projectsList'
import { graphql, useStaticQuery } from 'gatsby'
import { Tab, Tabs } from 'react-bootstrap'

const buildProjectList = (projects, images) => {
  return projects.map((project) => {
    let projectImage = images.filter(
      (image) => image.node.fluid.originalName === project.image
    )
    if (projectImage.length) {
      projectImage = projectImage[0].node.gatsbyImageData
    } else {
      projectImage = undefined
    }
    return (
      <Project
        title={project.title}
        description={project.description}
        links={project.links}
        key={project.title}
        image={projectImage}
      />
    )
  })
}

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
              transformOptions: { cropFocus: CENTER }
              quality: 80
            )
            fluid {
              originalName
            }
          }
        }
      }
    }
  `)
  const images = data.image.edges

  return (
    <div className="mt-12 mb-12">
      <h2>Projects</h2>
      <Tabs defaultActiveKey="personal">
        <Tab eventKey="personal" title="Personal">
          <div className="flex flex-col mt-2">
            {buildProjectList(
              projectsList.filter((project) =>
                project.tags.includes('personal')
              ),
              images
            )}
          </div>
        </Tab>
        <Tab eventKey="hackathon" title="Hackathon">
          <div className="flex flex-col mt-2">
            {buildProjectList(
              projectsList.filter((project) =>
                project.tags.includes('hackathon')
              ),
              images
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Projects
