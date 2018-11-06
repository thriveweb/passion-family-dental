import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import FooterSection from '../components/FooterSection'

import './PatientInfoPage.css'

export const PatientInfoPageTemplate = ({
  title,
  featuredImage,
  quote,
  content,
  aside
}) => (
  <main className="Service">
    <PageHeader title={title} backgroundImage={featuredImage} />

    <FooterSection />
  </main>
)

// Export Default PatientInfoPage for front-end
const PatientInfoPage = ({ data: { page } }) => {
  return (
    <Layout
      meta={page.frontmatter.meta || false}
      title={page.frontmatter.title || false}
    >
      <PatientInfoPageTemplate {...page} {...page.frontmatter} />
    </Layout>
  )
}

export default PatientInfoPage

export const pageQuery = graphql`
  ## Query for PatientInfoPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query PatientInfoPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      id
      ...Meta
    }
  }
`

// frontmatter {
//   title
//   featuredImage
//   quote
//   content {
//     text
//     title
//   }
//   aside {
//     downloadTitle
//     file
//     titleFAQ
//   }
// }
