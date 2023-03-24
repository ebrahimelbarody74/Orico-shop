import { createSlice } from "@reduxjs/toolkit";

const sliderReducer = createSlice({
  initialState: {
    count: 0,
    length: 4,
    dark: JSON.parse(localStorage.getItem("dark")) || false,
  },
  name: "sliderReducer",
  reducers: {
    handelNext: (state, action) => {
      state.count = action.payload < state.length ? action.payload : 0;
      console.log(state.count);
    },
    handelPrev: (state, action) => {
      state.count = action.payload < 0 ? state.length - 1 : action.payload;
      console.log(state.count);
    },
    handelCircle: (state, action) => {
      state.count = action.payload;
    },
    darkMode: (state, action) => {
      action.payload == "dark" ? (state.dark = true) : (state.dark = false);
      localStorage.setItem("dark", JSON.stringify(state.dark));
    },
  },
});

export const { handelNext, handelPrev, handelCircle, darkMode } =
  sliderReducer.actions;
export default sliderReducer.reducer;
