import actions from "./actionTypes";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_PRODCUTS:
      return [...state, ...payload];
    default:
      return state;
  }
};
