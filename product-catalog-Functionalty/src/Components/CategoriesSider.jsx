/* eslint-disable react/prop-types */
import React from "react";

const Slider = ({ categories, handleCategoryClick }) => {
  return (
    <div className="flex overflow-x-auto whitespace-nowrap p-4 no-scrollbar">
      {categories.map((category, index) => (
        <div
          key={index}
          className="w-full inline-flex mr-4 my-4"
          onClick={() => {
            handleCategoryClick(category);
          }}
        >
          <div className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300">
            {category}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
