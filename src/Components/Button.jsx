/* eslint-disable react/prop-types */
import React from "react";

const Button = (props) => {
  return (
    <button {...props}>
      {props.leftChildern}
      {props.label}
      {props.rightChildern}
    </button>
  );
};

export default Button;
