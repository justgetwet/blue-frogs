import React from 'react'
import Header from './header'
// import "@fortawesome/fontawesome-svg-core/styles.css"
// import { config } from "@fortawesome/fontawesome-svg-core"
// config.autoAddCss = false

const Layout = ({ children }) => {
  const Footer = () => <div className="py-4">© Shaky Snails 2021</div>
  return (
      <div className="font-lato px-2 max-w-screen-md sm:px-8 md:px-24">
        <header className="pt-12 pb-6">
          <Header />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
  )
}

export default Layout
