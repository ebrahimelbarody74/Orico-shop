import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import FilterProduct from "./pages/FilterProduct/FilterProduct";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
function App() {
  const dark = useSelector((state) => state.slider.dark);
  console.log(dark);
  return (
    <div className={`App ${dark ? "dark" : "light"}`}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<FilterProduct />} path={`/filterProduct/:type`} />
        <Route element={<SingleProduct />} path={`/filterProduct/:type/:id`} />
        <Route element={<Products />} path={`/products/:num`} />
        <Route element={<Cart />} path={`/cart`} />
      </Routes>
    </div>
  );
}

export default App;
