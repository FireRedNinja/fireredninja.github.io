import React from "react";
import type { HeadFC } from "gatsby";
import NotFound from "../components/NotFound";
import Layout from "../components/Layout";

const NotFoundPage = () => (
  <Layout header={false}>
    <NotFound />
  </Layout>
);

export default NotFoundPage;

export const Head: HeadFC = () => (
  <>
    <title>404: Not Found | Noel Rajan's Portfolio</title>
    <meta name="description" content="Page not found" />
    <html lang="en" />
  </>
);
