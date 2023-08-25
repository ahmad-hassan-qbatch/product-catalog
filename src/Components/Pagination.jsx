/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ totalPages, selectedPage, category, searchParam }) => {
  const navigate = useNavigate();
  const handlePageNoClick = (pageNo) => {
    if (!searchParam && !category) navigate(`/home/?pageNo=${pageNo}`);
    else if (category) {
      navigate(`/home/?pageNo=${pageNo}&category=${category}`);
    } else {
      navigate(`/home/?pageNo=${pageNo}&search=${searchParam}`);
    }
  };
  const renderLoop = useCallback(() => {
    const elements = [];
    const selectedColor = "bg-gray-800";
    const notSelectedColor = "bg-white";
    for (let i = 0; i < totalPages; i++) {
      elements.push(
        <button
          key={i}
          onClick={() => {
            handlePageNoClick(i + 1);
          }}
          className={`flex items-center justify-center px-4 md:px-6 h-10 leading-none 
          ${selectedPage === i ? selectedColor : notSelectedColor} ${
            selectedPage === i ? "text-white" : "text-gray-600"
          } border border-gray-300 rounded-md hover:bg-gray-200 hover:text-gray-800`}
        >
          {i + 1}
        </button>
      );
    }
    return elements;
  }, [totalPages]);

  const handlePrevClick = () => {
    if (selectedPage === 0) {
      return;
    }
    handlePageNoClick(selectedPage);
  };

  const handleNextClick = () => {
    if (selectedPage >= totalPages - 1) {
      return;
    }
    handlePageNoClick(selectedPage + 2);
  };
  return (
    <div className="flex items-center justify-center mt-5 w-full">
      <div>
        <button
          onClick={() => {
            handlePageNoClick(1);
          }}
          className="flex items-center invisible md:visible justify-center px-4 h-10 leading-none bg-white text-gray-600 border border-gray-300 rounded-l-md hover:bg-gray-100 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          First
        </button>
      </div>
      <div>
        <button
          onClick={handlePrevClick}
          className={`flex items-center justify-center px-4 md:px-6 h-10 leading-none text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200 hover:text-gray-800`}
        >
          Previous
        </button>
      </div>
      <div className="flex overflow-x-auto no-scrollbar">{renderLoop()}</div>
      <div>
        <button
          onClick={handleNextClick}
          className={`flex items-center justify-center px-4 md:px-6 h-10 leading-none  text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200 hover:text-gray-800`}
        >
          Next
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            handlePageNoClick(totalPages);
          }}
          className="flex items-center justify-center invisible md:visible px-4 h-10 leading-none bg-white text-gray-600 border border-gray-300 rounded-r-md hover:bg-gray-100 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
