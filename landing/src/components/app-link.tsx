// A link to the main app.
// Prepends app url to the destination url.
// To create link to a section of the landing page itself, use a different
// component.
// The only reason this component exists is to avoid having references to
// `process.env` all over the app. It's a bit cleaner this way, I think.
import React from "react"

import { Link } from "gatsby-theme-material-ui"

type Props = {
  to: string
}

const AppLink: React.FC<Props> = (props) => (
  <a href={process.env.GATSBY_APP_URL + props.to} />
)

export default AppLink
