/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import _ from "lodash";

const Pagination = ({
  handlePageNoClick,
  total,
  selectedPage,
  setSelectedPage,
}) => {
  const [totalPages, setTotalPages] = useState();

  useMemo(() => {
    setTotalPages(_.ceil(total / 15));
  }, [total]);
  const renderLoop = () => {
    const elements = [];
    const selectedColor = "bg-gray-800";
    const notSelectedColor = "bg-white";

    for (let i = 0; i < totalPages; i++) {
      elements.push(
        <button
          key={i}
          onClick={() => {
            handlePageNoClick(i);
            setSelectedPage(i);
          }}
          className={`flex items-center justify-center px-6 h-10 leading-none 
            ${selectedPage === i ? selectedColor : notSelectedColor} ${
            selectedPage === i ? "text-white" : "text-gray-600"
          } border border-gray-300 rounded-md hover:bg-gray-200 hover:text-gray-800`}
        >
          {i + 1}
        </button>
      );
    }
    return elements;
  };

  const handlePrevClick = () => {
    if (selectedPage === 0) {
      return;
    }

    setSelectedPage(selectedPage - 1);
    handlePageNoClick(selectedPage - 1);
  };

  const handleNextClick = () => {
    if (selectedPage === totalPages - 1) {
      return;
    }
    setSelectedPage((currentPage) => currentPage + 1);
    handlePageNoClick(selectedPage + 1);
  };
  return (
    <div className="flex items-center justify-center p-3">
      <div className="flex -space-x-px text-md">
        <div>
          <button
            onClick={handlePrevClick}
            className="flex items-center justify-center px-4 h-10 leading-none bg-white text-gray-600 border border-gray-300 rounded-l-md hover:bg-gray-100 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300"
          >
            Previous
          </button>
        </div>
        <div className="flex">{renderLoop()}</div>
        <div>
          <button
            onClick={handleNextClick}
            className="flex items-center justify-center px-4 h-10 leading-none bg-white text-gray-600 border border-gray-300 rounded-r-md hover:bg-gray-100 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
