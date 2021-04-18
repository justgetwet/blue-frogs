const path = require(`path`)
const kebabCase = require(`lodash/kebabCase`)

// archive
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const str_date = node.frontmatter.date
    const date = new Date(Date.parse(str_date))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const year_month = year + '-' + ('0' + month).slice(-2)
    // console.log(year_month)
    createNodeField({
      node,
      name: `year_month`,
      value: year_month,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            slug
          }
          next {
            slug
          }
          previous {
            slug
          }
        }
      }

      months: allMdx(limit: 1000) {
        group(field: fields___year_month) {
          fieldValue
        }
      }

      allTags: allMdx(limit: 1000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }

      allApps: allMdx(filter: { frontmatter: { tags: { eq: "app" } } }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  // post
  result.data.allMdx.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: node.slug,
        next,
        previous,
      },
    })
  })
  // archive
  result.data.months.group.forEach((m) => {
    createPage({
      path: `/archive/posted-in-${m.fieldValue}`,
      component: path.resolve('src/templates/archive-pages.js'),
      context: {
        month: m.fieldValue,
      },
    })
  })
  // categories
  result.data.allTags.group.forEach((t) => {
    createPage({
      path: `/tags/${kebabCase(t.fieldValue)}/`,
      component: path.resolve('src/templates/categories-pages.js'),
      context: {
        tag: t.fieldValue,
      },
    })
  })

  // apps
  result.data.allApps.edges.forEach(({node}) => {
    createPage({
      path: `/apps/${node.slug}/`,
      component: path.resolve('src/templates/post.js'),
      context: {
        slug: node.slug,
      },
    })
  })
}
