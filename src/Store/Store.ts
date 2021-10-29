import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import reducer from "./Reducer";
// @ts-ignore
const asyncFunctionMiddleware = (storeAPI) => (next) => (action) => {
  if (typeof action === "function") {
    return action(storeAPI.dispatch, storeAPI.getState);
  }
  return next(action);
};
const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware);

/* eslint-disable no-underscore-dangle */

// @ts-ignore
const store = createStore(reducer, middlewareEnhancer);
export default store;
