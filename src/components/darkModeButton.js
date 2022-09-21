import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

import * as STYLES from './darkModeButton.module.scss';

const DarkModeButton = () => {
  const setPageTheme = (mode) => {
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (mode === 'light') {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const getPageTheme = (ssr = false) => {
    if (ssr) {
      return 'light';
    }
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      setPageTheme('dark');
      return 'dark';
    } else {
      setPageTheme('light');
      return 'light';
    }
  };

  const startTheme = getPageTheme(isSsr);
  const [isSsr, setIsSsr] = useState(true);
  const [theme, setTheme] = useState(startTheme);

  const useIsSsr = () => {
    useEffect(() => {
      const startTheme = getPageTheme(false);
      setIsSsr(false);
      setTheme(startTheme);
    }, []);
  };

  const darkModeButtonOnClick = (event) => {
    if (getPageTheme(isSsr) === 'dark') {
      if (!isSsr) {
        setPageTheme('light');
      }
      setTheme('light');
    } else {
      if (!isSsr) {
        setPageTheme('dark');
      }
      setTheme('dark');
    }
  };

  useIsSsr();

  return (
    <button onClick={darkModeButtonOnClick} className={STYLES.DarkModeToggle}>
      {theme === 'dark' ? <FaMoon size="1.5em" /> : <FaSun size="1.5em" />}
    </button>
  );
};

export default DarkModeButton;
