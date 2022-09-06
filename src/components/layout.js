/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Footer from '../components/footer';
import * as STYLES from './layout.module.scss';

const Layout = ({ header = true, footer = true, children }) => {
  return (
    <div className={STYLES.Layout}>
      {header ? <Header /> : null}
      <div className={STYLES.header_blend_main} />
      <main className={STYLES.main}>
        <div className={STYLES.children}>{children}</div>
      </main>
      {footer ? <Footer /> : null}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
