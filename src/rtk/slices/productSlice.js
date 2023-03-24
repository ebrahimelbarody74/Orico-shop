import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "../../assets/data/dummyData";
const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    filterProducts: JSON.parse(sessionStorage.getItem("filterProducts")) || [],
    singleProduct: JSON.parse(sessionStorage.getItem("singleProduct")) || [],
  },
  reducers: {
    filterProduct: (state, action) => {
      const filter = storeData.filter((e) => e.type == action.payload);
      state.filterProducts = filter;
      sessionStorage.setItem("filterProducts", JSON.stringify(filter));
      sessionStorage.setItem("filterAll", JSON.stringify(filter));
    },
    singleProduct: (state, action) => {
      try {
        const singleProduct = storeData.filter(
          (e) => e.id === action.payload.id
        );

        state.singleProduct = singleProduct;
        sessionStorage.setItem("singleProduct", JSON.stringify(singleProduct));
      } catch (err) {
        console.log(err);
      }
    },
    handelGender: (state, action) => {
      try {
        const allData = JSON.parse(sessionStorage.getItem("filterAll"));
        const filterGender = allData.filter((e) => e.gender === action.payload);
        state.filterProducts = filterGender;
        sessionStorage.setItem("filterProducts", JSON.stringify(filterGender));
      } catch (err) {}
    },
    handelPrice: (state, action) => {
      try {
        const allData = JSON.parse(sessionStorage.getItem("filterAll"));
        const newProduct = allData.sort((a, b) => {
          if (action.payload === "lowest") {
            return a.price - b.price;
          } else if (action.payload === "highest") {
            return b.price - a.price;
          }
        });
        state.filterProducts = newProduct;
        sessionStorage.setItem("filterProducts", JSON.stringify(newProduct));
      } catch (err) {}
    },
    handelColor: (state, action) => {
      const allData = JSON.parse(sessionStorage.getItem("filterAll"));
      let newPrice = allData.filter(
        (p) => p.color.indexOf(action.payload) != -1
      );
      state.filterProducts = newPrice;
      sessionStorage.setItem("filterProducts", JSON.stringify(newPrice));
    },
    handelSize: (state, action) => {
      const allData = JSON.parse(sessionStorage.getItem("filterAll"));
      let newSize = allData.filter((p) => p.size.indexOf(action.payload) != -1);
      state.filterProducts = newSize;
      sessionStorage.setItem("filterProducts", JSON.stringify(newSize));
    },
    clearFilter: (state, action) => {
      const allData = JSON.parse(sessionStorage.getItem("filterAll"));
      state.filterProducts = allData;
      sessionStorage.setItem("filterProducts", JSON.stringify(allData));
    },
  },
});

export const {
  filterProduct,
  singleProduct,
  handelGender,
  handelPrice,
  handelSize,
  handelColor,
  clearFilter,
} = productSlice.actions;
export default productSlice.reducer;
