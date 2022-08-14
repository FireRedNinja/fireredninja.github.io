import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import * as STYLES from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={STYLES.Footer}>
      <a href="https://github.com/FireRedNinja" className={STYLES.Link}>
        <div className={STYLES.Link__container}>
          <FaGithub size="2em" />
          <span className={STYLES.Link__container__text}>FireRedNinja</span>
        </div>
      </a>
      <a href="https://www.linkedin.com/in/noelrajan31" className={STYLES.Link}>
        <div className={STYLES.Link__container}>
          <FaLinkedin size="2em" />
          <span className={STYLES.Link__container__text}>Noel Rajan</span>
        </div>
      </a>
    </footer>
  );
};

export default Footer;
