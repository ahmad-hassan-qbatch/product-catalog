/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useReducer, useState } from "react";
import { fetchAllCategory } from "../redux/Categories/actionCreator";
import { addProduct, editProduct } from "../redux/Products/actionCreator";
import _ from "lodash";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ColorVariation from "./ColorVariation";

const SizeVariation = React.lazy(() => import("./SizeVariation"));

let initialState = {
  title: "",
  description: "",
  thumbnail: "",
  category: "",
  brand: "",
  sizeData: [{ price: "", stock: "", name: "" }],
  colors: [{ hex: "", size: null }],
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_VARIATION_FIELD":
      return {
        ...state,
        [action.variation]: _.map(state[action.variation], (size, index) => {
          if (index === action.index) {
            size[action.field] = action.value;
          }
          return size;
        }),
      };
    case "ADD_VARIATION_INPUT":
      return {
        ...state,
        [action.variation]: [...state[action.variation], action.object],
      };
    case "DELETE_VARIATION_INPUT":
      if (state[action.variation].length === 1) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        [action.variation]: _.initial(state[action.variation]),
      };

    case "EDIT":
      return action.product;
    case "RESET":
      return _.cloneDeep(initialState);
    default:
      return state;
  }
};

function ProductForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, formDispatch] = useReducer(
    formReducer,
    _.cloneDeep(initialState)
  );

  const category = useSelector((state) => state.Categories);
  const loading = useSelector((state) => state.Products.loading);
  const error = useSelector((state) => state.Products.error);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleVariationChange = (variation, index, field, value) => {
    formDispatch({
      type: "SET_VARIATION_FIELD",
      variation,
      field,
      value,
      index,
    });
  };

  const handleChange = (field, value) => {
    formDispatch({ type: "SET_FIELD", field, value });
  };

  const handleVaritaionLength = (type, variation, object) => {
    formDispatch({ type, variation, object });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      formDispatch({ type: "SET_FIELD", field: "thumbnail", value: imageUrl });
    }
  };

  const handleSubmit = () => {
    if (!formData?.id) {
      dispatch(addProduct(formData));
      setIsSubmitted("Product Added");
      formDispatch({ type: "RESET" });
    } else {
      dispatch(editProduct(formData));
      setIsSubmitted("Product Edited");
    }
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
    if (location?.state?.product) {
      formDispatch({ type: "EDIT", product: location?.state?.product });
    }
  }, []);

  useEffect(() => {
    if (isSubmitted !== false) {
      if (!loading && error) {
        alert(error);
      }
      if (!loading && error === null) {
        alert(`${isSubmitted}`);
        navigate("/home");
      }
    }
  }, [loading, error, isSubmitted]);

  return (
    <>
      <div className="flex h-auto items-center justify-center">
        <div className="w-1/2 flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md">
          {formData?.id ? (
            <h1 className="mb-4 text-2xl font-bold">Edit Product</h1>
          ) : (
            <h1 className="mb-4 text-2xl font-bold">Add Product</h1>
          )}

          <form className="w-full flex flex-col items-center justify-center">
            {formData.thumbnail && (
              <img
                className="h-6/12 w-6/12 border-[6px] border-white bg-white"
                src={formData.thumbnail}
                alt="Selected"
                style={{ maxWidth: "300px" }}
              />
            )}
            <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2 mb-2">
              <input
                className="w-full rounded-md bg-slate-300 p-2"
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full rounded-md bg-slate-300 p-2"
                value={formData.brand}
                onChange={(e) => handleChange("brand", e.target.value)}
                placeholder="Brand"
                required
              ></input>
            </div>
            <textarea
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Description"
              required
            ></textarea>

            <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2">
              <select
                className="mb-4 w-full rounded-md bg-slate-300 p-2"
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {category.categories.map((category, index) => {
                  return (
                    <option
                      className="mb-4 w-full rounded-md bg-slate-300 p-2"
                      value={`${category}`}
                      key={index}
                    >
                      {category}
                    </option>
                  );
                })}
              </select>
              <input
                type="file"
                className="mb-4 w-full rounded-md bg-slate-300 p-2"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              {formData?.sizeData ? (
                <SizeVariation
                  handleSizeChange={handleVariationChange}
                  sizeData={formData.sizeData}
                  handleSizeLength={handleVaritaionLength}
                />
              ) : (
                <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2">
                  <input
                    type="text"
                    className="w-full rounded-md bg-slate-300 p-2"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    required
                  ></input>

                  <input
                    type="text"
                    className="w-full rounded-md bg-slate-300 p-2"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                    required
                  ></input>
                  <br />
                </div>
              )}
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              {formData?.colors && (
                <ColorVariation
                  sizeData={formData.sizeData}
                  handleColorChange={handleVariationChange}
                  colors={formData.colors}
                  handleColorLength={handleVaritaionLength}
                />
              )}
            </Suspense>

            {formData?.id ? (
              <button
                className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
                type="button"
                onClick={handleSubmit}
              >
                Edit Product
              </button>
            ) : (
              <button
                className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
                type="button"
                onClick={handleSubmit}
              >
                Add Product
              </button>
            )}
          </form>
          <p className="mt-4">
            <Link to="/Home" className=" text-blue-500 underline">
              ALL
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ProductForm;
