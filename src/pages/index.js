import React from 'react';
import '../components/index.css';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Projects from '../components/projects';
import ReactComment from '../components/reactComment';
import { ThemeProvider } from '../context/ThemeContext';

const IndexPage = () => (
  <ThemeProvider>
    <Layout>
      <ReactComment
        text={`Favicon - coding by shuai tawf from the Noun Project`}
      />
      <SEO title="Home" />
      <Projects />
    </Layout>
  </ThemeProvider>
);

export default IndexPage;
