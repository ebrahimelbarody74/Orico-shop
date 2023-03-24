import { configureStore } from "@reduxjs/toolkit";
import sliderSlice from "./slices/sliderSlice";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    slider: sliderSlice,
    auth: authSlice,
    products:productSlice,
    cart:cartSlice
  },
});
