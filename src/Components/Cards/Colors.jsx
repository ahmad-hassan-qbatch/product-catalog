/* eslint-disable react/prop-types */
import React from "react";

const Colors = ({ colors }) => {
  return (
    <>
      {colors.map((color, index) => {
        return (
          <span
            key={`${index}`}
            className={`border-2 rounded-full border-transparent mr-3 p-2`}
            style={{ backgroundColor: color.hex }}
            onClick={() => {}}
          ></span>
        );
      })}
    </>
  );
};

export default Colors;
