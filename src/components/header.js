import React from 'react';
import * as STYLES from './header.module.scss';

const Header = () => {
  return (
    <header className={STYLES.Header}>
      <div className={STYLES.Container}>
        <h1>Noel Rajan</h1>
        <span>Software Engineer</span>
      </div>
    </header>
  );
};

export default Header;
