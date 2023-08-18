/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/Products/actionCreator";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="w-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="w-full h-64 rounded-t-lg"
        src={product.thumbnail}
        alt="Product Image"
      />
      <div className="px-5 pb-5">
        <div>
          <p className="text-xl font-bold text-gray-900 dark:text-white overflow-hidden whitespace-nowrap overflow-ellipsis">
            {product.title}
          </p>
          {!product?.sizeData ? (
            <div className="lg:flex justify-between">
              <p>Price: {product.price}$</p>
              {product.stock != 0 ? <p>In Stock</p> : <p>Out of Stock</p>}
            </div>
          ) : (
            <div>
              <p>Price: {product.sizeData[selectedSize].price}$</p>
              {product.sizeData[selectedSize].stock != 0 ? (
                <p>In Stock</p>
              ) : (
                <p>Out of Stock</p>
              )}
            </div>
          )}

          {product?.sizeData && product?.sizeData.length !== 1
            ? product.sizeData.map((size, index) => {
                return (
                  <div key={`${product.id}${index}`}>
                    <button
                      onClick={() => {
                        setSelectedSize(index);
                      }}
                    >
                      {size.name}
                    </button>
                  </div>
                );
              })
            : undefined}
          <span className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p
            onClick={() => handleDelete(product.id)}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Delete Show
          </p>
          <Link
            to={`/edit/hello`}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
