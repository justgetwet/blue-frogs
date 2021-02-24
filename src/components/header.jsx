import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { Github, Twitter } from './icons'

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/frog.png/" }) {
        childImageSharp {
          fixed(quality: 100, width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          title
          summary
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { title, summary, social } = data.site.siteMetadata
  return (
      <div className="flex">
        <Image
          // className="rounded-full"
          fixed={data.avatar.childImageSharp.fixed}
        />
        <div className="ml-4">
          <Link to="/">
            <h1 className="text-2xl text-dclCyan">{title}</h1>
          </Link>
          <span className="text-lg">{summary}</span>
          <a className="ml-2" href={social.github}>
            <Github />
          </a>
          <a className="ml-2" href={social.twitter}>
            <Twitter />
          </a>
        </div>
      </div>
  )
}
