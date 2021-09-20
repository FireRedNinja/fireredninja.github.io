import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <header className="flex content-center justify-center py-8 md:py-20 bg-gray-700">
    <div className="flex flex-col">
      <h1 className="flex justify-center text-gray-100">Noel Rajan</h1>
      <span className="flex flex-none text-gray-200 justify-center">
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
