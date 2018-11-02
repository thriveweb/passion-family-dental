import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import Image from './Image'
import Content from './Content'
import './PageHeader.css'

const PageHeader = ({
  title,
  subtitle,
  button,
  backgroundImage,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      {backgroundImage && (
        <Image
          background
          resolutions="large"
          src={backgroundImage}
          alt={title}
          size="cover"
        />
      )}
      <div className="container relative">
        {!!title && <h1 className="PageHeader--Title">{title}</h1>}
        {!!subtitle && (
          <Content className="PageHeader--Subtitle" src={subtitle} />
        )}
        {!!button && (
          <Link
            to={button.link}
            title={button.label}
            className="PageHeader--Button Button Blue"
          >
            {button.label}
          </Link>
        )}
      </div>

      <Image
        className="Figure"
        src="/images/headerFigure.svg"
        alt="header background figure"
      />
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader
