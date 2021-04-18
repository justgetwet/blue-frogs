import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Tag from './tags'

export default function Apps() {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: { frontmatter: { tags: { eq: "app" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        totalCount
        edges {
          node {
            id
            slug
            excerpt
            frontmatter {
              title
              date(formatString: "YYYY-MM-DD")
              tags
            }
          }
        }
      }
    }
  `)
  const Posts = data.allMdx.edges
  return (
    <>
      <h2 className="mt-4 text-lg text-dclCyan">Apps</h2>
      <hr />
      {Posts.map(({ node }) => (
        <div key={node.id} className="text-lg">
          <h3 className="inline text-dclYellow">
            <Link to={`/apps/` + node.slug}>{node.frontmatter.title}</Link>
          </h3>
        </div>
      ))}
    </>
  )
}
