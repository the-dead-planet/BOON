// gatsbyjs.com/docs/reference/config-files/gatsby-config/
module.exports = {
  siteMetadata: {
    title: `BOON`,
    description: `Project management tool that... manages projects, I guess`,
    author: `the-dead-planet`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `BOON`,
        short_name: `BOON`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.ico`,
      },
    },
    `gatsby-theme-material-ui`,
  ],
}
