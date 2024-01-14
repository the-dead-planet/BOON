import React from "react"
import { makeStyles, createStyles } from "@mui/styles"
import { Container, Grid, Theme } from "@mui/material"

import Layout from "../components/layout"
import Header from "../components/header"
import EnterButton from "../components/enter-button"
import FeatureDescription from "../components/feature-description"
import featureDescriptions from "../data/featureDescriptions"
import SEO from "../components/seo"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    home: {
      marginBottom: "1.45rem",
      maxWidth: "800px",
    },
    contentContainer: {
      marginTop: theme.spacing(10),
      color: "rgba(255, 255, 255, .87)",
    },
  })
)

const IndexPage: React.FC<{}> = () => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Home" />
      <div className={classes.home}>
        <Header />
        <Container
          maxWidth="md"
          id="main-content"
          className={classes.contentContainer}
        >
          <EnterButton />
          <Grid container justifyContent="space-around">
            {featureDescriptions.map((item, i) => (
              <FeatureDescription key={i} {...item} />
            ))}
          </Grid>
        </Container>
      </div>
    </Layout>
  )
}

export default IndexPage
