import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'

import Image from './Image'
import Content from './Content'

import './Footer.css'

export default ({ globalSettings, socialSettings, navLinks }) => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          allMarkdownRemark(
            filter: {
              fileAbsolutePath: { regex: "/global-content/footer.md/" }
            }
          ) {
            edges {
              node {
                frontmatter {
                  openingHours
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { openingHours } =
          data.allMarkdownRemark.edges[0].node.frontmatter || false
        return (
          <footer className="Footer">
            <div className="container">
              <div className="Flexbox Footer--Content">
                <div>
                  <h3>Opening hours</h3>
                  <Content source={openingHours} />
                </div>
                <div>
                  <Image
                    className="Footer--Logo"
                    src="/images/footerLogo.svg"
                    alt="footer logo passion family dental"
                  />
                </div>
                <div>
                  <h3>Info</h3>
                  <p>
                    <Link to="/about/" title="about us">
                      About Us
                    </Link>
                    <Link to="/patient-info/" title="patient info">
                      Patient Info
                    </Link>
                    <Link to="/contact/" title="contact">
                      Contact
                    </Link>
                  </p>
                </div>
              </div>
              <div className="Footer--Copy Flexbox">
                <div>
                  <p>
                    © Copyright {new Date().getFullYear()} Passion Family
                    Dental. Site by{' '}
                    <a
                      href="https://thriveweb.com.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Thrive Digital
                    </a>
                  </p>
                </div>
                <div>
                  <p>
                    <Link className="Link" to="/faq/" title="FAQ">
                      FAQ
                    </Link>
                    <Link className="Link" to="/privacy/" title="Privacy">
                      Privacy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <Image
              className="Figure"
              src="/images/footerFigure.png"
              alt="footer background figure"
            />
          </footer>
        )
      }}
    />
  )
}
