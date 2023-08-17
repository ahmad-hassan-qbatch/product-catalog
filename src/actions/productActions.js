import axios from "axios";
import { useDispatch } from "react-redux";
import actionCreater from "../configStore.js/Products/actionCreater";

async function fetchAllProducts() {
  try {
    const dispatch = useDispatch();
    const res = await axios.get();
    dispatch(actionCreater.fetchProdcuts(res));
  } catch (error) {
    console.log(error);
  }
}

export default {
  fetchAllProducts,
};
