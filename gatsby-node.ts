/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  stage,
  actions,
  getConfig,
}) => {
  // Fix motion and react-icons SSR issues
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      externals: [/^motion/, /^react-icons/],
    });
  }

  // Disable Gatsby's internal ESLint to avoid conflict with eslint-plugin-flowtype
  if (stage === "develop" || stage === "build-javascript") {
    const config = getConfig();

    // Filter out any ESLint-related loaders/plugins
    if (config.module?.rules) {
      config.module.rules = config.module.rules.filter((rule: any) => {
        // Check direct loader property
        if (
          rule.loader &&
          typeof rule.loader === "string" &&
          rule.loader.includes("eslint")
        ) {
          return false;
        }
        // Check use array
        if (rule.use && Array.isArray(rule.use)) {
          const hasEslint = rule.use.some((u: any) => {
            const loader = typeof u === "string" ? u : u?.loader;
            return loader && loader.includes("eslint");
          });
          if (hasEslint) return false;
        }
        // Check oneOf rules
        if (rule.oneOf && Array.isArray(rule.oneOf)) {
          rule.oneOf = rule.oneOf.filter((oneOfRule: any) => {
            if (oneOfRule.use && Array.isArray(oneOfRule.use)) {
              return !oneOfRule.use.some((u: any) => {
                const loader = typeof u === "string" ? u : u?.loader;
                return loader && loader.includes("eslint");
              });
            }
            return true;
          });
        }
        return true;
      });
    }

    // Remove ESLint plugin if present
    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin: any) => {
        return !plugin?.constructor?.name?.includes("ESLint");
      });
    }

    actions.replaceWebpackConfig(config);
  }

  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
      },
    },
  });
};
