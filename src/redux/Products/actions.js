const actions = {
  FETCH_PRODUCTS_BEGIN: "FETCH_PRODUCTS_BEGIN",
  FETCH_PRODUCTS_SUCCESS: "FETCH_PRODUCTS_SUCCESS",

  FETCH_PRODUCTS_BY_CATEGORY_BEGIN: "FETCH_PRODUCTS_BY_CATEGORY_BEGIN",
  FETCH_PRODUCTS_BY_CATEGORY_SUCCESS: "FETCH_PRODUCTS_BY_CATEGORY_SUCCESS",

  ADD_PRODUCT_BEGIN: "ADD_PRODUCT_BEGIN",
  ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",

  DELETE_PRODUCT_BEGIN: "DELETE_PRODUCT_BEGIN",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",

  EDIT_PRODUCT_BEGIN: "EDIT_PRODUCT_BEGIN",
  EDIT_PRODUCT_SUCCESS: "EDIT_PRODUCT_SUCCESS",

  SEARCH_PRODUCT_BEGIN: "SEARCH_PRODUCT_BEGIN",
  SEARCH_PRODUCT_SUCCESS: "SEARCH_PRODUCT_SUCCESS",

  API_ERROR: "API_ERROR",

  fetchProductsBegin: () => {
    return {
      type: actions.FETCH_PRODUCTS_BEGIN,
    };
  },

  fetchProductsSuccess: (data) => {
    return {
      type: actions.FETCH_PRODUCTS_SUCCESS,
      payload: { products: data.products, total: data.total },
    };
  },

  fetchProductsByCategoryBegin: () => {
    return {
      type: actions.FETCH_PRODUCTS_BY_CATEGORY_BEGIN,
    };
  },

  fetchProductsByCategorySuccess: (data) => {
    return {
      type: actions.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
      payload: { products: data.products, total: data.total },
    };
  },

  addProductBegin: () => {
    return {
      type: actions.ADD_PRODUCT_BEGIN,
    };
  },

  addProductSuccess: (newProduct) => {
    return {
      type: actions.ADD_PRODUCT_SUCCESS,
      payload: { newProduct },
    };
  },

  editProductBegin: () => {
    return {
      type: actions.EDIT_PRODUCT_BEGIN,
    };
  },

  editProductSuccess: (editProduct) => {
    return {
      type: actions.EDIT_PRODUCT_SUCCESS,
      payload: { product: editProduct },
    };
  },

  searchProductBegin: () => {
    return {
      type: actions.SEARCH_PRODUCT_BEGIN,
    };
  },

  searchProductSuccess: (data) => {
    return {
      type: actions.SEARCH_PRODUCT_SUCCESS,
      payload: data,
    };
  },

  deleteProductBegin: () => {
    return {
      type: actions.DELETE_PRODUCT_BEGIN,
    };
  },

  deleteProductSuccess: (productId) => {
    return {
      type: actions.DELETE_PRODUCT_SUCCESS,
      payload: { productId },
    };
  },

  apiError: (error) => {
    return {
      type: actions.API_ERROR,
      payload: { error },
    };
  },
};

export default actions;
