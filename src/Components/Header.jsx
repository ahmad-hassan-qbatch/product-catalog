/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import Search from "./Search";

import "../App.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-800 hidden w-screen md:flow-root md:static">
        <div className="md:mx-10 flex justify-between items-center">
          <NavLink
            to={"/"}
            className="text-white text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md "
          >
            Home
          </NavLink>
          <div className="w-screen text-center m-2">
            <Search />
          </div>
          <button
            onClick={() => {
              navigate("/add", { state: { product: undefined } });
            }}
            className="justify-center text-white text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md whitespace-nowrap flex items-center"
          >
            Add Product
            <PlusOutlined className="ml-2" />
          </button>
        </div>
      </div>
      <div className="bg-gray-800 flow-root static md:hidden p-2">
        <div className="ml-2 mr-2 w-auto text-center">
          <Search />
        </div>
        <div className="grid gap-8 grid-cols-2 ">
          <NavLink
            to="/"
            className="text-white text-lg font-semibold bg-gray-700 hover:bg-gray-600 flex justify-center items-center rounded-md m-2"
          >
            Home
          </NavLink>
          <button
            onClick={() => {
              navigate("/add", { state: { product: undefined } });
            }}
            className="justify-center text-white text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md whitespace-nowrap flex items-center"
          >
            Add Product
            <PlusOutlined className="ml-2" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
