import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import styles from "./index.module.css"

const IndexPage: React.FC<{}> = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        buildTime(formatString: "YYYY-MM-DD hh:mm a z")
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <div className={styles.content}>
        <Header />
        <p>Page built on {data.site.buildTime}</p>
        <p>Displaying this info just to have a sample query for future use.</p>
      </div>
    </Layout>
  )
}

export default IndexPage
