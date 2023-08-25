/* eslint-disable react/prop-types */

import React, { useRef } from "react";
import "../App.css";
import { debounce } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInputRef.current.value)
      navigate(`/home?search=${searchInputRef.current.value}`);
    else navigate(`/home`);
  };

  const handleChange = debounce(handleSearch, 1000);

  const searchInputRef = useRef();
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full md:w-1/2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchOutlined className="w-4 h-4 text-gray-500" />
        </div>
        <input
          type="search"
          onChange={handleChange}
          id="default-search"
          ref={searchInputRef}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          onClick={handleSearch}
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
