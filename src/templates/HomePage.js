import React from 'react'
import { graphql } from 'gatsby'
import _camelCase from 'lodash/camelCase'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import Image from '../components/Image'
import ServicesGrid from '../components/ServicesGrid'
import FooterSection from '../components/FooterSection'

import _truncate from 'lodash/truncate'

import './HomePage.css'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  subtitle,
  featuredImage,
  description,
  servicesSection,
  services,
  benefitsSection,
  phone
}) => {
  return (
    <main className="Home">
      <PageHeader
        large
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
        button={{ link: '/contact/', label: 'Contact us' }}
      />

      <section className="Home--QuoteSection section">
        <div className="container">
          <p className="larger">{description}</p>
          <a href={'tel:' + _camelCase(phone)} className="Button">
            Call us
          </a>
        </div>
      </section>

      {!!servicesSection && (
        <section className="Home--Services section">
          <div className="Home--ServicesTextWrapper">
            <div className="container">
              <h2>{servicesSection.title}</h2>
              <p className="larger">{servicesSection.shortDescription}</p>
            </div>
            <Image
              className="Figure mobile top"
              src="/images/servicesFigure-top.svg"
              alt="services background figure"
            />
            <Image
              className="Figure mobile bottom"
              src="/images/servicesFigure-bottom.svg"
              alt="services background figure"
            />
          </div>
          <div className="container">
            {!!services && <ServicesGrid services={services} />}
          </div>
          <Image
            className="Figure"
            src="/images/servicesFigure.svg"
            alt="services background figure"
          />
        </section>
      )}

      {!!benefitsSection && (
        <div className="SideCircleBlue">
          <section className="Home--Benefits section">
            <div className="container">
              <h2>{benefitsSection.title}</h2>
              <p className="larger">{benefitsSection.shortDescription}</p>
              {benefitsSection.benefits &&
                benefitsSection.benefits.length && (
                  <div className="Home--BenefitsGrid Flexbox">
                    {benefitsSection.benefits.map((benefit, index) => {
                      return (
                        <div
                          className="Home--BenefitsGridItem"
                          key={benefit.benefit + ' ' + index}
                        >
                          <div>
                            <figure>
                              <Image
                                background
                                src={benefit.featuredImage}
                                alt={benefit.benefit}
                              />
                            </figure>
                          </div>
                          <div>
                            <h3 className="colored">{benefit.benefit}</h3>
                            <p>
                              {_truncate(benefit.shortDescription, {
                                length: 100,
                                separator: ' '
                              })}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
            </div>
          </section>
        </div>
      )}

      <FooterSection />
    </main>
  )
}
// Export Default HomePage for front-end
const HomePage = ({ data: { page, services, contact } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate
      {...page}
      {...page.frontmatter}
      services={{ ...services }}
      phone={contact.edges[0].node.frontmatter.phone || false}
    />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      frontmatter {
        title
        subtitle
        featuredImage
        description
        servicesSection {
          title
          shortDescription
        }
        benefitsSection {
          title
          shortDescription
          benefits {
            benefit
            shortDescription
            featuredImage
          }
        }
      }
    }
    services: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
    ) {
      edges {
        node {
          ...Services
        }
      }
    }
    contact: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "ContactPage" } } }
    ) {
      edges {
        node {
          frontmatter {
            phone
          }
        }
      }
    }
  }
`
