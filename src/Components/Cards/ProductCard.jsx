/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/Products/actionCreator";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../DeleteDialog";
import "../../App.css";
import { groupBy } from "lodash";

import { EditOutlined, DeleteOutlined, StarFilled } from "@ant-design/icons";
import Colors from "./Colors";
import Sizes from "./Sizes";
import Button from "../Button";

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [colors, setColors] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setIsDialogVisible(false);
  };

  useEffect(() => {
    product.colors && setColors(groupBy(product.colors, "size"));
  }, [product.colors]);
  return (
    <>
      <div className="relative bg-white border border-gray-200 rounded-lg shadow flex justify-center h-[390px]">
        <img
          src={product.thumbnail}
          className="object-cover h-48 w-96 rounded-lg"
        />
        <div className="absolute top-40 w-11/12">
          <div className="px-5 py-3 bg-white border border-gray-200 rounded-lg bg-opacity-70">
            <p className="text-xl font-bold text-gray-900  overflow-hidden whitespace-nowrap overflow-ellipsis w-auto">
              {product.title}
            </p>

            <p className="text-md text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {product.category}
            </p>

            <div className="flex justify-between">
              <p className="text-gray-600">
                Price: $
                {product.sizeData
                  ? product.sizeData[selectedSize].price
                  : product.price}
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
                }`}
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

            {/* Displaying Rating if any otherwise Not Available*/}
            {product.rating ? (
              <div className="flex items-center h-7">
                <StarFilled className="w-4 h-4 text-yellow-300 mr-1" />
                <span className="text-md font-semibold tracking-tight text-gray-900">
                  {product.rating}
                </span>
              </div>
            ) : (
              <Button className="text-sm h-7" label="Rating Not Available" />
            )}

            {/* Displaying Sizes If any other wise Not Available */}
            <div className="flex overflow-x-auto items-center h-7">
              {product?.sizeData ? (
                <Sizes
                  sizes={product?.sizeData}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
              ) : (
                <Button
                  className="text-sm border-0 border-black mr-3"
                  label="Size Not Available"
                />
              )}
            </div>

            {/* Displaying Color by selected size If any other wise Not Available */}
            <div className="flex overflow-x-auto h-7 items-center">
              {product.colors && colors ? (
                <Colors
                  colors={colors[product?.sizeData[selectedSize]?.name]}
                />
              ) : (
                <Button
                  className="text-sm border-0 border-black mr-3"
                  label="Colors Not Available"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsDialogVisible(true)}
                className={`flex items-center justify-center w-3/4 px-4 py-2 text-white bg-gradient-to-r to-red-400 from-red-600 hover:bg-red-600 focus:outline-none border border-transparent rounded-md transition duration-300 ease-in-out hover:scale-110`}
              >
                <DeleteOutlined className="mr-2" />
                Delete
              </button>
              <button
                onClick={() => {
                  navigate("/edit", { state: { product: product } });
                }}
                className="flex items-center justify-center w-auto text-white hover:bg-blue-800 bg-gradient-to-r from-purple-600 to-blue-600  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out hover:scale-110"
              >
                Edit
                <EditOutlined className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="z-10">
          {isDialogVisible && (
            <DeleteDialog
              handleDelete={handleDelete}
              id={product.id}
              setIsDialogVisible={setIsDialogVisible}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
