import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/features/groupSlice";
import filterReducer from "../redux/features/filterSlice";

export const store = configureStore({
  reducer: {
   
    product: productReducer,
    filter: filterReducer,
  },
});