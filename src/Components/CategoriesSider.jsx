/* eslint-disable react/prop-types */
import React from "react";

const CategorySlider = ({
  categories,
  handleCategoryClick,
  setSelectedCategory,
  selectedCategory,
}) => {
  return (
    <div className="flex overflow-x-auto whitespace-nowrap p-4 no-scrollbar">
      <div
        className="w-full inline-flex mr-4 my-4"
        onClick={() => {
          handleCategoryClick(null);
          setSelectedCategory(null);
        }}
      >
        <div
          className={`p-4 rounded-md shadow-md hover:bg-gray-300 ${
            selectedCategory === null ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          All
        </div>
      </div>
      {categories.map((category, index) => (
        <div
          key={index}
          className="w-full inline-flex mr-4 my-4"
          onClick={() => {
            handleCategoryClick(category);
            setSelectedCategory(category);
          }}
        >
          <div
            className={`p-4 rounded-md shadow-md hover:bg-gray-300 ${
              selectedCategory === category
                ? "bg-gray-800 text-white"
                : "bg-gray-200"
            }`}
          >
            {category}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySlider;
