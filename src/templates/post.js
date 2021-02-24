import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Tags from '../components/tags'
import SEO from '../components/seo'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from '../styles/markdown-styles'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { ArrowLeft, ArrowRight, ArrowUp } from '../components/icons'

export default ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const rootPath = `${__PATH_PREFIX__}/`
  const Grow = () => <div className="flex-grow" />
  const post = data.mdx
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="text-lg mt-2">Posted on {post.frontmatter.date}</div>
      <hr />
      <h2 className="text-2xl mt-2">{post.frontmatter.title}</h2>
      <div className="text-lg mt-2 mb-4">
        <Tags tags={post.frontmatter.tags} />
      </div>
      <MDXProvider components={MDXComponents}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </MDXProvider>
      <div className="flex mt-8 mb-4">
        {previous && (
          <Link to={rootPath + previous.slug}>
            <ArrowLeft />
          </Link>
        )}
        <Grow />
        <button onClick={() => scrollTo('html')}>
          <ArrowUp />
        </button>
        <Grow />
        {next && (
          <Link to={rootPath + next.slug}>
            <ArrowRight />
          </Link>
        )}
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
        description
      }
    }
  }
`
