const actions = {
  FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_BEGIN: "FETCH_CATEGORIES_BEGIN",

  fetchCategoriesBegin: () => {
    return {
      type: actions.FETCH_CATEGORIES_BEGIN,
    };
  },

  fetchCategoriesSuccess: (categories) => {
    return {
      type: actions.FETCH_CATEGORIES_SUCCESS,
      payload: categories,
    };
  },
};

export default actions;
