import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import Image from '../components/Image'
import Slider from 'react-slick'
import ServicesGrid from '../components/ServicesGrid'
import FooterSection from '../components/FooterSection'

import './AboutPage.css'

// Export Template for use in CMS preview
export const AboutPageTemplate = ({
  title,
  template,
  featuredImage,
  quote,
  content,
  sliderImages,
  teamMembers,
  services
}) => (
  <main className="About">
    <Helmet>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
    </Helmet>
    <PageHeader title={title} backgroundImage={featuredImage} />

    <section className="About--ContentSection section">
      <div className="container">
        <p className="larger">{quote}</p>
        <p className="columns">{content}</p>
        <Link to="/contact" className="Button ">
          Contact us
        </Link>
      </div>
    </section>

    <section className="About--Slider section">
      <div className="About--SliderWrap">
        <Slider
          {...{
            draggable: true,
            slide: 'About--SliderImage',
            arrows: true,
            focusOnSelect: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 3000
          }}
        >
          {!!sliderImages &&
            sliderImages.length &&
            sliderImages.map((image, index) => {
              return (
                <Image
                  className="About--SliderImage"
                  key={'About--SliderImage' + index}
                  src={image}
                  background
                  alt={'About--SliderImage' + index}
                />
              )
            })}
        </Slider>
      </div>
    </section>

    {!!teamMembers && (
      <section className="About--TeamSection section">
        <div className="container">
          <h2>Our team</h2>
          <div className="About--Team">
            {teamMembers.map((member, index) => (
              <div className="About-TeamMember">
                <div>
                  <figure>
                    <Image background src={member.photo} alt={member.name} />
                  </figure>
                </div>
                <div>
                  <h3 className="colored">{member.name}</h3>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )}

    {!!services && (
      <section className="Home--Services section">
        <div className="container">
          <h2>How can we help you:</h2>
          <ServicesGrid services={services} />
        </div>
        <Image
          className="Figure"
          src="/images/servicesFigure.svg"
          alt="services background figure"
        />
      </section>
    )}

    <FooterSection />
  </main>
)

const AboutPage = ({ data: { page, services } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <AboutPageTemplate
      {...page}
      {...page.frontmatter}
      services={{ ...services }}
    />
  </Layout>
)

export default AboutPage

export const pageQuery = graphql`
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      frontmatter {
        title
        template
        featuredImage
        quote
        content
        sliderImages
        teamMembers {
          name
          description
          photo
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
  }
`
