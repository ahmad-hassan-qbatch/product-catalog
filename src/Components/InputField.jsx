/* eslint-disable react/prop-types */
import React from "react";

const InputField = ({ type, value, handleChange, label }) => {
  return (
    <div>
      <label>{label}:</label>
      <input type={type} value={value} onChange={handleChange} required />
    </div>
  );
};

export default InputField;
