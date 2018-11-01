import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import './AboutPage.css'

// Export Template for use in CMS preview
export const AboutPageTemplate = ({ title, subtitle, featuredImage, body }) => (
  <main className="About">
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
  </main>
)

const AboutPage = ({ data: { page } }) => (
  <Layout>
    <AboutPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default AboutPage

export const pageQuery = graphql`
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        template
        featuredImage
      }
    }
  }
`
