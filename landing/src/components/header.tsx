import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Grid, Typography, Divider } from "@material-ui/core"
import Logo from "./logo"
import dictionaryData from "../data/dictionary"
import DictionaryItem from "./dictionary-item"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      position: "relative",
    },
    topButtons: {
      position: "absolute",
      top: 0,
      "&$right": {
        right: theme.spacing(4),
        left: "auto",
      },
      "&$left": {
        left: theme.spacing(4),
        right: "auto",
      },
    },
    left: {},
    right: {},
    headerText: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      textAlign: "center",
    },
    headerDivider: {
      overflow: "visible" /* For IE */,
      width: "90%",
      height: "30px",
      borderStyle: "solid",
      borderColor: theme.palette.primary.main,
      borderWidth: "1px 0 0 0",
      borderRadius: "20px",
      "&::before": {
        display: "block",
        content: "''",
        height: "30px",
        marginTop: "-31px",
        borderStyle: "solid",
        borderColor: theme.palette.primary.main,
        borderWidth: "0 0 1px 0",
        borderRadius: "20px",
      },
    },
    divider: {
      margin: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
    },
    definitions: {
      padding: theme.spacing(2),
    },
  })
)

const Header: React.FC<{}> = () => {
  const classes = useStyles()

  const { explanation, definitions } = dictionaryData

  return (
    <Grid container justify="center" className={classes.headerContainer}>
      {/*
          Auth and search controls used to be here. I've (temporarily)
          removed them, because the landing page has no connection to the
          database - it should only serve static content, to make it load
          as fast as possible.
          If need be, we can hardcode some links to sample projects, with
          thumbnails etc., to make the page look like a portfolio.
        */}

      <Grid item className={classes.headerText}>
        <Logo />
      </Grid>

      <hr className={classes.headerDivider} />

      <Grid item xs={12} sm={8}>
        {definitions.map((item, i) => (
          <DictionaryItem key={i} i={i} {...item} />
        ))}

        <Divider variant="middle" className={classes.divider} />

        <Typography
          color="primary"
          variant="body2"
          gutterBottom
          className={classes.definitions}
        >
          {explanation}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Header
