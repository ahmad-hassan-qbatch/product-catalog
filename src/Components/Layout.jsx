/* eslint-disable react/prop-types */
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <main className="m-0 h-full">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
