/* eslint-disable no-undef */
import axios from "axios";
import actions from "./actions";
import slackMessage from "../../utils/slackIntegration";

const productURL = `${process.env.REACT_APP_API_URL}/products`;

export const fetchAllProducts = (skip = 0) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchProductsBegin());

      const response = await axios.get(`${productURL}`, {
        params: {
          limit: 15,
          skip,
        },
      });

      dispatch(actions.fetchProductsSuccess(response.data));
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};

export const fetchProductsByCategory = (category, skip = 0) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchProductsByCategoryBegin());

      const response = await axios.get(`${productURL}/category/${category}`, {
        params: {
          limit: 15,
          skip,
        },
      });
      dispatch(actions.fetchProductsByCategorySuccess(response.data));
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};

export const addProduct = (newProduct) => {
  return async (dispatch) => {
    try {
      dispatch(actions.addProductBegin());
      const response = await axios.post(`${productURL}/add`, newProduct);
      newProduct = { ...newProduct, id: response.data.id };
      dispatch(actions.addProductSuccess(newProduct));
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};

export const editProduct = (editProduct) => {
  return async (dispatch) => {
    try {
      dispatch(actions.editProductBegin());

      editProduct.id < 101 &&
        (await axios.put(`${productURL}/${editProduct.id}`, editProduct, {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }));

      dispatch(actions.editProductSuccess(editProduct));
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};

export const searchProduct = (title, skip = 0) => {
  return async (dispatch) => {
    try {
      dispatch(actions.searchProductBegin());

      const res = await axios.get(`${productURL}/search`, {
        params: {
          limit: 15,
          skip,
          q: title,
        },
      });

      dispatch(actions.searchProductSuccess(res.data));
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.deleteProductBegin());

      productId < 101 && (await axios.delete(`${productURL}/${productId}`));
      dispatch(actions.deleteProductSuccess(productId));
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};

export const reset = () => {
  return async (dispatch) => {
    try {
      dispatch(actions.reset());
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};
