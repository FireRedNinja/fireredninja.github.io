/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/header'
import Footer from '../components/footer'
import { LayoutStyles } from './layout.module.scss'

const Layout = ({ header = true, footer = true, children }) => {
  return (
    <div className="relative min-h-screen">
      {header ? <Header /> : null}
      <main className={`mx-auto px-8 max-w-5xl pb-48 ${LayoutStyles}`}>
        {children}
      </main>
      {footer ? <Footer /> : null}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
