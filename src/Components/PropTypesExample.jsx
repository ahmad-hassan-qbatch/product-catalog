import React from "react";
import { PropTypes } from "prop-types";

const PropTypesExample = ({ name }) => {
  return <div className="flex text-7xl">{name}</div>;
};

PropTypesExample.propTypes = {
  name: PropTypes.number.isRequired,
};
export default PropTypesExample;
