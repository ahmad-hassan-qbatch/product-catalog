import React, { useEffect } from "react";
import {
  fetchAllProducts,
  searchProduct,
  fetchProductsByCategory,
} from "../redux/Products/actionCreator";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CategorySelector from "../Components/CategorySelector";
import Products from "../Components/Products";

const AllProducts = () => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);

  const searchParam = queryParam.get("search");
  const pageNo = queryParam.get("pageNo");
  const category = queryParam.get("category");

  const dispatch = useDispatch();

  const handleQueryFilter = (pageNo) => {
    if (category) {
      dispatch(fetchProductsByCategory(category, pageNo * 15));
      return;
    }

    searchParam
      ? dispatch(searchProduct(searchParam, pageNo * 15))
      : dispatch(fetchAllProducts(pageNo * 15));
  };

  useEffect(() => {
    handleQueryFilter(pageNo ? pageNo - 1 : 0);
  }, [pageNo, searchParam, category]);

  return (
    <div className="m-10">
      <ToastContainer />
      <CategorySelector category={category} />
      <Products category={category} pageNo={pageNo} searchParam={searchParam} />
    </div>
  );
};

export default AllProducts;
