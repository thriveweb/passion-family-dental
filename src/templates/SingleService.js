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
            {!!documents && (
              <div>
                <h5>{documents[0].name}</h5>
                <a
                  href={documents[0].file}
                  download={documents[0].file}
                  className="Button"
                >
                  download form
                </a>
              </div>
            )}
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
