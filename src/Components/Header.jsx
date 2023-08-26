/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import Search from "./Search";

import "../App.css";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-800 invisible w-screen md:visible md:static fixed top-0">
        <div className="md:container mx-auto flex justify-between items-center">
          <NavLink
            to={"/"}
            className="text-white text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md "
          >
            Home
          </NavLink>
          <div className="w-screen text-center m-2">
            <Search />
          </div>
          <Button
            onClick={() => {
              navigate("/add", { state: { product: undefined } });
            }}
            className="justify-center text-white text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md whitespace-nowrap flex items-center m-2"
            rightChildern={<PlusOutlined className="ml-2" />}
            label="Add Product"
          />
        </div>
      </div>
      <div className="bg-gray-800 visible static md:invisible md:fixed md:top-0 p-2">
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
          <Button
            onClick={() => {
              navigate("/add", { state: { product: undefined } });
            }}
            className="justify-center text-white text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md whitespace-nowrap flex items-center m-2"
            rightChildern={<PlusOutlined />}
            label="Add Product"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
