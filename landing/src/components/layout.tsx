import React from "react"
import { makeStyles, createStyles } from "@mui/styles"

const useStyles = makeStyles(() =>
  createStyles({
    layout: {
      margin: "0 auto",
      maxWidth: "960px",
      padding: "0 1.0875rem 1.45rem",
    },
  })
)

const Layout: React.FC<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.layout}>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
