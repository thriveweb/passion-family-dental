import React from 'react'
import { graphql } from 'gatsby'
import _camelCase from 'lodash/camelCase'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Image from '../components/Image'
import FormSimpleAjax from '../components/FormSimpleAjax'
import Layout from '../components/Layout'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  title,
  featuredImage,
  text,
  phone,
  email,
  content,
  map,
  mapLink
}) => (
  <main className="Contact">
    <PageHeader title={title} backgroundImage={featuredImage} />
    <section className="section Contact--Section1">
      <div className="Contact--top">
        <p className="larger">{text}</p>
        <div>
          {(() => {
            const icon = {
              maskImage: `url(/images/icons/phoneIcon.svg)`,
              WebkitMaskImage: `url(/images/icons/phoneIcon.svg)`
            }
            return (
              <a href={`tel:${_camelCase(phone)}`} title="Give us a call">
                <div className="ServiceIcon">
                  <div style={icon} />
                </div>
                {phone}
              </a>
            )
          })()}
          {(() => {
            const icon = {
              maskImage: `url(/images/icons/emailIcon.svg)`,
              WebkitMaskImage: `url(/images/icons/emailIcon.svg)`
            }
            return (
              <a href={`mailto:${email}`} title="Send a email">
                <div className="ServiceIcon">
                  <div style={icon} />
                </div>
                {email}
              </a>
            )
          })()}
        </div>
      </div>
      <div className="container Contact--Section1--Container">
        <div className="Contact--contentWrap">
          <Content source={content} />
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Find us on google maps"
          >
            <Image src={map} alt="location map" />
            Get directions
          </a>
        </div>
        <div>
          <FormSimpleAjax name="Simple Form Ajax" />
        </div>
      </div>
    </section>
  </main>
)

const ContactPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      ...Meta
      frontmatter {
        title
        template
        featuredImage
        content
        phone
        email
        text
        map
        mapLink
      }
    }
  }
`
