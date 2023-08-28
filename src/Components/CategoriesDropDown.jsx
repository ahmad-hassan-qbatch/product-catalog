/* eslint-disable react/prop-types */
import React from "react";
import { CaretDownFilled } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const CategoryDropDown = ({ selectedCategory, categories }) => {
  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    category ? navigate(`/?category=${category}`) : navigate(`/`);
  };
  return (
    <>
      <div className="flex items-center border border-gray-300 w-auto rounded-md px-4 py-2 float-right hover:bg-gray-50 ">
        <select
          className="appearance-none pr-1 text-sm font-medium text-gray-700 focus:outline-none border-r-[1px] bg-transparent"
          value={selectedCategory}
          name="category"
          onChange={(e) => {
            e.target.value === "Select a Category"
              ? handleCategoryClick("")
              : handleCategoryClick(e.target.value);
          }}
        >
          <option>Select a Category</option>
          {categories.map((category, index) => (
            <option key={index} className="w-full rounded-md ">
              {category}
            </option>
          ))}
        </select>
        <CaretDownFilled className="text-[#808080] ml-2 text-sm " />
      </div>

      <br />
    </>
  );
};

export default CategoryDropDown;
