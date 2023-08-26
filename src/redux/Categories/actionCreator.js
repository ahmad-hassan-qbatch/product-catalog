/* eslint-disable no-undef */
import axios from "axios";
import actions from "./actions";
import slackMessage from "../../utils/slackIntegration";

const categoryURL = `${process.env.REACT_APP_API_URL}/products/categories`;

export const fetchAllCategory = () => async (dispatch) => {
  try {
    dispatch(actions.fetchCategoriesBegin());

    const response = await axios.get(categoryURL, {
      params: {
        limit: 0,
      },
    });

    dispatch(actions.fetchCategoriesSuccess(response.data));
  } catch (error) {
    await slackMessage(error);
    dispatch(actions.apiError(error));
  }
};
