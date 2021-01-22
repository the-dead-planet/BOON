// Single feature displayed on the landing page.
// Contains a description and a link to the app.
import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Grid, Typography, Button } from "@material-ui/core"
import AppLink from "./app-link"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    featureDescription: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(8, 2, 8, 2),
      // border: `2px solid ${theme.palette.primary.main}`,
      textAlign: "center",
      position: "relative",
      borderStyle: "solid",
      borderWidth: "0 2px 0 2px",
      borderColor: "transparent",
      borderRadius: "20px",
      "&:hover": {
        borderStyle: "solid",
        borderWidth: "0 2px 0 2px",
        borderColor: theme.palette.primary.main,
        borderRadius: "20px",
        // background: `linear-gradient(to right, rgba(0, 0, 0, .04) 0%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, .04) 100%)`
      },
    },
    longDescription: {
      marginBottom: theme.spacing(8),
    },
  })
)

interface Props {
  title: string
  longDescription: string
  shortDescription: string
  path: string
}

const FeatureDescription: React.FC<Props> = ({
  title,
  longDescription,
  shortDescription,
  path,
}) => {
  const classes = useStyles()

  return (
    <Grid
      item
      xs={12}
      sm={4}
      className={classes.featureDescription}
      container
      direction="column"
      alignItems="center"
    >
      <Typography color="primary" variant="h3" gutterBottom>
        {title}
      </Typography>

      <Typography
        color="primary"
        variant="h5"
        gutterBottom
        className={classes.longDescription}
      >
        {longDescription}
      </Typography>

      <AppLink to={path}>
        <Button variant="outlined" color="primary">
          <Typography color="primary" variant="body1">
            {shortDescription}
          </Typography>
        </Button>
      </AppLink>
    </Grid>
  )
}

export default FeatureDescription
