import React from 'react';
import NotFound from '../components/NotFound';
import '../components/index.css';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout header={false}>
    <SEO title="404: Not found" />
    <NotFound />
  </Layout>
);

export default NotFoundPage;
