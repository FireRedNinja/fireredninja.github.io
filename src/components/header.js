import { Text } from '@fluentui/react'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <header className="flex content-center justify-center py-8 md:py-20 bg-gray-700">
    <div className="flex flex-col">
      <Text variant={'mega'} className="text-gray-100">
        Noel Rajan
      </Text>
      <Text
        variant={'xLarge'}
        className="flex flex-none text-gray-200 justify-center"
      >
        Software Engineer
      </Text>
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
