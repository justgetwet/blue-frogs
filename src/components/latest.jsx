import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Tag from './tags'

export default function Latest() {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
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
      <h2 className="text-lg text-dclCyan">Latest</h2>
      <hr />
      {Posts.map(({ node }) => (
        <div key={node.id} className="text-lg">
          <div className="inline">{node.frontmatter.date}</div>
          <h3 className="inline ml-2 text-dclYellow">
            <Link to={`/` + node.slug}>{node.frontmatter.title}</Link>
          </h3>
          <div className="inline ml-2 whitespace-nowrap">
            <Tag tags={node.frontmatter.tags} />
          </div>
        </div>
      ))}
    </>
  )
}


