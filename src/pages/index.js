import * as React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const moreLinks = [
  {
    text: "Github",
    url: "https://github.com/gregoripoloni"
  },
  {
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/gregori-poloni-machado/",
  },
  {
    text: "Instagram",
    url: "https://www.instagram.com/gregoripoloni/",
  },
]

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = ({ data }) => (
  <Layout>
    <div className={styles.textCenter}>
      <StaticImage
        src="../images/profile.jpg"
        loading="eager"
        width={128}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)`, borderRadius: `100px` }}
      />

      <h1>
        Gregori's <b>Thoughts!</b>
      </h1>
    </div>
    <ul className={styles.list}>
      {data.allMarkdownRemark.edges.map(({node}) => (
        <li key={node.fields.slug} className={styles.listItem}>
          <a
            className={styles.listItemLink}
            href={`${node.fields.slug}${utmParameters}`}
          >
            {node.frontmatter.title} - {node.frontmatter.date} ↗
          </a>
          <p className={styles.listItemDescription}>{node.excerpt}</p>
        </li>
      ))}
    </ul>
    {moreLinks.map((link, i) => (
      <React.Fragment key={link.url}>
        <a href={`${link.url}${utmParameters}`}>{link.text}</a>
        {i !== moreLinks.length - 1 && <> · </>}
      </React.Fragment>
    ))}
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
