/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import DataContext from "./context";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../redux/Products/actionCreator";

const NavBar = () => {
  const navigate = useNavigate();
  const setSelectedCategory = useContext(DataContext)[1];
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    setSelectedCategory(null);
    dispatch(fetchAllProducts(0));
    navigate("/home");
  };

  return (
    <nav className="w-full bg-gray-800 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <p
          className="text-white text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md m-2"
          onClick={handleHomeClick}
        >
          Home
        </p>
        <div className="w-screen text-center">
          <Search />
        </div>
        <p
          onClick={() => {
            navigate("/add", { state: { product: undefined } });
          }}
          className="text-white text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md whitespace-nowrap flex items-center m-2"
        >
          <span className="mr-2">Add Product</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
