/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  stage,
  actions,
}) => {
  // Fix framer-motion and react-icons SSR issues
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      externals: [/^framer-motion/, /^react-icons/],
    });
  }

  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
      },
    },
  });
};
