import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Products from "./Products/reducer";
import Categories from "./Categories/reducer";

const reducers = combineReducers({
  Products,
  Categories,
});

const composeEnhancer = compose(
  applyMiddleware(thunk),
  devToolsEnhancer({ trace: true })
);

const store = createStore(reducers, composeEnhancer);

export default store;
