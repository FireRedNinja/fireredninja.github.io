import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import { FooterStyles } from './footer.module.scss'

const Footer = (props) => (
  <footer
    className={`flex content-center justify-center h-48 p-12 bg-gray-700 w-full absolute bottom-0 ${FooterStyles}`}
  >
    <a href="https://github.com/FireRedNinja" className="mx-2">
      <div className="flex flex-col">
        <FontAwesomeIcon
          icon={faGithub}
          size="4x"
          color="white"
          className="mx-8 mb-2"
        />
        <span className="text-gray-100 self-center">FireRedNinja</span>
      </div>
    </a>
    <a href="https://www.linkedin.com/in/noelrajan31" className="mx-2">
      <div className="flex flex-col">
        <FontAwesomeIcon
          icon={faLinkedin}
          size="4x"
          color="white"
          className="mx-8 mb-2"
        />
        <span className="text-gray-100 self-center">Noel Rajan</span>
      </div>
    </a>
  </footer>
)

export default Footer
