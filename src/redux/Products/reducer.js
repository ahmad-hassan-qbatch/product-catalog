import actions from "./actions";

const initialState = { products: [], loading: "false", success: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_PRODUCTS_BEGIN:
      return { ...state, loading: "true" };

    case actions.FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: "false", products: payload };

    case actions.ADD_PRODUCT_BEGIN:
      return { ...state, loading: "true" };

    case actions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: "false",
        products: [...state.products, payload.newProduct],
      };

    case actions.DELETE_PRODUCT_BEGIN:
      return { ...state, loading: "true" };

    case actions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== payload.productId
        ),
        loading: "false",
      };

    default:
      return state;
  }
};
