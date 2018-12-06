import React, { Fragment } from 'react'
import _get from 'lodash/get'
import _truncate from 'lodash/truncate'
import _kebabCase from 'lodash/kebabCase'
import _format from 'date-fns/format'
import { Link, graphql } from 'gatsby'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import './SinglePost.css'

export const SinglePostTemplate = ({
  title,
  date,
  featuredImage,
  body,
  nextPostURL,
  prevPostURL,
  relatedService,
  categories = [],
  services
}) => {
  let cato = categories
    ? categories.map((cat, index) => {
        return cat.category + (index !== categories.length - 1 ? ',' : '')
      })
    : ''

  return (
    <main>
      <article itemScope itemType="http://schema.org/BlogPosting">
        {featuredImage && (
          <PageHeader title={cato} backgroundImage={featuredImage} />
        )}

        <div className="SinglePost container skinny">
          <div className="SinglePost--Content relative">
            <div className="SinglePost--Meta">
              {date && (
                <time
                  className="SinglePost--Meta--Date"
                  itemProp="dateCreated pubdate datePublished"
                  date={date}
                >
                  {_format(date, 'MMMM Do, YYYY')}
                </time>
              )}
              {categories && (
                <Fragment>
                  <span>|</span>
                  {categories.map((cat, index) => (
                    <span
                      key={cat.category}
                      className="SinglePost--Meta--Category"
                    >
                      {cat.category}
                      {/* Add a comma on all but last category */}
                      {index !== categories.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </Fragment>
              )}
            </div>

            {title && (
              <h1 className="SinglePost--Title" itemProp="title">
                {title}
              </h1>
            )}

            <div className="SinglePost--InnerContent">
              <Content source={body} />
              {services &&
                services.hasOwnProperty('edges') &&
                services.edges.length &&
                services.edges.map((item, index) => {
                  const service = {
                    ...item.node.fields,
                    ...item.node.frontmatter
                  }
                  if (
                    _kebabCase(service.title) === _kebabCase(relatedService)
                  ) {
                    const icon = {
                      maskImage: `url(${service.icon})`,
                      WebkitMaskImage: `url(${service.icon})`
                    }
                    return (
                      <div className="SinglePost--RelatedService Flexbox">
                        <h2>Related Service</h2>
                        <Link
                          to={service.slug}
                          className="GridItem"
                          key={service.slug + '-' + index}
                          title={service.title}
                        >
                          <div className="GridItemHead">
                            <div className="ServiceIcon">
                              <div style={icon} />
                            </div>
                            <h3>{service.title}</h3>
                          </div>
                          <p>
                            {_truncate(service.shortDescription, {
                              length: 180,
                              separator: ' '
                            })}
                          </p>
                          <span>See more+</span>
                        </Link>
                      </div>
                    )
                  }
                  return ''
                })}
            </div>

            <div className="SinglePost--Pagination">
              {prevPostURL && (
                <Link
                  className="SinglePost--Pagination--Link prev"
                  to={prevPostURL}
                >
                  Previous Post
                </Link>
              )}
              {nextPostURL && (
                <Link
                  className="SinglePost--Pagination--Link next"
                  to={nextPostURL}
                >
                  Next Post
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts, services } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        services={{ ...services }}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        date
        relatedService
        categories {
          category
        }
        featuredImage
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
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
  }
`
