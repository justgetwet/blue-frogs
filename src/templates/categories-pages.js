import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Tag from '../components/tags'

export default ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const categories = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`
  const rootPath = `${__PATH_PREFIX__}/`
  return (
    <Layout>
      <h2 className="text-lg text-dclCyan">{categories}</h2>
      <hr />
      {edges.map(({ node }) => (
        <h3 key={node.id} className="text-lg">
          <div className="inline">{node.frontmatter.date}</div>
          <div className="inline ml-2 text-dclYellow">
            <Link to={rootPath + node.slug}>{node.frontmatter.title}</Link>
          </div>
          <div className="inline ml-2 whitespace-nowrap">
            <Tag tags={node.frontmatter.tags} />
          </div>
        </h3>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          slug
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            tags
          }
        }
      }
    }
  }
`