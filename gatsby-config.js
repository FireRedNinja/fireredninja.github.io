module.exports = {
  siteMetadata: {
    title: `Noel Rajan's Portfolio`,
    author: `Noel Rajan`,
    siteUrl: `https://fireredninja.github.io/`
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
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-cname`,
    `gatsby-plugin-postcss`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Noel Rajan's Portfolio`,
        short_name: `Noel's Portfolio`,
        start_url: `/`,
        theme_color_in_head: false,
        display: `browser`,
        
        icon: `src/images/terminal.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
