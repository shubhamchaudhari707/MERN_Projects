import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Helmet from "react-helmet";

import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>

      <Header />

      <main style={{ minHeight: "70vh" }}>
        {children}
        <Toaster/>
      </main>

      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern, react, node, mongodb",
  author: "shubham",
};

export default Layout;
