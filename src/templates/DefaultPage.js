import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Accordion from '../components/Accordion'
import Layout from '../components/Layout'
import FooterSection from '../components/FooterSection'

import './DefaultPage.css'

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  body,
  quote,
  accordion
}) => (
  <main className="DefaultPage">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section SideCircleBlue">
      <div className="container">
        {!!quote && <p class="larger">{quote}</p>}
        {!!body && <Content source={body} />}
        {!!accordion && <Accordion items={accordion} />}
      </div>
    </section>

    <FooterSection />
  </main>
)

const DefaultPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <DefaultPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default DefaultPage

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      ...Meta
      frontmatter {
        title
        featuredImage
        quote
        accordion {
          title
          text
        }
      }
    }
  }
`
