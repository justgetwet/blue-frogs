import * as React from 'react'
import Layout from '../components/layout'
import Latest from '../components/latest'
import Archive from '../components/archive'
import Categories from '../components/categories'
import SEO from '../components/seo'

export default () => (
  <Layout>
    <SEO title='Home' />
    <Latest />
    <Categories />
    <Archive />
  </Layout>
)
