import React, { useEffect } from "react";
import actions from "../actions/productActions";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const products = useSelector((state) => state.Products);

  useEffect(() => {
    actions.fetchAllProducts();
  }, []);

  return <div>{products}</div>;
};

export default AllProducts;
