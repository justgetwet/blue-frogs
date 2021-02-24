import React from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'

export default function Categories() {
  const data = useStaticQuery(graphql`
    query {
      allMdx(limit: 1000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  return (
    <>
      <h2 className="mt-4 text-lg text-dclCyan">Tags</h2>
      <hr />
      {data.allMdx.group.map((t, index) => {
        const tag = `${t.fieldValue}` + `(` + `${t.totalCount}` + `)`
        return (
          <ul key={index} className="list-none text-lg">
            <li className="">
              <Link to={`/tags/${kebabCase(t.fieldValue)}/`}>{tag}</Link>
            </li>
          </ul>
        )
      })}
    </>
  )
}

Categories.propTypes = {
  className: PropTypes.string,
}