import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

export default function Archive() {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        group(field: fields___year_month) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  const months = data.allMdx.group.slice().reverse() // 非破壊的に反転
  return (
    <>
      <h2 className="mt-4 text-lg text-dclCyan">Archive</h2>
      <hr />
      {months.map((m, index) => {
        const month_count =
          `${m.fieldValue}` + `(` + `${m.totalCount}` + `)`
        return (
          <ul key={index} className="list-none text-lg">
            <li className="">
              <Link to={`/archive/posted-in-${m.fieldValue}/`}>
                {month_count}
              </Link>
            </li>
          </ul>
        )
      })}
    </>
  )
}