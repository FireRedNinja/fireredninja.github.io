import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import * as STYLES from './footer.module.scss';

const Footer = () => (
  <footer
    className={`flex content-center justify-center p-8 w-full absolute bottom-0 ${STYLES.Footer}`}
  >
    <a href="https://github.com/FireRedNinja" className={STYLES.Footer__link}>
      <div className="flex flex-col items-center">
        <FaGithub size="4em" />
        <span className="pt-2 font-light self-center">FireRedNinja</span>
      </div>
    </a>
    <a
      href="https://www.linkedin.com/in/noelrajan31"
      className={STYLES.Footer__link}
    >
      <div className="flex flex-col items-center">
        <FaLinkedin size="4em" />
        <span className="pt-2 font-light self-center">Noel Rajan</span>
      </div>
    </a>
  </footer>
);

export default Footer;
