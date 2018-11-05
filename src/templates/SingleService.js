import React from 'react'
import { graphql } from 'gatsby'

import Image from '../components/Image'
import Layout from '../components/Layout'

export const SingleServiceTemplate = ({ title, featuredImage }) => (
  <main>
    {featuredImage && (
      <Image
        background
        className="SingleService--BackgroundImage"
        src={featuredImage}
        alt={title}
      />
    )}
  </main>
)

// Export Default SingleService for front-end
const SingleService = ({ data: { page } }) => {
  return (
    <Layout
      meta={page.frontmatter.meta || false}
      title={page.frontmatter.title || false}
    >
      <SingleServiceTemplate {...page} {...page.frontmatter} />
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
      }
    }
  }
`
