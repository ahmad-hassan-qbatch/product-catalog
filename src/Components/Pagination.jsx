/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ totalPages, selectedPage, category, searchParam }) => {
  const navigate = useNavigate();

  const handlePageNoClick = (pageNo) => {
    if (!searchParam && !category) navigate(`/?pageNo=${pageNo}`);
    else if (category) {
      navigate(`/?pageNo=${pageNo}&category=${category}`);
    } else {
      navigate(`/?pageNo=${pageNo}&search=${searchParam}`);
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
    if (selectedPage <= 0) {
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
    <div className="flex flex-col md:justify-center md:items-center mt-5 md:w-auto ">
      <div className="flex mr-0 items-center justify-center">
        <div className="flex">
          <button
            onClick={() => {
              totalPages && handlePageNoClick(1);
            }}
            className="flex items-center justify-center px-4 h-10 leading-none bg-white text-gray-600 border border-gray-300 rounded-l-md hover:bg-gray-100 hover:text-gray-800"
          >
            First
          </button>
          <button
            onClick={handlePrevClick}
            className={`items-center justify-center hidden  md:flow-root px-4 md:px-6 h-10 leading-none text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200 hover:text-gray-800`}
          >
            Previous
          </button>
        </div>
        <div className="flex overflow-x-auto no-scrollbar">{renderLoop()}</div>
        <div className="flex">
          <button
            onClick={handleNextClick}
            className={`items-center hidden md:flow-root :contents md:visible justify-center px-4 md:px-6 h-10 leading-none  text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200 hover:text-gray-800`}
          >
            Next
          </button>
          <button
            onClick={() => {
              totalPages && handlePageNoClick(totalPages);
            }}
            className="flex items-center justify-center px-4 h-10 leading-none bg-white text-gray-600 border border-gray-300 rounded-r-md hover:bg-gray-100 hover:text-gray-800 "
          >
            Last
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center"></div>
    </div>
  );
};

export default React.memo(Pagination);
