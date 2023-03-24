import React, { useState } from "react";
import { storeData } from "../../assets/data/dummyData";
import "./Products.scss";
import { Link, NavLink, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { singleProduct } from "../../rtk/slices/productSlice";
import { useDispatch } from "react-redux";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
function Products() {
  const params = useParams().num;
  const dispatch = useDispatch();
  return (
    <>
      <Navbar />
      <ScrollToTop/>

      <div className="products">
        <div className="container">
          <div className="row">
            {storeData
              .slice(0 + (params - 1) * 8, 8 + (params - 1) * 8)
              .map((p) => (
                <Link
                  to={`/filterProduct/${p.type}/${p.id}`}
                  onClick={() => dispatch(singleProduct(p))}
                >
                  <div className="box">
                    <div className="img">
                      <img src={p.img}></img>
                    </div>
                    <div className="info">
                      <h3>{p.name}</h3>
                      <p>{p.text}</p>
                      <span>Price : ${p.price}</span>
                      <button>Add To Cart</button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <ul>
            <NavLink to={"/products/1"}>1</NavLink>
            <NavLink to={`/products/2`}>2</NavLink>
            <NavLink to={`/products/3`}>3</NavLink>
            <NavLink to={`/products/4`}>4</NavLink>
            <NavLink to={`/products/5`}>5</NavLink>
            <NavLink to={`/products/6`}>6</NavLink>
            <NavLink to={`/products/7`}>7</NavLink>
            <NavLink to={`/products/8`}>8</NavLink>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Products;
