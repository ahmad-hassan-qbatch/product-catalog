/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { fetchAllCategory } from "../redux/Categories/actionCreator";
import { addProduct, editProduct } from "../redux/Products/actionCreator";
import "../App.css";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ColorVariation from "./ColorVariation";

const SizeVariation = React.lazy(() => import("./SizeVariation"));

let initialData = {
  title: "",
  description: "",
  thumbnail: "",
  category: "",
  brand: "",
  sizeData: [{ price: "", stock: "", name: "" }],
  colors: [{ hex: "", size: "" }],
};

function ProductForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const category = useSelector((state) => state.Categories);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    if (!values?.id) {
      dispatch(addProduct(values));
    } else {
      dispatch(editProduct(values));
    }
    navigate("/home");
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, []);

  const validatorForAPI = Yup.object({
    title: Yup.string().required("Title is Required"),
    brand: Yup.string().required("Brand is Required"),
    description: Yup.string().required("Description is Required"),
    thumbnail: Yup.string().required("Image is Required"),
    category: Yup.string().required("Category is Required"),
    price: Yup.number().required("Price is Required"),
    stock: Yup.number().required("Stock is Required"),
  });

  const validatorForNew = Yup.object({
    title: Yup.string().required("Title is Required"),
    brand: Yup.string().required("Brand is Required"),
    description: Yup.string().required("Description is Required"),
    thumbnail: Yup.string().required("Image is Required"),
    category: Yup.string().required("Category is Required"),
    sizeData: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("Name is Required"),
          price: Yup.string().required("Price is Required"),
          stock: Yup.string().required("Stock is Required"),
        })
      )
      .min(1, "You need at least one Size")
      .required("Required"),
    colors: Yup.array()
      .of(
        Yup.object({
          hex: Yup.string().required("Color is Required"),
          size: Yup.string().required("Please select a size"),
        })
      )
      .min(1, "You need at least one Color")
      .required("Required"),
  });

  const form = (initialState, validator) => {
    return (
      <Formik
        initialValues={initialState}
        validationSchema={validator}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors }) => (
          <Form className="md:w-1/2 w-auto flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md">
            {values?.id ? (
              <h1 className="mb-4 text-2xl font-bold">Edit Product</h1>
            ) : (
              <h1 className="mb-4 text-2xl font-bold">Add Product</h1>
            )}
            {values?.thumbnail && (
              <img
                className="h-6/12 w-6/12 border-[6px] border-white bg-white"
                src={values.thumbnail}
                alt="Selected"
                style={{ maxWidth: "300px" }}
              />
            )}
            <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2 mb-2">
              <div>
                <Field
                  name={"title"}
                  placeholder="Title"
                  type={"text"}
                  className="w-full rounded-md bg-slate-300 p-2"
                />
                <ErrorMessage
                  className="text-red-500"
                  name="title"
                  component={"div"}
                />
              </div>
              <div>
                <Field
                  name={"brand"}
                  type="brand"
                  placeholder={"brand"}
                  className="w-full rounded-md bg-slate-300 p-2"
                />
                <ErrorMessage
                  className="text-red-500"
                  name="brand"
                  component={"div"}
                />
              </div>
            </div>

            <Field
              name={"description"}
              type="brand"
              as="textarea"
              placeholder={"description"}
              className="w-full rounded-md bg-slate-300 p-2 mb-2"
            />
            <ErrorMessage
              className="text-red-500"
              name="description"
              component={"div"}
            />

            <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2">
              <div>
                <Field
                  name="thumbnail"
                  type="file"
                  className="mb-2 w-full rounded-md bg-slate-300 p-1 mr-2 h-auto"
                  accept="image/*"
                  value=""
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFieldValue("thumbnail", URL.createObjectURL(file));
                    }
                  }}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="thumbnail"
                  component={"div"}
                />
              </div>
              <div className="flex flex-col">
                <Field
                  name="category"
                  as="select"
                  className="rounded-md border border-gray-300 shadow-sm pr-10 pl-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none bg-[linear-gradient(45deg,transparent_50%,gray_50%),linear-gradient(135deg,gray_50%,transparent_50%),linear-gradient(to_right,#ccc,#ccc)] bg-[calc(100%_-_20px)_calc(1em_+_2px),calc(100%_-_15px)_calc(1em_+_2px),calc(100%_-_2.5em)_0.5em] bg-[5px_5px,5px_5px,1px_1.5em] bg-no-repeat appearance-none mb-2 rounded-md bg-slate-300"
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
                </Field>
                <ErrorMessage
                  className="text-red-500"
                  name="category"
                  component={"div"}
                />
              </div>
            </div>
            {values?.sizeData ? (
              <>
                <SizeVariation values={values} errors={errors.sizeData} />
                <ColorVariation values={values} errors={errors.colors} />
              </>
            ) : (
              <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2 mb-2">
                <div>
                  <Field
                    name="price"
                    type="number"
                    className="w-full rounded-md bg-slate-300 p-2"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="price"
                    component={"div"}
                  />
                </div>
                <div>
                  <Field
                    name="stock"
                    type="number"
                    className="w-full rounded-md bg-slate-300 p-2"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="stock"
                    component={"div"}
                  />
                </div>
              </div>
            )}
            <button
              className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
              type="submit"
            >
              {values.id ? "Edit Product" : "Add Product"}
            </button>
            <p className="mt-4">
              <Link to="/Home" className=" text-blue-500 underline">
                ALL
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <>
      <div className="flex h-auto items-center justify-center">
        {location?.state?.product &&
          form(
            location?.state?.product,
            location?.state?.product.id > 100
              ? validatorForNew
              : validatorForAPI
          )}
        {!location?.state?.product && form(initialData, validatorForNew)}
      </div>
    </>
  );
}

export default ProductForm;
