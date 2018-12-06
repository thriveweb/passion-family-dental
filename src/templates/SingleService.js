import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import Content from '../components/Content'
import FooterSection from '../components/FooterSection'

import './SingleService.css'

export const SingleServiceTemplate = ({
  title,
  featuredImage,
  quote,
  shortDescription,
  serviceBlocks,
  documents,
  services
}) => (
  <main className="Service">
    <PageHeader title={title} backgroundImage={featuredImage} />
    <div className="SideCircleBlue">
      <div className="container Flexbox">
        <div>
          <aside className="Service--ServicesList">
            <h4>Other Services</h4>
            <div className="Services--ServicesListWrap">
              {!!services &&
                services.map((service, i) => {
                  const icon = {
                    maskImage: `url(${service.node.frontmatter.icon})`,
                    WebkitMaskImage: `url(${service.node.frontmatter.icon})`
                  }
                  return (
                    <Link
                      to={service.node.fields.slug}
                      key={'service-' + i}
                      className="FlexBox"
                    >
                      <div className="ServiceIcon">
                        <div style={icon} />
                      </div>
                      <span>{service.node.frontmatter.title}</span>
                    </Link>
                  )
                })}
            </div>

            <div>
              <h5>{''}</h5>
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
            </div>
          </aside>
        </div>
        <section className="Service--Content section">
          <p className="larger">{quote}</p>
          <p>{shortDescription}</p>
          {!!serviceBlocks &&
            serviceBlocks.map((item, i) => (
              <div key={'singel-service-content-block-' + i}>
                <h3 className="colored">{item.title}</h3>
                <Content source={item.content} />
              </div>
            ))}
          {!!documents && (
            <div className="Service--ContentFoot">
              {documents.map((doc, i) => (
                <a
                  key={'download-link-' + i}
                  href={doc.file}
                  download={doc.file}
                >
                  <div className="ServiceIcon">
                    <div
                      style={{
                        maskImage: `url(/images/icons/downloadIcon.svg)`,
                        WebkitMaskImage: `url(/images/icons/downloadIcon.svg)`
                      }}
                    />
                  </div>
                  {doc.name}
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
    <FooterSection />
  </main>
)

// Export Default SingleService for front-end
const SingleService = ({ data: { page, services } }) => {
  return (
    <Layout
      meta={page.frontmatter.meta || false}
      title={page.frontmatter.title || false}
    >
      <SingleServiceTemplate
        {...page}
        {...page.frontmatter}
        services={services.edges || false}
      />
    </Layout>
  )
}

export default SingleService

export const pageQuery = graphql`
  ## Query for SingleService data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleService($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      id
      ...Meta
      frontmatter {
        title
        featuredImage
        quote
        shortDescription
        serviceBlocks {
          title
          content
        }
        documents {
          name
          file
        }
      }
    }
    services: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
    ) {
      edges {
        node {
          fields {
            slug
            contentType
          }
          frontmatter {
            title
            icon
          }
        }
      }
    }
  }
`
