import React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import Skills from "../components/Skills";
import { profile } from "../data";

const IndexPage: React.FC = () => (
  <Layout>
    <Hero />
    <ProjectsSection />
    <Skills />
  </Layout>
);

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>
      {profile.name} | {profile.role}
    </title>
    <meta name="description" content={`${profile.name} - ${profile.role}`} />
    <meta property="og:title" content={`${profile.name} | ${profile.role}`} />
    <meta
      property="og:description"
      content={`${profile.name} - ${profile.role}`}
    />
    <meta property="og:type" content="website" />
    <html lang="en" />
  </>
);
