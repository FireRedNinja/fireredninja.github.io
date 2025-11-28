import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Noel Rajan's Portfolio`,
    description: `Software Engineer portfolio showcasing personal and hackathon projects`,
    author: `Noel Rajan`,
    siteUrl: `https://fireredninja.github.io/`,
  },
  graphqlTypegen: true,
  trailingSlash: "always",
  // Disable built-in ESLint to avoid conflict with ESLint 9
  flags: {
    DEV_SSR: false,
  },
  plugins: [
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Noel Rajan's Portfolio`,
        short_name: `Noel's Portfolio`,
        start_url: `/`,
        theme_color_in_head: false,
        display: `browser`,
        icon: `src/images/terminal.svg`,
      },
    },
  ],
};

export default config;
