import React from 'react'
import { graphql, Link } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import FooterSection from '../components/FooterSection'

import './PatientInfoPage.css'

export const PatientInfoPageTemplate = ({
  title,
  featuredImage,
  quote,
  contentBlocks,
  aside
}) => {
  console.log(contentBlocks)
  return (
    <main className="ParientInfoPage">
      <PageHeader title={title} backgroundImage={featuredImage} />
      <section className="ParientInfoPage--ContentSection section">
        <div className="container">
          <p className="larger">{quote}</p>
        </div>
      </section>
      <div className="container Flexbox">
        <div>
          {!!aside && (
            <aside className="ParientInfoPage--Asside">
              <h4>{aside.downloadTitle}</h4>
              <a className="Button" href={aside.file} download={aside.file}>
                download form
              </a>
              <hr />
              <h4>{aside.titleFAQ}</h4>
              <Link to="/faq" className="Button">
                See faq
              </Link>
            </aside>
          )}
        </div>

        <section className="ParientInfoPage--Content section">
          <div className="Flexbox">
            {!!contentBlocks &&
              contentBlocks.map((block, i) => (
                <div
                  className="ParientInfoPage--contentBlock"
                  key={'ParientInfoPage-contentBlock-' + i}
                >
                  <h3>{block.title}</h3>
                  <p>{block.text}</p>
                </div>
              ))}
          </div>
        </section>
      </div>
      <FooterSection />
    </main>
  )
}

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
      ...Meta
      frontmatter {
        title
        featuredImage
        quote
        contentBlocks {
          text
          title
        }
        aside {
          downloadTitle
          file
          titleFAQ
        }
      }
    }
  }
`
