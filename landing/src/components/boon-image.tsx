import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

// This component exposes the main BOON image, but in a magic, optimized way.
// The `useStaticQuery` call points to the image in its original format.
// Gatsby (more specifically, gatsby-image) will automatically produce resized
// variants of the image, take care of choosing the right one, will speed up
// loading by initializing the site with a blurred image... basically, it takes
// care of everything image related.
//
// For more info, see gatsby.dev/gatsby-image

const BoonImage: React.FC<{}> = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const img = data?.placeholderImage?.childImageSharp?.fluid

  if (!img) {
    return <div>Picture not found</div>
  }

  return <Img fluid={img} />
}

export default BoonImage
