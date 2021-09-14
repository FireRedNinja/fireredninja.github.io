import React from 'react'
import '../components/layout.css'

import Layout from '../components/layout'
import SEO from '../components/seo'
import svg404 from '../images/undraw_page_not_found_su7k.svg'
import '../components/layout.css'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Layout header={false}>
    <SEO title="404: Not found" />
    <div className="container mx-auto py-24">
      <img className="flex content-center" alt="404" src={svg404} />
      <Link to="/">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          href=""
        >
          Go Back Home
        </button>
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
