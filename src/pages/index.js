import React from 'react';
import '../components/layout.css';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Projects from '../components/projects';
import ReactComment from '../components/reactComment';

const IndexPage = () => (
  <Layout>
    <ReactComment
      text={`Favicon - coding by shuai tawf from the Noun Project`}
    />
    <SEO title="Home" />
    <Projects />
  </Layout>
);

export default IndexPage;
