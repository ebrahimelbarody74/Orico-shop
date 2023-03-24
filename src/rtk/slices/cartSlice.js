import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    count: 0,
    totalPrice: JSON.parse(localStorage.getItem("totalPrice")) || 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const findProduct = state.cart.find(
        (e) =>
          e.id === product.id &&
          e.color === product.color &&
          e.size === product.size
      );
      if (findProduct) {
        state.count++;
        findProduct.count++;
        state.totalPrice += product.price;
        findProduct.totalPrice += product.price;
      } else {
        state.totalPrice += product.price;
        state.cart.push({
          id: product.id,
          name: product.name,
          size: product.size,
          color: product.color,
          price: product.price,
          text: product.text,
          img: product.img,
          count: 1,
          totalPrice: product.price,
        });
      }
      console.log(state.cart);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    removeProduct: (state, action) => {
      const products = state.cart.filter(
        (e) =>
          e.id !== action.payload.id ||
          e.color !== action.payload.color ||
          e.size !== action.payload.size
      );
      state.totalPrice -= action.payload.price * action.payload.count;
      state.cart = products;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    decrese: (state, action) => {
      const findProduct = state.cart.find(
        (e) =>
          e.id === action.payload.id &&
          e.color === action.payload.color &&
          e.size === action.payload.size
      );
      if (findProduct.count == 1) {
        const products = state.cart.filter(
          (e) =>
            e.id !== action.payload.id ||
            e.color !== action.payload.color ||
            e.size !== action.payload.size
        );
        state.totalPrice -= action.payload.price;
        findProduct.totalPrice -= action.payload.price;
        state.cart = products;
      } else {
        findProduct.count--;
        state.totalPrice -= action.payload.price;
        findProduct.totalPrice -= action.payload.price;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    increse: (state, action) => {
      const findProduct = state.cart.find(
        (e) =>
          e.id === action.payload.id &&
          e.color === action.payload.color &&
          e.size === action.payload.size
      );
      findProduct.count++;
      state.totalPrice += action.payload.price;
      findProduct.totalPrice += action.payload.price;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
  },
});

export const { addToCart, removeProduct, decrese, increse } = cartSlice.actions;
export default cartSlice.reducer;
