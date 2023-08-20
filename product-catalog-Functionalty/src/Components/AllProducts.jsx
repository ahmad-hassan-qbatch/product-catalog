import React, { useEffect } from "react";
import {
  fetchAllProducts,
  fetchProductsByCategory,
  searchProduct,
} from "../redux/Products/actionCreator";
import { fetchAllCategory } from "../redux/Categories/actionCreator";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./Cards/ProductCard";
import CategoriesSider from "./CategoriesSider";
import Loader from "./Loader";
import Pagination from "./Pagination";
import Search from "./Search";
import NavBar from "./NavBar";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products);
  const categories = useSelector((state) => state.Categories);


  const handlePageNoClick = (pageNo) => {
    dispatch(fetchAllProducts(pageNo * 15));
  };

  const handleSearch = (title) => {
    dispatch(searchProduct(title));
  };

  const handleCategoryClick = (category) => {
    dispatch(fetchProductsByCategory(category));
  };

  useEffect(() => {
    dispatch(fetchAllProducts(0));
    dispatch(fetchAllCategory());
  }, []);

  return (
    <div>
      {products.loading && categories.loading ? (
        <div className="flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      ) : (
        <>
          <NavBar handleHomeClick={()=>handlePageNoClick(0)}>
            <Search handleSearch={handleSearch} />
          </NavBar>
          <CategoriesSider
            categories={categories.categories}
            handleCategoryClick={handleCategoryClick}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
          <Pagination handlePageNoClick={handlePageNoClick} key={"page"} />
        </>
      )}
    </div>
  );
};

export default AllProducts;
