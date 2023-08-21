/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import _ from "lodash";
import "../App.css";
const ColorVariation = ({
  handleColorChange,
  colors,
  handleColorLength,
  sizeData,
}) => {
  const [showColorPicker, setShowColorPicker] = useState([false]);

  const handleToggleColorPicker = (i) => {
    setShowColorPicker((prevState) =>
      prevState.map((colorCheck, index) =>
        i === index ? !colorCheck : colorCheck
      )
    );
  };

  useEffect(() => {
    setShowColorPicker([...showColorPicker, false]);
  }, [colors]);
  return (
    <div className="w-full mb-2">
      <h1>Colors</h1>
      {colors.map((color, index) => (
        <div key={index} className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div>
            <input
              className="w-full rounded-md bg-slate-300 p-2 float-right"
              type="text"
              value={color.hex}
              onChange={(e) =>
                handleColorChange("colors", index, "hex", e.target.value)
              }
              placeholder="Color"
              required
            />
          </div>
          <select
            className="mb-4 w-full rounded-md bg-slate-300 p-2"
            value={sizeData[color.size]?.name}
            onChange={(e) => {
              const id =
                _.findIndex(
                  e.target,
                  (option) => option.value === e.target.value
                ) - 1;

              handleColorChange("colors", index, "size", id);
            }}
            required
          >
            <option value="">Select a Size</option>
            {sizeData.map((size, index) => {
              return (
                <option
                  className="mb-4 w-full rounded-md bg-slate-300 p-2"
                  value={`${size.name}`}
                  key={index}
                >
                  {size.name}
                </option>
              );
            })}
          </select>
          <div>
            <p
              className="bg-blue-500 text-white px-4 py-2 rounded float-left"
              onClick={() => handleToggleColorPicker(index)}
            >
              Choose Color
            </p>

            {showColorPicker[index] && (
              <div className="w-2">
                <ChromePicker
                  color={color.hex}
                  onChange={(e) => {
                    handleColorChange("colors", index, "hex", e.hex);
                  }}
                  className="rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
          <hr className="lg:invisible" />
          <hr className="lg:invisible" />
        </div>
      ))}
      <div className="flex justify-between">
        <button
          className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 lg:w-1/4"
          type="button"
          onClick={() =>
            handleColorLength("ADD_VARIATION_INPUT", "colors", { hex: "" })
          }
        >
          Add Color
        </button>

        <button
          type="button"
          className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 lg:w-1/4"
          onClick={() => handleColorLength("DELETE_VARIATION_INPUT", "colors")}
        >
          Remove Color
        </button>
      </div>
    </div>
  );
};

export default ColorVariation;
