import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from './Image'

import './FooterSection.css'

export default () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterSectionQuery {
          allMarkdownRemark(
            filter: {
              fileAbsolutePath: { regex: "/global-content/footer-section.md/" }
            }
          ) {
            edges {
              node {
                frontmatter {
                  title
                  content
                }
              }
            }
          }
        }
      `}
      render={data => {
        const section =
          data.allMarkdownRemark.edges[0].node.frontmatter || false
        if (section) {
          return (
            <section className="Footer--Section section">
              <div className="container">
                <h2>{section.title}</h2>
                <div className="Flexbox">
                  <div>
                    <p>{section.content}</p>
                  </div>
                  <div>
                    <a
                      className="Button Icon"
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
                    <Link
                      to="/contact/"
                      className="Button Blue"
                      title="Contact us"
                    >
                      Contact us
                    </Link>
                  </div>
                </div>
              </div>

              <Image
                className="Figure"
                src="/images/footerSectionFigure.png"
                alt="footet section background figure"
              />
            </section>
          )
        } else {
          return ''
        }
      }}
    />
  )
}
