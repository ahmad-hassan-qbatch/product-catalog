import React, { Suspense, useEffect, useState, useMemo } from "react";
import _ from "lodash";
import {
  fetchAllProducts,
  searchProduct,
  fetchProductsByCategory,
} from "../redux/Products/actionCreator";
import { fetchAllCategory } from "../redux/Categories/actionCreator";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotFound = React.lazy(() =>
  /* webpackChunkName: "ProductCard" */ import("./NotFound")
);
const ProductCard = React.lazy(() =>
  /* webpackChunkName: "ProductCard" */ import("./Cards/ProductCard")
);
const CategoriesSider = React.lazy(() =>
  /* webpackChunkName: "CategoriesSider" */ import("./CategoriesSider")
);
const CategoriesDropDown = React.lazy(() =>
  /* webpackChunkName: "CategoriesDropDown" */ import("./CategoriesDropDown")
);
const Loader = React.lazy(() =>
  /* webpackChunkName: "Loader" */ import("./Loader")
);
const Pagination = React.lazy(() =>
  /* webpackChunkName: "Pagination" */ import("./Pagination")
);

const AllProducts = () => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);

  const searchParam = queryParam.get("search");
  const pageNo = queryParam.get("pageNo");
  const category = queryParam.get("category");

  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products);
  const categories = useSelector((state) => state.Categories);

  const [totalPages, setTotalPages] = useState();

  const handleQueryFilter = (pageNo) => {
    if (category) {
      dispatch(fetchProductsByCategory(category, pageNo * 15));
      return;
    }

    if (searchParam) dispatch(searchProduct(searchParam, pageNo * 15));
    else dispatch(fetchAllProducts(pageNo * 15));
  };

  useMemo(() => {
    setTotalPages(_.ceil(products.total / 15));
  }, [products.total]);

  useEffect(() => {
    handleQueryFilter(pageNo ? pageNo - 1 : 0);
  }, [pageNo, searchParam, category]);

  useEffect(() => {
    if (products.error !== null) {
      toast.error(products.error);
    }
  }, [products.error]);

  useEffect(() => {
    if (products.success !== null) {
      toast.success(products.success);
    }
  }, [products.success]);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, []);
  return (
    <div>
      {products.loading && categories.loading ? (
        <div className="flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      ) : (
        <div className="m-10">
          <ToastContainer />

          <Suspense fallback={<div>Loading...</div>}>
            <CategoriesDropDown
              categories={categories.categories}
              selectedCategory={category ?? ""}
            />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <CategoriesSider
              categories={categories.categories}
              selectedCategory={category ?? ""}
            />
          </Suspense>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white overflow-hidden whitespace-nowrap overflow-ellipsis mb-4">
            {_.startCase(category)}
          </h1>
          {products?.products.length === 0 ? (
            <NotFound errorMsg={"Data not Found"} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products?.products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          )}

          <Suspense fallback={<div>Loading...</div>}>
            <Pagination
              category={category}
              selectedPage={pageNo - 1}
              searchParam={searchParam}
              key={"page"}
              totalPages={totalPages}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
