import React from 'react';
import * as STYLES from './header.module.scss';

const Header = () => {
  return (
    <header className={`md:py-20 ${STYLES.Header}`}>
      <div className="flex flex-col">
        <h1 className="flex justify-center text-5xl font-bold pb-2">
          Noel Rajan
        </h1>
        <span className="flex flex-none justify-center text-2xl font-extralight">
          Software Engineer
        </span>
      </div>
    </header>
  );
};

export default Header;
