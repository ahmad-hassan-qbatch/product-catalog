import actions from "./actions";
import _ from "lodash";

let latestId = 100;
const initialState = {
  products: [],
  loading: true,
  success: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_PRODUCTS_BEGIN:
      return { ...state, loading: true };

    case actions.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: _.unionBy(
          _.takeWhile(state.products, (product) => product.id > 100),
          payload,
          "id"
        ),
      };

    case actions.FETCH_PRODUCTS_BY_CATEGORY_BEGIN:
      return { ...state, loading: true };

    case actions.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        products: _.unionBy(
          _.takeWhile(state.products, (product) => product.id > 100),
          payload,
          "id"
        ),
      };

    case actions.SEARCH_PRODUCT_BEGIN:
      return { ...state, loading: true };

    case actions.SEARCH_PRODUCT_SUCCESS:
      if (payload.products.length === 0) {
        return {
          ...state,
          loading: false,
        };
      }
      return {
        ...state,
        loading: false,
        products: _.unionBy(
          _.takeWhile(state.products, (product) => product.id > 100),
          payload.products,
          "id"
        ),
      };

    case actions.ADD_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case actions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [
          { ...payload.newProduct, id: ++latestId },
          ...state.products,
        ],
      };

    case actions.EDIT_PRODUCT_BEGIN:
      return { ...state, loading: true };

    case actions.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: _.map(state.products, (product) =>
          product.id === payload.product.id ? payload.product : product
        ),
      };

    case actions.DELETE_PRODUCT_BEGIN:
      return { ...state, loading: true };

    case actions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== payload.productId
        ),
        loading: false,
      };

    default:
      return state;
  }
};
