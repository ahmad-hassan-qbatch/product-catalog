import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../App.css";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <NavBar />
      <main className="m-0 h-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
