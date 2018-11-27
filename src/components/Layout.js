import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize/modern-normalize.css'

import './globalStyles.css'
import Meta from './Meta'
import Nav from './Nav'
import Footer from './Footer'

export default ({ children, meta, title }) => {
  return (
    <StaticQuery
      query={graphql`
        query IndexLayoutQuery {
          settingsYaml {
            siteTitle
            siteDescription
            headerScripts
            socialMediaCard {
              image
            }
          }
        }
      `}
      render={data => {
        const { siteTitle, socialMediaCard, headerScripts } =
          data.settingsYaml || {}
        return (
          <Fragment>
            <Helmet
              defaultTitle={siteTitle}
              titleTemplate={`%s | ${siteTitle}`}
            >
              <title>{title}</title>

              {`<!-- Global site tag (gtag.js) - Google Analytics -->`}
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-112589638-21"
              />
              <script>
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-112589638-21');`}
              </script>
              <meta
                name="msvalidate.01"
                content="B0112812CA622A13C327AF572E2BA5B5"
              />
              <meta
                name="google-site-verification"
                content="Dwwb0sg0Z2dbDXpFMkJGpwo7ZO1hbmhEn87Jenpj-HI"
              />
            </Helmet>

            <Meta
              headerScripts={headerScripts}
              absoluteImageUrl={
                socialMediaCard &&
                socialMediaCard.image &&
                socialMediaCard.image
              }
              {...meta}
              {...data.settingsYaml}
            />

            <Nav />

            <Fragment>{children}</Fragment>

            <Footer />
          </Fragment>
        )
      }}
    />
  )
}
