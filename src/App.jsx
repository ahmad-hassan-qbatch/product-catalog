import React from "react";
import store from "./redux/store";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import NotFound from "./Components/NotFound";
import LazyLoading from "./Components/LazyLoading";

const ProductForm = React.lazy(() =>
  import(/* webpackChunkName: "productForm" */ "./pages/ProductForm")
);
const AllProduct = React.lazy(() =>
  import(/* webpackChunkName: "allProducts" */ "./pages/AllProducts")
);

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <LazyLoading>
          <Layout>
            <Routes>
              <Route exact path="/" element={<AllProduct />} />
              <Route path="/add" element={<ProductForm />} />
              <Route path="/edit" element={<ProductForm />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Layout>
        </LazyLoading>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
