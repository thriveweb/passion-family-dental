import React, { Fragment } from 'react'
// import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
// import _get from 'lodash/get'
import _format from 'date-fns/format'
import { Link } from 'gatsby'
// import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Image from '../components/Image'
// import Layout from '../components/Layout'

export const SinglePostTemplate = ({
  title,
  date,
  featuredImage,
  body,
  nextPostURL,
  prevPostURL,
  categories = []
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {featuredImage && (
        <Image
          background
          className="SinglePost--BackgroundImage"
          src={featuredImage}
          alt={title}
        />
      )}

      <div className="container skinny">
        <Link className="SinglePost--BackButton" to="/blog/" title="blog">
          <ChevronLeft /> BACK
        </Link>
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

// Export Default SinglePost for front-end
const SinglePost = ({ data, pageContext }) => {
  return ''
  // const { post, allPosts } = data
  // const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  // return (
  //   <Layout>
  //     <SinglePostTemplate
  //       {...post}
  //       {...post.frontmatter}
  //       body={post.html}
  //       nextPostURL={_get(thisEdge, 'next.fields.slug')}
  //       prevPostURL={_get(thisEdge, 'previous.fields.slug')}
  //     />
  //   </Layout>
  // )
}

export default SinglePost

// export const pageQuery = graphql`
//   ## Query for SinglePost data
//   ## Use GraphiQL interface (http://localhost:8000/___graphql)
//   ## $id is processed via gatsby-node.js
//   ## query name must be unique to this file
//   query SinglePost($id: String!) {
//     post: markdownRemark(id: { eq: $id }) {
//       id
//       frontmatter {
//         title
//         template
//         featuredImage
//         quote
//         shortDescription
//         serviceBlocks {
//           content
//           title
//         }
//         documents
//       }
//     }
//
//     allPosts: allMarkdownRemark(
//       filter: { fields: { contentType: { eq: "posts" } } }
//     ) {
//       edges {
//         node {
//           id
//         }
//         next {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//           }
//         }
//         previous {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `
