/* eslint-disable react/prop-types */
import React from "react";
import "../App.css";
const SizeVariation = ({ handleSizeChange, sizeData, handleSizeLength }) => {
  return (
    <div className="w-full mb-2">
      <h1>Sizes</h1>
      {sizeData.map((size, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-2 mb-2 lg:grid-cols-3 lg:mb-2"
        >
          <div>
            <input
              className="w-full rounded-md bg-slate-300 p-2"
              type="text"
              value={size.name}
              onChange={(e) => handleSizeChange(index, "name", e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          <div>
            <input
              className="w-full rounded-md bg-slate-300 p-2"
              type="number"
              value={size.price}
              onChange={(e) => handleSizeChange(index, "price", e.target.value)}
              placeholder="Price"
              required
            />
          </div>
          <div>
            <input
              className="w-full rounded-md bg-slate-300 p-2"
              type="number"
              value={size.stock}
              onChange={(e) => handleSizeChange(index, "stock", e.target.value)}
              placeholder="Stock"
              required
            />
          </div>
          <hr className="lg:invisible" />
          <hr className="lg:invisible" />
        </div>
      ))}
      <button
        className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
        type="button"
        onClick={() => handleSizeLength("ADD_SIZE_INPUT")}
      >
        Add Size
      </button>

      <button
        type="button"
        className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
        onClick={() => handleSizeLength("DELETE_SIZE_INPUT")}
      >
        Add Remove
      </button>
    </div>
  );
};

export default SizeVariation;
