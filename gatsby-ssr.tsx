/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

import React from "react";
import type { GatsbySSR } from "gatsby";

// Inject script to prevent flash of wrong theme
const ThemeScript = (): React.ReactElement => {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setPreBodyComponents,
  setHeadComponents,
}) => {
  setPreBodyComponents([<ThemeScript key="theme-script" />]);
  setHeadComponents([
    <link key="preconnect-google-fonts" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link key="preconnect-fontshare" rel="preconnect" href="https://api.fontshare.com" />,
  ]);
};
