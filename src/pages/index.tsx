import React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/Layout";
import Projects from "../components/Projects";

const IndexPage = () => (
  <Layout>
    <Projects />
  </Layout>
);

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Home | Noel Rajan's Portfolio</title>
    <meta
      name="description"
      content="Software Engineer portfolio showcasing personal and hackathon projects"
    />
    <meta property="og:title" content="Noel Rajan's Portfolio" />
    <meta
      property="og:description"
      content="Software Engineer portfolio showcasing personal and hackathon projects"
    />
    <meta property="og:type" content="website" />
    <html lang="en" />
  </>
);
