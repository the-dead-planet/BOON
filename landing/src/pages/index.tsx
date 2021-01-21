import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles, createStyles } from "@material-ui/core/styles"

import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      marginBottom: "1.45rem",
      maxWidth: "800px",
    },
  })
)

const IndexPage: React.FC<{}> = () => {
  const classes = useStyles()

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
      <div className={classes.content}>
        <Header />
        <p>Page built on {data.site.buildTime}</p>
        <p>Displaying this info just to have a sample query for future use.</p>
      </div>
    </Layout>
  )
}

export default IndexPage
