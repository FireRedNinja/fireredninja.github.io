import React from 'react';

import * as STYLES from './NotFound.module.scss';
import svg404 from '../images/undraw_page_not_found_su7k.svg';
import { Link } from 'gatsby';

const NotFound = () => {
  return (
    <div className={STYLES.NotFound}>
      <img alt="404" src={svg404} />
      <Link to="/" className={STYLES.HomeButton}>
        <button href="" aria-label="Go back home">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
