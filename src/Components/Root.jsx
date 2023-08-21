import React, { useState } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import DataContext from "./context";

const Root = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <>
      <DataContext.Provider value={[selectedCategory, setSelectedCategory]}>
        <NavBar />
        <main>
          <Outlet />
        </main>
      </DataContext.Provider>
    </>
  );
};

export default Root;
