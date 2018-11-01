import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import './HomePage.css'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  subtitle,
  featuredImage,
  description,
  servicesSection,
  benefitsSection
}) => (
  <main className="Home">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
      button={{ link: '/contact', label: 'Contact us' }}
    />

    <section className="Home--QuoteSection section">
      <div className="container">
        <p className="quote">{description}</p>
        <a href="tel:" className="Button">
          Call us
        </a>
      </div>
    </section>

    <section className="Home--Services section">
      <div className="container" />
    </section>
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
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
          benetits {
            benefit
            shortDescription
            featuredImage
          }
        }
      }
    }
  }
`
