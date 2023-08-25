import axios from "axios";
import actions from "./actions";

export const fetchAllCategory = () => async (dispatch) => {
  try {
    dispatch(actions.fetchCategoriesBegin());

    const response = await axios.get(
      "https://dummyjson.com/products/categories",
      {
        params: {
          limit: 0,
        },
      }
    );

    dispatch(actions.fetchCategoriesSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};
