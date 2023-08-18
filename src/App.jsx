/* eslint-disable no-unused-vars */
import React from "react";
import logo from "./logo.svg";
import store from "./redux/store";
import "./App.css";
import ProductForm from "./Components/ProductForm";
import AllProduct from "./Components/AllProducts";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        
        <Routes>
          <Route exact path="/" element={<AllProduct />} />
          <Route exact path="/add" element={<ProductForm />} />
          <Route exact path="/edit/:id" element={<ProductForm />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
