import axios from "axios";
import actions from "./actions";

export const fetchAllProducts = (skip = 0) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchProductsBegin());

      const response = await axios.get("https://dummyjson.com/products", {
        params: {
          limit: 15,
          skip,
        },
      });

      dispatch(actions.fetchProductsSuccess(response.data.products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchProductsByCategory = (category,skip = 0) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchProductsByCategoryBegin());

      const response = await axios.get(`https://dummyjson.com/products/category/${category}`, {
        params: {
          limit: 15,
          skip,
        },
      });

      dispatch(actions.fetchProductsByCategorySuccess(response.data.products));
    } catch (error) {
      console.log(error);
    }
  };
};


export const addProduct = (newProduct) => {
  return async (dispatch) => {
    try {
      dispatch(actions.addProductBegin());
      const response = await axios.post(
        "https://dummyjson.com/products/add",
        newProduct
      );
      newProduct = { ...newProduct, id: response.data.id };
      dispatch(actions.addProductSuccess(newProduct));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProduct = (editProduct) => {
  return async (dispatch) => {
    try {
      dispatch(actions.editProductBegin());

      // await axios.put(
      //   `https://dummyjson.com/products/${editProduct.id}`,
      //   editProduct,
      //   { headers: { "content-type": "application/x-www-form-urlencoded" } }
      // );
      dispatch(actions.editProductSuccess(editProduct));
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchProduct = (title) => {
  return async (dispatch) => {
    try {
      dispatch(actions.searchProductBegin());

      const res = await axios.get(
        `https://dummyjson.com/products/search`, {
        params: { q: title }
      });
      dispatch(actions.searchProductSuccess(res.data.products));
    } catch (error) {
      console.log(error);
    }
  };
};


export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.deleteProductBegin());

      //await axios.delete(`https://dummyjson.com/products/${productId}`);
      dispatch(actions.deleteProductSuccess(productId));
    } catch (error) {
      console.log(error);
    }
  };
};
