import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faItchIo } from '@fortawesome/free-brands-svg-icons'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Modal } from 'react-bootstrap'

const iconMappings = {
  github: faGithub,
  'itch.io': faItchIo,
}

const buildLinks = (links) =>
  links.map((link) => (
    <a href={link.link} key={link.name} className="mr-2">
      <FontAwesomeIcon icon={iconMappings[link.name.toLowerCase()]} size="2x" />
    </a>
  ))

const Project = (props) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <div className="flex flex-col mb-4 border-solid border rounded p-6">
      {props.image && (
        <button
          className="flex flex-row justify-center rounded max-h-32 md:max-h-56 hover:bg-gray-100 active:bg-green-700"
          onClick={handleShow}
        >
          <GatsbyImage className="rounded" image={props.image} alt="" />
          <div onClick={(e) => e.stopPropagation()}>
            <Modal
              show={show}
              onHide={handleClose}
              animation={false}
              centered
              size="lg"
            >
              <Modal.Body className="flex justify-center p-0">
                <GatsbyImage image={props.image} alt="" />
              </Modal.Body>
            </Modal>
          </div>
        </button>
      )}
      <div className="flex flex-col">
        <div className="flex flex-col py-4">
          <h4>{props.title}</h4>
          <p>{props.description}</p>
        </div>
        <div className="flex flex-row">{buildLinks(props.links)}</div>
      </div>
    </div>
  )
}

export default Project
