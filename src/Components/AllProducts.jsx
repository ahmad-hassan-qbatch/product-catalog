import React, { useEffect } from "react";
import { fetchAllProducts } from "../redux/Products/actionCreator";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./Cards/ProductCard";
import Loader from "./Loader";
import Pagination from "./Pagination";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products);

  const renderLoop = () => {
    const elements = [];
    for (let i = 0; i < 10; i++) {
      elements.push(
        <li>
          <p
            href="#"
            onClick={() => handlePageNoClick(i)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {i + 1}
          </p>
        </li>
      );
    }
    return elements;
  };

  const handlePageNoClick = (pageNo) => {
    dispatch(fetchAllProducts(pageNo * 15));
  };
  useEffect(() => {
    dispatch(fetchAllProducts(0));
  }, []);

  return (
    <div>
      {products.loading ? (
        <div className="flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      )}
      <Pagination renderLoop={renderLoop} />
    </div>
  );
};

export default AllProducts;
