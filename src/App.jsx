import React, { Suspense } from "react";
import store from "./redux/store";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./Components/Root";

const ProductForm = React.lazy(() =>
  /* webpackChunkName: "productForm" */ import("./Components/ProductForm")
);
const AllProduct = React.lazy(() =>
  /* webpackChunkName: "allProducts" */ import("./Components/AllProducts")
);

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<div>Loading.... </div>}>
          <Routes>
            <Route exact path="/" element={<Root />}>
              <Route exact path="/home" element={<AllProduct />} />
              <Route path="/add" element={<ProductForm />} />
              <Route path="/edit" element={<ProductForm />} />
            </Route>
          </Routes>
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
