import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faItchIo } from '@fortawesome/free-brands-svg-icons'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Modal, Text } from '@fluentui/react'

import { ModalImage } from './project.module.scss'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className="flex flex-col mb-4 border-solid border rounded p-6">
      {props.image && (
        <button
          className="flex flex-row justify-center rounded max-h-32 md:max-h-56 hover:bg-gray-100 "
          onClick={() => setIsModalOpen(true)}
        >
          <GatsbyImage className="rounded" image={props.image} alt="" />
          <Modal
            isOpen={isModalOpen}
            onDismiss={() => setIsModalOpen(false)}
            containerClassName={ModalImage}
          >
            <GatsbyImage image={props.image} alt="" />
          </Modal>
        </button>
      )}
      <div className="flex flex-col">
        <div className="flex flex-col flex-grow py-4">
          <Text variant={'xLarge'}>{props.title}</Text>
          <Text variant={'mediumPlus'}>{props.description}</Text>
        </div>
        <div className="flex flex-row">{buildLinks(props.links)}</div>
      </div>
    </div>
  )
}

export default Project
