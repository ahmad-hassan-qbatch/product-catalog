import actions from "./actionTypes";

const fetchProdcuts = (products) => {
  return {
    type: actions.FETCH_PRODCUTS,
    payload: products,
  };
};

export default {
  fetchProdcuts,
};
