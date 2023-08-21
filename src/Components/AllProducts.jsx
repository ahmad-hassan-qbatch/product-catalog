import React, { Suspense, useEffect, useState, useContext } from "react";
import _ from "lodash";
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from "../redux/Products/actionCreator";
import { fetchAllCategory } from "../redux/Categories/actionCreator";
import { useSelector, useDispatch } from "react-redux";
import DataContext from "./context";

const ProductCard = React.lazy(() =>
  /* webpackChunkName: "ProductCard" */ import("./Cards/ProductCard")
);
const CategoriesSider = React.lazy(() =>
  /* webpackChunkName: "CategoriesSider" */ import("./CategoriesSider")
);
const Loader = React.lazy(() =>
  /* webpackChunkName: "Loader" */ import("./Loader")
);
const Pagination = React.lazy(() =>
  /* webpackChunkName: "Pagination" */ import("./Pagination")
);

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products);
  const [selectedPage, setSelectedPage] = useState(0);
  const categories = useSelector((state) => state.Categories);

  const [selectedCategory, setSelectedCategory] = useContext(DataContext);

  const handlePageNoClick = (pageNo) => {
    if (selectedCategory !== null) {
      dispatch(fetchProductsByCategory(selectedCategory, pageNo * 15));
      return;
    }
    setSelectedCategory(null);
    dispatch(fetchAllProducts(pageNo * 15));
  };

  const handleCategoryClick = (category) => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
      return;
    }
    dispatch(fetchAllProducts());
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategory());
  }, []);

  useEffect(() => {
    if (products.error !== null) {
      alert(products.error);
    }
  }, [products]);
  return (
    <div>
      {products.loading && categories.loading ? (
        <div className="flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      ) : (
        <div className="m-10">
          <Suspense fallback={<div>Loading...</div>}>
            <CategoriesSider
              categories={categories.categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              handleCategoryClick={handleCategoryClick}
            />
          </Suspense>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white overflow-hidden whitespace-nowrap overflow-ellipsis mb-4">
            {_.startCase(selectedCategory)}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              handlePageNoClick={handlePageNoClick}
              key={"page"}
              total={products.total}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
