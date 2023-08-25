import actions from "./actions";

const initialState = { categories: [], loading: "false", success: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_CATEGORIES_BEGIN:
      return { ...state, loading: "true" };

    case actions.FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: "false", categories: payload };

    default:
      return state;
  }
};
