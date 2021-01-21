// The huge button pointing to the app's homepage.
import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Box, Typography } from "@material-ui/core"
import { Link } from "gatsby-theme-material-ui"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    enterContainer: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    enterButton: {
      padding: theme.spacing(6),
      textAlign: "center",
      border: `solid .2em ${theme.palette.secondary.main}`,
      boxShadow: `0 0 ${theme.palette.secondary.dark}`,
      "&:hover": {
        cursor: "pointer",
        boxShadow: `.2em .2em ${theme.palette.secondary.dark}`,
      },
    },
  })
)

const EnterButton: React.FC<{}> = () => {
  const classes = useStyles()

  return (
    <Box className={classes.enterContainer}>
      <Link to="/sprints">
        <Typography
          color="secondary"
          variant="h2"
          className={classes.enterButton}
        >
          ENTER THE DEMO
        </Typography>
      </Link>
    </Box>
  )
}

export default EnterButton
