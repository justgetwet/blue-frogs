import * as React from "react"
import { Link } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'

export default () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <title>Not found</title>
      <h1 className="text-4xl">Page not found</h1>
      <p className="text-xl mt-4">
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link class="underline text-dclOrange" to="/">Go home</Link>.
      </p>
    </Layout>
  )
}
