import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'

import Logo from './Logo'
import './Nav.css'

export default class Nav extends Component {
  state = {
    active: false
  }

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  render() {
    const { active } = this.state

    const NavLink = ({ className, children, ...props }) => (
      <Link
        {...props}
        className={`NavLink ${className || ''}`}
        onClick={this.handleLinkClick}
      >
        {children}
      </Link>
    )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink to="/" exact="true">
              Home
            </NavLink>
            <NavLink to="/about/" exact="true">
              About
            </NavLink>
            <NavLink to="/blog/" exact="true">
              Blog
            </NavLink>
            <NavLink to="/default/" exact="true">
              Default
            </NavLink>
            <NavLink to="/contact/" exact="true">
              Contact
            </NavLink>
            <button className="Nav--MenuButton Button Primary">
              <svg height="16" width="15" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor" fill-rule="evenodd">
                  <path d="M13.435 1.842h-.49v.895c0 .598-.481 1.085-1.073 1.085s-1.073-.487-1.073-1.085v-.895H4.035v.895a1.08 1.08 0 0 1-1.072 1.085 1.08 1.08 0 0 1-1.074-1.085v-.895H1.4C.628 1.842 0 2.475 0 3.256v10.937c0 .78.627 1.414 1.4 1.414h12.036c.773 0 1.4-.633 1.4-1.414V3.256c0-.78-.627-1.414-1.4-1.414zM13.11 13.4c0 .282-.25.511-.56.511H2.286c-.31 0-.56-.228-.56-.511V6.314c0-.283.25-.512.56-.512H12.55c.31 0 .56.23.56.512z" />
                  <path d="M2.963 3.256a.516.516 0 0 0 .513-.519V.57c0-.287-.23-.519-.513-.519s-.514.232-.514.519v2.168c0 .287.23.519.514.519zM11.873 3.256a.516.516 0 0 0 .513-.519V.57c0-.287-.23-.519-.513-.519s-.514.232-.514.519v2.168c0 .287.23.519.514.519zM2.708 9.493h2.715V6.686H2.708zM6.125 9.493h2.716V6.686H6.125zM2.708 12.944h2.715v-2.807H2.708zM6.125 12.944h2.716v-2.807H6.125zM9.671 9.493h2.716V6.686H9.67zM9.671 12.944h2.716v-2.807H9.67z" />
                </g>
              </svg>
              Book Now
            </button>
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
