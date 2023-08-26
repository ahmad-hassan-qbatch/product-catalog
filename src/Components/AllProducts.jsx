import React, { Suspense, useEffect, useState, useMemo } from "react";
import _ from "lodash";
import {
  fetchAllProducts,
  searchProduct,
  reset,
  fetchProductsByCategory,
} from "../redux/Products/actionCreator";
import { fetchAllCategory } from "../redux/Categories/actionCreator";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Pagination from "./Pagination";
import Loader from "./Loader";
import NotFound from "./NotFound";

const ProductCard = React.lazy(() =>
  /* webpackChunkName: "ProductCard" */ import("./Cards/ProductCard")
);
const CategoriesSider = React.lazy(() =>
  /* webpackChunkName: "CategoriesSider" */ import("./CategoriesSider")
);
const CategoriesDropDown = React.lazy(() =>
  /* webpackChunkName: "CategoriesDropDown" */ import("./CategoriesDropDown")
);

const AllProducts = () => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);

  const searchParam = queryParam.get("search");
  const pageNo = queryParam.get("pageNo");
  const category = queryParam.get("category");

  const dispatch = useDispatch();
  const {
    products,
    total,
    error: productError,
    success,
    loading: productLoading,
  } = useSelector((state) => state.Products);

  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.Categories);

  const [totalPages, setTotalPages] = useState();

  const handleQueryFilter = (pageNo) => {
    if (category) {
      dispatch(fetchProductsByCategory(category, pageNo * 15));
      return;
    }

    searchParam
      ? dispatch(searchProduct(searchParam, pageNo * 15))
      : dispatch(fetchAllProducts(pageNo * 15));
  };

  useMemo(() => {
    setTotalPages(_.ceil(total / 15));
  }, [total]);

  useEffect(() => {
    handleQueryFilter(pageNo ? pageNo - 1 : 0);
  }, [pageNo, searchParam, category]);

  useEffect(() => {
    productError && toast.error(productError) && dispatch(reset());
  }, [productError]);

  useEffect(() => {
    categoryError && toast.error(categoryError);
  }, [categoryError]);

  useEffect(() => {
    success && toast.success(success) && dispatch(reset());
  }, [success]);

  useEffect(() => {
    !categories.length && dispatch(fetchAllCategory());
  }, []);
  return (
    <div className="m-10">
      <ToastContainer />
      {!categoryLoading ? (
        <>
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center h-screen ">
                <Loader />
              </div>
            }
          >
            <CategoriesDropDown
              categories={categories}
              selectedCategory={category ?? ""}
            />
          </Suspense>

          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center h-screen ">
                <Loader />
              </div>
            }
          >
            <CategoriesSider
              categories={categories}
              selectedCategory={category ?? ""}
            />
          </Suspense>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      )}

      {productLoading ? (
        <div className="flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis mb-4">
            {_.startCase(category)}
          </h1>
          {products.length === 0 ? (
            <NotFound errorMsg={"Data not Found"} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <Suspense
                  key={index}
                  fallback={
                    <div className="flex flex-col items-center justify-center h-screen ">
                      <Loader />
                    </div>
                  }
                >
                  <ProductCard product={product} />
                </Suspense>
              ))}
            </div>
          )}
          <Pagination
            category={category}
            selectedPage={pageNo - 1}
            searchParam={searchParam}
            key={"page"}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default AllProducts;
