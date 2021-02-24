import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'gatsby'

const kebabCase = require('lodash/kebabCase')

export default function Tag({tags}) {
  return (
    <>
    {/* tagが空の時の処理 */}
      <div className="inline-block mr-1">{
        tags.length === 1 ? `Tag:` : `Tags:`
      }</div>
      <ul className="inline p-0">
        {tags.map((tag, index) => {
          const tagPage = `/tags/${kebabCase(tag)}/`
          return (
            <li key={index} className="inline mr-2">
              <Link to={tagPage}>{tag}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

Tag.propTypes = {
  tags: propTypes.array,
}
