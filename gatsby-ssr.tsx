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
    <link
      key="font-mori-semibold"
      rel="preload"
      href="/fonts/PPMori-Semibold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="font-comic-cat"
      rel="preload"
      href="/fonts/ComicCAT.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="font-mori-regular"
      rel="preload"
      href="/fonts/PPMori-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
  ]);
};
