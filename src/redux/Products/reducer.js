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
        products: _.unionBy(payload, state.products, "id"),
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
          ...state.products,
          { ...payload.newProduct, id: ++latestId },
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
