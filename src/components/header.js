import PropTypes from 'prop-types'
import React from 'react'
import * as STYLES from './header.module.scss'

const Header = ({ siteTitle }) => (
  <header className={`md:py-20 ${STYLES.Header}`}>
    <div className="flex flex-col">
      <h1 className="flex justify-center text-gray-100 text-5xl font-bold pb-2">
        Noel Rajan
      </h1>
      <span className="flex flex-none text-gray-200 justify-center text-2xl font-extralight">
        Software Engineer
      </span>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
