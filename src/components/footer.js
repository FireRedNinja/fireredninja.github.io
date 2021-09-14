import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Text } from '@fluentui/react'

const Footer = (props) => (
  <footer className="flex content-center justify-center h-48 p-12 bg-gray-700 w-full absolute bottom-0">
    <a href="https://github.com/FireRedNinja" className="mx-2">
      <div className="flex flex-col">
        <FontAwesomeIcon
          icon={faGithub}
          size="4x"
          color="white"
          className="mx-6"
        />
        <Text variant={'mediumPlus'} className="text-gray-100 self-center">
          FireRedNinja
        </Text>
      </div>
    </a>
    <a href="https://www.linkedin.com/in/noelrajan31" className="mx-2">
      <div className="flex flex-col">
        <FontAwesomeIcon
          icon={faLinkedin}
          size="4x"
          color="white"
          className="mx-6"
        />
        <Text variant={'mediumPlus'} className="text-gray-100 self-center">
          Noel Rajan
        </Text>
      </div>
    </a>
  </footer>
)

export default Footer
