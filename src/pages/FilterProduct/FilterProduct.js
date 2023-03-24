import React from "react";
import { storeData } from "../../assets/data/dummyData.jsx";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./FilterProduct.scss";
import {
  clearFilter,
  handelColor,
  handelGender,
  handelPrice,
  handelSize,
  singleProduct,
} from "../../rtk/slices/productSlice.js";
import Navbar from "../../components/Navbar/Navbar.js";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop.js";
import { useTranslation } from "react-i18next";
function FilterProduct() {
  const colors = ["red", "brown", "black", "yellow", "gray"];
  const size = ["S", "M", "L", "XL", "XXL"];
  const params = useParams().type;
  const filterProduct = useSelector((state) => state.products.filterProducts);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();

  return (
    <div className="filterProduct">
      <Navbar />
      <ScrollToTop />

      <h1>{params}</h1>
      {/* <h3>{t("title")}</h3> */}
      <div className="filter-button">
        <div className="left">
          <button onClick={() => dispatch(handelGender("male"))}>MALE</button>
          <button onClick={() => dispatch(handelGender("female"))}>
            FEMALE
          </button>
          <button onClick={() => dispatch(handelPrice("lowest"))}>
            LOWEST PRICE
          </button>
          <button onClick={() => dispatch(handelPrice("highest"))}>
            HIGH PRICE
          </button>

          <select onChange={(e) => dispatch(handelColor(e.target.value))}>
            <option disabled>SELECT A COLOR</option>
            {colors.map((e) => (
              <option>{e}</option>
            ))}
          </select>
          <select onChange={(e) => dispatch(handelSize(e.target.value))}>
            <option disabled>SELECT A SIZE</option>
            {size.map((e) => (
              <option>{e}</option>
            ))}
          </select>
        </div>
        <div className="right">
          <button onClick={() => dispatch(clearFilter())}>CLEAR FILTER</button>
        </div>
      </div>
      <div className="filter-row  row">
        {filterProduct.length > 0 ? (
          filterProduct
            .filter((e) => e.type === params)
            .map((p) => (
              <div className="filter-box ">
                <Link to={p.id} onClick={() => dispatch(singleProduct(p))}>
                  <img src={p.img} />
                </Link>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <div className="filter-info">
                  <div className="price">${p.price}</div>
                  <div className="color">
                    {p.color.map((c) => (
                      <span style={{ backgroundColor: c }}></span>
                    ))}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <h2>No Product</h2>
        )}
      </div>
    </div>
  );
}

export default FilterProduct;
