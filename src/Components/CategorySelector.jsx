/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import LazyLoading from "./LazyLoading";
import { fetchAllCategory } from "../redux/Categories/actionCreator";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { startCase } from "lodash";

const CategoriesSider = React.lazy(() =>
  import(/* webpackChunkName: "CategoriesSider" */ "./CategoriesSider")
);
const CategoriesDropDown = React.lazy(() =>
  import(/* webpackChunkName: "CategoriesDropDown" */ "./CategoriesDropDown")
);

const CategorySelector = ({ category }) => {
  const dispatch = useDispatch();
  const {
    loading: categoryLoading,
    categories,
    error: categoryError,
  } = useSelector((state) => state.Categories);

  useEffect(() => {
    categoryError && toast.error(categoryError);
  }, [categoryError]);

  useEffect(() => {
    !categories.length && dispatch(fetchAllCategory());
  }, []);

  return (
    <>
      {!categoryLoading ? (
        <>
          <LazyLoading>
            <CategoriesDropDown
              categories={categories}
              selectedCategory={category ?? ""}
            />
            <CategoriesSider
              categories={categories}
              selectedCategory={category ?? ""}
            />
          </LazyLoading>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis mb-4">
        {startCase(category)}
      </h1>
    </>
  );
};

export default CategorySelector;
