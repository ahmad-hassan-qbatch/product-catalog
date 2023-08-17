import React, { useEffect, useReducer } from "react";
import { fetchAllCategory } from "../redux/Categories/actionCreator";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  title: "",
  description: "",
  images: "",
  category: "",
  sizeData: [],
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_SIZE_FIELD":
      return {
        ...state,
        sizeData: _.map(state.sizeData, (size, index) => {
          if (index === action.index) {
            size[action.field] = action.value;
          }
          return size;
        }),
      };
    case "ADD_SIZE_INPUT":
      return {
        ...state,
        sizeData: [...state.sizeData, { price: "", stock: "" }],
      };
    case "DELETE_SIZE_INPUT":
      return {
        ...state,
        sizeData: _.initial(state.sizeData),
      };
    case "SUBMIT":
      console.log(state);
      return initialState;
    default:
      return state;
  }
};

function ProductForm() {
  const [formData, formDispatch] = useReducer(formReducer, initialState);
  const category = useSelector((state) => state.Categories);
  const dispatch = useDispatch();

  const handleSizeChange = (index, field, value) => {
    formDispatch({ type: "SET_SIZE_FIELD", field, value, index });
  };

  const handleChange = (field, value) => {
    formDispatch({ type: "SET_FIELD", field, value });
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, []);

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={() => formDispatch({ type: "SUBMIT" })}>
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
        <br />

        <label>Description:</label>
        <br />
        <textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        ></textarea>
        <br />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {category.categories.map((category, index) => {
            return (
              <option value={`${category}`} key={index}>
                {category}
              </option>
            );
          })}
        </select>
        <br />
        <label>Images </label>
        <input
          type="text"
          value={formData.images}
          onChange={(e) => handleChange("images", e.target.value)}
          required
        />
        <br />

        <div>
          {formData.sizeData.map((size, index) => (
            <div key={index}>
              <label>{`Size ${index + 1} Price:`}</label>
              <input
                type="number"
                value={size.price}
                onChange={(e) =>
                  handleSizeChange(index, "price", e.target.value)
                }
                required
              />
              <label>{`Size ${index + 1} Stock:`}</label>
              <input
                type="number"
                value={size.stock}
                onChange={(e) =>
                  handleSizeChange(index, "stock", e.target.value)
                }
                required
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => formDispatch({ type: "ADD_SIZE_INPUT" })}
        >
          Add Size
        </button>
        <button
          type="button"
          onClick={() => formDispatch({ type: "DELETE_SIZE_INPUT" })}
        >
          Add Remove
        </button>
        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;
