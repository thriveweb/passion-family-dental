import React, { Component } from 'react'
import { Location } from '@reach/router'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Menu, X, ChevronDown } from 'react-feather'

import _get from 'lodash/get'
// import _kebabCase from 'lodash/kebabCase'

import Logo from './Logo'
import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeItem: false,
    activeSubnav: false,
    currentPath: false
  }

  componentDidMount() {
    this.setState({ currentPath: this.props.location.pathname })
  }

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubnav = () =>
    this.setState({
      activeSubnav: !this.state.activeSubnav
    })

  render() {
    const { active } = this.state

    const NavLink = ({ to, className, children, ...props }) => {
      return (
        <Link
          {...props}
          to={to}
          className={`NavLink ${className || ''} ${
            to === this.state.currentPath ? 'active' : ''
          }`}
          onClick={this.handleLinkClick}
          title={children}
        >
          {children}
        </Link>
      )
    }

    const NavLinkGroup = ({ children, to, title, contentType, ...props }) => (
      <div
        className={`NavLinkGroup ${this.state.activeSubnav ? 'active' : ''}`}
      >
        {(() => {
          const path = this.state.currentPath || ''
          if (to) {
            return (
              <NavLink
                className={`NavLink ${
                  path.includes('services') ? 'active' : ''
                }`}
                to={to}
                {...props}
                onClick={this.toggleSubnav}
              >
                {children}
              </NavLink>
            )
          }
          return (
            <span
              className={`NavLink ${path.includes('services') ? 'active' : ''}`}
              {...props}
              onClick={this.toggleSubnav}
            >
              {children}
              <ChevronDown />
            </span>
          )
        })()}
        <NavLinkGroupItems contentType={contentType} />
      </div>
    )

    const NavLinkGroupItems = ({ contentType }) => (
      <StaticQuery
        query={graphql`
          query {
            allPages: allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                    contentType
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const { allPages } = data

          const getChildPages = parentSlug =>
            allPages.edges.filter(
              page =>
                _get(page, 'node.fields.contentType', '').indexOf(
                  parentSlug
                ) === 0
            )

          return (
            <div
              className={`SubNav ${this.state.activeSubnav ? 'active' : ''}`}
            >
              {!!getChildPages &&
                getChildPages(contentType).map(page => {
                  page = { ...page.node }
                  return (
                    <NavLink
                      onClick={this.toggleActive}
                      key={page.fields.slug}
                      to={page.fields.slug}
                      exact={true.toString()}
                    >
                      {page.frontmatter.title}
                    </NavLink>
                  )
                })}
            </div>
          )
        }}
      />
    )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container larger">
          <Link to="/" onClick={this.handleLinkClick} title="Home">
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink to="/" exact={true.toString()}>
              Home
            </NavLink>
            <NavLink to="/about/" exact={true.toString()}>
              About
            </NavLink>
            <NavLinkGroup exact={true.toString()} contentType="services">
              Dental Services
            </NavLinkGroup>
            <NavLink to="/patient-info/" exact={true.toString()}>
              Patient Info
            </NavLink>
            <NavLink to="/contact/" exact={true.toString()}>
              Contact
            </NavLink>
            <a
              className="Nav--MenuButton Button Icon"
              href="https://onlinebookingapac.3pointdata.com/soe/new/Passion%20Family%20Dental%20North%20Lakes?pid=AUPFD01"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="icon"
                height="16"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="currentColor" fillRule="evenodd">
                  <path d="M13.435 1.842h-.49v.895c0 .598-.481 1.085-1.073 1.085s-1.073-.487-1.073-1.085v-.895H4.035v.895a1.08 1.08 0 0 1-1.072 1.085 1.08 1.08 0 0 1-1.074-1.085v-.895H1.4C.628 1.842 0 2.475 0 3.256v10.937c0 .78.627 1.414 1.4 1.414h12.036c.773 0 1.4-.633 1.4-1.414V3.256c0-.78-.627-1.414-1.4-1.414zM13.11 13.4c0 .282-.25.511-.56.511H2.286c-.31 0-.56-.228-.56-.511V6.314c0-.283.25-.512.56-.512H12.55c.31 0 .56.23.56.512z" />
                  <path d="M2.963 3.256a.516.516 0 0 0 .513-.519V.57c0-.287-.23-.519-.513-.519s-.514.232-.514.519v2.168c0 .287.23.519.514.519zM11.873 3.256a.516.516 0 0 0 .513-.519V.57c0-.287-.23-.519-.513-.519s-.514.232-.514.519v2.168c0 .287.23.519.514.519zM2.708 9.493h2.715V6.686H2.708zM6.125 9.493h2.716V6.686H6.125zM2.708 12.944h2.715v-2.807H2.708zM6.125 12.944h2.716v-2.807H6.125zM9.671 9.493h2.716V6.686H9.67zM9.671 12.944h2.716v-2.807H9.67z" />
                </g>
              </svg>
              Book Now
            </a>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default () => <Location>{route => <Navigation {...route} />}</Location>
