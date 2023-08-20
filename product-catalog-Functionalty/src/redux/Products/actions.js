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

  fetchProductsBegin: () => {
    return {
      type: actions.FETCH_PRODUCTS_BEGIN,
    };
  },

  fetchProductsSuccess: (products) => {
    return {
      type: actions.FETCH_PRODUCTS_SUCCESS,
      payload: products,
    };
  },

  fetchProductsByCategoryBegin: () => {
    return {
      type: actions.FETCH_PRODUCTS_BEGIN,
    };
  },

  fetchProductsByCategorySuccess: (products) => {
    return {
      type: actions.FETCH_PRODUCTS_SUCCESS,
      payload: products,
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
      payload: { products: data },
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
};

export default actions;
