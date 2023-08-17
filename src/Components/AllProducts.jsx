import React, { useEffect } from "react";
import {
  deleteProduct,
  fetchAllProducts,
} from "../redux/Products/actionCreator";
import { useSelector, useDispatch } from "react-redux";

const AllProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.Products);

  console.log(products);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(deleteProduct(1));
  }, []);

  return <div>{products?.products[0]?.id}</div>;
};

export default AllProducts;
