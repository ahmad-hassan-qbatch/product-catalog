/* eslint-disable react/prop-types */
import React from "react";

import "../App.css";
import { useNavigate } from "react-router-dom";

const CategorySlider = ({ categories, selectedCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category) navigate(`/home?category=${category}`);
    else navigate(`/home`);
  };
  return (
    <div className="flex overflow-x-auto whitespace-nowrap p-4 mt-10">
      <button
        onClick={() => {
          handleCategoryClick("");
        }}
        className={`px-4 rounded-md shadow-md hover:bg-gray-300 mr-4 h-10 ${
          selectedCategory === "" ? "bg-gray-800 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>

      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => {
            handleCategoryClick(category);
          }}
          className={`px-4 rounded-md h-10 shadow-md hover:bg-gray-300 mr-4 ${
            selectedCategory === category
              ? "bg-gray-800 text-white"
              : "bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySlider;
