import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Slider from "../components/Slider/Slider";
import Discount from "../components/Discount/Discount";
import ProductType from "../components/ProductType/ProductType";
import ProductComp from "../components/ProductComp/ProductComp";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
function Home() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Slider />
      <Discount />
      <ProductType />
      <ProductComp />
    </>
  );
}

export default Home;
