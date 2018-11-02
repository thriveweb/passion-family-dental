import React from 'react'
import { Link } from 'gatsby'
import _truncate from 'lodash/truncate'

import './ServicesGrid.css'

export default class ServicesGrid extends React.Component {
  render() {
    const { services } = { ...this.props }

    if (services && services.hasOwnProperty('edges') && services.edges.length) {
      return (
        <div className="Services--Grid Flexbox Grid">
          {services.edges.map((item, index) => {
            const service = {
              ...item.node.fields,
              ...item.node.frontmatter
            }
            const icon = {
              maskImage: `url(${service.icon})`,
              WebkitMaskImage: `url(${service.icon})`
            }
            return (
              <Link
                to={service.slug}
                className="GridItem"
                key={service.slug + '-' + index}
                title={service.title}
              >
                <div class="GridItemHead">
                  <div className="ServiceIcon">
                    <div style={icon} />
                  </div>
                  <h3>{service.title}</h3>
                </div>
                <p>
                  {_truncate(service.shortDescription, {
                    length: 100,
                    separator: ' '
                  })}
                </p>
              </Link>
            )
          })}
        </div>
      )
    }

    return ''
  }
}
