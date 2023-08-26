import React, { Suspense } from "react";
import store from "./redux/store";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./Components/Root";
import NotFound from "./Components/NotFound";
import Loader from "./Components/Loader";

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
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center h-screen ">
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route exact path="/" element={<Root />}>
              <Route exact path="/" element={<AllProduct />} />
              <Route path="/add" element={<ProductForm />} />
              <Route path="/edit" element={<ProductForm />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
