/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/Products/actionCreator";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="w-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        <img
          className="w-full h-64"
          src={product.thumbnail}
          alt="Product Image"
        />
        <div className="absolute top-2 right-2">
          <span
            onClick={() => handleDelete(product.id)}
            className="text-red-600 hover:text-red-800 cursor-pointer rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white"
          >
            Delete
          </span>
        </div>
      </div>
      <div className="px-5 pb-5">
        <div>
          <p className="text-xl font-bold text-gray-900 dark:text-white overflow-hidden whitespace-nowrap overflow-ellipsis">
            {product.title}
          </p>
          <div className="lg:flex justify-between">
            <p className="text-gray-600 dark:text-gray-300">
              Price:{" "}
              {product.sizeData
                ? product.sizeData[selectedSize].price
                : product.price}
              $
            </p>
            <p
              className={`${
                product.sizeData
                  ? product.sizeData[selectedSize].stock !== 0
                    ? "text-green-600"
                    : "text-red-600"
                  : product.stock !== 0
                  ? "text-green-600"
                  : "text-red-600"
              } dark:text-green-300`}
            >
              {product.sizeData
                ? product.sizeData[selectedSize].stock !== 0
                  ? "In Stock"
                  : "Out of Stock"
                : product.stock !== 0
                ? "In Stock"
                : "Out of Stock"}
            </p>
          </div>
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
        <div className="mt-3">

          <button
            onClick={() => {
              navigate("/edit", { state: { product: product } });
            }}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
