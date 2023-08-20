/* eslint-disable react/prop-types */
import React from "react";

const Pagination = ({ handlePageNoClick }) => {
  const renderLoop = () => {
    const elements = [];
    for (let i = 0; i < 10; i++) {
      elements.push(
        <div key={i}>
          <button
            onClick={() => handlePageNoClick(i)}
            className="flex items-center justify-center px-6 h-10 leading-none text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300"
          >
            {i + 1}
          </button>
        </div>
      );
    }
    return elements;
  };
  return (
    <nav className="w-full h-auto p-2 dark:bg-gray-800">
      <div className="flex items-center justify-center">
        <div className="flex -space-x-px text-md">
          <div>
            <button className="flex items-center justify-center px-4 h-10 leading-none bg-white text-gray-600 border border-gray-300 rounded-l-md hover:bg-gray-100 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300">
              Previous
            </button>
          </div>
          {renderLoop()}
          <div>
            <button className="flex items-center justify-center px-4 h-10 leading-none bg-white text-gray-600 border border-gray-300 rounded-r-md hover:bg-gray-100 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300">
              Next
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
