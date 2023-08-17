/* eslint-disable no-unused-vars */
import React from "react";
import logo from "./logo.svg";
import store from "./redux/store";
import "./App.css";
import AllProducts from "./Components/AllProducts";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <AllProducts />
    </Provider>
  );
}

export default App;
